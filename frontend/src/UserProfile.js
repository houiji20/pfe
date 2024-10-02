import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css'; // Ensure this file exists for styling

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [creatingProfile, setCreatingProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullname: '',
    age: '',
    skill_level: '',
    email: '',
    profile_picture: null,
    phone_number: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (res.data.create_profile) {
          setCreatingProfile(true);
        } else {
          setProfile(res.data);
          setFormData({
            fullname: res.data.fullname,
            age: res.data.age,
            skill_level: res.data.skill_level,
            email: res.data.email,
            profile_picture: null, // Handle file upload separately
            phone_number: res.data.phone_number,
          });
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile(); // Fetch the user profile
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/user/profile/update/', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfile(res.data); // Update profile with new data
      setCreatingProfile(false); // Close the edit form
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  return (
    <div className="profile-container">
      {creatingProfile ? (
        <form onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>
          <input 
            type="text" 
            name="fullname" 
            value={formData.fullname}
            onChange={handleChange} 
            placeholder="Full Name" 
            required 
          />
          <input 
            type="number" 
            name="age" 
            value={formData.age}
            onChange={handleChange} 
            placeholder="Age" 
            required 
          />
          <select 
            name="skill_level" 
            value={formData.skill_level}
            onChange={handleChange} 
            required
          >
            <option value="">Select Skill Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange} 
            placeholder="Email" 
            required 
          />
          <input 
            type="file" 
            name="profile_picture" 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="phone_number" 
            value={formData.phone_number}
            onChange={handleChange} 
            placeholder="Phone Number" 
            required 
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        profile ? (
          <div className="profile-info">
            <h2>{profile.fullname}</h2>
            {profile.profile_picture ? (
              <img 
                src={profile.profile_picture} 
                alt="Profile" 
                className="profile-image"
              />
            ) : (
              <p>No profile picture available</p>
            )}
            
            <p><strong>Age:</strong> {profile.age}</p>
            <p><strong>Skill Level:</strong> {profile.skill_level}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone Number:</strong> {profile.phone_number}</p>
            
            <button onClick={() => setCreatingProfile(true)}>Edit Profile</button>
          </div>
        ) : (
          <div className="no-profile">
            <h2>No Profile Found</h2>
            <button onClick={() => setCreatingProfile(true)}>Create Profile</button>
          </div>
        )
      )}
    </div>
  );
};

export default UserProfile;

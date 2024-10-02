from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Course, UserCourse, PurchasedCourse, UserProfile
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.core.files.storage import default_storage
from django.http import JsonResponse

@api_view(['GET'])
@permission_classes([])
def list_courses(request):
    category = request.query_params.get('category', None)
    if category:
        courses = Course.objects.filter(category=category)
    else:
        courses = Course.objects.all()
    
    course_data = [
        {
            'id': course.id,
            'title': course.title,
            'price': course.price,
            'category': course.get_category_display(),
            'image_url': course.image.url if course.image else None  # Include image URL
        } 
        for course in courses
    ]
    
    return Response(course_data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def access_course(request, course_id):
    try:
        course = Course.objects.get(id=course_id)
        user_course, created = UserCourse.objects.get_or_create(user=request.user, course=course)
        user_course.access_granted = True
        user_course.save()
        return Response({'message': 'Access granted'}, status=status.HTTP_200_OK)
    except Course.DoesNotExist:
        return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_access(request, course_id):
    try:
        course = Course.objects.get(id=course_id)
        user_course = UserCourse.objects.get(user=request.user, course=course)
        return Response({'access_granted': user_course.access_granted}, status=status.HTTP_200_OK)
    except UserCourse.DoesNotExist:
        return Response({'access_granted': False}, status=status.HTTP_200_OK)


@api_view(['POST'])
def register_user(request):
    data = request.data
    if User.objects.filter(username=data['username']).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create(
        username=data['username'],
        password=make_password(data['password'])
    )
    user.save()
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def purchased_courses(request):
    user = request.user
    purchases = PurchasedCourse.objects.filter(user=user)
    purchased_courses = [purchase.course for purchase in purchases]
    return Response([{
        'id': course.id,
        'title': course.title,
        'description': course.description,
        'price': course.price,
    } for course in purchased_courses])

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def buy_course(request, course_id):
    user = request.user
    course = Course.objects.get(id=course_id)

    if PurchasedCourse.objects.filter(user=user, course=course).exists():
        return Response({'error': 'Course already purchased'}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new purchased course entry
    PurchasedCourse.objects.create(user=user, course=course)

    # Ensure that access is granted after purchase
    UserCourse.objects.create(user=user, course=course, access_granted=True)

    return Response({'message': 'Course purchased successfully'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    try:
        profile = UserProfile.objects.get(user=request.user)
        data = {
            'fullname': profile.fullname,
            'age': profile.age,
            'skill_level': profile.skill_level,
            'email': profile.email,
            'profile_picture': request.build_absolute_uri(profile.profile_picture.url) if profile.profile_picture else None,
            'phone_number': profile.phone_number
        }
        return Response(data)
    except UserProfile.DoesNotExist:
        # Return a message for creating a profile if not exists
        return Response({
            'message': 'Profile not found. You can create a new profile.',
            'create_profile': True
        })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    try:
        # Attempt to get or create the user profile
        profile, created = UserProfile.objects.get_or_create(user=request.user)

        # Update fields directly from request data
        profile.fullname = request.data.get('fullname', profile.fullname)
        
        # Ensure age is provided
        if 'age' in request.data and request.data['age'] is not None:
            profile.age = request.data['age']
        else:
            return Response({'error': 'Age is required.'}, status=status.HTTP_400_BAD_REQUEST)

        profile.skill_level = request.data.get('skill_level', profile.skill_level)
        profile.email = request.data.get('email', profile.email)
        profile.phone_number = request.data.get('phone_number', profile.phone_number)

        # Handle profile picture upload (this can be a separate endpoint if desired)
        if 'profile_picture' in request.FILES:
            profile_picture = request.FILES['profile_picture']
            profile.profile_picture = default_storage.save(f'profile_pictures/{profile_picture.name}', profile_picture)

        profile.save()  # Save the updated profile

        return Response({
            'fullname': profile.fullname,
            'age': profile.age,
            'skill_level': profile.skill_level,
            'email': profile.email,
            'profile_picture': request.build_absolute_uri(profile.profile_picture.url) if profile.profile_picture else None,
            'phone_number': profile.phone_number
        })
    except Exception as e:
        # Log the exception for debugging
        print(f"Error occurred while updating profile: {str(e)}")
        return Response({'error': 'An error occurred while updating the profile. Please try again.'}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile_picture(request):
    try:
        # Attempt to get the user profile
        profile = UserProfile.objects.get(user=request.user)

        # Handle profile picture upload
        if 'profile_picture' in request.FILES:
            profile_picture = request.FILES['profile_picture']
            profile.profile_picture = default_storage.save(f'profile_pictures/{profile_picture.name}', profile_picture)
            profile.save()

            return Response({
                'message': 'Profile picture updated successfully',
                'profile_picture': request.build_absolute_uri(profile.profile_picture.url)
            }, status=status.HTTP_200_OK)

        return Response({'error': 'No profile picture provided'}, status=status.HTTP_400_BAD_REQUEST)
    except UserProfile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"Error occurred while updating profile picture: {str(e)}")
        return Response({'error': 'An error occurred while updating the profile picture. Please try again.'}, status=500)

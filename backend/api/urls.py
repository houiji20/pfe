from django.urls import path
from .views import list_courses, access_course, check_access
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import register_user, purchased_courses, buy_course, update_user_profile, user_profile, update_profile_picture
urlpatterns = [
    path('courses/', list_courses, name='list_courses'),
    path('courses/<int:course_id>/access/', access_course, name='access_course'),
    path('courses/<int:course_id>/check_access/', check_access, name='check_access'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_user, name='register'),
    path('purchased-courses/', purchased_courses, name='purchased_courses'),
    path('buy-course/<int:course_id>/', buy_course, name='buy_course'),
    path('user/profile/', user_profile, name='user_profile'),
    path('user/profile/update/', update_user_profile, name='update_user_profile'),
    path('user/profile/picture/update/', update_profile_picture, name='update_profile_picture'),
]

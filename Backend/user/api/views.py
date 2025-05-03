from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from ..models import CustomUser
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from django.contrib.auth import logout

class UserList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class RegisterView(APIView):
    def post(self, request):
        password = request.data.get('password')
        data = request.data.copy()
        if password:
            data['password'] = make_password(password)
        
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = authenticate(request, email=email, password=password)
        if user:
            return Response({
                "message": "Login successful",
                "username": user.username  # or user.name, or user.first_name
            }, status=status.HTTP_200_OK)
        
@api_view(['GET'])
def current_user(request):
    if request.user.is_authenticated:
        return Response({"username": request.user.username})
    return Response({"error": "Not logged in"}, status=401)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)

from rest_framework import views,response,status,generics
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login
from .models import Users
from .serializer import UserSerializer
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.middleware.csrf import get_token
from django.contrib.auth import get_user_model
from otp.models import OTPModels

# Create your views here.

class CSRFTokenView(views.APIView):
    def get(self, request, *args, **kwargs):
        csrf_token = get_token(request)
        return response.Response({'csrfToken': csrf_token})

class RegisterView(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]
    
    def post(self,request, format = None):
        username = request.data.get("username")
        password = request.data.get("password")
        first_name = request.data.get("firstName")
        last_name = request.data.get("lastName")
        email = request.data.get("email")
        address = request.data.get("address")
        
        if not username or not password or not email:
            return response.Response({"detail": "Username, password and email are required"}, status=status.HTTP_400_BAD_REQUEST)

        if not first_name or not last_name or not address:
            return response.Response({"detail": "First name, last name and address are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return response.Response({"detail": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return response.Response({"detail": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            otpModel = OTPModels.objects.get(email=email)
            if otpModel.verified==False:
                return response.Response({"detail": "Email is not verified yet"}, status=status.HTTP_400_BAD_REQUEST)
        except OTPModels.DoesNotExist:
            return response.Response({"detail": "Email not verified"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, email=email)
        user.save()
        
        usersModel = Users(user=user,firstName = first_name, lastName = last_name, address = address, email = email)
        usersModel.save()
        
        serializer = UserSerializer(usersModel)
        return response.Response(serializer.data,status=201)

class LoginView(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]
    def post(self,request,format=None):
        email = request.data.get('email')
        password = request.data.get('password')
        
        try:
            user = User.objects.get(email=email)
        except:
            return response.Response({"detail":"User does not exist"},status=status.HTTP_404_NOT_FOUND)
        
        user = authenticate(request,username = user.username,password=password)
        
        if user is not None:
            login(request,user)
            token, created = Token.objects.get_or_create(user=user)
            return response.Response({"detail": "Login successful", "token": token.key}, status=200)
        else:
            return response.Response({"detail":"Invalid credentials"},status=400)

class UsersDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    auntentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile
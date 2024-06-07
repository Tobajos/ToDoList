from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, ListSerializer, ItemSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .models import List, Item

@api_view(['POST'])
@permission_classes([AllowAny]) 
def login(request):
    try:
        user = get_object_or_404(User, username=request.data['username'])
        if not user.check_password(request.data['password']):
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        token, created = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(instance=user)
        return Response({"token": token.key, "user": serializer.data})
    except KeyError:
        return Response({"detail": "Missing credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])  
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def logout(request):
    request.user.auth_token.delete()
    return Response({"Message": "You are logged out"}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getList(request):
    user = request.user
    lists = List.objects.filter(user=user)
    serializer = ListSerializer(lists, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createList(request):
    serializer = ListSerializer(data=request.data)
    if serializer.is_valid():
        list = serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getItems(request, id):
    try:
        list = get_object_or_404(List, id=id)
        if list.user != request.user:
            return Response({"detail": "You do not have permission to view this list"}, status=status.HTTP_403_FORBIDDEN)
        items = Item.objects.filter(list=list)
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)
    except List.DoesNotExist:
        return Response({"detail": "List not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addItem(request):
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getListWithItems(request, id):
    try:
        list = get_object_or_404(List, pk=id, user=request.user)
        serializer = ListSerializer(list)
        items = Item.objects.filter(list=list)
        items_serializer = ItemSerializer(items, many=True)
        response_data = {
            "list": serializer.data,
            "items": items_serializer.data
        }
        return Response(response_data)
    except List.DoesNotExist:
        return Response({"detail": "List not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteItem(request, item_id):
    try:
        item = get_object_or_404(Item, id=item_id)
        if item.list.user != request.user:
            return Response({"detail": "You do not have permission to delete this item"}, status=status.HTTP_403_FORBIDDEN)
        item.delete()
        return Response({"detail": "Item deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Item.DoesNotExist:
        return Response({"detail": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteList(request, list_id):
    try:
        list = get_object_or_404(List, id=list_id)
        if list.user != request.user:
            return Response({"detail": "You do not have permission to delete this list"}, status=status.HTTP_403_FORBIDDEN)
        list.delete()
        return Response({"detail": "List deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except List.DoesNotExist:
        return Response({"detail": "List not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
@permission_classes([AllowAny])  
def getAllLists(request):
    try:
        lists = List.objects.all()
        serializer = ListSerializer(lists, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


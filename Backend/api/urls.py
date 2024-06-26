from django.urls import path
from . import views

urlpatterns = [
    path('register', views.register),
    path('login', views.login),
    path('logout', views.logout),
    path('getList',views.getList),
    path('getItems/<int:id>', views.getItems),
    path('createList', views.createList),
    path('addItem', views.addItem),
    path('getList/<int:id>', views.getListWithItems),
    path('test',views.getAllLists),
    path('items/<int:item_id>', views.updateItemStatus),
    path('deleteList/<int:list_id>', views.deleteList),
    path('deleteItem/<int:item_id>', views.deleteItem),
]
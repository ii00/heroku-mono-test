from django.urls import path, include
from .views import TodoModelViewSet, NotTodoModelViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'todo', TodoModelViewSet)
router.register(r'nottodo', NotTodoModelViewSet)

urlpatterns = [
    path('', include(router.urls)),
]



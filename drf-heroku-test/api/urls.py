from django.urls import path, include
from .views import TodoModelViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'todo', TodoModelViewSet)

urlpatterns = [
    path('', include(router.urls)),
]



from rest_framework import serializers
from .models import Todo, NotTodo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"
        
class NotTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotTodo
        fields = "__all__"
                
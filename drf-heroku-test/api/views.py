from .models import Todo, NotTodo
from .serializers import TodoSerializer, NotTodoSerializer
from rest_framework.viewsets import ModelViewSet

class TodoModelViewSet(ModelViewSet):
    # crud set
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    
class NotTodoModelViewSet(ModelViewSet):
    # crud set
    queryset = NotTodo.objects.all()
    serializer_class = NotTodoSerializer    
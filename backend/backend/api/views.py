from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer


# Create your views here.
@api_view(["GET"])
def get_task_list(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response({"todos": serializer.data, "status": status.HTTP_200_OK})


@api_view(["POST"])
def create_task(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_priority_list(request, priority):
    tasks = Task.objects.all().filter(priority=priority)
    serializer = TaskSerializer(tasks, many=True)
    return Response({"todos": serializer.data, "status": status.HTTP_200_OK})

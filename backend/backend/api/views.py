from django.core.serializers import serialize
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer


# Create your views here.
@api_view(["GET"])
def get_task_list(request):
    tasks = Task.objects.all().order_by("-created_at")
    serializer = TaskSerializer(tasks, many=True)
    return Response({"todos": serializer.data, "status": status.HTTP_200_OK})


@api_view(["GET"])
def get_task_by_id(request, todo_id):
    task = Task.objects.get(id=todo_id)
    serializer = TaskSerializer(task)
    return Response({"todo": serializer.data}, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_priority_list(request, priority):
    tasks = Task.objects.all().filter(priority=priority).order_by("-created_at", "-updated_at")
    serializer = TaskSerializer(tasks, many=True)
    return Response({"todos": serializer.data, "status": status.HTTP_200_OK})


@api_view(["GET"])
def search_tasks(request):
    query_string = request.query_params.get("q", "")
    print("Query string received", query_string)
    if query_string:
        tasks = Task.objects.filter(title__icontains=query_string).order_by("-created_at", "-updated_at")

        if len(tasks) == 0:
            tasks = Task.objects.filter(description__icontains=query_string).order_by("-created_at", "-updated_at")

            if len(tasks) == 0:
                return Response(data=[], status=status.HTTP_204_NO_CONTENT)
            else:
                serializer = TaskSerializer(tasks, many=True)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            serializer = TaskSerializer(tasks, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(data=[], status=status.HTTP_200_OK)


@api_view(["POST"])
def create_task(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_task(request, todo_id):
    try:
        task = Task.objects.get(id=todo_id)
        task.delete()
        return Response(status=status.HTTP_200_OK)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Task.MultipleObjectsReturned:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_status(request):
    tasks = Task.objects.all()
    total_count = tasks.count()
    completed_todos_percentage = Task.objects.filter(is_complete=True).count() / total_count * 100
    in_progress_todos_percentage = Task.objects.filter(status=2).count() / total_count * 100
    not_started_todos_percentage = Task.objects.filter(status=3).count() / total_count * 100
    return Response({"completed": completed_todos_percentage, "in_progress": in_progress_todos_percentage,
                     "not_started": not_started_todos_percentage})

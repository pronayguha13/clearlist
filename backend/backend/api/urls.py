from django.urls import path, include
from .views import get_task_list, create_task, get_priority_list

urlpatterns = [

    path("todos/", include(
        [
            path("", get_task_list, name="get-task-list"),
            path("<int:priority>/", get_priority_list, name="get-priority-list"),
        ]
    )),
    path("todo/", include(
        [
            path("", create_task, name="create-task")
        ]
    ))
]

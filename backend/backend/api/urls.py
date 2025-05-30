from django.urls import path, include
from .views import (
    get_task_list,
    create_task,
    get_priority_list,
    get_task_by_id,
    delete_task,
    get_status,
    get_user,
    search_tasks,
    login,
    register,
)

urlpatterns = [
    path("login/", login, name="login"),
    path("register/", register, name="register"),
    path(
        "todos/",
        include(
            [
                path("", get_task_list, name="get-task-list"),
                path("<int:todo_id>/", get_task_by_id, name="get-task-by-id"),
                path(
                    "priority=<int:priority>/",
                    get_priority_list,
                    name="get-priority-list",
                ),
                path("search-tasks/", search_tasks, name="search-tasks"),
                path("status/", get_status, name="get-status"),
            ]
        ),
    ),
    path(
        "todo/",
        include(
            [
                path("", create_task, name="create-task"),
                path("<int:todo_id>/", delete_task, name="get-task-list"),
            ]
        ),
    ),
    path("user/", get_user, name="get-user-details"),
]

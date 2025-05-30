from django.contrib.auth.models import User
from rest_framework import serializers
from datetime import datetime, timezone
from .models import Task


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email")


class TaskSerializer(serializers.ModelSerializer):
    due_date = serializers.SerializerMethodField()
    is_completed = serializers.SerializerMethodField()
    author = UserSerializer(read_only=True)

    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = ("id", "author")

    def get_due_date(self, instance):
        if instance.due_date:
            dt = datetime.combine(
                instance.due_date, datetime.min.time(), tzinfo=timezone.utc
            )
            return dt.isoformat(timespec="seconds")
        return None

    def get_is_completed(self, obj):
        return obj.is_complete

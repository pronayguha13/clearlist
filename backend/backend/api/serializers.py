from rest_framework import serializers
from datetime import datetime, timezone
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    due_date = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = "__all__"

    def get_due_date(self, instance):
        if instance.due_date:
            dt = datetime.combine(instance.due_date, datetime.min.time(), tzinfo=timezone.utc)
            return dt.isoformat(timespec='seconds')
        return None

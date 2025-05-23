from django.db import models


# Create your models here.


class PriorityChoice(models.IntegerChoices):
    EXTREME = 1, "Extreme"
    MODERATE = 2, "Moderate"
    LOW = 3, "Low"


class StatusChoice(models.IntegerChoices):
    COMPLETE = 1, "Complete"
    IN_PROGRESS = 2, "In Progress"
    NOT_STARTED = 3, "Not Started"


class Task(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True, default=None)
    priority = models.IntegerField(
        choices=PriorityChoice.choices, default=PriorityChoice.LOW
    )
    status = models.IntegerField(
        choices=StatusChoice.choices, default=StatusChoice.NOT_STARTED
    )
    is_complete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

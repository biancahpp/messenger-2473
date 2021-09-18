from django.db import models
from django.db.models import Q, Count

from . import utils
from .user import User


class Conversation(utils.CustomModel):
    # a conversation can have many users
    senders = models.ManyToManyField(
        User, on_delete=models.CASCADE, related_name='conversations'
    )
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)

    # find conversation given all senders ids
    def find_conversation(sendersIds):
        # return conversation or None if it doesn't exist
        try:
            return Conversation.objects.annotate(num_correct_ids=Count('ids', filter=Q(ids__in=sendersIds))).filter(num_correct_ids=len(sendersIds))

        except Conversation.DoesNotExist:
            return None

from django.db import models
from django.db.models import Q, Count

from . import utils
from .user import User


class Conversation(utils.CustomModel):
    # a conversation can have many users
    members = models.ManyToManyField(
        User, on_delete=models.CASCADE, related_name='conversation_members'
    )
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)

    # find conversation given all members ids
    def find_conversation(membersIds):
        # return conversation or None if it doesn't exist
        try:
            return Conversation.objects.annotate(num_correct_ids=Count('ids', filter=Q(ids__in=membersIds))).filter(num_correct_ids=len(membersIds))

        except Conversation.DoesNotExist:
            return None

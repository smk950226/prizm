from rest_framework.permissions import IsAuthenticated

class AdminAuthenticated(IsAuthenticated):
    def has_permission(self, request, view):
        if request.user and request.user.is_authenticated:
            if request.user.user_type == 'photographer':
                return True
            else:
                return False
        else:
            return False
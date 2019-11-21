from rest_framework.pagination import PageNumberPagination

class MainPageNumberPagination(PageNumberPagination):
    page_size = 12

class MesssageNumberPagination(PageNumberPagination):
    page_size = 30
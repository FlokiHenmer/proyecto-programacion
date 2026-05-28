from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse

@api_view(['GET'])
def hola(request):
    return Response({
        'mensaje': 'Hola React!'
    })

def home(request):
    return HttpResponse("Django está funcionando correctamente 🚀")

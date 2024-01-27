
from .models import Lead
from cuenta.models import User
from .serializers import LeadListSerializer
from cuenta.serializers import UserSerializer

def my_scheduled_job():
  
  lead_queryset = Lead.objects.all()
  print("Se verifica que todos los leads cada 5 minutos", LeadListSerializer(lead_queryset, many = True).data)
  
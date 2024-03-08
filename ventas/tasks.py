from portillo_erp.celery import app

@app.task
def task_one():
    from .models import Lead, WhatsApp, Llamada, DesasignacionLeadAsesor

    lead_queryset = Lead.objects.filter(asignado=True,estado = 'A')
    whatsApp_queryset = WhatsApp.objects.filter(lead__in = lead_queryset.values_list('id', flat=True), asesor__in = lead_queryset.values_list('asesor', flat=True))
    llamada_queryset = Llamada.objects.filter(lead__in = lead_queryset.values_list('id', flat=True),  asesor__in = lead_queryset.values_list('asesor', flat=True))
    
    id_leadsTratados = []
    for i in lead_queryset:
       numWhatsappsYLlamadas = whatsApp_queryset.filter(lead = i, asesor = i.asesor).count() + llamada_queryset.filter(lead = i, asesor = i.asesor).count()
       if numWhatsappsYLlamadas > 0:
          id_leadsTratados.append(i.pk)
              
    leads_no_tratados = lead_queryset.exclude(id__in = id_leadsTratados)
    for i in leads_no_tratados:
      DesasignacionLeadAsesor.objects.create(lead=i, usuario = i.asesor)
    leads_no_tratados.update(asignado = False, asesor = None)


    print(leads_no_tratados)

    print("La tarea uno se ejecuta")
    with open('/home/briangv/ERP_PORTILLO/ERP_PORTILLO2/ERP_PORTILLO/portillo_erp/archivo.txt', 'a') as archivo:
      archivo.write("Esta es una nueva línea\n")
    

    return "success"

@app.task
def task_two(data, *args, **kwargs):
    print(f" task two called with the argument {data} and worker is running good")
    return "success"
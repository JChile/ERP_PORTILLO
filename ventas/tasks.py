from portillo_erp.celery import app

@app.task
def task_one():
    from .models import Lead, WhatsApp, Llamada
    from cuenta.models import User
    from itertools import chain

    lead_queryset = Lead.objects.filter(asignado=True,estado = 'A')
    asesor_queryset= User.objects.filter(id__in = lead_queryset.values_list('asesor', flat=True))
    whatsApp_queryset = WhatsApp.objects.filter(asesor__in = asesor_queryset.values_list('id', flat=True), lead__in = lead_queryset.values_list('id', flat=True))
    llamada_queryset = Llamada.objects.filter(asesor__in = asesor_queryset.values_list('id', flat=True), lead__in = lead_queryset.values_list('id', flat=True))
    queryset_combinado = list(chain(whatsApp_queryset.values_list('lead',flat=True) ,  llamada_queryset.values_list('lead',flat=True)))
    leads_no_tratados = lead_queryset.exclude(id__in = queryset_combinado)
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
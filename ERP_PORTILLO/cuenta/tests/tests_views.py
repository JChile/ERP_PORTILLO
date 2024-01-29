from django.test import TestCase

# Create your tests here.

from cuenta.models import *
from django.urls import reverse

class AuthorListViewTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Crear 13 autores para pruebas de paginación
        number_of_authors = 13
        for author_num in range(number_of_authors):
            User.objects.create(username = 'User%s' % author_num,password = 'User%s' % author_num,first_name='Christian %s' % author_num, last_name = 'Surname %s' % author_num,)

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/user/')
        print(resp)
        print(User.objects.all())
        self.assertEqual(resp.status_code, 200)


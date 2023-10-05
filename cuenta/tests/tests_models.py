from django.test import TestCase

# Create your tests here.

from cuenta.models import User

class AuthorModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Configurar objetos no modificados utilizados por todos los métodos de prueba
        User.objects.create(first_name='Big', last_name='Bob')

    def test_first_name_label(self):
        user=User.objects.get(id=1)
        field_label = user._meta.get_field('first_name').verbose_name
        self.assertEquals(field_label,'nombre')

    def test_date_of_death_label(self):
        user=User.objects.get(id=1)
        field_label = user._meta.get_field('last_name').verbose_name
        self.assertEquals(field_label,'apellidos')

    def test_first_name_max_length(self):
        author=User.objects.get(id=1)
        max_length = author._meta.get_field('first_name').max_length
        self.assertEquals(max_length,150)

    # def test_object_name_is_last_name_comma_first_name(self):
    #     user=User.objects.get(id=1)
    #     expected_object_name = '%s, %s' % (user.last_name, user.first_name)
    #     self.assertEquals(expected_object_name,str(user))

    # def test_get_absolute_url(self):
    #     author=User.objects.get(id=1)
    #     #Esto también fallará si la urlconf no está definida.
    #     self.assertEquals(author.get_absolute_url(),'/catalog/author/1')
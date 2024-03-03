#!/bin/bash


dropdb -h localhost -p 5432 -U postgres portillo_erp
createdb -h localhost -p 5432 -U postgres portillo_erp
psql -h localhost -p 5432 -U postgres --list


./fixapp.sh cuenta
./fixapp.sh ventas
./fixapp.sh marketing
./fixapp.sh multimedia


python manage.py makemigrations cuenta
python manage.py makemigrations marketing
python manage.py makemigrations ventas
python manage.py makemigrations multimedia
python manage.py migrate
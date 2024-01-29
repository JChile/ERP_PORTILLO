#!/bin/bash

# pg_dump -h localhost -p 5432 -U postgres -d portillo_erp -a -f portillo_erp.sql
# pg_restore -h localhost -p 5432 -U postgres -d portillo_erp -t cuenta_modulo portillo_erp.dump

export PGPASSWORD=123

dropdb -h db -p 5432 -U postgres portillo_erp_pro
createdb -h db -p 5432 -U postgres portillo_erp_pro
psql -h db -p 5432 -U postgres --list


./fixapp.sh cuenta
./fixapp.sh ventas
./fixapp.sh marketing
./fixapp.sh multimedia

python manage.py makemigrations cuenta
python manage.py makemigrations marketing
python manage.py makemigrations ventas
python manage.py makemigrations multimedia
python manage.py migrate


psql -h db -p 5432 -U postgres portillo_erp_pro -c "\dt"

psql -h db -p 5432 -U postgres -d portillo_erp_pro -a -f portillo_erp.sql


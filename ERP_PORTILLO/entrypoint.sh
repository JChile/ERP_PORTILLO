#!/bin/sh

export PGPASSWORD=123

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py flush --no-input

export PGPASSWORD=123

./database_linux.sh
psql -h db -p 5432 -U postgres -d portillo_erp_pro -a -f portillo_erp.sql
python manage.py makemigrations
python manage.py migrate


python manage.py makemigrations ventas
python manage.py migrate ventas 



exec "$@"




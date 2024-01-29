#!/bin/bash

# Capitulo 3:
# generalidades
# esquema de la propuesta
# componentes de la propuesta

if [ $# -eq 0 ]; then
  echo "Por favor, proporciona al menos un parámetro."
  exit 1
fi


app_name="$1"

echo $1

APP_NAME=$1 

MIGRATIONS_DIR="$APP_NAME/migrations"

# Eliminar las migraciones existentes
echo "Eliminando las migraciones existentes en $MIGRATIONS_DIR "
rm -f $MIGRATIONS_DIR/*.py
touch $MIGRATIONS_DIR/__init__.py
rm -f $MIGRATIONS_DIR/__pycache__/*.pyc
rm -f $APP_NAME/__pycache__/*.pyc
echo "cache eliminado correctamente"


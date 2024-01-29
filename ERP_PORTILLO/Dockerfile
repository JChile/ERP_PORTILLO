FROM python:3.11.4-slim-buster

WORKDIR /usr/src/ERP_PORTILLO

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y netcat
RUN apt-get update && apt-get install -y postgresql-client


RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY entrypoint.sh . 
RUN sed -i 's/\r$//g' entrypoint.sh
RUN chmod +x entrypoint.sh  

COPY . .


ENTRYPOINT ["./entrypoint.sh"]
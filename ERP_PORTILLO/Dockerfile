FROM python:3.11.4-slim-buster as builder

WORKDIR /usr/src/ERP_PORTILLO

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc

RUN pip install --upgrade pip
RUN pip install flake8==6.0.0
COPY . /usr/src/ERP_PORTILLO/

COPY ./requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/ERP_PORTILLO/wheels -r requirements.txt


FROM python:3.11.4-slim-buster

RUN mkdir -p /home/ERP_PORTILLO

RUN addgroup --system --force-badname ERP_PORTILLO && adduser --system --group --force-badname ERP_PORTILLO

 
ENV HOME=/home/ERP_PORTILLO
ENV APP_HOME=/home/ERP_PORTILLO/web
RUN mkdir $APP_HOME
RUN mkdir $APP_HOME/staticfiles
RUN mkdir $APP_HOME/mediafiles

RUN chown ERP_PORTILLO:ERP_PORTILLO $APP_HOME/staticfiles
RUN chown ERP_PORTILLO:ERP_PORTILLO $APP_HOME/mediafiles


WORKDIR $APP_HOME

RUN apt-get update && apt-get install -y --no-install-recommends netcat
RUN apt-get update && apt-get install -y postgresql-client

COPY --from=builder /usr/src/ERP_PORTILLO/wheels /wheels
COPY --from=builder /usr/src/ERP_PORTILLO/requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache /wheels/*

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g'  $APP_HOME/entrypoint.sh
RUN chmod +x  $APP_HOME/entrypoint.sh

COPY . $APP_HOME

RUN chown -R ERP_PORTILLO:ERP_PORTILLO $APP_HOME

USER ERP_PORTILLO

ENTRYPOINT ["/home/ERP_PORTILLO/web/entrypoint.sh"]


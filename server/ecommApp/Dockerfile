# Use an official Python runtime as a parent image
FROM python:3.12.2-slim-bullseye

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /ecomm

# Install dependencies
COPY requirements.txt /ecomm/requirements.txt

RUN apt-get update && apt-get install -y default-libmysqlclient-dev pkg-config gcc default-mysql-client && apt-get clean

RUN pip install -r requirements.txt

# Copy the project code into the container
COPY . /ecomm/

# Copy the wait-for-it script into the container
COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

EXPOSE 8000

CMD ["/bin/sh", "-c", "/wait-for-mysql.sh db python manage.py makemigrations && python manage.py migrate && python manage.py runserver"]
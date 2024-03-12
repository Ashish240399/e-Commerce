# Use an official Python runtime as a parent image

FROM python:3.10-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /ecomm

# Install dependencies
COPY requirements.txt /ecomm/
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config
RUN pip install --upgrade pip
RUN pip install -r requirements.txt


# Copy project
COPY . /ecomm/
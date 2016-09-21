FROM ubuntu
EXPOSE 80

RUN apt-get update
RUN apt-get install -y apache2
ADD . /var/www/html
CMD ["/usr/sbin/apache2ctl","-D","FOREGROUND"]

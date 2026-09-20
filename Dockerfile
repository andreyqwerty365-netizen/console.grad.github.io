FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html pslounge.html legal.html privacy.html terms.html styles.css script.js favicon.svg robots.txt sitemap.xml LICENSE.txt /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

EXPOSE 80

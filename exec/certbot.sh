docker run -it --rm --name cert_tmp -p 80:80 -v $(pwd)/docker/nginx/cert:/etc/letsencrypt certbot/certbot certonly -n --agree-tos --standalone -d k6s106.p.ssafy.io -m hjyoon314@gmail.com
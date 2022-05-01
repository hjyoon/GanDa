FROM node:16.15-alpine as builder
WORKDIR /app/frontend
COPY ./frontend .
RUN npm i
RUN npm run build
# ENTRYPOINT ["npx", "-y", "serve", "-l", "8000", "-s", "build", "-n"]

FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d
COPY --from=builder /app/frontend/build /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]
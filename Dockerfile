# build environment
FROM node:24-alpine as build
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/out /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

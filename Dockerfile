FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY public/ ./public
COPY src/ ./src

RUN npm run build

FROM nginx:alpine

# Install gettext for envsubst
RUN apk add --no-cache gettext

COPY --from=builder /app/build /usr/share/nginx/html

# Copy config.js from source (React doesn't always copy it during build)
COPY --from=builder /app/public/config.js /usr/share/nginx/html/config.js

# Copy config.js as template for envsubst
RUN cp /usr/share/nginx/html/config.js /usr/share/nginx/html/config.js.template

# Copy entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

# Set default API_URL (can be overridden by environment variable)
ENV API_URL=http://localhost:3001

ENTRYPOINT ["/docker-entrypoint.sh"]
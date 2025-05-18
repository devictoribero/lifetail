FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma client
RUN npm run prisma:generate

RUN npm run build

# Add a wait script to ensure DB is ready
RUN echo '#!/bin/sh \n\
timeout=60 \n\
while ! nc -z "$DB_HOST" "$DB_PORT"; do \n\
  timeout=$((timeout-1)) \n\
  if [ "$timeout" -eq 0 ]; then \n\
    echo "Timed out waiting for DB at $DB_HOST:$DB_PORT" \n\
    exit 1 \n\
  fi \n\
  echo "Waiting for DB at $DB_HOST:$DB_PORT... ($timeout remaining)" \n\
  sleep 1 \n\
done \n\
echo "Database connection confirmed" \n\
exec "$@"' > /usr/src/app/wait-for-db.sh && chmod +x /usr/src/app/wait-for-db.sh

# Development stage executable
CMD ["npm", "run", "start:dev"]

FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/generated ./generated
# Copy Prisma schema and client
COPY --from=development /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=development /usr/src/app/wait-for-db.sh ./wait-for-db.sh

EXPOSE 3000

CMD ["node", "dist/src/server/main"]
FROM node:20.10.0-alpine AS builder
ENV NODE_ENV=production

# Installer PNPM
RUN npm install -g pnpm@latest

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build



FROM node:20.10.0-alpine AS runner

# Installer PNPM dans l'image runner
RUN npm install -g pnpm@latest

WORKDIR /app

# Copier les fichiers nécessaires pour l'exécution de l'application
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Installer uniquement les dépendances de production
RUN pnpm install --frozen-lockfile --prod
RUN pnpm store prune

EXPOSE 3000

# Définir les variables d'environnement pour l'exécution
ENV NODE_ENV=production

CMD ["pnpm", "start"]

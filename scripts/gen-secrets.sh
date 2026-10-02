#!/bin/sh
# Prints freshly generated secret lines for .env. Paste them over the empty values in .env.example.
set -e
rand() { openssl rand -base64 "$1" | tr -d '\n'; }
pw() { openssl rand -base64 "$1" | tr -d '\n/+='; }

echo "DATABASE_PASSWORD=$(pw 32)"
echo "APP_KEYS=$(rand 16),$(rand 16),$(rand 16),$(rand 16)"
echo "API_TOKEN_SALT=$(rand 16)"
echo "ADMIN_JWT_SECRET=$(rand 16)"
echo "TRANSFER_TOKEN_SALT=$(rand 16)"
echo "JWT_SECRET=$(rand 16)"

#!/usr/bin/env ts-node

/**
 * Helper script for common Prisma tasks
 * Usage: ts-node prisma.ts <command>
 *
 * Commands:
 *   generate - Generate Prisma client
 *   migrate  - Run migrations in dev mode
 *   deploy   - Deploy migrations to production
 *   studio   - Open Prisma Studio
 */

import { spawn, SpawnOptions } from 'child_process';
import path from 'path';

const SCHEMA_PATH = path.join(__dirname, 'src', 'server', 'prisma', 'schema.prisma');

type PrismaCommand = 'generate' | 'migrate' | 'deploy' | 'studio';

const commands: Record<PrismaCommand, string[]> = {
  generate: ['generate', `--schema=${SCHEMA_PATH}`],
  migrate: ['migrate', 'dev', `--schema=${SCHEMA_PATH}`],
  deploy: ['migrate', 'deploy', `--schema=${SCHEMA_PATH}`],
  studio: ['studio', `--schema=${SCHEMA_PATH}`],
};

const command = process.argv[2] as PrismaCommand;

if (!command || !commands[command]) {
  console.error(`
    Please provide a valid command: generate, migrate, deploy, or studio
    Example: ts-node prisma.ts generate
  `);
  process.exit(1);
}

const spawnOptions: SpawnOptions = {
  stdio: 'inherit',
  shell: true,
};

const prisma = spawn('npx', ['prisma', ...commands[command]], spawnOptions);

prisma.on('close', (code: number) => {
  process.exit(code || 0);
});

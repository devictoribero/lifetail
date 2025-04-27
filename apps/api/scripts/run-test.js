#!/usr/bin/env node

/**
 * Script helper para ejecutar tests individuales con argumentos adicionales
 * Uso: node scripts/run-test.js <archivo> [otros argumentos]
 * Ejemplo: node scripts/run-test.js PetLifeMoment.spec.ts --coverage
 */

import { spawnSync } from 'child_process';
import path from 'path';

// Obtenemos los argumentos
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Error: Debes especificar un archivo de test');
  process.exit(1);
}

// El primer argumento es el nombre del archivo
const fileName = args[0];
// Resto de argumentos son pasados a Jest
const jestArgs = args.slice(1);

// Construir el patrón para buscar el archivo en el directorio src
const testPattern = `src/**/${fileName}`;

// Ejecutar Jest con el patrón y los argumentos adicionales
const result = spawnSync('jest', [testPattern, ...jestArgs], {
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status);
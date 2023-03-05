// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.

import { PrismaClient } from '@prisma/client'

import { emitLogLevels, handlePrismaLogging } from '@redwoodjs/api/logger'

import { logger } from './logger'

/*
 * Instance of the Prisma Client
 */
export const db = new PrismaClient({
  log: emitLogLevels(['info', 'warn', 'error']),
})

/**
 * Abstracting it to make it future proof.
 * If in the future we change our database, then we can just change the conversion here.
 *
 * @param graphqlID - graphql ID type will always a string
 * @returns integer because postgresql ID is an integer
 */
export function dbID(graphqlID: string) {
  return parseInt(graphqlID)
}

handlePrismaLogging({
  db,
  logger,
  logLevels: ['info', 'warn', 'error'],
})

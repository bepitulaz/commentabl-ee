import { RedwoodGraphQLError } from '@redwoodjs/graphql-server'

export class DBRecordError extends RedwoodGraphQLError {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message, extensions)
  }
}

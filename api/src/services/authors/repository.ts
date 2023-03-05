import { db, dbID } from 'src/lib/db'

export function findAuthorBy(filter) {
  return db.author.findFirst({
    where: filter,
  })
}

export function findOwnerDetailById(ownerId: string) {
  return db.user.findUnique({
    where: {
      id: dbID(ownerId),
    },
  })
}

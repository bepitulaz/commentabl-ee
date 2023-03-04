import { db } from 'src/lib/db'

export function findAuthorBy(filter) {
  return db.author.findFirst({
    where: filter,
  })
}

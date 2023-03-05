import { GlobalContext } from '@redwoodjs/graphql-server'

import { db, dbID } from 'src/lib/db'
import { DBRecordError } from 'src/lib/errorHelper'

export function findWebsites(context: GlobalContext) {
  return db.website.findMany({
    where: {
      ownerId: context.currentUser.id,
    },
  })
}

export async function findWebsiteBy(filter) {
  const website = await db.website.findFirst({
    where: filter,
  })

  if (!website) {
    throw new DBRecordError("There's nothing to show.")
  }

  return website
}

export function createWebsite(input, context: GlobalContext) {
  return db.website.create({
    data: {
      ...input,
      ownerId: context.currentUser.id,
    },
  })
}

export function updateByWebsiteId(websiteId: string, input) {
  return db.website.update({
    data: {
      ...input,
      updatedAt: new Date(),
    },
    where: { id: dbID(websiteId) },
  })
}

export function deleteByWebsiteId(websiteId: string) {
  return db.website.delete({
    where: { id: dbID(websiteId) },
  })
}

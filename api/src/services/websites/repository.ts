import { GlobalContext } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
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

export function updateByWebsiteId(websiteId: number, input) {
  return db.website.update({
    data: {
      ...input,
      updatedAt: new Date(),
    },
    where: { id: websiteId },
  })
}

export function deleteByWebsiteId(websiteId: number) {
  return db.website.delete({
    where: { id: websiteId },
  })
}

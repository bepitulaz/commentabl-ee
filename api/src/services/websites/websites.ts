import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { DBRecordError } from 'src/lib/errorHelper'

export const websites: QueryResolvers['websites'] = () => {
  return db.website.findMany()
}

export const website: QueryResolvers['website'] = async ({ id }) => {
  const website = await db.website.findUnique({
    where: { id },
  })

  if (!website) {
    throw new DBRecordError("There's nothing to show.")
  }

  return website
}

export const createWebsite: MutationResolvers['createWebsite'] = ({
  input,
}) => {
  return db.website.create({
    data: {
      ...input,
      ownerId: context.currentUser.id,
    },
  })
}

export const updateWebsite: MutationResolvers['updateWebsite'] = ({
  id,
  input,
}) => {
  return db.website.update({
    data: {
      ...input,
      updatedAt: new Date(),
    },
    where: { id },
  })
}

export const deleteWebsite: MutationResolvers['deleteWebsite'] = ({ id }) => {
  return db.website.delete({
    where: { id },
  })
}

import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const websites: QueryResolvers['websites'] = () => {
  return db.website.findMany()
}

export const website: QueryResolvers['website'] = ({ id }) => {
  return db.website.findUnique({
    where: { id },
  })
}

export const createWebsite: MutationResolvers['createWebsite'] = ({
  input,
}) => {
  return db.website.create({
    data: input,
  })
}

export const updateWebsite: MutationResolvers['updateWebsite'] = ({
  id,
  input,
}) => {
  return db.website.update({
    data: input,
    where: { id },
  })
}

export const deleteWebsite: MutationResolvers['deleteWebsite'] = ({ id }) => {
  return db.website.delete({
    where: { id },
  })
}

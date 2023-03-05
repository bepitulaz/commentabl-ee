import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { dbID } from 'src/lib/db'

import * as Repository from './repository'

export const websites: QueryResolvers['websites'] = () => {
  return Repository.findWebsites(context)
}

export const website: QueryResolvers['website'] = async ({ id }) => {
  const websiteId = dbID(id)
  return Repository.findWebsiteBy({ id: websiteId })
}

export const createWebsite: MutationResolvers['createWebsite'] = ({
  input,
}) => {
  return Repository.createWebsite(input, context)
}

export const updateWebsite: MutationResolvers['updateWebsite'] = ({
  id,
  input,
}) => {
  return Repository.updateByWebsiteId(id, input)
}

export const deleteWebsite: MutationResolvers['deleteWebsite'] = ({ id }) => {
  return Repository.deleteByWebsiteId(id)
}

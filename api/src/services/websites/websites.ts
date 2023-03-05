import { dbID } from 'src/lib/db'

import * as Repository from './repository'

export const websites = () => {
  return Repository.findWebsites(context)
}

export const website = async ({ id }) => {
  const websiteId = dbID(id)
  return Repository.findWebsiteBy({ id: websiteId })
}

export const createWebsite = ({ input }) => {
  return Repository.createWebsite(input, context)
}

export const updateWebsite = ({ id, input }) => {
  return Repository.updateByWebsiteId(id, input)
}

export const deleteWebsite = ({ id }) => {
  return Repository.deleteByWebsiteId(id)
}

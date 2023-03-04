import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { DBRecordError } from 'src/lib/errorHelper'
import * as AuthorRepository from 'src/services/authors/repository'
import * as WebsiteRepository from 'src/services/websites/repository'

import * as Repository from './repository'

export const comments: QueryResolvers['comments'] = ({ websiteId }) => {
  return Repository.findCommentsByWebsiteId(websiteId, context)
}

export const comment: QueryResolvers['comment'] = ({ id }) => {
  return Repository.findCommentById(id)
}

export const publicComments: QueryResolvers['publicComments'] = ({ link }) => {
  return Repository.findCommentsByLink(link)
}

export const createComment: MutationResolvers['createComment'] = ({
  input,
}) => {
  return Repository.createComment(input)
}

export const updateComment: MutationResolvers['updateComment'] = ({
  id,
  input,
}) => {
  return Repository.updateByCommentId(id, input)
}

export const deleteComment: MutationResolvers['deleteComment'] = ({ id }) => {
  return Repository.deleteByCommentId(id)
}

export const publicCreateComment: MutationResolvers['publicCreateComment'] =
  async ({ input }) => {
    const url = new URL(input.link)
    let hostname = url.hostname

    // If the hostname is localhost, then we append it with its port.
    if (hostname === 'localhost') {
      hostname = `${hostname}:${url.port}`
    }

    const website = await WebsiteRepository.findWebsiteBy({
      domain: hostname,
    })

    if (!website) {
      throw new DBRecordError(
        `Operation is canceled. We can't find ${hostname} in our record.`
      )
    }

    const author = await AuthorRepository.findAuthorBy({
      email: input.authorEmail,
      websiteId: website.id,
    })

    // When author doesn't exist for this domain, then create comment and create a new author.
    if (!author) {
      return Repository.createComment({
        websiteId: website.id,
        link: input.link,
        message: input.comment,
        ...(input.parentCommentId && { parentId: input.parentCommentId }),
        authors: {
          create: [
            {
              createdBy: input.authorEmail ?? input.authorName,
              createdAt: new Date(),
              author: {
                create: {
                  name: input.authorName,
                  ...(input.authorEmail && { email: input.authorEmail }),
                  websiteId: website.id,
                },
              },
            },
          ],
        },
      })
    }

    // Otherwise, we will just connect the comment to the existing author.
    return Repository.createComment({
      data: {
        websiteId: website.id,
        link: input.link,
        message: input.comment,
        ...(input.parentCommentId && { parentId: input.parentCommentId }),
        authors: {
          create: [
            {
              createdBy: author.email ?? author.name,
              createdAt: new Date(),
              author: {
                connect: {
                  id: author.id,
                },
              },
            },
          ],
        },
      },
    })
  }

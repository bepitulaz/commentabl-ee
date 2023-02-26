import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { DBRecordError } from 'src/lib/errorHelper'

export const comments: QueryResolvers['comments'] = async ({ websiteId }) => {
  const comments = await db.comment.findMany({
    where: {
      website: {
        id: websiteId,
        ownerId: context.currentUser.id,
      },
    },
    include: {
      authors: {
        include: {
          author: true,
        },
      },
    },
  })

  if (comments.length === 0) {
    throw new DBRecordError('No data to show')
  }

  return comments
}

export const comment: QueryResolvers['comment'] = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
  })
}

export const createComment: MutationResolvers['createComment'] = ({
  input,
}) => {
  return db.comment.create({
    data: input,
  })
}

export const updateComment: MutationResolvers['updateComment'] = ({
  id,
  input,
}) => {
  return db.comment.update({
    data: input,
    where: { id },
  })
}

export const deleteComment: MutationResolvers['deleteComment'] = ({ id }) => {
  return db.comment.delete({
    where: { id },
  })
}

export const publicCreateComment: MutationResolvers['publicCreateComment'] =
  async ({ input }) => {
    const url = new URL(input.link)
    let hostname = url.hostname

    // If the hostname is localhost, then we append it with its port.
    if (hostname === 'localhost') {
      hostname = `${hostname}:${url.port}`
    }

    const website = await db.website.findFirst({
      where: {
        domain: hostname,
      },
    })

    if (!website) {
      throw new DBRecordError(
        `Operation is canceled. We can't find ${hostname} in our record.`
      )
    }

    const author = await db.author.findFirst({
      where: {
        email: input.authorEmail,
        websiteId: website.id,
      },
    })

    // When author doesn't exist for this domain, then create comment and create a new author.
    if (!author) {
      return db.comment.create({
        data: {
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
        },
      })
    }

    // Otherwise, we will just connect the comment to the existing author.
    return db.comment.create({
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

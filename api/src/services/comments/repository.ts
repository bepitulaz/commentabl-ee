import { GlobalContext } from '@redwoodjs/graphql-server'

import { db, dbID } from 'src/lib/db'
import { DBRecordError } from 'src/lib/errorHelper'

export async function findCommentsByWebsiteId(
  websiteId: string,
  context: GlobalContext
) {
  const comments = await db.comment.findMany({
    where: {
      website: {
        id: dbID(websiteId),
        ownerId: context.currentUser.id,
      },
      parentId: null,
    },
    orderBy: {
      createdAt: 'desc',
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

export function findCommentsByLink(link: string) {
  return db.comment.findMany({
    where: {
      link,
      isPublished: true,
      isSpam: false,
      isDeleted: false,
      parentId: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      authors: {
        include: {
          author: true,
        },
      },
    },
  })
}

export function findCommentById(commentId: string) {
  return db.comment.findUnique({
    where: { id: dbID(commentId) },
  })
}

export function findCommentsByParentId(parentId: string) {
  return db.comment.findMany({
    where: {
      parentId: dbID(parentId),
    },
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      authors: {
        include: {
          author: true,
        },
      },
    },
  })
}

export function writeComment(input) {
  const dataInput = {
    ...input,
    ...('websiteId' in input && { websiteId: dbID(input.websiteId) }),
    ...('parentId' in input && { parentId: dbID(input.parentId) }),
    ...('createdBy' in input && { createdBy: dbID(input.createdBy) }),
  }

  return db.comment.create({
    data: { ...dataInput },
  })
}

export function updateByCommentId(commentId: string, input) {
  return db.comment.update({
    data: {
      ...input,
      updatedAt: new Date(),
    },
    where: { id: dbID(commentId) },
  })
}

export function deleteByCommentId(commentId: string) {
  return db.comment.delete({
    where: { id: dbID(commentId) },
  })
}

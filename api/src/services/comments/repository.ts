import { UpdateCommentInput } from 'types/graphql'

import { GlobalContext } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { DBRecordError } from 'src/lib/errorHelper'

export async function findCommentsByWebsiteId(
  websiteId: number,
  context: GlobalContext
) {
  const comments = await db.comment.findMany({
    where: {
      website: {
        id: websiteId,
        ownerId: context.currentUser.id,
      },
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

export function findCommentById(commentId: number) {
  return db.comment.findUnique({
    where: { id: commentId },
  })
}

export function createComment(input) {
  return db.comment.create({
    data: input,
  })
}

export function updateByCommentId(
  commentId: number,
  input: UpdateCommentInput
) {
  return db.comment.update({
    data: {
      ...input,
      updatedAt: new Date(),
    },
    where: { id: commentId },
  })
}

export function deleteByCommentId(commentId: number) {
  return db.comment.delete({
    where: { id: commentId },
  })
}

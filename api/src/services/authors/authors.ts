import { db } from 'src/lib/db'

export const authors = () => {
  return db.author.findMany()
}

export const author = ({ id }) => {
  return db.author.findUnique({
    where: { id },
  })
}

export const createAuthor = ({ input }) => {
  return db.author.create({
    data: input,
  })
}

export const updateAuthor = ({ id, input }) => {
  return db.author.update({
    data: input,
    where: { id },
  })
}

export const deleteAuthor = ({ id }) => {
  return db.author.delete({
    where: { id },
  })
}

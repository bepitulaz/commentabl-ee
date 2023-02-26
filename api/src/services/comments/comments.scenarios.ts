import type { Prisma, Comment } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    one: {
      data: {
        link: 'String',
        message: 'String',
        website: {
          create: {
            domain: 'String',
            owner: {
              create: {
                email: 'String1622789',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        link: 'String',
        message: 'String',
        website: {
          create: {
            domain: 'String',
            owner: {
              create: {
                email: 'String5929673',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Comment, 'comment'>

import type { Prisma, Author } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AuthorCreateArgs>({
  author: {
    one: {
      data: {
        name: 'String',
        website: {
          create: {
            domain: 'String',
            owner: {
              create: {
                email: 'String9672013',
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
        name: 'String',
        website: {
          create: {
            domain: 'String',
            owner: {
              create: {
                email: 'String494648',
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

export type StandardScenario = ScenarioData<Author, 'author'>

import type { Prisma, Website } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.WebsiteCreateArgs>({
  website: {
    one: { data: { domain: 'String' } },
    two: { data: { domain: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Website, 'website'>

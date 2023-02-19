import type { Website } from '@prisma/client'

import {
  websites,
  website,
  createWebsite,
  updateWebsite,
  deleteWebsite,
} from './websites'
import type { StandardScenario } from './websites.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('websites', () => {
  scenario('returns all websites', async (scenario: StandardScenario) => {
    const result = await websites()

    expect(result.length).toEqual(Object.keys(scenario.website).length)
  })

  scenario('returns a single website', async (scenario: StandardScenario) => {
    const result = await website({ id: scenario.website.one.id })

    expect(result).toEqual(scenario.website.one)
  })

  scenario('creates a website', async () => {
    const result = await createWebsite({
      input: { domain: 'String' },
    })

    expect(result.domain).toEqual('String')
  })

  scenario('updates a website', async (scenario: StandardScenario) => {
    const original = (await website({ id: scenario.website.one.id })) as Website
    const result = await updateWebsite({
      id: original.id,
      input: { domain: 'String2' },
    })

    expect(result.domain).toEqual('String2')
  })

  scenario('deletes a website', async (scenario: StandardScenario) => {
    const original = (await deleteWebsite({
      id: scenario.website.one.id,
    })) as Website
    const result = await website({ id: original.id })

    expect(result).toEqual(null)
  })
})

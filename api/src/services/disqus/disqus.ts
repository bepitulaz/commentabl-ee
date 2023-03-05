import fs from 'node:fs'
import path from 'node:path'

import { XMLParser } from 'fast-xml-parser'

function readDisqusXML() {
  const data = fs.readFileSync(
    path.join(__dirname, '../../../../sample-data/disqus.xml'),
    'utf8'
  )
  const buffer = Buffer.from(data, 'utf-8')
  return buffer.toString()
}

export const readXML = () => {
  const parser = new XMLParser()

  const xmlData = readDisqusXML()
  const parsedData = parser.parse(xmlData)
  return parsedData.disqus
}

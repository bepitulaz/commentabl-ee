import WebsiteCell from 'src/components/Website/WebsiteCell'

type WebsitePageProps = {
  id: number
}

const WebsitePage = ({ id }: WebsitePageProps) => {
  return <WebsiteCell id={id} />
}

export default WebsitePage

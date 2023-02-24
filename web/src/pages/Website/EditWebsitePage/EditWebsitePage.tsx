import EditWebsiteCell from 'src/components/Website/EditWebsiteCell'

type WebsitePageProps = {
  id: number
}

const EditWebsitePage = ({ id }: WebsitePageProps) => {
  return <EditWebsiteCell id={id} />
}

export default EditWebsitePage

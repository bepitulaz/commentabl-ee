export const schema = gql`
  type Disqus {
    category: DisqusCategory
    thread: [DisqusThread]
    post: [DisqusPost]
  }

  type DisqusCategory {
    forum: String
    title: String
    isDefault: Boolean
  }

  type DisqusThread {
    id: String
    forum: String
    category: String
    link: String
    title: String
    message: String
    createdAt: String
    isClosed: Boolean
    isDeleted: Boolean
    author: DisqusAuthor
  }

  type DisqusPost {
    id: String
    message: String
    createdAt: String
    isDeleted: Boolean
    isSpam: Boolean
    thread: String
    author: DisqusAuthor
  }

  type DisqusAuthor {
    name: String
    username: String
    isAnonymous: Boolean
  }

  type Query {
    readXML: Disqus @requireAuth
  }
`

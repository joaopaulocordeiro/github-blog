import { useCallback, useEffect, useState } from 'react'
import { Spinner } from '../../components/Spinner'
import { api } from '../../lib/axios'
import { Post } from './components/Post'
import { Profile } from './components/Profile'
import { SearchInput } from './components/SearchInput'
import { PostListContainer } from './styles'

const username = import.meta.env.VITE_GITHUB_USERNAME
const reponame = import.meta.env.VITE_GITHUB_REPONAME

export interface iPost {
  title: string
  body: string
  created_at: string
  number: number
  html_url: string
  comments: string
  user: {
    login: string
  }
}

export function Blog() {
  const [posts, setPosts] = useState<iPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const postsLength = posts.length

  const getPosts = useCallback(
    async (query: string = '') => {
      try {
        setIsLoading(true)
        const response = await api.get(
          `/search/issues?q=${query}%20repo:${username}/${reponame}`,
        )

        setPosts(response.data.items)
      } finally {
        setIsLoading(false)
      }
    },
    [posts],
  )

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <Profile />
      <SearchInput postsLength={postsLength} getPosts={getPosts} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <PostListContainer>
            {posts.map((post) => (
              <Post key={post.number} post={post} />
            ))}
          </PostListContainer>
        </>
      )}
    </>
  )
}

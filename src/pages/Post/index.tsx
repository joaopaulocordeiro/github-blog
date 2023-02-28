import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../lib/axios'
import { iPost } from '../Blog'
import { PostHeader } from './components/PostHeader'

const username = import.meta.env.VITE_GITHUB_USERNAME
const reponame = import.meta.env.VITE_GITHUB_REPONAME

export function Post() {
  const [postData, setPostData] = useState<iPost>({} as iPost)
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams()

  const getPostDetails = useCallback(async () => {
    try {
      setIsLoading(true)

      const response = await api.get(
        `/repos/${username}/${reponame}/issues/${id}`,
      )
      setPostData(response.data)
    } finally {
      setIsLoading(false)
    }
  }, [postData])

  useEffect(() => {
    getPostDetails()
  }, [])

  return (
    <>
      <PostHeader isLoading={isLoading} postData={postData} />
    </>
  )
}

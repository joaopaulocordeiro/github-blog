import { ExternalLink } from '../../../../components/ExternalLink'
import { PostHeaderContainer } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faCalendar,
  faChevronLeft,
  faComment,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { iPost } from '../../../Blog'
import { Spinner } from '../../../../components/Spinner'
import { relativeDateFormatter } from '../../../../utils/formatter'

interface PostHeaderProps {
  postData: iPost
  isLoading: boolean
}

export function PostHeader({ postData, isLoading }: PostHeaderProps) {
  const navigate = useNavigate()

  const formattedDate = relativeDateFormatter(postData?.created_at)

  function goBack() {
    navigate(-1)
  }

  return (
    <PostHeaderContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <header>
            <ExternalLink
              as="button"
              onClick={goBack}
              icon={<FontAwesomeIcon icon={faChevronLeft} />}
              text="Voltar"
              variant="iconLeft"
            />
            <ExternalLink
              text="Ver no Github"
              href={postData.html_url}
              target="_blank"
            />
          </header>
          <h1>{postData.title}</h1>
          <ul>
            <ul>
              <li>
                <FontAwesomeIcon icon={faGithub} />
                {postData.user.login}
              </li>
              <li>
                <FontAwesomeIcon icon={faCalendar} />
                {formattedDate}
              </li>
              <li>
                <FontAwesomeIcon icon={faComment} />
                {postData.comments} comentários
              </li>
            </ul>
          </ul>
        </>
      )}
    </PostHeaderContainer>
  )
}

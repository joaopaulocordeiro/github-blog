import { HeaderContainer } from './styles'
import logoBlog from '../../assets/logoBlog.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoBlog} alt="" />
    </HeaderContainer>
  )
}

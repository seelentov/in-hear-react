import { HREF } from 'config/routing.config'
import Hamburger from 'hamburger-react'
import { useActions } from 'hooks/useActions'
import { useDebounce } from 'hooks/useDebounce'
import { useIsAuth } from 'hooks/useIsAuth'
import { useResize } from 'hooks/useResize'
import { useStoreBy } from 'hooks/useStoreBy'
import { FC, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../../ui/Input/Input'
import styles from './Header.module.scss'

export interface IHeaderProps { }

export const Header: FC<IHeaderProps> = () => {
  const { isMenuOpen, filter } = useStoreBy('ui')
  const { isScreenLg } = useResize()
  const { toggleMenu, setFilter } = useActions()
  const { avatarUrl } = useStoreBy('user')

  const filterDebounce = useDebounce(filter, 1000)

  const navigate = useNavigate()
  const isAuth = useIsAuth()

  useEffect(() => {
    if (filter.length > 0) {
      navigate(HREF.SEARCH)
    }
  }, [filterDebounce])

  const ButtonHamburger = () => <>{!isScreenLg && (
    <div className={styles.burgerBtn} onClick={() => toggleMenu()}>
      <Hamburger
        toggled={isMenuOpen}
        color={'var(--color-secondary)'}
        size={35}
      />
    </div>
  )}</>

  const UserAvatar = () => <>
    {isScreenLg && (
      <div className={styles.userImage}>
        {isAuth ? (
          <img src={avatarUrl} />
        ) : (
          <div className={styles.link}>
            <Link to={HREF.LOGIN}>
              Sign
              <br />
              In
            </Link>
          </div>
        )}
      </div>
    )}</>

  return (
    <div className={styles.header}>
      <ButtonHamburger />

      <Input
        value={filter}
        name='search'
        icon={<CiSearch />}
        placeholder='Search artist, track, playlist...'
        onChange={(e) => setFilter(e.target.value)}
      />

      <UserAvatar />
    </div>
  )
}



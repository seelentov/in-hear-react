import { HREF } from 'config/routing.config'
import Hamburger from 'hamburger-react'
import { useActions } from 'hooks/useActions'
import { useIsAuth } from 'hooks/useIsAuth'
import { useResize } from 'hooks/useResize'
import { useStoreBy } from 'hooks/useStoreBy'
import { FC } from 'react'
import { CiSearch } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { Input } from '../../ui/Input/Input'
import styles from './Header.module.scss'

export interface IHeaderProps {}

export const Header: FC<IHeaderProps> = () => {
	const { isMenuOpen } = useStoreBy('ui')
	const { isScreenLg } = useResize()
	const { toggleMenu } = useActions()
  const {avatarUrl} = useStoreBy('user')

	const isAuth = useIsAuth()

	return (
		<div className={styles.header}>
			{!isScreenLg && (
				<div className={styles.burgerBtn} onClick={() => toggleMenu()}>
					<Hamburger
						toggled={isMenuOpen}
						color={'var(--color-secondary)'}
						size={35}
					/>
				</div>
			)}
			<form>
				<Input
					name='search'
					icon={<CiSearch />}
					placeholder='Search artist, track, playlist...'
				/>
			</form>
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
			)}
		</div>
	)
}

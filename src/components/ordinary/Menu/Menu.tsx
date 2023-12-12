import { MenuItem } from 'components/simple/MenuItem/MenuItem'
import { MenuSection } from 'components/simple/MenuSection/MenuSection'
import { MENU } from 'config/menu.config'
import { HREF } from 'config/routing.config'
import { useActions } from 'hooks/useActions'
import { useIsAuth } from 'hooks/useIsAuth'
import { FC } from 'react'
import { IoLogInSharp, IoLogOutSharp } from 'react-icons/io5'
import styles from './Menu.module.scss'

export interface IMenuProps {
	menu: MENU
}

export const Menu: FC<IMenuProps> = ({ menu }) => {
	const { toggleMenu } = useActions()
	const { logout } = useActions()
	const isAuth = useIsAuth()
	return (
		<nav className={styles.menu} onClick={() => toggleMenu()}>
			{menu.map(({ name, links }) => (
				<MenuSection key={name} name={name} links={links} />
			))}

			{isAuth ? (
				<MenuItem
					icon={<IoLogOutSharp />}
					name='Logout'
					onClick={() => logout()}
				/>
			) : (
				<MenuItem icon={<IoLogInSharp />} name='Sign In' href={HREF.LOGIN} />
			)}
		</nav>
	)
}

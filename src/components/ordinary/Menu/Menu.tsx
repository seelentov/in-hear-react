import { MenuSection } from 'components/simple/MenuSection/MenuSection'
import { MENU } from 'config/menu.config'
import { FC } from 'react'
import styles from './Menu.module.scss'
import { useActions } from 'hooks/useActions'

export interface IMenuProps {
	menu: MENU
}

export const Menu: FC<IMenuProps> = ({ menu }) => {
	const { toggleMenu } = useActions()

	return (
		<nav className={styles.menu} onClick={() => toggleMenu()}>
			{menu.map(({ name, links }) => (
				<MenuSection key={name} name={name} links={links} />
			))}
		</nav>
	)
}

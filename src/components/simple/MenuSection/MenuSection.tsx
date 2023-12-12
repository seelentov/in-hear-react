import { MenuItem } from 'components/simple/MenuItem/MenuItem'
import { MenuLink } from 'config/menu.config'
import { useIsAuth } from 'hooks/useIsAuth'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './MenuSection.module.scss'

export interface IMenuSectionProps {
	name?: string
	links: MenuLink[]
}

export const MenuSection: FC<IMenuSectionProps> = ({ links, name }) => {
	const { pathname } = useLocation()
	const isAuth = useIsAuth()

	if (name === 'Library') {
		return (
			<>
				{isAuth && (
					<div className={styles.menuSection}>
						{name && <p className={styles.header}>{name}</p>}
						<ul className={styles.items}>
							{links.map(({ href, icon, name }) => {
								return (
									<li key={name}>
										<MenuItem
											href={href}
											icon={icon}
											name={name}
											active={href === pathname}
										/>
									</li>
								)
							})}
						</ul>
					</div>
				)}
			</>
		)
	}

	return (
		<div className={styles.menuSection}>
			{name && <p className={styles.header}>{name}</p>}
			<ul className={styles.items}>
				{links.map(({ href, icon, name }) => {
					return (
						<li key={name}>
							<MenuItem
								href={href}
								icon={icon}
								name={name}
								active={href === pathname}
							/>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

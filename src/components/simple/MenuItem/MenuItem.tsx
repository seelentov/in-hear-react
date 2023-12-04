import cn from 'classnames'
import { FC, ReactNode, memo } from 'react'
import { Link } from 'react-router-dom'
import styles from './MenuItem.module.scss'

export interface IMenuItemProps {
	icon?: ReactNode
	name: string
	href: string
	active?: boolean
}

export const MenuItem: FC<IMenuItemProps> = memo(
	({ icon, name, active, href }) => {
		return (
			<li>
				<Link
					to={href}
					key={name}
					className={cn(active && styles.active, styles.menuItem)}
				>
					{icon && <div className={styles.icon}>{icon}</div>}
					<p>{name}</p>
				</Link>
			</li>
		)
	}
)

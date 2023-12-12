import cn from 'classnames'
import { Menu } from 'components/ordinary/Menu/Menu'
import { Logo } from 'components/ui/Logo/Logo'
import { MENU } from 'config/menu.config'
import { useResize } from 'hooks/useResize'
import { useStoreBy } from 'hooks/useStoreBy'
import { FC } from 'react'
import styles from './Aside.module.scss'

export interface IAsideProps {}

export const Aside: FC<IAsideProps> = () => {
	const { isMenuOpen } = useStoreBy('ui')
	const { isScreenLg } = useResize()

	return (
		<div
			className={cn(styles.aside, (isMenuOpen || isScreenLg) && styles.active)}
		>
			<Logo />

			<Menu menu={MENU} />
		</div>
	)
}

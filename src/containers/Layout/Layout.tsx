import cn from 'classnames'
import { Aside } from 'components/smart/Aside/Aside'
import { Header } from 'components/smart/Header/Header'
import { Player } from 'components/smart/Player/Player'
import { useResize } from 'hooks/useResize'
import { useStoreBy } from 'hooks/useStoreBy'
import { FC, PropsWithChildren } from 'react'
import styles from './Layout.module.scss'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
	const { isMenuOpen } = useStoreBy('ui')
	const { isScreenLg } = useResize()
	return (
		<div className={cn(styles.body, 'theme--white')}>
			<Aside />
			<div
				className={cn(
					styles.wrapper,
					(isMenuOpen || isScreenLg) && styles.wrapperTranslation,
				)}
			>
				<Header />
				<div className={styles.main}>{children}</div>
				<Player />
			</div>
		</div>
	)
}

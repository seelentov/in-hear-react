import logo from 'assets/svg/logo.svg'
import { FC } from 'react'
import styles from './Logo.module.scss'

export interface ILogoProps {}

export const Logo: FC<ILogoProps> = () => {
	return (
		<div className={styles.logo}>
			<img src={logo} />
			<h1>
				<span>in</span>Hear
			</h1>
		</div>
	)
}

import cn from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'

import styles from './Button.module.scss'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
}

export const Button: FC<IButtonProps> = ({ children, className, ...rest }) => (
	<button className={cn(className, styles.button)} {...rest}>
		{children}
	</button>
)

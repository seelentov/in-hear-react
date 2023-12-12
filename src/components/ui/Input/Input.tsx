import cn from 'classnames'
import { FC, InputHTMLAttributes, ReactNode } from 'react'
import styles from './Input.module.scss'

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string
	icon?: ReactNode
	isError?: boolean
	errorMessage?: string
	placeholder?: string
	ref?: any
}

export const Input: FC<IInputProps> = ({
	className,
	icon,
	errorMessage,
	isError,
	placeholder,
	...rest
}) => {
	return (
		<div className={cn(className, styles.input, isError && styles.error)}>
			{icon && <div className={styles.icon}>{icon}</div>}

			<input
				{...rest}
				placeholder={isError && errorMessage ? errorMessage : placeholder}
			/>
		</div>
	)
}

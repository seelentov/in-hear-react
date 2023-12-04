import cn from 'classnames'
import { FC, InputHTMLAttributes, ReactNode } from 'react'
import { CiSearch } from 'react-icons/ci'
import styles from './Input.module.scss'

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string
	icon?: ReactNode
}

export const Input: FC<IInputProps> = ({ className, icon, ...rest }) => {
	return (
		<div className={cn(className, styles.input)}>
			{icon && <div className={styles.icon}>{<CiSearch />}</div>}
			<input {...rest} />
		</div>
	)
}

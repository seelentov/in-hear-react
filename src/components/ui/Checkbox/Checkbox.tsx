import cn from 'classnames'
import { FC, InputHTMLAttributes, ReactNode } from 'react'
import styles from './Checkbox.module.scss'

export interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string
	icon?: ReactNode
	id: string
}

export const Checkbox: FC<ICheckboxProps> = ({ className, id, ...rest }) => (
	<>
		<input
			type='checkbox'
			className={cn(className, styles.checkbox)}
			id={id}
			{...rest}
		/>
		<label htmlFor={id}></label>
	</>
)

import cn from 'classnames'
import { FC, ReactNode, TextareaHTMLAttributes } from 'react'
import { CiSearch } from 'react-icons/ci'
import styles from './Textarea.module.scss'

export interface ITextareaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	className?: string
	icon?: ReactNode
}

export const Textarea: FC<ITextareaProps> = ({ className, icon, ...rest }) => {
	return (
		<div className={cn(className, styles.textarea)}>
			{icon && <div className={styles.icon}>{<CiSearch />}</div>}
			<textarea {...rest} />
		</div>
	)
}

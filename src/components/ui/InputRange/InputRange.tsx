import cn from 'classnames'
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import styles from './InputRange.module.scss'

export interface IInputRangeProps
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	className?: string
	reference?: React.MutableRefObject<HTMLInputElement>
}

export const InputRange: FC<IInputRangeProps> = ({
	className,
	reference,
	...rest
}) => {
	return (
		<input
			className={cn(className, styles.range)}
			ref={reference}
			type='range'
			{...rest}
		/>
	)
}

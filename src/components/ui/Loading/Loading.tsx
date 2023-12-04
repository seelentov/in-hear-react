import cn from 'classnames'
import { FC, HTMLAttributes } from 'react'
import { BounceLoader } from 'react-spinners'
import styles from './Loading.module.scss'

export interface ILoadingProps extends HTMLAttributes<HTMLDivElement> {
	blackout?: boolean
	className?: string
}

export const Loading: FC<ILoadingProps> = ({
	blackout,
	className,
	...rest
}) => {
	return (
		<div
			{...rest}
			className={cn(styles.loading, blackout && styles.blackout, className)}
		>
			<BounceLoader color={'var(--color-primary)'} />
		</div>
	)
}

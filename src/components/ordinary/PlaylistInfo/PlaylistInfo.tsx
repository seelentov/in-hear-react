import cn from 'classnames'
import { FC } from 'react'
import styles from './PlaylistInfo.module.scss'

export interface IPlaylistInfoProps {
	desc?: string
	loading?: boolean
	imageUrl?: string
	name?: string
	handlePlay?: () => void
}

export interface IInfo {
	desc: string
	imageUrl: string
}

export const PlaylistInfo: FC<IPlaylistInfoProps> = ({
	desc,
	loading,
	imageUrl,
	name,
}) => {
	return (
		<div className={styles.playlistInfo}>
			<div className={styles.container}>
				<div className={cn(loading && styles.loading, styles.image)}>
					<img src={imageUrl} alt={name} />
				</div>
				<div className={cn(styles.info, loading && styles.loading)}>{desc}</div>
			</div>
		</div>
	)
}

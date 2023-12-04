import { HREF } from 'config/routing.config'
import { Playlist } from 'models/Playlist'
import { FC } from 'react'
import { FaPlay } from 'react-icons/fa'
import { MdMoreHoriz } from 'react-icons/md'
import { RiHeart2Fill, RiHeart2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import styles from './PlaylistItem.module.scss'

export interface IPlaylistItemProps {
	playlist: Playlist
	showLikes?: boolean
}

export const PlaylistItem: FC<IPlaylistItemProps> = ({
	playlist: { name, img, id, likes },
	showLikes,
}) => {
	const liked = false

	return (
		<article className={styles.playlistItem}>
			<div
				className={styles.image}
				style={{
					backgroundImage: `url(${img})`,
				}}
			>
				<button className={styles.icon}>
					<FaPlay size={16} color={'var(--color-background)'} />
				</button>

				<div className={styles.btns}>
					<button className={styles.icon}>
						{liked ? (
							<RiHeart2Fill size={16} color={'var(--color-background)'} />
						) : (
							<RiHeart2Line size={16} color={'var(--color-background)'} />
						)}
					</button>
					<Link to={HREF.PLAYLISTS + id} className={styles.icon}>
						<MdMoreHoriz size={16} color={'var(--color-background)'} />
					</Link>
				</div>
			</div>
			<h3>{name}</h3>
			{showLikes && <p className='text-desc'>{likes} likes</p>}
		</article>
	)
}

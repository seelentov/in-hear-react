import cn from 'classnames'
import { PlaylistItem } from 'components/simple/PlaylistItem/PlaylistItem'
import { Playlist } from 'models/Playlist'
import { FC, HTMLAttributes, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './PlaylistsList.module.scss'

export interface IPlaylistsProps extends HTMLAttributes<HTMLDivElement> {
	playlists: Playlist[]
	grid?: boolean
	showLikes?: boolean
	className?: string
}

export const PlaylistsList: FC<IPlaylistsProps> = ({
	playlists,
	grid,
	showLikes,
	className,
	...rest
}) => {
	const swiperConfig = useMemo(() => {
		return {
			spaceBetween: 30,
			slidesPerView: 1.5,
			breakpoints: {
				376: {
					slidesPerView: 2,
				},
				600: {
					slidesPerView: 3,
				},
				900: {
					slidesPerView: 4,
				},
				1376: {
					slidesPerView: 6,
				},
				1550: {
					slidesPerView: 7,
				},
				2200: {
					slidesPerView: 9,
				},
			},
		}
	}, [])
	if (grid) {
		return (
			<section className={cn(className, styles.playlistsGrid)} {...rest}>
				{playlists.map(playlist => (
					<PlaylistItem
						playlist={playlist}
						key={playlist.id}
						showLikes={showLikes}
					/>
				))}
			</section>
		)
	}
	return (
		<section>
			<Swiper {...swiperConfig} className={cn(className, styles.playlistsGrid)}>
				{playlists.map(playlist => (
					<SwiperSlide key={playlist.id}>
						<PlaylistItem playlist={playlist} showLikes={showLikes} />
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	)
}

import cn from 'classnames'
import { PlaylistItem } from 'components/simple/PlaylistItem/PlaylistItem'
import { PlaylistLoading } from 'components/ui/PlaylistLoading/PlaylistLoading'
import { useActions } from 'hooks/useActions'
import { useStoreBy } from 'hooks/useStoreBy'
import { Playlist } from 'models/Playlist'
import { FC, HTMLAttributes } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './PlaylistsList.module.scss'

export interface IPlaylistsProps extends HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[]
  grid?: boolean
  showLikes?: boolean
  className?: string
  loading?: boolean
}

export const PlaylistsList: FC<IPlaylistsProps> = ({
  playlists,
  grid,
  showLikes,
  className,
  loading,
  ...rest
}) => {

  const { playPlaylist, removePlaylist, addPlaylist } = useActions()

  const { data: userPlaylists } = useStoreBy('lib')

  const swiperConfig = {
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

  if (!loading && playlists?.length === 0) {
    return (
      <section className={cn(className, styles.playlistsGrid)} {...rest}>
        <p>Playlists not found</p>
      </section>
    )
  }

  if (loading) {
    if (grid) {
      return (
        <section className={cn(className, styles.playlistsGrid)} {...rest}>
          {[...Array(6)].map(key => (
            <PlaylistLoading key={key} />
          ))}
        </section>
      )
    }
    return (
      <section>
        <Swiper
          {...swiperConfig}
          className={cn(className, styles.playlistsGrid)}
        >
          {[...Array(10)].map(key => (
            <SwiperSlide key={key}>
              <PlaylistLoading />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    )
  }

  if (grid) {
    return (
      <section className={cn(className, styles.playlistsGrid)} {...rest}>
        {playlists.map(playlist => (
          <PlaylistItem
            key={playlist._id}
            {...{
              playlist,
              showLikes,
              playPlaylist,
              userPlaylists,
              removePlaylist,
              addPlaylist,
            }}
          />
        ))}
      </section>
    )
  }
  return (
    <section>
      <Swiper {...swiperConfig} className={cn(className, styles.playlistsGrid)}>
        {playlists.map(playlist => (
          <SwiperSlide key={playlist._id}>
            <PlaylistItem
              {...{
                playlist,
                showLikes,
                playPlaylist,
                userPlaylists,
                removePlaylist,
                addPlaylist,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

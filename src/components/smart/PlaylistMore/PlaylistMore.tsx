import { PlaylistControls } from 'components/ordinary/PlaylistControls/PlaylistControls'
import { PlaylistInfo } from 'components/ordinary/PlaylistInfo/PlaylistInfo'
import { TracksList } from 'components/ordinary/TracksList/TracksList'
import { useActions } from 'hooks/useActions'
import { useStoreBy } from 'hooks/useStoreBy'
import { Artist } from 'models/Artist'
import { Playlist } from 'models/Playlist'
import { Track } from 'models/Track'
import { FC } from 'react'
import styles from './PlaylistMore.module.scss'

export interface IPlaylistMoreProps {
  tracks?: Track[]
  info?: Playlist | Artist
  infoLoading: boolean
  tracksLoading: boolean
  type: 'artists' | 'playlists'
}

export const PlaylistMore: FC<IPlaylistMoreProps> = ({
  tracks,
  info,
  infoLoading,
  tracksLoading,
  type,
}) => {
  const { data } = useStoreBy('lib')
  const liked = data[type].some((dt: any) => dt._id === info?._id)



  const { playPlaylist } =
    useActions()

  const handlePlay = () => {
    playPlaylist(tracks)
  }



  return (
    <div className={styles.playlistMore}>
      <PlaylistInfo
        desc={info?.desc}
        loading={infoLoading}
        name={info?.name}
        imageUrl={info?.imageUrl}
      />
      <div className={styles.bottom}>
        <h2>{info?.name}</h2>
        <PlaylistControls {...{ handlePlay, liked, type, info }} />
      </div>

      <TracksList canLike showLikes tracks={tracks ? tracks : []} loading={tracksLoading} />
    </div>
  )
}

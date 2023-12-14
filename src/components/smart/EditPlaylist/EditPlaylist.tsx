import axios from 'axios'
import { TrackItem } from 'components/simple/TrackItem/TrackItem'
import { Button } from 'components/ui/Button/Button'
import { Input } from 'components/ui/Input/Input'
import { Textarea } from 'components/ui/Textarea/Textarea'
import { HREF } from 'config/routing.config'
import { useActions } from 'hooks/useActions'
import { useDebounce } from 'hooks/useDebounce'
import { useStoreBy } from 'hooks/useStoreBy'
import { Playlist } from 'models/Playlist'
import { Track } from 'models/Track'
import { ModalContext } from 'providers/ModalProvider/ModalProvider'
import { FC, FormEvent, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from 'store/api/api'
import { usePatchLibMutation } from 'store/api/lib.api'
import { useEditPlaylistMutation, usePostPlaylistMutation } from 'store/api/playlist.api'
import styles from './EditPlaylist.module.scss'

export interface IEditPlaylistProps {
  playlist?: Playlist
  action: 'edit' | 'create'
}

export const EditPlaylist: FC<IEditPlaylistProps> = ({ playlist, action }) => {
  const [desc, setDesc] = useState<string>(playlist?.desc || '')
  const [name, setName] = useState<string>(playlist?.name || '')
  const [imageUrl, setImageUrl] = useState<string>(playlist?.imageUrl || '/default/playlist.jpg')
  const [playlistTracks, setPlaylistTracks] = useState<Track[] | []>(playlist?.tracks || [])

  const { _id: userId } = useStoreBy('user')

  const { data: { tracks } } = useStoreBy('lib')
  const [userTracksFilter, setUserTracksFilter] = useState<string>('')
  const debounceUserTracksFilter = useDebounce(userTracksFilter, 1000)

  const { closeModal } = useContext(ModalContext)
  const [editPlaylist, { isLoading }] = useEditPlaylistMutation()
  const [postPlaylist, { isLoading: isLoadingPost }] = usePostPlaylistMutation()
  const [patchLib] = usePatchLibMutation()
  const { addPlaylist } = useActions()

  const navigate = useNavigate()

  const userTracks = useMemo(() => tracks
    .filter((userTrack: Track) => playlistTracks.every((playlistTrack: Track) => userTrack._id !== playlistTrack._id))
    .filter((track: Track) => {
      if (debounceUserTracksFilter === '') return true
      return track.name.toLowerCase().includes(debounceUserTracksFilter.toLowerCase()) || track.artist.toLowerCase().includes(debounceUserTracksFilter.toLowerCase())
    }), [tracks, debounceUserTracksFilter, playlistTracks])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    try {
      if (!desc || !name || !imageUrl || !playlistTracks) return alert('Enter all fields!')
      if (isLoading || isLoadingPost) return
      e.preventDefault()
      const tracks = playlistTracks.map(track => track._id) as any
      if (action === 'edit' && playlist) {


        editPlaylist({
          _id: playlist._id,
          name, desc, imageUrl, tracks
        }).then(() => {
          closeModal()
          return alert('Information successfully updated!')
        })
      } else {
        
        postPlaylist({
          name, desc, imageUrl, tracks, author: userId
        }).then((res: any) => {
          patchLib({
            artists: [res.data._id],
          }).then(() => addPlaylist(res.data))

          closeModal()
          navigate(HREF.PLAYLISTS + res.data._id)

          return alert('Playlist successfully created!')
        })
      }
    } catch (error) {
      alert(`Error on change/update playlist ${playlist?.name}`)
    }
  }

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return
      const image = e.target.files[0]
      if (!image.type.includes('image')) return alert('This is not an image!')
      const formData = new FormData()
      formData.append('file', image)
      axios
        .post(API_URL + 'upload', formData)
        .then(res => setImageUrl(res.data.url))
    } catch (error) {
      alert(`Error on upload image`)
    }
  }

  const removeTrack = (e: React.MouseEvent<HTMLElement>, _id: string) => {
    e.stopPropagation()
    setPlaylistTracks(prev => prev.filter(track => track._id !== _id))
  }

  const addTrack = (e: React.MouseEvent<HTMLElement>, track: Track) => {
    e.stopPropagation()
    setPlaylistTracks(prev => [...prev, track])
  }

  return (
    <div className={styles.editPlaylist}>
      <form className={styles.editArtist} onSubmit={handleSubmit}>
        <label className={styles.image}>
          <sup>Upload image</sup>
          <img src={imageUrl} />
          <input type="file" hidden onChange={uploadImage} />
        </label>
        <Input onChange={(e) => setName(e.target.value)} value={name} placeholder='Name' />
        <Textarea onChange={(e) => setDesc(e.target.value)} value={desc} placeholder='Description' />

        <Input value={userTracksFilter} onChange={(e) => setUserTracksFilter(e.target.value)} type="text" placeholder='Search...' />
        <div className={styles.container}>
          {userTracks.length === 0 && <p>Not found...</p>}
          {userTracks.map((track: Track) => <TrackItem hidePlayBtn track={track} key={track._id} onClick={(e) => addTrack(e, track)} />)}
        </div>
        <div className={styles.container}>
          {playlistTracks.length === 0 && <p>Empty..</p>}
          {playlistTracks.map((track: Track) => <TrackItem hidePlayBtn track={track} key={track._id} onClick={(e) => removeTrack(e, track._id)} />)}
        </div>
        <Button>Save</Button>
      </form>
    </div>
  );
}
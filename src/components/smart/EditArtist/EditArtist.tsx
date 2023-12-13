import axios from 'axios';
import { Button } from 'components/ui/Button/Button';
import { Textarea } from 'components/ui/Textarea/Textarea';
import { Artist } from 'models/Artist';
import { ModalContext } from 'providers/ModalProvider/ModalProvider';
import { FC, FormEvent, useContext, useState } from 'react';
import { API_URL } from 'store/api/api';
import { useEditArtistMutation, usePostArtistMutation } from 'store/api/artists.api';
import { Input } from '../../ui/Input/Input';
import styles from './EditArtist.module.scss';
import { useActions } from 'hooks/useActions';
import { usePatchLibMutation } from 'store/api/lib.api';
import { useNavigate } from 'react-router-dom';
import { HREF } from 'config/routing.config';

export interface IEditArtistProps {
  artist?: Artist
  action: 'edit' | 'create'
}

export const EditArtist: FC<IEditArtistProps> = ({ artist, action }) => {

  const [desc, setDesc] = useState<string>(artist?.desc || '')
  const [name, setName] = useState<string>(artist?.name || '')
  const [imageUrl, setImageUrl] = useState<string>(artist?.imageUrl || '/default/playlist.jpg')
  const { closeModal } = useContext(ModalContext)
  const [editArtist, { isLoading }] = useEditArtistMutation()
  const [postArtist, { isLoading: isLoadingPost }] = usePostArtistMutation()
  const [patchLib] = usePatchLibMutation()
  const { addArtist } = useActions()

  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    try {
      if (!desc || !name || !imageUrl) return alert('Enter all fields!')
      if (isLoading || isLoadingPost) return
      e.preventDefault()
      if (action === 'edit' && artist) {
        editArtist({
          _id: artist._id,
          name, desc, imageUrl
        }).then(() => {
          closeModal()
          return alert('Information successfully updated!')
        })
      } else {
        postArtist({
          name, desc, imageUrl
        }).then((res: any) => {
          patchLib({
            artists: [res.data._id],
          }).then(() => addArtist(res.data))

          closeModal()
          navigate(HREF.ARTISTS + res.data._id)
          return alert('Artist successfully created!')
        })
      }

    } catch (error) {
      alert(`Error on change/update artist ${artist?.name}`)
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

  return (
    <form className={styles.editArtist} onSubmit={handleSubmit}>
      <label className={styles.image}>
        <sup>Upload image</sup>
        <img src={imageUrl} />
        <input type="file" hidden onChange={uploadImage} />
      </label>
      <Input onChange={(e) => setName(e.target.value)} value={name} placeholder='Name'/>
      <Textarea onChange={(e) => setDesc(e.target.value)} value={desc} placeholder='Description'/>
      <Button>Save</Button>
    </form>
  );
}
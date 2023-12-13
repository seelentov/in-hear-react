import axios from 'axios';
import { Button } from 'components/ui/Button/Button';
import { useActions } from 'hooks/useActions';
import { ModalContext } from 'providers/ModalProvider/ModalProvider';
import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { API_URL } from 'store/api/api';
import { usePatchLibMutation } from 'store/api/lib.api';
import { usePostTrackMutation } from 'store/api/tracks.api';
import { Input } from '../../ui/Input/Input';
import styles from './UploadTracks.module.scss';


export interface IUploadMusicFile {
  file: File
  name: string
  artist: string
  key: number
}

export interface IUploadTracksProps {
  uploads: File[]
}
export interface IUploadTracksItemProps {
  file: IUploadMusicFile
  setFiles: Dispatch<SetStateAction<IUploadMusicFile[]>>
}

export const UploadTracks: FC<IUploadTracksProps> = ({ uploads }) => {
  const { closeModal } = useContext(ModalContext)
  const [postTrack, { isLoading }] = usePostTrackMutation()
  const [patchLib] = usePatchLibMutation()

  const { addTrack } = useActions()

  const [files, setFiles] = useState<IUploadMusicFile[]>(uploads.map((upload: File, key: number) => {
    return {
      key,
      name: upload.name,
      artist: 'Untitled',
      file: upload
    }
  }))

  const handleUpload = async () => {
    try {
      files.forEach(fileUpload)
      closeModal()
    } catch (error) {
      alert(error)
    }
  }

  const fileUpload = async (file: IUploadMusicFile) => {
    try {
      const formData = new FormData()
      formData.append('file', file.file)
      const response = await axios.post(API_URL + 'upload', formData)
      const audio = document.createElement('audio')
      audio.setAttribute('src', response.data.url)
      audio.onloadedmetadata = async () => {
        await postTrack({
          name: file.name,
          artist: file.artist,
          src: response.data.url,
          duration: audio.duration * 100
        }
        ).then((res: any) => {
          if (res.error) {
            return alert('Enter tracks artists or names')
          }
          patchLib({
            tracks: [res.data._id],
          }).then(() => addTrack(res.data))
          alert(`Track ${res.data.artist} - ${res.data.name} uploaded successfully!`)
        }).catch((error: Error) => {
          alert(error.message)
        })
      }
    } catch (error) {
      alert(`Неудалось загрузить трек: ${file.artist} - ${file.name} `)
    }
  }


  return (
    <>
      {!isLoading && <div className={styles.uploadTracks}>
        <div className={styles.list}>
          {files.map((file, key) => <UploadTracksItem key={key} file={file} setFiles={setFiles} />)}
        </div>
        <Button onClick={handleUpload}>Upload</Button>
      </div>}
    </>
  );
}

const UploadTracksItem: FC<IUploadTracksItemProps> = ({ file, setFiles }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      const fileIndex = updatedFiles.findIndex(thisFile => thisFile.key === file.key);

      const validateValue = value ? value : 'Untitled'

      updatedFiles[fileIndex] = { ...updatedFiles[fileIndex], [name]: validateValue };
      return updatedFiles;
    });
  }

  return (
    <div className={styles.uploadTracksItem}>
      <Input type="text" name="name" placeholder='Name' value={file.name} onChange={handleChange} />
      <Input type="text" name="artist" placeholder="Artist" value={file.artist} onChange={handleChange} />
    </div>
  );
}
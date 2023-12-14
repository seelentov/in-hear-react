import axios from 'axios'
import cn from 'classnames'
import { Button } from 'components/ui/Button/Button'
import { LoadingGlobal } from 'components/ui/LoadingGlobal/LoadingGlobal'
import { useActions } from 'hooks/useActions'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { API_URL, usePostSignUpMutation } from 'store/api/api'
import { fetchLib } from 'store/lib/lib.slice'
import styles from './SignUp.module.scss'

export interface ISignUpProps { }

export const SignUp: FC<ISignUpProps> = () => {
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  })
  const { setUser } = useActions()
  const [postSignUp, { isLoading }] = usePostSignUpMutation()
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState<string>('/default/user.png')

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
      alert(error)
    }
  }

  const onSubmit = async (dt: any) => {
    await setError('root', {
      message: '',
    })
    await postSignUp({ ...dt, avatarUrl: imageUrl })
      .then((res: any) => {
        if (res.error) {
          return res.error.data.map((error: any) => {
            resetField(error.path)
            setError(error.path, {
              message: error.msg,
            })
          })
        }

        const { token, ...user } = res.data
        localStorage.setItem('token', token)
        setUser(user)
        dispatch(fetchLib() as any)
      })
      .catch((error: Error) => {
        alert(error)
      })
  }

  const errorsState = {
    email: Boolean(errors.email?.message),
    password: Boolean(errors.password?.message),
    login: Boolean(errors.login?.message),
    root: Boolean(errors.root?.message),
  }

  return (
    <>
      {isLoading ? (
        <LoadingGlobal />
      ) : (
        <form className={styles.signup} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.image}>
            <img src={imageUrl} />
            <label htmlFor='file-uploader'>Upload image</label>
            <input
              type='file'
              id='file-uploader'
              hidden
              onChange={uploadImage}
            />
          </div>
          <input
            className={cn(styles.input, errorsState.login && styles.error)}
            type='text'
            placeholder={errorsState.login ? errors.login?.message : 'Login'}
            {...register('login', { required: 'Enter login' })}
          />
          <input
            className={cn(styles.input, errorsState.email && styles.error)}
            type='email'
            placeholder={errorsState.email ? errors.email?.message : 'Email'}
            {...register('email', { required: 'Enter email' })}
          />
          <input
            className={cn(styles.input, errorsState.password && styles.error)}
            type='password'
            placeholder={
              errorsState.password ? errors.password?.message : 'Password'
            }
            {...register('password', { required: 'Enter password' })}
          />

          <Button type='submit'>Sign Up</Button>
          <p>{errors.root?.message}</p>
        </form>
      )}
    </>
  )
}

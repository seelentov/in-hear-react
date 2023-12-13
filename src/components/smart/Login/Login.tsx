import cn from 'classnames'
import { Button } from 'components/ui/Button/Button'
import { Loading } from 'components/ui/Loading/Loading'
import { useActions } from 'hooks/useActions'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { usePostAuthMutation } from 'store/api/api'
import { fetchLib } from 'store/lib/lib.slice'
import styles from './Login.module.scss'

export interface ILoginProps { }

export const Login: FC<ILoginProps> = () => {
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'admin@test.com',
      password: 'adminadmin',
    },
    mode: 'onChange',
  })

  const dispatch = useDispatch()
  const { setUser } = useActions()
  const [postAuth, { isLoading }] = usePostAuthMutation()
  const onSubmit = async (dt: any) => {
    await setError('root', {
      message: '',
    })
    await postAuth(dt)
      .then((res: any) => {
        if (res.error) {
          resetField('email')
          resetField('password')
          return setError('root', {
            message: 'Wrong login or password',
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
    root: Boolean(errors.root?.message),
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
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

          <Button type='submit'>Sign In</Button>
          <p>{errors.root?.message}</p>
        </form>
      )}
    </>
  )
}

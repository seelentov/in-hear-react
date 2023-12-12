import { Login } from 'components/smart/Login/Login'
import { SignUp } from 'components/smart/SignUp/SignUp'
import { HREF } from 'config/routing.config'
import { useStoreBy } from 'hooks/useStoreBy'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LoginPage.module.scss'

export const LoginPage = () => {
  const [page, setPage] = useState<string>('login')

  const { _id } = useStoreBy('user')
  const navigate = useNavigate()
  if (_id) {
    navigate(HREF.HOME)
  }

  return (
    <div className={styles.page}>
      {page === 'login' ? <Login /> : <SignUp />}
      <p
        onClick={() => setPage(prev => (prev === 'login' ? 'signup' : 'login'))}
      >
        {page === 'login'
          ? "Don't have an account yet?"
          : 'Already have an account?'}
      </p>
    </div>
  )
}

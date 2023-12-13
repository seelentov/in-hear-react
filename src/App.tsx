import { Layout } from 'containers/Layout/Layout'
import { useActions } from 'hooks/useActions'
import { Router } from 'pages/Router'
import { ModalProvider } from 'providers/ModalProvider/ModalProvider'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'
import { useGetMeQuery } from 'store/api/api'
import { fetchLib } from 'store/lib/lib.slice'

function App() {

  const { data: User } = useGetMeQuery()
  const { setUser } = useActions()
  const dispatch = useDispatch()
  useEffect(() => {
    if (User) {
      setUser(User)
      dispatch(fetchLib() as any)
    }
  }, [User])

  return (
    <BrowserRouter>
      <Layout>
        <ModalProvider>
          <Router />
        </ModalProvider>
      </Layout>
    </BrowserRouter>
  )
}

export default App

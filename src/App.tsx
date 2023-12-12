import { Layout } from 'containers/Layout/Layout'
import { Router } from 'pages/Router'
import { ModalProvider } from 'providers/ModalProvider/ModalProvider'

import { BrowserRouter } from 'react-router-dom'

function App() {
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

import { Layout } from 'containers/Layout/Layout'
import { Router } from 'pages/Router'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from 'store/store'

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Layout>
					<Router />
				</Layout>
			</BrowserRouter>
		</Provider>
	)
}

export default App

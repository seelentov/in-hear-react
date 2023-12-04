import { ROUTING } from 'config/routing.config'
import { Route, Routes } from 'react-router-dom'

export const Router = () => {
	return (
		<Routes>
			{ROUTING.map(({ name, href, component }) => (
				<Route key={name} path={href} element={component} />
			))}
		</Routes>
	)
}

import { Router } from './app/providers/router/router'
import { AuthProvider } from './app/providers/auth/provider'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import './assets/styles/global.css'

function App() {
	return (
		<AuthProvider>
			<Router />
		</AuthProvider>
	)
}

export default App

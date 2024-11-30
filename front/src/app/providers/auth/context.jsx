import { createContext } from 'react'

const initialState = {
	session: {
		user: {
			id: '',
			name: '',
			email: ''
		},
		accessToken: ''
	},
	setSession: () => null
}

export const AuthContext = createContext(initialState)

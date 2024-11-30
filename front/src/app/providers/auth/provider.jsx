import { useState } from 'react'

import { AuthContext } from './context'

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [session, setSession] = useState(
		JSON.parse(localStorage.getItem('session')) || {
			user: {
				id: '',
				name: '',
				email: ''
			},
			accessToken: ''
		}
	)

	const value = {
		session,
		setSession: (user) => {
			localStorage.setItem('session', JSON.stringify(user))
			setSession(user)
		}
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

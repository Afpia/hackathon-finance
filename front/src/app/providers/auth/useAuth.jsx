import { useContext } from 'react'

import { AuthContext } from './context'

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (context === undefined) throw new Error('useAuth должен быть в контексте')

	return context
}

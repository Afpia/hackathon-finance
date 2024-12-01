import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '../../../utils/constant/routes'
import { useAuth } from '../auth/useAuth'

export const PrivateRouterPrivate = () => {
	const { session } = useAuth()
	
	return session.accessToken ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace={true} />
}

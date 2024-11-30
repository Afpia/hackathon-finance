import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '../../../utils/constant/routes'

export const PrivateRouter = () => {
	const auth = true

	return auth ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace={true} />
}

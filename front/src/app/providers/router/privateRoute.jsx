import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '../../../utils/constant/routes'

export const PrivateRouter = () => {
	const auth = false

	return auth ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace={true} />
}

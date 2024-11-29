import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ROUTES } from '../../../utils/constant/routes'
import { NotFound } from '../../../pages/not-found'
import { Login } from '../../../pages/login'
import { Signup } from '../../../pages/signup'
import { Home } from '../../../pages/home'
import { PrivateRouter } from './privateRoute'

const router = createBrowserRouter([
	{
		path: '*',
		element: <NotFound />
	},
	{
		path: ROUTES.LOGIN,
		element: <Login />
	},
	{
		path: ROUTES.SIGNUP,
		element: <Signup />
	},
	{
		element: <PrivateRouter />,
		children: [
			{
				// element: <LayoutChat />,
				children: [
					{
						path: ROUTES.MAIN,
						element: <Home />
					}
				]
			}
		]
	}
])

export const Router = () => <RouterProvider router={router} />

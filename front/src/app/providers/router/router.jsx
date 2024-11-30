import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ROUTES } from '../../../utils/constant/routes'
import { NotFound } from '../../../pages/not-found'
import { Login } from '../../../pages/login'
import { Signup } from '../../../pages/signup'
import { Home } from '../../../pages/home'
import { Income } from '../../../pages/income'
import { PrivateRouterPrivate } from './privateRoute'
import { Expanse } from '../../../pages/expanse'
import { Layout } from '../../layouts/main/layout'
import { PrivateRouterPublic } from './privateRoutePublic'

const router = createBrowserRouter([
	{
		path: '*',
		element: <NotFound />
	},
	{
		element: <PrivateRouterPublic />,
		children: [
			{
				path: ROUTES.LOGIN,
				element: <Login />
			},
			{
				path: ROUTES.SIGNUP,
				element: <Signup />
			}
		]
	},

	{
		element: <PrivateRouterPrivate />,
		children: [
			{
				element: <Layout />,
				children: [
					{
						path: ROUTES.MAIN,
						element: <Home />
					},
					{
						path: ROUTES.INCOME,
						element: <Income />
					},
					{
						path: ROUTES.EXPANSE,
						element: <Expanse />
					}
				]
			}
		]
	}
])

export const Router = () => <RouterProvider router={router} />

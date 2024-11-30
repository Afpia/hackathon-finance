import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Header } from './header'

export const Layout = () => {
	return (
		<>
			<div className='absolute inset-0 w-full h-full bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-300 -z-10' />
			<Box
				sx={{
					backgroundColor: '#fff',
					padding: '30px',
					borderRadius: '30px',
					margin: '30px',
					width: 'calc(100% - 60px)',
					height: 'calc(100vh - 60px)',
					minHeight: 'calc(100% - 60px)',
					overflow: 'scroll',
					boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)'
				}}
			>
				<Header />
				<Box sx={{ overflow: 'hidden' }}>
					<Outlet />
				</Box>
			</Box>
		</>
	)
}

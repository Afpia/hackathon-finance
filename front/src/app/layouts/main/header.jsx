import { Box, Button, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/constant/routes'

export const Header = () => {
	const navigate = useNavigate()

	const exit = () => {
		localStorage.removeItem('session')
		navigate('/login', { replace: true })
	}

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: 6,
				borderBottom: '1px solid #ccc',
				paddingBottom: 3
			}}
		>
			<Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
				<Link to={ROUTES.MAIN}>
					<Button variant='text'>Бюджет</Button>
				</Link>
				<Link to={ROUTES.INCOME}>
					<Button variant='text'>Добавить доход</Button>
				</Link>
				<Link to={ROUTES.EXPANSE}>
					<Button variant='text'>Добавить расход</Button>
				</Link>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, alignItems: 'center' }}>
				{/* <Avatar alt='Profile' src='/profile.jpg' sx={{ width: 40, height: 40 }} /> */}
				<Typography
					sx={{
						fontWeight: 'bold',
						fontSize: '1rem',
						background: 'linear-gradient(to right, #2A69B3, #6A0DAD)',
						WebkitBackgroundClip: 'text',
						color: 'transparent'
					}}
				>
					Имя Фамилия
				</Typography>
				<Button onClick={exit} variant='outlined'>
					Выйти
				</Button>
			</Box>
		</Box>
	)
}

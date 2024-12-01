import { Button, Container, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { FormSignup } from '../modules/form-signup/form-signup'

export const Signup = () => {
	return (
		<Container
			component='main'
			maxWidth={false}
			className='flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-300'
		>
			<Box
				flex={1}
				flexDirection={'column'}
				alignItems={'center'}
				bgcolor={'#fff'}
				p={6}
				borderRadius={4}
				maxWidth={400}
				width={'100%'}
				boxShadow={'0px 15px 30px rgba(0, 0, 0, 0.2)'}
			>
				<Typography
					variant='h4'
					gutterBottom
					sx={{
						fontWeight: 'bold',
						color: '#4A90E2',
						textAlign: 'center',
						marginBottom: 3
					}}
				>
					Регистрация
				</Typography>

				<FormSignup />

				<Link to='/login' className='w-full'>
					<Button
						variant='outlined'
						fullWidth
						sx={{
							mt: 2,
							padding: '12px',
							fontSize: '1rem',
							textTransform: 'none'
						}}
					>
						Уже есть аккаунт? Войти
					</Button>
				</Link>
			</Box>
		</Container>
	)
}

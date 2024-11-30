import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { signup } from '../../utils/api/request/singup'

export const FormSignup = () => {
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			password_confirmation: ''
		},
		// validationSchema: null,
		onSubmit: async (values) => {
			const { data } = await signup({ data: values })
			console.log(data)
		}
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<TextField
				id='name'
				label='Имя'
				variant='outlined'
				fullWidth
				margin='normal'
				onChange={formik.handleChange}
				value={formik.values.name}
			/>

			<TextField
				id='email'
				label='Почта'
				type='email'
				variant='outlined'
				fullWidth
				margin='normal'
				onChange={formik.handleChange}
				value={formik.values.email}
			/>

			<TextField
				id='password'
				label='Пароль'
				type='password'
				variant='outlined'
				fullWidth
				margin='normal'
				onChange={formik.handleChange}
				value={formik.values.password}
			/>

			<TextField
				id='password_confirmation'
				label='Подтвердите пароль'
				type='password'
				variant='outlined'
				fullWidth
				margin='normal'
				onChange={formik.handleChange}
				value={formik.values.password_confirmation}
			/>

			<Button
				variant='contained'
				fullWidth
				color='primary'
				type='submit'
				sx={{
					mt: 3,
					padding: '12px',
					fontSize: '1rem',
					textTransform: 'none'
				}}
			>
				Зарегистрироваться
			</Button>
		</form>
	)
}

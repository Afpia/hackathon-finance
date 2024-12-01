import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { login } from '../../utils/api/request/login'
import { LoginScheme } from './schema'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export const FormLogin = () => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: toFormikValidationSchema(LoginScheme),
		onSubmit: async (values) => {
			const { data } = await login({ data: values })
			console.log(data)
		}
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<TextField
				id='email'
				label='Почта'
				variant='outlined'
				fullWidth
				margin='normal'
				onChange={formik.handleChange}
				value={formik.values.email}
			/>
			{formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

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
			{formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}

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
				Войти
			</Button>
		</form>
	)
}

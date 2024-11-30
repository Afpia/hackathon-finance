import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { login } from '../../utils/api/request/login'
import { LoginScheme } from './schema'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useAuth } from '../../app/providers/auth/useAuth'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const notifySuccess = () => toast.success('Вы вошли в систему')
const notifyError = (error) => toast.error(`Мы не смогли войти в систему ${error}`)

export const FormLogin = () => {
	const navigate = useNavigate()
	const { setSession } = useAuth()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validate: (values) => {
			const errors = {}
			Object.keys(values).forEach((key) => {
				if (!values[key]) {
					return (errors[key] = 'Обязательное поле')
				}
			})
			return errors
		},
		validationSchema: toFormikValidationSchema(LoginScheme),
		onSubmit: async (values) => {
			try {
				const { data } = await login({ data: values })

				setSession({
					user: data.user,
					accessToken: data.access_token
				})
				notifySuccess()
				navigate('/', { replace: true })
			} catch (error) {
				notifyError(error.message)
				formik.setErrors({ email: true, password: true })
			}
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
				{...formik.getFieldProps('email')}
				error={!!(formik.touched.email && formik.errors.email)}
				helperText={
					formik.touched.email && formik.errors.email ? <span style={{ color: 'red' }}>{formik.errors.email}</span> : null
				}
			/>

			<TextField
				id='password'
				label='Пароль'
				type='password'
				variant='outlined'
				fullWidth
				margin='normal'
				error={!!(formik.touched.password && formik.errors.password)}
				{...formik.getFieldProps('password')}
				helperText={
					formik.touched.password && formik.errors.password ? (
						<span style={{ color: 'red' }}>{formik.errors.password}</span>
					) : null
				}
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
				Войти
			</Button>
			<Toaster />
		</form>
	)
}

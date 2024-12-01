import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { signup } from '../../utils/api/request/singup'
import { SignupSchema } from './schema'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../app/providers/auth/useAuth'
import { notifyError, notifySuccess } from '../../utils/helpers/notification'

export const FormSignup = () => {
	const navigate = useNavigate()
	const { setSession } = useAuth()

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			password_confirmation: ''
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
		validationSchema: toFormikValidationSchema(SignupSchema),
		onSubmit: async (values) => {
			try {
				const { data } = await signup({ data: values })

				setSession({
					user: data.user,
					accessToken: data.access_token
				})
				notifySuccess('Вы успешно вошли в систему')
				navigate('/', { replace: true })
			} catch (error) {
				notifyError(error.message)
				formik.setErrors({ email: true, name: true, password: true, password_confirmation: true })
			}
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
				{...formik.getFieldProps('name')}
				error={!!(formik.touched.name && formik.errors.name)}
				helperText={formik.touched.name && formik.errors.name ? <span style={{ color: 'red' }}>{formik.errors.name}</span> : null}
			/>

			<TextField
				id='email'
				label='Почта'
				type='email'
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
				{...formik.getFieldProps('password')}
				error={!!(formik.touched.password && formik.errors.password)}
				helperText={
					formik.touched.password && formik.errors.password ? (
						<span style={{ color: 'red' }}>{formik.errors.password}</span>
					) : null
				}
			/>

			<TextField
				id='password_confirmation'
				label='Подтвердите пароль'
				type='password'
				variant='outlined'
				fullWidth
				margin='normal'
				{...formik.getFieldProps('password_confirmation')}
				error={!!(formik.touched.password_confirmation && formik.errors.password_confirmation)}
				helperText={
					formik.touched.password_confirmation && formik.errors.password_confirmation ? (
						<span style={{ color: 'red' }}>{formik.errors.password_confirmation}</span>
					) : null
				}
			/>

			{/* <OutlinedInput
				id='outlined-adornment-password'
				type={showPassword ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position='end'>
						<IconButton
							aria-label={showPassword ? 'hide the password' : 'display the password'}
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							onMouseUp={handleMouseUpPassword}
							edge='end'
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label='Password'
			/> */}

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

import { Button, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { notifyError, notifySuccess } from '../utils/helpers/notification'
import { finance } from '../utils/api/request/finance'
import { useAuth } from '../app/providers/auth/useAuth'
import { categories } from '../utils/api/request/categories'
import { history } from '../utils/api/request/history'

export const Income = () => {
	const { session } = useAuth()
	const [categoriesList, setCategoriesList] = useState([])
	const [incomeHistory, setIncomeHistory] = useState([])
	const [changeHistory, setChangeHistory] = useState(false)

	useEffect(() => {
		async function fetchCategories() {
			try {
				const { data } = await categories({ config: { headers: { Authorization: 'Bearer ' + `${session.accessToken}` } } })
				setCategoriesList(data)
			} catch (error) {
				console.log(error.message)
			}
		}

		fetchCategories()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoriesList])

	useEffect(() => {
		async function fetchHistory() {
			try {
				const { data } = await history({ config: { headers: { Authorization: 'Bearer ' + `${session.accessToken}` } } })
				setIncomeHistory(data)
			} catch (error) {
				console.log(error.message)
			}
		}
		fetchHistory()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [changeHistory])

	const formik = useFormik({
		initialValues: {
			incomeORexpense: 0,
			description: '',
			category_id: 0,
			type: 'income'
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
		onSubmit: async (values) => {
			try {
				await finance({ data: values, config: { headers: { Authorization: 'Bearer ' + `${session.accessToken}` } } })
				setChangeHistory(!changeHistory)
				notifySuccess('Вы успешно добавили доход')
			} catch (error) {
				notifyError(error.message)
				formik.setErrors({ email: true, password: true })
			}
		}
	})

	return (
		<>
			<Typography
				variant='h1'
				sx={{
					fontWeight: 'bold',
					fontSize: '34px',
					color: '#4A90E2',
					textAlign: 'center'
				}}
			>
				Доходы
			</Typography>

			<Typography
				variant='h6'
				sx={{
					color: '#555',
					textAlign: 'center',
					marginBottom: 6,
					fontWeight: 'normal'
				}}
			>
				Добавьте ваш доход и просмотрите общую сумму.
			</Typography>

			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 20 }}>
				<Box>
					<Typography variant='h6' sx={{ color: '#4A90E2', fontWeight: 'bold', marginBottom: 2 }}>
						История доходов
					</Typography>

					{incomeHistory.length === 0 ? (
						<Typography sx={{ color: '#555' }}>История доходов пуста</Typography>
					) : (
						<Box>
							{incomeHistory
								.filter((item) => item.type === 'income')
								.map((item) => (
									<Box key={item.id} sx={{ padding: 2, border: '1px solid #ddd', borderRadius: 2, marginBottom: 2 }}>
										<Typography variant='body1' sx={{ fontWeight: 'bold' }}>
											Сумма: {item.incomeORexpense} ₽
										</Typography>
										<Typography variant='body2' sx={{ color: '#555' }}>
											Описание: {item.description}
										</Typography>
									</Box>
								))}
						</Box>
					)}
				</Box>

				<Box
					sx={{
						padding: 3,
						border: '1px solid #ddd',
						borderRadius: 2,
						width: '100%',
						maxWidth: '600px',
						marginBottom: 6
					}}
				>
					<Typography variant='h6' gutterBottom sx={{ color: '#4A90E2', fontWeight: 'bold' }}>
						Добавить доход
					</Typography>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							id='incomeORexpense'
							label='Сумма'
							name='amount'
							fullWidth
							sx={{ marginBottom: 2 }}
							slotProps={{
								htmlInput: {
									min: 0
								}
							}}
							type='number'
							{...formik.getFieldProps('incomeORexpense')}
							error={!!(formik.touched.incomeORexpense && formik.errors.incomeORexpense)}
							helperText={
								formik.touched.incomeORexpense && formik.errors.incomeORexpense ? (
									<span style={{ color: 'red' }}>{formik.errors.incomeORexpense}</span>
								) : null
							}
						/>
						<TextField
							label='Описание'
							name='description'
							fullWidth
							sx={{ marginBottom: 2 }}
							{...formik.getFieldProps('description')}
							error={!!(formik.touched.description && formik.errors.description)}
							helperText={
								formik.touched.description && formik.errors.description ? (
									<span style={{ color: 'red' }}>{formik.errors.description}</span>
								) : null
							}
						/>
						<FormControl fullWidth sx={{ marginBottom: 2 }}>
							<InputLabel>Категория</InputLabel>
							<Select
								name='category'
								label='Категория'
								{...formik.getFieldProps('category_id')}
								error={!!(formik.touched.category_id && formik.errors.category_id)}
							>
								{categoriesList.map((item, index) => (
									<MenuItem key={index} value={item.id}>
										{item.category_name}
									</MenuItem>
								))}
							</Select>
							{formik.touched.category_id && formik.errors.category_id ? (
								<span style={{ color: 'red', fontSize: '13px', marginLeft: '14px', fontWeight: '400' }}>
									{formik.errors.category_id}
								</span>
							) : null}
						</FormControl>
						<Button variant='contained' type='submit' sx={{ width: '100%', marginBottom: 2, padding: '12px' }}>
							Добавить доход
						</Button>
					</form>
				</Box>
			</Box>
		</>
	)
}

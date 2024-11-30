import { Button, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Income = () => {
	const [incomeHistory, setIncomeHistory] = useState([])

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
							{incomeHistory.map((item, index) => (
								<Box key={index} sx={{ padding: 2, border: '1px solid #ddd', borderRadius: 2, marginBottom: 2 }}>
									<Typography variant='body1' sx={{ fontWeight: 'bold' }}>
										Сумма: {item.amount} ₽
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
					<form>
						<TextField label='Сумма' name='amount' fullWidth required sx={{ marginBottom: 2 }} type='number' />
						<TextField label='Описание' name='description' fullWidth required sx={{ marginBottom: 2 }} />
						<FormControl fullWidth sx={{ marginBottom: 2 }}>
							<InputLabel>Категория</InputLabel>
							<Select name='category' label='Категория' required>
								<MenuItem value='Salary'>Зарплата</MenuItem>
								<MenuItem value='Freelance'>Фриланс</MenuItem>
								<MenuItem value='Investment'>Инвестиции</MenuItem>
								<MenuItem value='Other'>Прочее</MenuItem>
							</Select>
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

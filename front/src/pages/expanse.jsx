import { Button, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Expanse = () => {
	const [expenseHistory, setExpenseHistory] = useState([])

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
				Расходы
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
				Добавьте ваш расход и просмотрите общую сумму.
			</Typography>

			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 20 }}>
				<Box>
					<Typography variant='h6' sx={{ color: '#4A90E2', fontWeight: 'bold', marginBottom: 2 }}>
						История расходов
					</Typography>
					{expenseHistory.length === 0 ? (
						<Typography sx={{ color: '#555' }}>История расходов пуста</Typography>
					) : (
						<Box>
							{expenseHistory.map((item, index) => (
								<Box key={index} sx={{ padding: 2, border: '1px solid #ddd', borderRadius: 2, marginBottom: 2 }}>
									<Typography variant='body1' sx={{ fontWeight: 'bold' }}>
										Сумма: {item.amount} ₽
									</Typography>
									<Typography variant='body2' sx={{ color: '#555' }}>
										Описание: {item.description} - Категория: {item.category}
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
						Добавить расход
					</Typography>
					<form>
						<TextField label='Сумма' name='amount' fullWidth required sx={{ marginBottom: 2 }} type='number' />
						<TextField label='Описание' name='description' fullWidth required sx={{ marginBottom: 2 }} />
						<FormControl fullWidth sx={{ marginBottom: 2 }}>
							<InputLabel>Категория</InputLabel>
							<Select name='category' label='Категория' required>
								<MenuItem value='Food'>Еда</MenuItem>
								<MenuItem value='Transport'>Транспорт</MenuItem>
								<MenuItem value='Entertainment'>Развлечения</MenuItem>
								<MenuItem value='Utilities'>Коммунальные услуги</MenuItem>
							</Select>
						</FormControl>
						<Button variant='contained' type='submit' sx={{ width: '100%', padding: '12px', marginBottom: 2 }}>
							Добавить расход
						</Button>
					</form>
				</Box>
			</Box>
		</>
	)
}

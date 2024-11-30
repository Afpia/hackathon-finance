import { Box, Typography } from '@mui/material'
import { LineChart } from '../components/line-chart'
import { BarChart } from '../components/bar-chart'

export const Home = () => {
	return (
		<>
			<Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold', color: '#4A90E2', textAlign: 'center', marginBottom: 10 }}>
				Финансовая панель
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
				<Box sx={{ width: '50%' }}>
					<LineChart />
				</Box>
				<Box sx={{ width: '50%' }}>
					<BarChart />
				</Box>
			</Box>

			{/* <Box sx={{ marginTop: 4, width: '100%' }}>
				<Typography variant='h6' sx={{ color: '#4A90E2', fontWeight: 'bold', marginBottom: 2 }}>
					Установка бюджета
				</Typography>
				<TextField
					label='Доходы на месяц'
					name='income'
					value={budget.income}
					onChange={handleBudgetChange}
					fullWidth
					sx={{ marginBottom: 2 }}
				/>
				<TextField
					label='Расходы на месяц'
					name='expenses'
					value={budget.expenses}
					onChange={handleBudgetChange}
					fullWidth
					sx={{ marginBottom: 2 }}
				/>
				<TextField
					label='Цель по сбережениям'
					name='savingsGoal'
					value={budget.savingsGoal}
					onChange={handleBudgetChange}
					fullWidth
					sx={{ marginBottom: 2 }}
				/>
				<Button variant='contained' onClick={handleSaveGoal} sx={{ marginTop: 2 }}>
					Сохранить цель
				</Button>
			</Box> */}

			{/* <Box
				sx={{
					marginTop: 4,
					width: '100%',
					padding: 2,
					borderRadius: 2,
					boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
					backgroundColor: '#F5F5F5'
				}}
			>
				<Typography variant='h6' sx={{ color: '#4A90E2', fontWeight: 'bold', marginBottom: 2 }}>
					Статистика
				</Typography>
				<Typography variant='body1' sx={{ color: '#555' }}>
					<strong>Общий доход:</strong> {totalIncome} ₽
				</Typography>
				<Typography variant='body1' sx={{ color: '#555' }}>
					<strong>Общие расходы:</strong> {totalExpenses} ₽
				</Typography>
				<Typography variant='body1' sx={{ color: '#555' }}>
					<strong>Баланс:</strong> {balance} ₽
				</Typography>
				<Typography variant='body1' sx={{ color: '#555', marginTop: 2 }}>
					<strong>Категории расходов:</strong>
				</Typography>
				{Object.keys(categoryPercentages).map((category, index) => (
					<Typography key={index} variant='body2' sx={{ color: '#555' }}>
						{category}: {categoryPercentages[category]}%
					</Typography>
				))}
			</Box> */}

			{/* <Box sx={{ marginTop: 4 }}>
				<Typography variant='h6' sx={{ color: '#4A90E2', fontWeight: 'bold' }}>
					Выбор валюты
				</Typography>
				<FormControl fullWidth>
					<InputLabel>Валюта</InputLabel>
					<Select value={currency} onChange={handleCurrencyChange}>
						<MenuItem value='RUB'>RUB (Рубли)</MenuItem>
						<MenuItem value='USD'>USD (Доллары)</MenuItem>
						<MenuItem value='EUR'>EUR (Евро)</MenuItem>
					</Select>
				</FormControl>
			</Box> */}
		</>
	)
}

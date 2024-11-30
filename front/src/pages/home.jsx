import { useState } from 'react'
import {
	Button,
	Container,
	Typography,
	Box,
	Avatar,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Switch,
	Snackbar
} from '@mui/material'
import { Link } from 'react-router-dom'

export const Home = () => {
	const [income, setIncome] = useState({ amount: '', description: '' })
	const [expense, setExpense] = useState({ amount: '', description: '', category: '' })
	const [budget, setBudget] = useState({ income: '', expenses: '', savingsGoal: '' })
	const [currency, setCurrency] = useState('RUB')
	const [reminders, setReminders] = useState([])
	const [openModal, setOpenModal] = useState(false)
	const [selectedItem, setSelectedItem] = useState(null)
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [showRecommendations, setShowRecommendations] = useState(false)

	const incomeHistory = [
		{ amount: '5000', description: 'Freelance project' },
		{ amount: '1500', description: 'Salary' }
	]

	const expenseHistory = [
		{ amount: '200', description: 'Groceries', category: 'Food' },
		{ amount: '50', description: 'Transport', category: 'Transport' }
	]

	const calculateStatistics = () => {
		const totalIncome = incomeHistory.reduce((sum, item) => sum + parseFloat(item.amount), 0)
		const totalExpenses = expenseHistory.reduce((sum, item) => sum + parseFloat(item.amount), 0)
		const balance = totalIncome - totalExpenses

		const categoryTotals = expenseHistory.reduce((acc, item) => {
			acc[item.category] = acc[item.category] ? acc[item.category] + parseFloat(item.amount) : parseFloat(item.amount)
			return acc
		}, {})

		const categoryPercentages = Object.keys(categoryTotals).reduce((acc, category) => {
			acc[category] = ((categoryTotals[category] / totalExpenses) * 100).toFixed(2)
			return acc
		}, {})

		return { totalIncome, totalExpenses, balance, categoryPercentages }
	}

	const { totalIncome, totalExpenses, balance, categoryPercentages } = calculateStatistics()

	const handleIncomeChange = (e) => {
		setIncome({ ...income, [e.target.name]: e.target.value })
	}

	const handleExpenseChange = (e) => {
		setExpense({ ...expense, [e.target.name]: e.target.value })
	}

	const handleIncomeSubmit = (e) => {
		e.preventDefault()
		console.log('Доход добавлен:', income)
	}

	const handleExpenseSubmit = (e) => {
		e.preventDefault()
		console.log('Расход добавлен:', expense)
	}

	const handleBudgetChange = (e) => {
		setBudget({ ...budget, [e.target.name]: e.target.value })
	}

	const handleSaveGoal = () => {
		setOpenSnackbar(true)
		console.log('Цель по сбережениям сохранена:', budget.savingsGoal)
	}

	const handleCurrencyChange = (e) => {
		setCurrency(e.target.value)
		console.log('Выбрана валюта:', e.target.value)
	}

	const handleReminderChange = (e) => {
		setReminders([...reminders, e.target.value])
	}

	const handleToggleRecommendations = () => {
		setShowRecommendations(!showRecommendations)
	}

	const openItemModal = (item, type) => {
		setSelectedItem({ item, type })
		setOpenModal(true)
	}

	const closeItemModal = () => {
		setOpenModal(false)
		setSelectedItem(null)
	}

	return (
		<>
			<Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold', color: '#4A90E2', textAlign: 'center', marginBottom: 3 }}>
				Финансовая панель
			</Typography>

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

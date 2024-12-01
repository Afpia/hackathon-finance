import { Box, Typography } from '@mui/material'
import { LineChart } from '../components/line-chart'
import { BarChart } from '../components/bar-chart'
import { useEffect, useState } from 'react'
import { useAuth } from '../app/providers/auth/useAuth'
import { stats } from '../utils/api/request/stats'
import { statsLine } from '../utils/api/request/statsLine'

export const Home = () => {
	const [dataBarList, setDataBarList] = useState({})
	const [dataLineList, setDataLineList] = useState([])

	const { session } = useAuth()
	console.log(dataBarList)
	useEffect(() => {
		async function fetchBar() {
			try {
				const { data } = await stats({ config: { headers: { Authorization: 'Bearer ' + `${session.accessToken}` } } })
				setDataLineList(data)
			} catch (error) {
				console.log(error.message)
			}
		}
		async function fetchLine() {
			try {
				const { data } = await statsLine({ config: { headers: { Authorization: 'Bearer ' + `${session.accessToken}` } } })
				setDataBarList(data)
			} catch (error) {
				console.log(error.message)
			}
		}
		fetchBar()
		fetchLine()
	}, [session.accessToken])

	const dataLine = {
		labels: ['Декабрь', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь'],
		datasets: [
			{
				label: 'Все расходы по месяцам',
				data: [
					dataLineList['12']?.total_income,
					dataLineList['1']?.total_income,
					dataLineList['2']?.total_income,
					dataLineList['3']?.total_income,
					dataLineList['4']?.total_income,
					dataLineList['5']?.total_income,
					dataLineList['6']?.total_income,
					dataLineList['7']?.total_income,
					dataLineList['8']?.total_income,
					dataLineList['9']?.total_income,
					dataLineList['10']?.total_income,
					dataLineList['11']?.total_income
				],
				fill: false,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1
			},
			{
				label: 'Все доходы по месяцам',
				data: [
					dataLineList['12']?.total_expance,
					dataLineList['1']?.total_expance,
					dataLineList['2']?.total_expance,
					dataLineList['3']?.total_expance,
					dataLineList['4']?.total_expance,
					dataLineList['5']?.total_expance,
					dataLineList['6']?.total_expance,
					dataLineList['7']?.total_expance,
					dataLineList['8']?.total_expance,
					dataLineList['9']?.total_expance,
					dataLineList['10']?.total_expance,
					dataLineList['11']?.total_expance
				],
				fill: false,
				borderColor: '#d8b4fe',
				tension: 0.1
			}
		]
	}

	const data = {
		labels: [
			dataBarList[0].category_name,
			dataBarList[1].category_name,
			dataBarList[2].category_name,
			dataBarList[3].category_name,
			dataBarList[4].category_name,
			dataBarList[5].category_name,
			dataBarList[6].category_name
		],
		datasets: [
			{
				label: 'Популярное по категориям',
				data: [
					dataBarList[0]?.total,
					dataBarList[1]?.total,
					dataBarList[2]?.total,
					dataBarList[3]?.total,
					dataBarList[4]?.total,
					dataBarList[5]?.total,
					dataBarList[6]?.total
				],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(255, 205, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(201, 203, 207, 0.2)'
				],
				borderColor: [
					'rgb(255, 99, 132)',
					'rgb(255, 159, 64)',
					'rgb(255, 205, 86)',
					'rgb(75, 192, 192)',
					'rgb(54, 162, 235)',
					'rgb(153, 102, 255)',
					'rgb(201, 203, 207)'
				],
				borderWidth: 1
			}
			// {
			// 	label: 'Топ доходы по категориям',
			// 	data: [65, 59, 80, 81, 56, 55, 40],
			// 	backgroundColor: [
			// 		'rgba(201, 203, 207, 0.2)',
			// 		'rgba(153, 102, 255, 0.2)',
			// 		'rgba(54, 162, 235, 0.2)',
			// 		'rgba(75, 192, 192, 0.2)',
			// 		'rgba(255, 205, 86, 0.2)',
			// 		'rgba(255, 159, 64, 0.2)',
			// 		'rgba(255, 99, 132, 0.2)'
			// 	],
			// 	borderColor: [
			// 		'rgb(201, 203, 207)',
			// 		'rgb(153, 102, 255)',
			// 		'rgb(54, 162, 235)',
			// 		'rgb(75, 192, 192)',
			// 		'rgb(255, 205, 86)',
			// 		'rgb(255, 159, 64)',
			// 		'rgb(255, 99, 132)'
			// 	],
			// 	borderWidth: 1
			// }
		]
	}
	return (
		<>
			<Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold', color: '#4A90E2', textAlign: 'center', marginBottom: 10 }}>
				Финансовая панель
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
				<Box sx={{ width: '50%' }}>
					<LineChart data={dataLine} />
				</Box>
				<Box sx={{ width: '50%' }}>
					<BarChart data={data} />
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
import { Bar } from 'react-chartjs-2'

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

const data = {
	labels: ['Мореженко', 'Шлюхи', 'Школа', 'Кафе', 'Ресторан', 'Магазин', 'Банк'],
	datasets: [
		{
			label: 'Популярное по категориям',
			data: [65, 59, 80, 81, 56, 55, 40],
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
		},
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

const options = {
	responsive: true,
	plugins: {
		tooltip: {
			enabled: true
		}
	},
	scales: {
		x: {
			beginAtZero: true
		},
		y: {
			beginAtZero: true
		}
	}
}

export const BarChart = () => <Bar options={options} data={data} />

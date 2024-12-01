import { Line } from 'react-chartjs-2'

import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend)

const data = {
	labels: ['Декабрь', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь'],
	datasets: [
		{
			label: 'Все расходы по месяцам',
			data: [30, 50, 40, 60, 70, 80, 90, 100, 110, 120, 130, 140],
			fill: false,
			borderColor: 'rgb(75, 192, 192)',
			tension: 0.1
		},
		{
			label: 'Все доходы по месяцам',
			data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
			fill: false,
			borderColor: '#d8b4fe',
			tension: 0.1
		}
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

export const LineChart = () => <Line options={options} data={data} />

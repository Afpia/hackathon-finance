import React, { useState } from 'react';
import { Button, Container, Typography, Box, Avatar, TextField, FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Switch, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [income, setIncome] = useState({ amount: '', description: '' });
  const [expense, setExpense] = useState({ amount: '', description: '', category: '' });
  const [budget, setBudget] = useState({ income: '', expenses: '', savingsGoal: '' });
  const [currency, setCurrency] = useState('RUB'); 
  const [reminders, setReminders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const incomeHistory = [
    { amount: '5000', description: 'Freelance project' },
    { amount: '1500', description: 'Salary' },
  ];

  const expenseHistory = [
    { amount: '200', description: 'Groceries', category: 'Food' },
    { amount: '50', description: 'Transport', category: 'Transport' },
  ];

  const calculateStatistics = () => {
    const totalIncome = incomeHistory.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    const totalExpenses = expenseHistory.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    const balance = totalIncome - totalExpenses;

    const categoryTotals = expenseHistory.reduce((acc, item) => {
      acc[item.category] = acc[item.category] ? acc[item.category] + parseFloat(item.amount) : parseFloat(item.amount);
      return acc;
    }, {});

    const categoryPercentages = Object.keys(categoryTotals).reduce((acc, category) => {
      acc[category] = ((categoryTotals[category] / totalExpenses) * 100).toFixed(2);
      return acc;
    }, {});

    return { totalIncome, totalExpenses, balance, categoryPercentages };
  };

  const { totalIncome, totalExpenses, balance, categoryPercentages } = calculateStatistics();

  const handleIncomeChange = (e) => {
    setIncome({ ...income, [e.target.name]: e.target.value });
  };

  const handleExpenseChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    console.log('Доход добавлен:', income);
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    console.log('Расход добавлен:', expense);
  };

  const handleBudgetChange = (e) => {
    setBudget({ ...budget, [e.target.name]: e.target.value });
  };

  const handleSaveGoal = () => {
    setOpenSnackbar(true);
    console.log('Цель по сбережениям сохранена:', budget.savingsGoal);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
    console.log('Выбрана валюта:', e.target.value);
  };

  const handleReminderChange = (e) => {
    setReminders([...reminders, e.target.value]);
  };

  const handleToggleRecommendations = () => {
    setShowRecommendations(!showRecommendations);
  };

  const openItemModal = (item, type) => {
    setSelectedItem({ item, type });
    setOpenModal(true);
  };

  const closeItemModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  return (
    <Container component="main" maxWidth={false} className="flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-300">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff', padding: 6, borderRadius: 4, boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)', width: '100%', maxWidth: 1200, position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 40, right: 20, display: 'flex', alignItems: 'center' }}>
          <Avatar alt="Profile" src="/profile.jpg" sx={{ width: 40, height: 40 }} />
          <Typography sx={{ marginLeft: 1, fontWeight: 'bold', fontSize: '1rem', background: 'linear-gradient(to right, #2A69B3, #6A0DAD)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Имя Фамилия
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: 4 }}>
          <Link to="/" style={{ margin: '0 15px' }}><Button variant="text" sx={{ color: '#4A90E2' }}>Бюджет</Button></Link>
          <Link to="/income" style={{ margin: '0 15px' }}><Button variant="text" sx={{ color: '#4A90E2' }}>Доходы</Button></Link>
          <Link to="/expance" style={{ margin: '0 15px' }}><Button variant="text" sx={{ color: '#4A90E2' }}>Расходы</Button></Link>
        </Box>

        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#4A90E2', textAlign: 'center', marginBottom: 3 }}>Финансовая панель</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: '#4A90E2', fontWeight: 'bold' }}>Рекомендации по финансовому управлению</Typography>
            <Switch checked={showRecommendations} onChange={handleToggleRecommendations} />
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              {showRecommendations ? 'Советы активированы: Снижайте расходы на еду на 10%!' : 'Советы не активированы.'}
            </Typography>
          </Box>
          
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <FormControl width='80%'>
              <InputLabel>Выбор Валюты</InputLabel>
              <Select value={currency} onChange={handleCurrencyChange}>
                <MenuItem value="RUB">Рубли (RUB)</MenuItem>
                <MenuItem value="USD">Доллары США (USD)</MenuItem>
                <MenuItem value="EUR">Евро (EUR)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ marginTop: 4, width: '100%' }}>
          <Typography variant="h6" sx={{ color: '#4A90E2', fontWeight: 'bold', marginBottom: 2 }}>Установка бюджета</Typography>
          <TextField label="Доходы на месяц" name="income" value={budget.income} onChange={handleBudgetChange} fullWidth sx={{ marginBottom: 2 }} />
          <TextField label="Расходы на месяц" name="expenses" value={budget.expenses} onChange={handleBudgetChange} fullWidth sx={{ marginBottom: 2 }} />
          <TextField label="Цель по сбережениям" name="savingsGoal" value={budget.savingsGoal} onChange={handleBudgetChange} fullWidth sx={{ marginBottom: 2 }} />
          <Button variant="contained" onClick={handleSaveGoal} sx={{ marginTop: 2 }}>Сохранить цель</Button>
        </Box>

        <Box sx={{ marginTop: 4, width: '100%', padding: 2, borderRadius: 2, boxShadow: '0px 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#F5F5F5' }}>
          <Typography variant="h6" sx={{ color: '#4A90E2', fontWeight: 'bold', marginBottom: 2 }}>Статистика</Typography>
          <Typography variant="body1" sx={{ color: '#555' }}><strong>Общий доход:</strong> {totalIncome} ₽</Typography>
          <Typography variant="body1" sx={{ color: '#555' }}><strong>Общие расходы:</strong> {totalExpenses} ₽</Typography>
          <Typography variant="body1" sx={{ color: '#555' }}><strong>Баланс:</strong> {balance} ₽</Typography>
          <Typography variant="body1" sx={{ color: '#555', marginTop: 2 }}><strong>Категории расходов:</strong></Typography>
          {Object.keys(categoryPercentages).map((category, index) => (
            <Typography key={index} variant="body2" sx={{ color: '#555' }}>{category}: {categoryPercentages[category]}%</Typography>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

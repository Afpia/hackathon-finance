import React, { useState } from 'react';
import { Button, Container, Typography, Box, Avatar, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [income, setIncome] = useState({ amount: '', description: '' });
  const [expense, setExpense] = useState({ amount: '', description: '', category: '' });

  const incomeHistory = [
    { amount: '5000', description: 'Freelance project' },
    { amount: '1500', description: 'Salary' },
  ];

  const expenseHistory = [
    { amount: '200', description: 'Groceries', category: 'Food' },
    { amount: '50', description: 'Transport', category: 'Transport' },
  ];

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

  return (
    <Container
      component="main"
      maxWidth={false}
      className="flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-300"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 6,
          borderRadius: 4,
          boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: 1200,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 40,
            right: 20,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar alt="Profile" src="/profile.jpg" sx={{ width: 40, height: 40 }} />
          <Typography
            sx={{
              marginLeft: 1,
              fontWeight: 'bold',
              fontSize: '1rem',
              background: 'linear-gradient(to right, #2A69B3, #6A0DAD)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Имя Фамилия
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: 4 }}>
          <Link to="/" style={{ margin: '0 15px' }}>
            <Button variant="text" sx={{ color: '#4A90E2' }}>Бюджет</Button>
          </Link>
          <Link to="/profile" style={{ margin: '0 15px' }}>
            <Button variant="text" sx={{ color: '#4A90E2' }}>Доходы</Button>
          </Link>
          <Link to="/expenses" style={{ margin: '0 15px' }}>
            <Button variant="text" sx={{ color: '#4A90E2' }}>Расходы</Button>
          </Link>
        </Box>

        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#4A90E2',
            textAlign: 'center',
            marginBottom: 3,
          }}
        >
          Финансовая панель
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: '#555',
            textAlign: 'center',
            marginBottom: 3,
            fontWeight: 'normal',
          }}
        >
          Добро пожаловать! Вот ваши финансовые данные за последние несколько месяцев:
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 3, border: '1px solid #ddd', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#4A90E2', fontWeight: 'bold' }}>
                Добавить доход
              </Typography>
              <form onSubmit={handleIncomeSubmit}>
                <TextField
                  label="Сумма"
                  name="amount"
                  value={income.amount}
                  onChange={handleIncomeChange}
                  fullWidth
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Описание"
                  name="description"
                  value={income.description}
                  onChange={handleIncomeChange}
                  fullWidth
                  required
                  sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" type="submit" sx={{ width: '100%' }}>
                  Добавить доход
                </Button>
              </form>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 3, border: '1px solid #ddd', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#4A90E2', fontWeight: 'bold' }}>
                Добавить расход
              </Typography>
              <form onSubmit={handleExpenseSubmit}>
                <TextField
                  label="Сумма"
                  name="amount"
                  value={expense.amount}
                  onChange={handleExpenseChange}
                  fullWidth
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Описание"
                  name="description"
                  value={expense.description}
                  onChange={handleExpenseChange}
                  fullWidth
                  required
                  sx={{ marginBottom: 2 }}
                />
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <InputLabel>Категория</InputLabel>
                  <Select
                    name="category"
                    value={expense.category}
                    onChange={handleExpenseChange}
                    label="Категория"
                    required
                  >
                    <MenuItem value="Food">Еда</MenuItem>
                    <MenuItem value="Transport">Транспорт</MenuItem>
                    <MenuItem value="Entertainment">Развлечения</MenuItem>
                    <MenuItem value="Utilities">Коммунальные услуги</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" type="submit" sx={{ width: '100%' }}>
                  Добавить расход
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 4, width: '100%' }}>
          <Typography variant="h6" sx={{ color: '#4A90E2', fontWeight: 'bold', marginBottom: 2 }}>
            История доходов
          </Typography>
          {incomeHistory.length === 0 ? (
            <Typography sx={{ color: '#555' }}>История доходов пуста</Typography>
          ) : (
            <Box>
              {incomeHistory.map((item, index) => (
                <Box key={index} sx={{ padding: 2, border: '1px solid #ddd', borderRadius: 2, marginBottom: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Сумма: {item.amount} ₽
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    Описание: {item.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          <Typography variant="h6" sx={{ color: '#4A90E2', fontWeight: 'bold', marginTop: 4, marginBottom: 2 }}>
            История расходов
          </Typography>
          {expenseHistory.length === 0 ? (
            <Typography sx={{ color: '#555' }}>История расходов пуста</Typography>
          ) : (
            <Box>
              {expenseHistory.map((item, index) => (
                <Box key={index} sx={{ padding: 2, border: '1px solid #ddd', borderRadius: 2, marginBottom: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Сумма: {item.amount} ₽
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    Описание: {item.description} - Категория: {item.category}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ marginTop: 5, textAlign: 'center' }}>
          <Button
            variant="contained"
            sx={{
              padding: '12px',
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#005BB5',
              },
            }}
          >
            Узнать больше
          </Button>
        </Box>
      </Box>
    </Container>
  );
};


import React, { useState } from 'react';
import { Button, Container, Typography, Box, TextField, Grid } from '@mui/material';

export const Income = () => {
  const [income, setIncome] = useState({ amount: '', description: '' });
  const [totalIncome, setTotalIncome] = useState(0); 

  const handleIncomeChange = (e) => {
    setIncome({ ...income, [e.target.name]: e.target.value });
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(income.amount);
    if (!isNaN(amount)) {
      setTotalIncome((prevTotal) => prevTotal + amount);
    }
    // Reset the form
    setIncome({ amount: '', description: '' });
    console.log('Доход добавлен:', income);
  };

  return (
    <Container
      component="main"
      maxWidth="md"
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
          Доходы
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
          Добавьте ваш доход и просмотрите общую сумму.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12}>
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
                  type="number" 
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
        </Grid>

        <Box sx={{ marginTop: 4, width: '100%' }}>
          <Typography variant="h6" sx={{ color: '#4A90E2', fontWeight: 'bold', marginBottom: 2 }}>
            Общая сумма доходов
          </Typography>
          <Typography variant="h5" sx={{ color: '#4A90E2', fontWeight: 'bold' }}>
            {totalIncome.toFixed(2)} ₽
          </Typography>
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
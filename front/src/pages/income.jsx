import { useState } from 'react';
import { Button, Container, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { Link } from 'react-router-dom'; 

export const Income = () => {
  const [income, setIncome] = useState({ amount: '', description: '', category: '' });
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
    setIncome({ amount: '', description: '', category: '' });
    console.log('Доход добавлен:', income);
  };

  return (
    <Container
      component="main"
      maxWidth="false"
      sx={{
        background: 'linear-gradient(to right, #2A69B3, #6A0DAD)', 
        width: '100%',
        minHeight: '100vh', 
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 4, 
          borderRadius: 4,
          boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: 800, 
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
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <InputLabel>Категория</InputLabel>
                  <Select
                    name="category"
                    value={income.category}
                    onChange={handleIncomeChange}
                    label="Категория"
                    required
                  >
                    <MenuItem value="Salary">Зарплата</MenuItem>
                    <MenuItem value="Freelance">Фриланс</MenuItem>
                    <MenuItem value="Investment">Инвестиции</MenuItem>
                    <MenuItem value="Other">Прочее</MenuItem>
                  </Select>
                </FormControl>
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

        <Box sx={{ marginTop: 5 }}>
          <Button
            variant="outlined"
            component={Link}
            to="/"
            sx={{
              padding: '12px',
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#ddd',
              },
            }}
          >
            Вернуться на главную
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

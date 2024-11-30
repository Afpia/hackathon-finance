import React, { useState } from 'react';
import { Button, Container, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';

export const Income = () => {
  const [income, setIncome] = useState({ amount: '', description: '', category: '' });
  const [incomeHistory, setIncomeHistory] = useState([
    { amount: '5000', description: 'Freelance project', category: 'Freelance' },
    { amount: '1500', description: 'Salary', category: 'Salary' },
  ]);
  const [totalIncome, setTotalIncome] = useState(incomeHistory.reduce((sum, item) => sum + parseFloat(item.amount), 0));

  const [selectedIncome, setSelectedIncome] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleIncomeChange = (e) => {
    setIncome({ ...income, [e.target.name]: e.target.value });
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(income.amount);
    if (!isNaN(amount)) {
      setIncomeHistory((prevHistory) => {
        const newHistory = [...prevHistory, income];
        return newHistory;
      });
      setTotalIncome(prevTotal => prevTotal + amount);
    }
    setIncome({ amount: '', description: '', category: '' });
    console.log('Доход добавлен:', income);
  };

  const handleOpenDialog = (item, isEdit) => {
    setSelectedIncome(item);
    setIsEditing(isEdit);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedIncome(null);
  };

  const handleDeleteIncome = () => {
    setIncomeHistory(prevHistory => prevHistory.filter(item => item !== selectedIncome));
    setTotalIncome(prevTotal => prevTotal - parseFloat(selectedIncome.amount));
    handleCloseDialog();
  };

  const handleEditIncome = () => {
    const updatedHistory = incomeHistory.map(item =>
      item === selectedIncome ? income : item
    );
    setIncomeHistory(updatedHistory);
    setTotalIncome(updatedHistory.reduce((sum, item) => sum + parseFloat(item.amount), 0));
    handleCloseDialog();
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
                  <Typography variant="body2" sx={{ color: '#555' }}>Описание: {item.description}</Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>Категория: {item.category}</Typography>
                  <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined" onClick={() => handleOpenDialog(item, true)}>Редактировать</Button>
                    <Button variant="outlined" color="error" onClick={() => handleOpenDialog(item, false)}>Удалить</Button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? 'Редактировать доход' : 'Удалить доход'}</DialogTitle>
        <DialogContent>
          {isEditing ? (
            <>
              <TextField
                label="Сумма"
                name="amount"
                value={income.amount}
                onChange={handleIncomeChange}
                fullWidth
                sx={{ marginBottom: 2 }}
                type="number"
              />
              <TextField
                label="Описание"
                name="description"
                value={income.description}
                onChange={handleIncomeChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Категория</InputLabel>
                <Select
                  name="category"
                  value={income.category}
                  onChange={handleIncomeChange}
                  label="Категория"
                >
                  <MenuItem value="Salary">Зарплата</MenuItem>
                  <MenuItem value="Freelance">Фриланс</MenuItem>
                  <MenuItem value="Investment">Инвестиции</MenuItem>
                  <MenuItem value="Other">Прочее</MenuItem>
                </Select>
              </FormControl>
            </>
          ) : (
            <Typography>Вы уверены, что хотите удалить этот доход?</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button onClick={isEditing ? handleEditIncome : handleDeleteIncome} color="primary">
            {isEditing ? 'Сохранить' : 'Удалить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};


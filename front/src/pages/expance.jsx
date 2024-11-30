import React, { useState } from 'react';
import { Button, Container, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';

export const Expance = () => {
  const [expance, setExpance] = useState({ amount: '', description: '', category: '' });
  const [totalExpance, setTotalExpance] = useState(0);
  const [expanceHistory, setExpanceHistory] = useState([]);
  const [selectedExpance, setSelectedExpance] = useState(null); 
  const [openDialog, setOpenDialog] = useState(false); 
  const [isEditing, setIsEditing] = useState(false); 

  const handleExpanceChange = (e) => {
    setExpance({ ...expance, [e.target.name]: e.target.value });
  };

  const handleExpanceSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(expance.amount);
    if (!isNaN(amount)) {
      setExpanceHistory((prevHistory) => {
        const newHistory = [...prevHistory, expance];
        return newHistory;
      });
      setTotalExpance((prevTotal) => prevTotal + amount);
    }
    setExpance({ amount: '', description: '', category: '' });
    console.log('Расход добавлен:', expance);
  };

  const handleOpenDialog = (item, isEdit) => {
    setSelectedExpance(item);
    setIsEditing(isEdit);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedExpance(null);
  };

  const handleDeleteExpance = () => {
    setExpanceHistory((prevHistory) => prevHistory.filter((item) => item !== selectedExpance));
    setTotalExpance((prevTotal) => prevTotal - parseFloat(selectedExpance.amount));
    handleCloseDialog();
  };

  const handleEditExpance = () => {
    const updatedHistory = expanceHistory.map((item) =>
      item === selectedExpance ? expance : item
    );
    setExpanceHistory(updatedHistory);
    setTotalExpance(
      updatedHistory.reduce((sum, item) => sum + parseFloat(item.amount), 0)
    );
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
          Расходы
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
          Добавьте ваш расход и просмотрите общую сумму.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box sx={{ padding: 3, border: '1px solid #ddd', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#4A90E2', fontWeight: 'bold' }}>
                Добавить расход
              </Typography>
              <form onSubmit={handleExpanceSubmit}>
                <TextField
                  label="Сумма"
                  name="amount"
                  value={expance.amount}
                  onChange={handleExpanceChange}
                  fullWidth
                  required
                  sx={{ marginBottom: 2 }}
                  type="number"
                />
                <TextField
                  label="Описание"
                  name="description"
                  value={expance.description}
                  onChange={handleExpanceChange}
                  fullWidth
                  required
                  sx={{ marginBottom: 2 }}
                />
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <InputLabel>Категория</InputLabel>
                  <Select
                    name="category"
                    value={expance.category}
                    onChange={handleExpanceChange}
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
            Общая сумма расходов
          </Typography>
          <Typography variant="h5" sx={{ color: '#4A90E2', fontWeight: 'bold' }}>
            {totalExpance.toFixed(2)} ₽
          </Typography>
        </Box>

        <Box sx={{ marginTop: 4, width: '100%' }}>
          <Typography variant="h6" sx={{ color: '#4A90E2', fontWeight: 'bold', marginBottom: 2 }}>
            История расходов
          </Typography>
          {expanceHistory.length === 0 ? (
            <Typography sx={{ color: '#555' }}>История расходов пуста</Typography>
          ) : (
            <Box>
              {expanceHistory.map((item, index) => (
                <Box
                  key={index}
                  sx={{ padding: 2, border: '1px solid #ddd', borderRadius: 2, marginBottom: 2 }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Сумма: {item.amount} ₽
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    Описание: {item.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    Категория: {item.category}
                  </Typography>
                  <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined" onClick={() => handleOpenDialog(item, true)}>
                      Редактировать
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleOpenDialog(item, false)}>
                      Удалить
                    </Button>
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
        <DialogTitle>{isEditing ? 'Редактировать расход' : 'Удалить расход'}</DialogTitle>
        <DialogContent>
          {isEditing ? (
            <>
              <TextField
                label="Сумма"
                name="amount"
                value={expance.amount}
                onChange={handleExpanceChange}
                fullWidth
                sx={{ marginBottom: 2 }}
                type="number"
              />
              <TextField
                label="Описание"
                name="description"
                value={expance.description}
                onChange={handleExpanceChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Категория</InputLabel>
                <Select
                  name="category"
                  value={expance.category}
                  onChange={handleExpanceChange}
                  label="Категория"
                >
                  <MenuItem value="Food">Еда</MenuItem>
                  <MenuItem value="Transport">Транспорт</MenuItem>
                  <MenuItem value="Entertainment">Развлечения</MenuItem>
                  <MenuItem value="Utilities">Коммунальные услуги</MenuItem>
                </Select>
              </FormControl>
            </>
          ) : (
            <Typography>Вы уверены, что хотите удалить этот расход?</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button onClick={isEditing ? handleEditExpance : handleDeleteExpance} color="primary">
            {isEditing ? 'Сохранить' : 'Удалить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};


import React from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <Container
      component="main"
      maxWidth={false} 
      className="flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-300"
    >
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          display: 'flex',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.2rem',
            background: 'linear-gradient(to right, #2A69B3, #6A0DAD)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          HackatonFinance
        </Typography>
      </Box>

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
          maxWidth: 400,
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
          Вход в систему
        </Typography>

        <TextField
          label="Логин"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#E0E0E0',
              },
              '&:hover fieldset': {
                borderColor: '#4A90E2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#4A90E2',
              },
            },
          }}
        />

        <TextField
          label="Пароль"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#E0E0E0',
              },
              '&:hover fieldset': {
                borderColor: '#4A90E2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#4A90E2',
              },
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          color="primary"
          sx={{
            mt: 3,
            padding: '12px',
            fontSize: '1rem',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#005BB5',
            },
          }}
        >
          Войти
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 2,
            padding: '12px',
            fontSize: '1rem',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#4A90E2',
              color: '#4A90E2',
            },
          }}
        >
          Забыли пароль?
        </Button>

        <Link to="/signup" style={{ width: '100%' }}>
          <Button
            variant="text"
            fullWidth
            sx={{
              mt: 2,
              padding: '12px',
              fontSize: '1rem',
              textTransform: 'none',
              color: '#4A90E2',
              '&:hover': {
                backgroundColor: '#E0F7FF',
              },
            }}
          >
            Регистрация
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

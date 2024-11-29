import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <Container
      component="main"
      maxWidth={false}
      className="flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-300" // Градиент фона
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
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#4A90E2',
            textAlign: 'center',
            marginBottom: 3,
          }}
        >
          404
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
          Страница не найдена
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#888',
            textAlign: 'center',
            marginBottom: 4,
          }}
        >
          Мы не можем найти запрашиваемую вами страницу. Проверьте URL или вернитесь на главную.
        </Typography>

        <Link to="/" style={{ width: '100%' }}>
          <Button
            variant="contained"
            fullWidth
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
            Вернуться на главную
          </Button>
        </Link>
      </Box>
    </Container>
  );
};


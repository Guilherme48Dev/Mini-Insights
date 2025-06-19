import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';


export default function RegisterPage() {

  // Hook do react-hook-form para controlar o formulário
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = (message, severity = 'success') =>
  setSnackbar({ open: true, message, severity });



  // Envia os dados do formulário para o backend 
  async function onSubmit(data) {
    try {
      await axios.post('http://localhost:3333/auth/register', data);
      showSnackbar('Conta criada com sucesso!');
      navigate('/');
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || 'Erro inesperado',
        'error'
      );
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      {/* Card do formulário de registro */}
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>

        <Typography variant="h5" gutterBottom align="center">
          Criar Conta
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            {...register('name', { required: 'Digite seu nome' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('email', { required: 'Digite seu email' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            {...register('password', { required: 'Digite sua senha' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, borderRadius: '30px', py: 1.2, fontWeight: 'bold' }}
          >
            Registrar
          </Button>

          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Já tem conta? <Link to="/">Entrar</Link>
          </Typography>

        </form>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
}

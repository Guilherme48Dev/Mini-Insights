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

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      await axios.post('http://localhost:3333/auth/register', data);
      alert('Conta criada com sucesso!');
      navigate('/');
    } catch (error) {
      alert('Erro ao registrar: ' + error.response?.data?.message || 'Erro inesperado');
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
    </Box>
  );
}

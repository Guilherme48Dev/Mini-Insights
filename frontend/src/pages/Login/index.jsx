import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { login } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const response = await login(data.email, data.password);
      loginUser(response.user);
      navigate('/dashboard');
    } catch (err) {
      alert('Login inválido!');
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
          Mini Insights
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            Entrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

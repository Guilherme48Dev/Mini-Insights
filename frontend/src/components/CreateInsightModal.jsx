import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function CreateInsightModal({ open, onClose, onCreated }) {
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      await axios.post('http://localhost:3333/insights', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onCreated(); // atualiza a lista
      onClose();   // fecha o modal
    } catch (err) {
      alert('Erro ao criar insight');
      console.error(err);
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Novo Insight
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Título"
            {...register('title', { required: 'Campo obrigatório' })}
            error={!!errors.title}
            helperText={errors.title?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Conteúdo"
            multiline
            rows={4}
            {...register('content', { required: 'Campo obrigatório' })}
            error={!!errors.content}
            helperText={errors.content?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Tags (separadas por vírgula)"
            {...register('tags')}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ py: 1, fontWeight: 'bold' }}
          >
            Criar Insight
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

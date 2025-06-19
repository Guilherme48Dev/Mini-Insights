import {
    Box,
    Modal,
    Typography,
    TextField,
    Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function CreateInsightModal({ open, onClose, onCreated, insight }) {
    const { token } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    // Preenche os campos se for edição
    useEffect(() => {
        if (insight) {
            setValue('title', insight.title);
            setValue('content', insight.content);
            setValue('tags', Array.isArray(insight.tags) ? insight.tags.join(', ') : insight.tags || '');
        } else {
            reset();
        }
    }, [insight, setValue, reset]);


    async function onSubmit(data) {
        const payload = {
            title: data.title,
            content: data.content,
            tags: data.tags,
        };

        try {
            if (insight) {
                // Atualiza insight existente
                await axios.put(`http://localhost:3333/insights/${insight.id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                // Cria novo insight
                await axios.post('http://localhost:3333/insights', payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            onCreated();
            onClose();
        } catch (err) {
            alert('Erro ao salvar insight');
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
                    {insight ? 'Editar Insight' : 'Novo Insight'}
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
                        {insight ? 'Salvar alterações' : 'Criar Insight'}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

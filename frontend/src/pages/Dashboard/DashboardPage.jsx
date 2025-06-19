import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    CircularProgress,
    Button,
    TextField,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import CreateInsightModal from '../../components/CreateInsightModal';

export default function DashboardPage() {
    const { token } = useAuth();
    const [insights, setInsights] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState(null);
    const [searchTag, setSearchTag] = useState('');
    const [editingInsight, setEditingInsight] = useState(null);

    const handleEdit = (insight) => {
        setEditingInsight(insight);
        setOpenModal(true);
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm('Tem certeza que deseja excluir este insight?');
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:3333/insights/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchInsights();
        } catch (err) {
            alert('Erro ao excluir insight');
            console.error(err);
        }
    };


    const fetchInsights = async () => {
        try {
            const response = await axios.get('http://localhost:3333/insights', {
                headers: { Authorization: `Bearer ${token}` },
                params: selectedTag ? { tag: selectedTag } : {},
            });
            setInsights(response.data.insights);
        } catch (err) {
            alert('Erro ao buscar insights');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        setLoading(true);
        fetchInsights();
    }, [token, selectedTag]);


    return (
        <Box sx={{ p: 4, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom>
                Meus Insights
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: '30px',
                        px: 3,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 'bold',
                    }}
                    onClick={() => setOpenModal(true)}
                >
                    + Novo Insight
                </Button>
            </Box>
            <TextField
                label="Filtrar por tag"
                variant="outlined"
                size="small"
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                sx={{ mb: 3 }}
            />


            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3}>
                    {insights
                        .filter(insight => {
                            if (!searchTag) return true;

                            const tags = Array.isArray(insight.tags)
                                ? insight.tags
                                : typeof insight.tags === 'string'
                                    ? insight.tags.split(',').map(t => t.trim())
                                    : [];

                            return tags.some(tag =>
                                tag.toLowerCase().includes(searchTag.toLowerCase())
                            );
                        })
                        .map((insight) => (
                            <Grid item key={insight.id} xs={12} sm={6} md={4}>
                                <Paper elevation={3} sx={{ p: 2 }}>
                                    <Typography variant="h6">{insight.title}</Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {insight.content}
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        {Array.isArray(insight.tags)
                                            ? insight.tags.map((tag, i) => (
                                                <Box
                                                    key={i}
                                                    component="span"
                                                    sx={{
                                                        mr: 1,
                                                        px: 1.5,
                                                        py: 0.5,
                                                        bgcolor: '#e0e0e0',
                                                        borderRadius: '12px',
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    #{tag}
                                                </Box>
                                            ))
                                            : typeof insight.tags === 'string' &&
                                            insight.tags.split(',').map((tag, i) => (
                                                <Box
                                                    key={i}
                                                    component="span"
                                                    sx={{
                                                        mr: 1,
                                                        px: 1.5,
                                                        py: 0.5,
                                                        bgcolor: '#e0e0e0',
                                                        borderRadius: '12px',
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    #{tag.trim()}
                                                </Box>
                                            ))}
                                    </Box>
                                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                                        <Button size="small" onClick={() => handleEdit(insight)} color="primary">
                                            Editar
                                        </Button>
                                        <Button size="small" onClick={() => handleDelete(insight.id)} color="error">
                                            Excluir
                                        </Button>
                                    </Box>

                                </Paper>
                            </Grid>
                        ))}
                </Grid>
            )}

            <CreateInsightModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditingInsight(null);
                }}
                onCreated={fetchInsights}
                insight={editingInsight}
            />

        </Box>
    );
}

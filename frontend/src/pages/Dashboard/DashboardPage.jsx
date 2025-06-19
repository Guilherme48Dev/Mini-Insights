import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    CircularProgress,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function DashboardPage() {
    const { token } = useAuth();
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchInsights() {
            try {

                const response = await axios.get('http://localhost:3333/insights', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInsights(response.data.insights);
                console.log('Resposta do backend:', response.data);

                console.log('Token usado na requisição:', token);
            } catch (err) {
                alert('Erro ao buscar insights');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchInsights();
    }, [token]);

    return (
        <Box sx={{ p: 4, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom>
                Meus Insights
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3}>
                    {insights.map((insight) => (
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
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

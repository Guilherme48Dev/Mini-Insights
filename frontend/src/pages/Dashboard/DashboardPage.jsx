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
  const [currentPage, setCurrentPage] = useState(1);
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
        params: {
          tag: selectedTag,
          page: currentPage,
          limit: 10,
        },
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
  }, [token, selectedTag, currentPage]);

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: '#f9f9f9',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1000 }}>
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

        <Box sx={{ flexGrow: 1 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {insights
                .filter((insight) => {
                  if (!searchTag) return true;

                  const tags = Array.isArray(insight.tags)
                    ? insight.tags
                    : typeof insight.tags === 'string'
                      ? insight.tags.split(',').map((t) => t.trim())
                      : [];

                  return tags.some((tag) =>
                    tag.toLowerCase().includes(searchTag.toLowerCase())
                  );
                })
                .map((insight) => {
                  const parsedTags = Array.isArray(insight.tags)
                    ? insight.tags
                    : insight.tags?.split(',').map((t) => t.trim()) || [];

                  return (
                    <Grid item key={insight.id} xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Paper
                        elevation={4}
                        sx={{
                          minWidth: 300,
                          maxWidth: 300,
                          minHeight: 300,
                          maxHeight: 300,
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxSizing: 'border-box',
                          borderRadius: 2,
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'scale(1.02)',
                          },
                        }}
                      >

                        <Box sx={{ mb: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              wordBreak: 'break-word',
                              mb: 1,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {insight.title.length > 60
                              ? insight.title.slice(0, 57) + '...'
                              : insight.title}
                          </Typography>

                          <Box
                            sx={{
                              height: 64,
                              overflowY: 'auto',
                              pr: 1,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                fontSize: '0.875rem',
                              }}
                            >
                              {insight.content}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                          {parsedTags.slice(0, 8).map((tag, i) => (
                            <Box
                              key={i}
                              component="span"
                              sx={{
                                px: 1.5,
                                py: 0.5,
                                bgcolor: '#e0e0e0',
                                borderRadius: 10,
                                fontSize: '0.75rem',
                              }}
                            >
                              #{tag}
                            </Box>
                          ))}
                        </Box>


                        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                          <Button size="small" onClick={() => handleEdit(insight)} color="primary">
                            Editar
                          </Button>
                          <Button size="small" onClick={() => handleDelete(insight.id)} color="error">
                            Excluir
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>

                  );
                })}
            </Grid>
          )}
        </Box>

        <Box
          sx={{
            mt: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            sx={{
              textTransform: 'none',
              borderRadius: '30px',
              fontWeight: 600,
              px: 3,
            }}
          >
            ← Anterior
          </Button>

          <Typography
            variant="body2"
            sx={{ mx: 2, fontWeight: 500 }}
          >
            Página {currentPage}
          </Typography>

          <Button
            variant="contained"
            size="small"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            sx={{
              textTransform: 'none',
              borderRadius: '30px',
              fontWeight: 600,
              px: 3,
            }}
          >
            Próxima →
          </Button>
        </Box>
      </Box>

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

import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';


export default function InsightGrid({
  insights,
  loading,
  searchTag,
  handleEdit,
  handleDelete,
}) {

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [insightToDelete, setInsightToDelete] = useState(null);
  const handleConfirmDelete = () => {
    if (!insightToDelete) return;
    handleDelete(insightToDelete.id); // chama a função pai
    setDeleteDialogOpen(false);       // fecha o modal
    setInsightToDelete(null);         // limpa o selecionado
  };



  const showSnackbar = (message, severity = 'info') =>
    setSnackbar({ open: true, message, severity });

  // Filtra os insights com base na tag digitada (searchTag)
  const filteredInsights = insights.filter((insight) => {
    if (!searchTag) return true;

    // Converte as tags em array se necessário
    const tags = Array.isArray(insight.tags)
      ? insight.tags
      : typeof insight.tags === 'string'
        ? insight.tags.split(',').map((t) => t.trim())
        : [];

    // Verifica se alguma tag contém o texto buscado
    return tags.some((tag) =>
      tag.toLowerCase().includes(searchTag.toLowerCase())
    );
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      {loading ? (
        <CircularProgress />
      ) : (

        <Grid container spacing={3}>
          {filteredInsights.map((insight) => {

            // Garante que as tags estejam em formato de array
            const parsedTags = Array.isArray(insight.tags)
              ? insight.tags
              : insight.tags?.split(',').map((t) => t.trim()) || [];

            return (
              <Grid
                item
                key={insight.id}
                xs={12}
                sm={6}
                md={4}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
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
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' },
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
                      {/* Limita visualmente o título a 60 caracteres */}
                      {insight.title.length > 60
                        ? insight.title.slice(0, 57) + '...'
                        : insight.title}
                    </Typography>

                    <Box sx={{ height: 64, overflowY: 'auto', pr: 1 }}>
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

                  {/* Exibe as tags do insight */}
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
                    <Button
                      size="small"
                      color="error"
                      onClick={() => {
                        setInsightToDelete(insight); // ou só insight.id se preferir
                        setDeleteDialogOpen(true);
                      }}

                    >
                      Excluir
                    </Button>
                  </Box>

                </Paper>
              </Grid>
            );
          })}
          <ConfirmDeleteDialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            onConfirm={handleConfirmDelete}

            title={insightToDelete?.title}
          />

        </Grid>
      )}
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

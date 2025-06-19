import { Box, Button, Typography } from '@mui/material';

// Componente de paginação simples: mostra página atual e botões para navegar
export default function PaginationControls({ currentPage, setCurrentPage }) {
  return (
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
  );
}

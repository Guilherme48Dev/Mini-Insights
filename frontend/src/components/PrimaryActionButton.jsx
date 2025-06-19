import { Box, Button } from '@mui/material';

export default function PrimaryActionButton({ onClick, children }) {
  return (
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
        onClick={onClick}
      >
        {children}
      </Button>
    </Box>
  );
}

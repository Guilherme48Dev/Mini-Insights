import { Typography } from '@mui/material';

export default function SectionTitle({ children }) {
  return (
    <Typography variant="h4" gutterBottom>
      {children}
    </Typography>
  );
}

import { TextField } from '@mui/material';

export default function SearchTagInput({ value, onChange }) {
  return (
    <TextField
      label="Filtrar por tag"
      variant="outlined"
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ mb: 3 }}
    />
  );
}

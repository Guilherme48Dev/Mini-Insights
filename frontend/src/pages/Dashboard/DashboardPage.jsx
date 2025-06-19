import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import SectionTitle from '../../components/SectionTitle';
import PrimaryActionButton from '../../components/PrimaryActionButton';
import SearchTagInput from '../../components/SearchTagInput';
import PaginationControls from '../../components/PaginationControls';
import InsightGrid from '../../components/InsightGrid';
import CreateInsightModal from '../../components/CreateInsightModal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function DashboardPage() {
  const { token } = useAuth();
  const [insights, setInsights] = useState([]);
  const [searchTag, setSearchTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editingInsight, setEditingInsight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = (message, severity = 'success') =>
    setSnackbar({ open: true, message, severity });

  const handleEdit = (insight) => {
    setEditingInsight(insight);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este insight?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3333/insights/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchInsights();
      showSnackbar('Insight excluído com sucesso!');
    } catch (err) {
      console.error(err);
      showSnackbar('Erro ao excluir insight', 'error');
    }
  };

  const fetchInsights = async () => {
    try {
      const response = await axios.get('http://localhost:3333/insights', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage, limit: 10 },
      });
      setInsights(response.data.insights);
    } catch (err) {
      console.error(err);
      showSnackbar('Erro ao buscar insights', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchInsights();
  }, [token, currentPage]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingInsight(null);
  };

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
        <SectionTitle>Meus Insights</SectionTitle>

        <PrimaryActionButton onClick={() => setOpenModal(true)}>
          + Novo Insight
        </PrimaryActionButton>

        <SearchTagInput value={searchTag} onChange={setSearchTag} />

        <InsightGrid
          insights={insights}
          loading={loading}
          searchTag={searchTag}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <PaginationControls
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Box>

      <CreateInsightModal
        open={openModal}
        onClose={handleCloseModal}
        onCreated={fetchInsights}
        insight={editingInsight}
        setSnackbar={setSnackbar}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

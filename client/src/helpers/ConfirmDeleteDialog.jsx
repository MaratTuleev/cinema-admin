import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'

const ConfirmDeleteDialog = ({ open, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Удаление категории</DialogTitle>
    <DialogContent>Вы уверены, что хотите удалить эту категорию? Это действие необратимо.</DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Отмена</Button>
      <Button onClick={onConfirm} color="error">Удалить</Button>
    </DialogActions>
  </Dialog>
)

export default ConfirmDeleteDialog
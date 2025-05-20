import { Alert, Snackbar } from '@mui/material'

const InfoSnackbar = ({text, isOpen, onClose}) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} sx={{width: '100%'}}>
        {text}
      </Alert>
    </Snackbar>
  )
}

export default InfoSnackbar
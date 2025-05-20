import React from 'react'
import Home from './pages/Home'
import { Container, CssBaseline, Typography } from '@mui/material'

function App() {
  return (
    <>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <Typography variant="h3">
          Админка кинотеатра
        </Typography>
        <Home />
      </Container>
    </>
  )
}

export default App
import React from 'react'
import { AppBar, Toolbar, Box, Button} from '@mui/material'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const pages = ['Cuaderno', 'Inventario', 'Reportes']
const Header = () => {
  return (
    <Box>
    <AppBar position='static'>
        <Toolbar>
          <AccountBalanceIcon sx = {{mr:1}}></AccountBalanceIcon>
          {pages.map((page) => (
            <Button key={page} color='inherit' variant='outlined' sx={{m:1}}>
              {page}
            </Button>
            ))}
        </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Header

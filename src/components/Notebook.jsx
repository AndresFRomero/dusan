import React from 'react'
import '../styles/Notebook.css'

import { Box, Paper, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const pedidos = [
    { "cliente": "Andrés", "productos": [{ "nombre": "vidrio", "largo": 50, "ancho": 50 }] },
    { "cliente": "Andrés", "productos": [{ "nombre": "vidrio", "largo": 50, "ancho": 50 }] },
    { "cliente": "Andrés", "productos": [{ "nombre": "vidrio", "largo": 50, "ancho": 50 }] }]

const Notebook = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <div className='first_block' ></div>
            {/* Pedidos y Cotizaciones */}
            <Box sx={{ width:'35%', boxSizing:'border-box', p:2}}>
                <Typography variant="h6" fontWeight={600} sx={{mb: 2 }}>
                    Pedidos y Cotizaciones
                </Typography>
                <Button variant='outlined' sx={{ width: '100%', justifyContent: 'center' }}>
                    <AddIcon></AddIcon>
                </Button>
                {pedidos.map((pedido, idx) =>
                    <Paper  sx={{ mt:2, mb: 2, p: 2}} elevation={5}>
                        {JSON.stringify(pedido)}
                    </Paper>
                )}
            </Box>
            <Box sx={{ width:'65%',boxSizing:'border-box', p: 2 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Ordenes Pagadas
                </Typography>
                <Button variant='outlined' sx={{ justifyContent: 'center' }}>
                    <AddIcon></AddIcon>
                </Button>
                {pedidos.map((pedido, idx) =>
                    <Paper variant={"outlined"} sx={{mt:1, mb: 1, p: 2}} elevation={3}>
                        {JSON.stringify(pedido)}
                    </Paper>
                )}
            </Box>
        </Box>
    )
}

export default Notebook

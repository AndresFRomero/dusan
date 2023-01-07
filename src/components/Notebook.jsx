import React from 'react'
import '../styles/Notebook.css'

import {
    Box, Paper, Typography, Button,
    IconButton, TextField, FormControl, Select
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ForwardIcon from '@mui/icons-material/Forward';
import EditIcon from '@mui/icons-material/Edit';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useState } from 'react';

function currencyFormat(num) {
    return '$' + Number(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const timeOptions = { 
    month:'long',
    day:'2-digit',
    hour12: false,
    hour: "2-digit",
    minute: "2-digit" }

const pedidos = [{
    "cliente": "Andrés Felipe Romero",
    "fecha": "4 de Enero 08:45",
    "gran_sub_total": 122000,
    "descuentos": 5000,
    "iva": 22000,
    "total_a_pagar": 240000,
    "productos": [
        { "nombre": "Azul Reflectivo", "largo": 50, "ancho": 50, "unidades": 1, "precio": 20329, "sub_total": 35000 },
        { "nombre": "Transparente", "largo": 50, "unidades": 2, "ancho": 50, "precio": 200, "sub_total": 102100 }]
}]


const Notebook = () => {
    const [addOrder, setAddOrder] = useState(false)

    const handleAddOrder = (e) => {
        e.preventDefault()
        setAddOrder(!addOrder)
    }

    const handleSaveOrder = (e) => {
        e.preventDefault()
        setAddOrder(!addOrder)
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <div className='first_block' ></div>
            {/* Pedidos y Cotizaciones */}
            <Box sx={{ width: '45%', boxSizing: 'border-box', p: 2 }}>
                <Typography noWrap={true} variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Pedidos y Cotizaciones
                </Typography>
                <Button variant='outlined' disabled={addOrder}
                    sx={{ width: '100%', justifyContent: 'center' }}
                    onClick={(e) => handleAddOrder(e)}>
                    <AddIcon></AddIcon>
                </Button>
                {addOrder &&
                    <Paper sx={{ mt: 2, p:2 }} elevation={5}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <TextField
                                    sx={{fontWeight:600}}
                                    variant='standard'
                                    margin="none"
                                    label="Cliente"
                                    size="small"
                                />
                                <Typography variant='overline'>
                                    {new Date().toLocaleString("es-CO", timeOptions)}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2 }}>
                            <Button onClick={(e) => handleSaveOrder(e)} variant='contained'> Guardar </Button>
                            <Button onClick={(e) => handleAddOrder(e)} variant='outlined'> Cancelar </Button>
                        </Box>
                    </Paper>
                }
                {pedidos.map((pedido, idx) =>
                    <Paper sx={{ mt: 2, mb: 2, p: 2 }} elevation={5}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {/* Nombre y Fechca del cliente */}
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight={700}>
                                        {pedido.cliente}
                                    </Typography>
                                    <Typography variant='overline'>
                                        {pedido.fecha}
                                    </Typography>
                                </Box>
                                <Box>
                                    <IconButton>
                                        <DeleteIcon></DeleteIcon>
                                    </IconButton>
                                    <IconButton>
                                        <EditIcon></EditIcon>
                                    </IconButton>
                                    <IconButton>
                                        <CheckCircleIcon></CheckCircleIcon>
                                    </IconButton>
                                    <IconButton>
                                        <ForwardIcon></ForwardIcon>
                                    </IconButton>
                                </Box>
                            </Box>

                            {/* Productos */}
                            <TableContainer sx={{ mt: 2 }} component={Paper} variant='outlined'>
                                <Table size='small'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Producto</TableCell>
                                            <TableCell align='center'>Ancho</TableCell>
                                            <TableCell align='center'>Largo</TableCell>
                                            <TableCell align='right'>Precio</TableCell>
                                            <TableCell align='center'>Uds</TableCell>
                                            <TableCell align='right'>SubTotal</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pedido.productos.map((producto, idx2) =>
                                            <TableRow
                                                key={producto.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell component="th" scope="row">{producto.nombre}</TableCell>
                                                <TableCell align='center'>{producto.ancho}</TableCell>
                                                <TableCell align='center'>{producto.largo}</TableCell>
                                                <TableCell align='right'>{currencyFormat(producto.precio)}</TableCell>
                                                <TableCell align='center'>{producto.unidades}</TableCell>
                                                <TableCell align='right'>{currencyFormat(producto.sub_total)}</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Typography align='right' sx={{ mt: 2 }} fontWeight={700}>
                                Total a pagar: {currencyFormat(pedido.total_a_pagar)}
                            </Typography>
                        </Box>
                    </Paper>
                )}
            </Box>
            <Box sx={{ width: '55%', boxSizing: 'border-box', p: 2 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Ordenes Pagadas
                </Typography>

            </Box>
        </Box>
    )
}

export default Notebook

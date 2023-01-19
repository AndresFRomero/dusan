import React from 'react'
import '../styles/Notebook.css'

import {
    Box, Paper, Typography, Button,
    IconButton, TextField, Backdrop, FormControl
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ForwardIcon from '@mui/icons-material/Forward';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';

import { useState } from 'react';

function currencyFormat(num) { 
    return '$' + Number(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const noobProduct = {
    "nombre": "",
    "ancho": "",
    "largo": "",
    "unidades": "",
    "precio": "",
    "sub_total": "",
    "precio_lamina": "",
    "precio_m2": ""
}

const timeOptions = {
    month: 'long',
    day: '2-digit',
    hour12: false,
    hour: "2-digit",
    minute: "2-digit"
}

var pedidos = [{
    "cliente": "Andrés Felipe Romero",
    "fecha": "4 de Enero 08:45",
    "gran_sub_total": 122000,
    "descuentos": 5000,
    "iva": 22000,
    "total_a_pagar": 240000,
    "productos": [
        { "nombre": "Azul Reflectivo 6mm", "largo": 50, "ancho": 50, "unidades": 1, "precio": 20329, "sub_total": 35000 },
        { "nombre": "Transparente", "largo": 50, "unidades": 2, "ancho": 50, "precio": 200, "sub_total": 102100 }]
}]

const inventario = [
    { "nombre": "Azul Reflectivo", "ancho": 50, "largo": 50, "costo": 17000, "precio_lamina": 20000, "precio_m2": 50000 },
    { "nombre": "Un nombre muy largo, asi es","costo": 15000, "precio_lamina": 20000, "precio_m2": 50000 },
    { "nombre": "Azul Transparente", "costo": 17000, "precio_lamina": 20000, "precio_m2": 50000 },
    { "nombre": "Verde Esmerilado", "costo": 21000, "precio_lamina": 40000, "precio_m2": 10000 }
]

const defaultProps = {
    options: inventario,
    getOptionLabel: (option) => option.nombre,
};

const Notebook = () => {
    const [addOrder, setAddOrder] = useState(false)
    const [newOrder, setNewOrder] = useState([])

    const handleAddOrder = (e) => {
        e.preventDefault()
        setAddOrder(!addOrder)
    }

    const handleSaveOrder = (e) => {
        e.preventDefault()
        const fullNewOrder = {"cliente": "Andrés Felipe Romero",
        "fecha": "4 de Enero 08:45",
        "gran_sub_total": 122000,
        "descuentos": 5000,
        "iva": 22000,
        "total_a_pagar": 240000,
        "productos": [...newOrder]
        }
        pedidos = [...pedidos, fullNewOrder]
        setAddOrder(!addOrder)
        setNewOrder([])
    }

    const handleCloseNewOrder = (e) => {
        e.preventDefault()
        setAddOrder(!addOrder)
        setNewOrder([])
    }

    const handleSelectProduct = (e, idx, newValue) => {
        console.log(idx, newValue)
        const productToAdd = {
            "nombre": newValue.nombre,
            "largo": newValue.largo,
            "ancho": newValue.ancho,
            "precio": newValue.precio_lamina,
            "unidades": 1,
            "sub_total": newValue.precio_lamina
        }
        if (idx === newOrder.length){
            setNewOrder([...newOrder,productToAdd])
        }
        else {
            const updateNewOrder = [...newOrder]
            updateNewOrder[idx] = productToAdd
            setNewOrder(updateNewOrder)
        }
    }

    const handleChangeProductData = (e, idx, attr) => {
        const actu = [...newOrder]
        console.log(actu)
        actu[idx][attr] = e.target.value
        setNewOrder(actu)
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

                {/* NEW ORDER IF CLICK */}
                {addOrder &&
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={addOrder}
                >
                    <Paper sx={{p:2, width: '70%', maxHeight: '70vh', overflow:'auto'}} elevation={5}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <TextField
                                    margin="none"
                                    label="Cliente"
                                    size="small"
                                    />
                                <Typography variant='overline'>
                                    {new Date().toLocaleString("es-CO", timeOptions)}
                                </Typography>
                            </Box>
                        </Box>
                        {/* Posible products */}
                        <TableContainer sx={{ mt: 2}}>
                            <Table size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{minWidth:400, flexGrow:1}} align='left'>Producto</TableCell>
                                        <TableCell align='center'>Ancho</TableCell>
                                        <TableCell align='center'>Largo</TableCell>
                                        <TableCell align='center'>Precio</TableCell>
                                        <TableCell align='center'>Uds</TableCell>
                                        <TableCell align='right'>SubTotal</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {[...newOrder,noobProduct].map((producto, idx) =>
                                    <TableRow key={idx}>
                                        <TableCell align='left' sx={{border:0}}>
                                            <Autocomplete
                                                {...defaultProps}
                                                freeSolo
                                                renderInput={(params) => <TextField {...params} label="" />}
                                                onChange={(e, newValue) => handleSelectProduct(e,idx,newValue)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align='center' sx={{border:0}}>
                                            <TextField
                                                value={producto.ancho}
                                                onChange={(e) => handleChangeProductData(e, idx, "ancho")}
                                                size="small"
                                            >
                                            </TextField>
                                        </TableCell>
                                        <TableCell align='center' sx={{border:0}}>
                                            <TextField
                                                value={producto.largo}
                                                onChange={(e) => handleChangeProductData(e, idx, "largo")}
                                                size="small"
                                            >
                                            </TextField>
                                        </TableCell>
                                        <TableCell align='center' sx={{border:0}}>
                                            <TextField
                                                value={producto.precio}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                                onChange={(e) => handleChangeProductData(e, idx, "precio")}
                                                size="small"
                                            >
                                            </TextField>
                                        </TableCell>
                                        <TableCell align='center' sx={{border:0}}>
                                            <TextField
                                                value={producto.unidades}
                                                onChange={(e) => handleChangeProductData(e, idx, "unidades")}
                                                size="small"
                                                >
                                            </TextField>
                                        </TableCell>
                                        <TableCell align='right' sx={{border:0}}>
                                            {currencyFormat(producto.sub_total)}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2, gap: 2 }}>
                            <Button onClick={(e) => handleSaveOrder(e)} variant='contained'> Guardar </Button>
                            <Button onClick={(e) => handleCloseNewOrder(e)} variant='outlined'> Cancelar </Button>
                        </Box>
                    </Paper>
                </Backdrop>
                }

                {/* Pedidos ya guardados */}
                {pedidos.map((pedido, idx) =>
                    <Paper key={idx} sx={{ mt: 2, mb: 2, p: 2 }} elevation={5}>
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
                                            <TableCell align='left'>Producto</TableCell>
                                            <TableCell align='center'>Ancho</TableCell>
                                            <TableCell align='center'>Largo</TableCell>
                                            <TableCell align='right'>Precio</TableCell>
                                            <TableCell align='center'>Uds</TableCell>
                                            <TableCell align='right'>SubTotal</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pedido.productos.map((producto, idx2) =>
                                            <TableRow key={idx2}>
                                                <TableCell align='left'>{producto.nombre}</TableCell>
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

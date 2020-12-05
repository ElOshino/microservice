const { Router } = require('express');
const router = Router();

const {   
     updateLibroDisponibles,
     updateRevistasPersonalDisponibles,
     updateLibrosPersonalDisponibles
     } = require('../controllers/reservarLibro.controller');
const { render } = require('../server');


router.post('/reservar/libro-mienbro',updateLibroDisponibles );
router.post('/reservar/libro-personal',updateLibrosPersonalDisponibles );
router.post('/reservar/revista-personal', updateRevistasPersonalDisponibles);
//get all notes
router.get('/revistas/libro-personal', );


router.get('/revistas/edit/:id', );

//edit
router.put('/revistas/edit/:id', );

//delete
router.delete('/revistas/delete/:id', );

module.exports = router

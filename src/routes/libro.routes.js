const { Router } = require('express');
const router = Router();

const { 
     
    createNewLibro,
    ObtenerLibros,
    ObtenerLibro,
    updateLibroDisponibles, 
    deleteLibro,  } = require('../controllers/libro.controller');
const { render } = require('../server');



router.post('/libros/new-libro', createNewLibro);

//get all notes
router.get('/libros', ObtenerLibros);


router.get('/libros/edit/:id', ObtenerLibro);

//edit
router.get('/libros/edit/:id', updateLibroDisponibles);

//delete
router.delete('/libros/delete/:id', deleteLibro);

module.exports = router

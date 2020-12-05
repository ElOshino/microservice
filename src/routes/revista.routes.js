const { Router } = require('express');
const router = Router();

const {      
    createNewRevista,
    ObtenerRevistas,
    ObtenerRevista,
    updateRevistaDisponibles, 
    deleteRevista,  } = require('../controllers/revista.controller');
const { render } = require('../server');


router.post('/revistas/new-revista', createNewRevista);

//get all notes
router.get('/revistas', ObtenerRevistas);


router.get('/revistas/edit/:id', ObtenerRevista);

//edit
router.put('/revistas/edit/:id', updateRevistaDisponibles);

//delete
router.delete('/revistas/delete/:id', deleteRevista);

module.exports = router

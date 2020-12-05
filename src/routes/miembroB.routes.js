const { Router } = require('express');
const router = Router();

const {      
    createNewMiembro,
    ObtenerMiembros,
    ObtenerMiembro,
    updateMiembro, 
    deleteMiembro,  } = require('../controllers/miembroB.controller');
const { render } = require('../server');


router.post('/miembros/new-miembro', createNewMiembro);

//get all notes
router.get('/miembros', ObtenerMiembros);


router.get('/miembros/edit/:id', ObtenerMiembro);

router.put('/miembros/edit/:id', updateMiembro);

//delete
router.delete('/miembros/delete/:id', deleteMiembro);

module.exports = router

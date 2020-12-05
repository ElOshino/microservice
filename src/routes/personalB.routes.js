const { Router } = require('express');
const router = Router();

const {      
    createNewPersonal,
    ObtenerPersonal, 
    ObtenerPersonals, 
    updatePersonal,
    deletePersonal,  } = require('../controllers/personalB.controller');
const { render } = require('../server');


router.post('/personal/new-personal', createNewPersonal);

//get all notes
router.get('/personal', ObtenerPersonals);


router.get('/personal/edit/:id', ObtenerPersonal);

router.put('/personal/edit/:id', updatePersonal);

//delete
router.delete('/personal/delete/:id', deletePersonal);

module.exports = router

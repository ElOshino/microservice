const { Router } = require('express');
const router = Router();

const { 
    inicio, 
    createNewNote, 
    renderNotes, 
    renderEditForm, 
    updateNote, 
    deleteNote } = require('../controllers/notes.controller');
const { render } = require('../server');


router.get('/', inicio);

router.post('/notes/new-note', createNewNote);

//get all notes
router.get('/notes', renderNotes);


//edit
router.get('/notes/edit/:id', renderEditForm);

router.put('/notes/edit/:id', updateNote);

//delete
router.delete('/notes/delete/:id', deleteNote);

module.exports = router

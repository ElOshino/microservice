const notesCtrl = {};

const Note = require('../models/Note');
const { request } = require('../server');

notesCtrl.inicio = (req, res) => {
    res.send('microservicio Arriba');
};


notesCtrl.createNewNote = async (req, res) => {

    const { title, description } = req.body;
    const newNote = new Note({ title, description });
    await newNote.save().then(
        res.send({ status: 'SUCCESS' })
    ).catch(
        error => res.status(500).send(error)
    );

    
};

notesCtrl.renderNotes = async (req, res) => {
    await Note.find().then(notas => {
        const newNotaObject = {
            nota: notas.map(data => {
                return {
                    id: data.id,
                    title: data.title,
                    description: data.description
                }
            })
        }
        res.send({ nota: newNotaObject.nota })
    }).catch(error => res.status(500).send(error));
};

notesCtrl.renderEditForm = async (req, res) => {
    await Note.findById(req.params.id).then(nota => {
        const newNotaObject = {
            id: nota.id,
            title: nota.title,
            description: nota.description
        }
        res.send({ nota: newNotaObject })
    }).catch(error => res.status(500).send(error))
};

notesCtrl.updateNote = async (req, res) => {
    const { title, description } = req.body;
    console.log(req.body)
    await Note.findByIdAndUpdate(req.params.id, { title, description }).then(
        res.send({ status: 'SUCCESS' })
    ).catch(
        error => res.status(500).send(error)
    );
};

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id).then(
        res.send({ status: 'SUCCESS' })
    ).catch(
        error => res.status(500).send(error)
    );
};
module.exports = notesCtrl;
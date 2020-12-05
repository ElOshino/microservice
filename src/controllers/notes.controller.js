const notesCtrl = {};

const Note = require('../models/Note');
const { request } = require('../server');

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: '',
};

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
    await Note.find()
        .exec()
        .then(doc => {
            console.log("From database", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

notesCtrl.renderEditForm = async (req, res) => {
    await Note.findById(req.params.id).then(nota => {
        const newNotaObject = {
            id: nota.id,
            title: nota.title,
            description: nota.description
        }
        console.log({ nota: newNotaObject })
        res.status(200).json({ nota: newNotaObject })
    }).catch(error => console.log(error))
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
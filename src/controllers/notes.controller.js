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

notesCtrl.updateLibroDisponibles = async (req, res) => {
    var opcion = req.body.opcion;
    var newLibroObject;

    console.log('llego al metodo')
    await Libro.findById(req.params.id).then(
        libro => {
            newLibroObject = {
                id: libro.id,
                nombre: libro.nombre,
                copias: libro.copias,
                copiasDisponibles: libro.copiasDisponibles
            }
        }).catch(error => console.log(error));


    if (opcion == 1) {
        if (newLibroObject.copiasDisponibles == 0) {
            res.status(500).json({ error: 'sin copias disponibles' })
        } else if (newLibroObject.copiasDisponibles >= 1) {
            await Libro.findByIdAndUpdate(req.params.id, {  copiasDisponibles: newLibroObject.copiasDisponibles - 1  })
                .then(
                    res.status(200).json({ indicacion: 'copia de libro retirada' })
                ).catch(
                    error => res.status(500).json(error)
                );
        }
    } else if (opcion == 2) {
        if(newLibroObject.copiasDisponibles >= newLibroObject.copias ){
            res.status(500).json({ error: 'maximo de copias alcanzado' })
        }
        await Libro.findByIdAndUpdate(req.params.id, { $set: { copiasDisponibles: newLibroObject.copiasDisponibles + 1 } })
            .then(
                res.status(200).json({ indicacion: 'copia de libro retirada' })
            ).catch(
                error => res.status(500).json(error)
            );
    }


};
module.exports = notesCtrl;
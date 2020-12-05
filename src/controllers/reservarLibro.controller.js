const ReservaLibrosCtrl = {};
const Libro = require('../models/Libro');
const Revistas = require('../models/Revista');
const MienbroBiBlioteca = require('../models/MienbroBiBlioteca');
const Personal = require('../models/PersonalBiblioteca');
const app = require('../server');
const mongoose = require('mongoose');


ReservaLibrosCtrl.updateLibroDisponibles = async (req, res) => {
    console.log('entro a updateLibroDisponibles')
    const { id, idMiembro, accion } = req.body;
    var newLibroObject;
    await Libro.findById(id).then(
        libro => {
            newLibroObject = {
                id: libro.id,
                nombre: libro.nombre,
                copias: libro.copias,
                copiasDisponibles: libro.copiasDisponibles
            }
        }).catch(error => console.log(error));


    if (accion == 1) {

        if (newLibroObject.copiasDisponibles == 0) {

            res.status(500).json({ error: 'sin copias disponibles' })
        } else if (newLibroObject.copiasDisponibles >= 1) {

            await Libro.findByIdAndUpdate(id, { copiasDisponibles: newLibroObject.copiasDisponibles - 1 })
                .then(
                    console.log('libro retirado', id)
                ).catch(
                    error => res.status(500).send(error)
                );

                await MienbroBiBlioteca.findByIdAndUpdate(idMiembro, { $set: { copiasLibro: mongoose.Types.ObjectId(id) } }).then(
                console.log('libro cargado a ', idMiembro),
                res.status(200).send({ indicacion: 'copia de libro retirada' })
            ).catch(
                error => res.status(500).send(error)
            );
        }
    } else if (accion == 2) {
        await Libro.findByIdAndUpdate(id, { copiasDisponibles: newLibroObject.copiasDisponibles + 1 })
            .then(
            ).catch(
                error => res.status(500).send(error)
            );
            await MienbroBiBlioteca.findByIdAndUpdate(idMiembro, { $set: { copiasLibro: undefined  } }).then(
                console.log('libro cargado a ', idMiembro),
                res.status(200).send({ indicacion: 'copia de libro retirada' })
            ).catch(
                error => res.status(500).send(error)
            );


    }
}

ReservaLibrosCtrl.updateLibrosPersonalDisponibles = async (req, res) => {
    console.log('entro a updateLibroDisponibles')
    const { id, idMiembro, accion } = req.body;
    var newLibroObject;
    await Libro.findById(id).then(
        libro => {
            newLibroObject = {
                id: libro.id,
                nombre: libro.nombre,
                copias: libro.copias,
                copiasDisponibles: libro.copiasDisponibles
            }
        }).catch(error => console.log(error));


    if (accion == 1) {

        if (newLibroObject.copiasDisponibles == 0) {

            res.status(500).json({ error: 'sin copias disponibles' })
        } else if (newLibroObject.copiasDisponibles >= 1) {

            await Libro.findByIdAndUpdate(id, { copiasDisponibles: newLibroObject.copiasDisponibles - 1 })
                .then(
                    console.log('libro retirado', id)
                ).catch(
                    error => res.status(500).send(error)
                );

                await Personal.findByIdAndUpdate(idMiembro, { $set: { copiasLibro: mongoose.Types.ObjectId(id) } }).then(
                console.log('libro cargado a ', idMiembro),
                res.status(200).send({ indicacion: 'copia de libro retirada' })
            ).catch(
                error => res.status(500).send(error)
            );
        }
    } else if (accion == 2) {
        await Libro.findByIdAndUpdate(id, { copiasDisponibles: newLibroObject.copiasDisponibles + 1 })
            .then(
            ).catch(
                error => res.status(500).send(error)
            );
            await Personal.findByIdAndUpdate(idMiembro, { $set: { copiasLibro: undefined  } }).then(
                console.log('libro cargado a ', idMiembro),
                res.status(200).send({ indicacion: 'copia de libro retirada' })
            ).catch(
                error => res.status(500).send(error)
            );


    }
}

ReservaLibrosCtrl.updateRevistasPersonalDisponibles = async (req, res) => {
  
    const { id, idMiembro, accion } = req.body;
    console.log(id)
    var newLibroObject;
    await Revistas.findById(id).then(
        libro => {
            newLibroObject = {
                id: libro.id,
                nombre: libro.nombre,
                copias: libro.copias,
                copiasDisponibles: libro.copiasDisponibles
            }
        }).catch(error => console.log(error));


    if (accion == 1) {

        if (newLibroObject.copiasDisponibles == 0) {

            res.status(500).json({ error: 'sin copias disponibles' })
        } else if (newLibroObject.copiasDisponibles >= 1) {

            await Revistas.findByIdAndUpdate(id, { copiasDisponibles: newLibroObject.copiasDisponibles - 1 })
                .then(
                    console.log('libro retirado', id)
                ).catch(
                    error => res.status(500).send(error)
                );

                await Revistas.findByIdAndUpdate(idMiembro, { $set: { copiasRevistas: mongoose.Types.ObjectId(id) } }).then(
                console.log('libro cargado a ', idMiembro),
                res.status(200).send({ indicacion: 'copia de Tevista retirada' })
            ).catch(
                error => res.status(500).send(error)
            );
        }
    } else if (accion == 2) {
        await Revistas.findByIdAndUpdate(id, { copiasDisponibles: copiasRevistas.copiasDisponibles + 1 })
            .then(
            ).catch(
                error => res.status(500).send(error)
            );
            await Personal.findByIdAndUpdate(idMiembro, { $set: { copiasLibro: undefined  } }).then(
                console.log('libro cargado a ', idMiembro),
                res.status(200).send({ indicacion: 'copia de Revista retirada' })
            ).catch(
                error => res.status(500).send(error)
            );


    }
}

module.exports = ReservaLibrosCtrl;
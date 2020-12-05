const LibrosCtrl = {};
const Libro = require('../models/Libro');
const app = require('../server');



LibrosCtrl.createNewLibro = async (req, res) => {

    const { nombre, copias, copiasDisponibles } = req.body;
    const newLibro = new Libro({ nombre, copias, copiasDisponibles });
    await newLibro.save()
        .then(
            res.status(200).json({ status: 'SUCCESS' })
        ).catch(
            error => res.status(500).json(error)
        );
};

LibrosCtrl.ObtenerLibros = async (req, res) => {
    await Libro.find()
        .then(libros => {
            console.log("From database", libros);
            res.status(200).json(libros);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

LibrosCtrl.ObtenerLibro = async (req, res) => {
    await Libro.findById(req.params.id).then(
        libro => {
            newLibroObject = {
                id: libro.id,
                nombre: libro.nombre,
                copias: libro.copias,
                copiasDisponibles: libro.copiasDisponibles
            }
            res.status(200).json(libro);
        }).catch(error => console.log(error));

};


LibrosCtrl.updateLibroDisponibles = async (req, res) => {
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

LibrosCtrl.deleteLibro = async (req, res) => {
    await Libro.findByIdAndDelete(req.params.id).then(
        res.json({ status: 'SUCCESS' })
    ).catch(
        error => res.status(500).json(error)
    );

};





function retirarLibro(theObject) {

};

function devolverLibro(theObject) {
    theObject.make = 'Toyota';
}


module.exports = LibrosCtrl;
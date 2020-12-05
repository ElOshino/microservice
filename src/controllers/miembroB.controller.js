const miembrosBCtrl = {};
const Miembro = require('../models/MienbroBiBlioteca');
const app = require('../server');

miembrosBCtrl.createNewMiembro = async (req, res) => {

    const { nombre, copiasLibro } = req.body;
    const newMiembro = new Miembro({ nombre });
    await newMiembro.save()
        .then(
            res.status(200).json({ status: 'SUCCESS' })
        ).catch(
            error => res.status(500).send(error)
        );
};

miembrosBCtrl.ObtenerMiembros = async (req, res) => {
    await Miembro.find()
        .then(miembros => {
            console.log("From database", miembros);
            res.status(200).json(miembros);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

miembrosBCtrl.ObtenerMiembro = async (req, res) => {
    await Miembro.findById(req.params.id).then(
        miembro => {
              newMiembroObject = {
                id: miembro.id,
                nombre: miembro.nombre,
                copiasLibro: miembro.copiasLibro
            }
            res.status(200).json(miembro);
        }).catch(error => console.log(error));
      
};

miembrosBCtrl.updateMiembro = async (req, res) => {
    const { nombre, copiasLibro } = req.body;
    console.log(req.body)
    await Miembro.findByIdAndUpdate(req.params.id, { nombre, copiasLibro}).then(
        res.status(200).json({ status: 'Cambios guardados' })
    ).catch(
        error => res.status(500).send(error)
    );
};

miembrosBCtrl.deleteMiembro = async (req, res) => {
    await Miembro.findByIdAndDelete(req.params.id).then(
        res.send({ status: 'SUCCESS' })
    ).catch(
        error => res.status(500).send(error)
    );

};

module.exports = miembrosBCtrl;
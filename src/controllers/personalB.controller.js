const PersonalBCtrl = {};
const Personal = require('../models/PersonalBiblioteca');
const app = require('../server');

PersonalBCtrl.createNewPersonal = async (req, res) => {

    const { nombre, copiasLibro, copiasRevistas } = req.body;
    const newPersonal = new Personal({ nombre,  copiasLibro: undefined, copiasLibro:undefined });
    await newPersonal.save()
        .then(
            res.status(200).json({ status: 'SUCCESS' })
            
        ).catch(
            error => res.status(500).send(error)
        );
};

PersonalBCtrl.ObtenerPersonals = async (req, res) => {
    await Personal.find()
        .then(personal => {
            console.log("From database", personal);
            res.status(200).json(personal);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

PersonalBCtrl.ObtenerPersonal = async (req, res) => {
    await Personal.findById(req.params.id).then(
        personal => {
              newPersonalObject = {
                id: personal.id,
                nombre: personal.nombre,
                copiasLibro: personal.copiasLibro,
                copiasRevistas: personal.copiasRevistas
            }
            res.status(200).json(personal);
        }).catch(error => console.log(error));
      
};

PersonalBCtrl.updatePersonal = async (req, res) => {
    const { nombre, copiasLibro, copiasRevistas } = req.body;
    console.log(req.body)
    await Personal.findByIdAndUpdate(req.params.id, { nombre, copiasLibro, copiasRevistas}).then(
        res.status(200).json({ status: 'cambios guardados' })
    ).catch(
        error => res.status(500).send(error)
    );
};

PersonalBCtrl.deletePersonal = async (req, res) => {
    await Personal.findByIdAndDelete(req.params.id).then(
        res.send({ status: 'SUCCESS' })
    ).catch(
        error => res.status(500).send(error)
    );

};

module.exports = PersonalBCtrl;
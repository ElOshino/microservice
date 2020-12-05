const RevistasCtrl = {};
const Revista = require('../models/Revista');
const app = require('../server');

RevistasCtrl.createNewRevista = async (req, res) => {

    const { nombre, copias, copiasDisponibles } = req.body;
    const newRevista = new Revista({ nombre, copias, copiasDisponibles });
    await newRevista.save()
        .then(
            res.status(200).json({ status: 'SUCCESS' })
        ).catch(
            error => res.status(500).send(error)
        );
};

RevistasCtrl.ObtenerRevistas = async (req, res) => {
    await Revista.find()
        .then(revistas => {
            console.log("From database", revistas);
            res.status(200).json(revistas);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

RevistasCtrl.ObtenerRevista = async (req, res) => {
    await Revista.findById(req.params.id).then(
        revista => {
              newRevistaObject = {
                id: revista.id,
                nombre: revista.nombre,
                copias: revista.copias,
                copiasDisponibles: revista.copiasDisponibles
            }
            res.status(200).json(revista);
        }).catch(error => console.log(error));
      
};

RevistasCtrl.updateRevistaDisponibles = async (req, res) => {
    const { nombre, copias, copiasDisponibles } = req.body;
    console.log(req.body)
    await Revista.findByIdAndUpdate(req.params.id, { nombre, copias, copiasDisponibles}).then(
        res.status(200).json({ status: 'Cambios guardados' })
    ).catch(
        error => res.status(500).send(error)
    );
};

RevistasCtrl.deleteRevista = async (req, res) => {
    await Revista.findByIdAndDelete(req.params.id).then(
        res.send({ status: 'SUCCESS' })
    ).catch(
        error => res.status(500).send(error)
    );

};

module.exports = RevistasCtrl;
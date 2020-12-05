const {Schema, model, SchemaTypes } = require('mongoose');

const PersonalBibliotecaSchema = new Schema ({
    nombre: {  type: String,  required: true },
    copiasLibro:{type: SchemaTypes.ObjectId, required: false,  default: null },
    copiasRevistas:{type: SchemaTypes.ObjectId, required: false,  default: null }
},{
    timestamps: true
});

module.exports = model('PersonalBiblioteca', PersonalBibliotecaSchema); 
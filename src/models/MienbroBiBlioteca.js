const {Schema, model, SchemaTypes} = require('mongoose');

const MienbroBibliotecaSchema = new Schema ({
    nombre: {  type: String,  required: true },
    copiasLibro:{type: SchemaTypes.ObjectId, required: false }
},{
    timestamps: true
});

module.exports = model('MienbroBibliotecaSchema', MienbroBibliotecaSchema); 
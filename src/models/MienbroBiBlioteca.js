const {Schema, model, SchemaTypes} = require('mongoose');

const MienbroBibliotecaSchema = new Schema ({
    nombre: {  type: String,  required: true, default: null },
    copiasLibro:{type: SchemaTypes.ObjectId, required: false, default: null }
},{
    timestamps: true
});

module.exports = model('MienbroBiblioteca', MienbroBibliotecaSchema); 
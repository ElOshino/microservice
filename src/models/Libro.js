const {Schema, model, SchemaTypes} = require('mongoose');

const LibroSchema = new Schema ({
    nombre: {  type: String,  required: true },
    copias:{type: SchemaTypes.Number, required: true },
    copiasDisponibles:{type: SchemaTypes.Number, required: true }
},{
    timestamps: true
});

module.exports = model('Libro', LibroSchema); 
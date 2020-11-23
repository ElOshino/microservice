const mongoose = require('mongoose');
const MONGODB_URI = `mongodb+srv://Admin:TXIFNvpUFTg8s9F5@cluster0.u2yo7.mongodb.net/biblioteca?retryWrites=true&w=majority`;
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(db => console.log('Database is conected'))
.catch(err =>  console.error(`Error connecting to the database. \n${err}`));



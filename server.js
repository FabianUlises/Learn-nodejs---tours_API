const app = require('./index');
const mongoose = require('mongoose');
// Mongoose db connection
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((conn) => {
    console.log(`mongoose connected to db: ${process.env.MONGO_URI}`);
}).catch((err) => {
    console.log('ERROR', err);
});
// Server Start
const server = app.listen(process.env.PORT, (err) => {
    console.log(`server listening on port: ${process.env.PORT}`);
});
// Unhandled rejections
process.on('unhandledRejection', err => {
    server.close(() => {
        process.exit(1);
    });
});
const app = require('./index');
// Server Start
app.listen(process.env.PORT, (err) => {
    console.log(`server listening on port: ${process.env.PORT}`);
});
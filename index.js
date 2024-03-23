require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const {client, createTables, seed} = require('./db');
const app = express();
const apiRouter = require('./api');

//middleware
app.use(express.json());
app.use(morgan('combined'));

const init = async () =>
{
    await client.connect();
    console.log('connected to database');
    await createTables();
    console.log('tables created');
    await seed(); 
    console.log('database seeded');

    app.listen(process.env.PORT, () => {
        console.log(`server is listening on port ${process.env.PORT}`)
    })
}

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
})

app.use('/api', apiRouter);
init();
const pg = require('pg');
const uuid = require('uuid');
const getVacationData = require('./vacationData.js');

const client = new pg.Client(`postgres://localhost/${process.env.DB_NAME}`);

const createTables = async () => {

    const SQL = /*SQL*/ `
    DROP TABLE IF EXISTS vacations;
    DROP TABLE IF EXISTS places;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users(
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE places(
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE vacations(
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id) NOT NULL,
        place_id UUID REFERENCES places(id) NOT NULL,
        travel_date TIMESTAMP NOT NULL DEFAULT now()
    );`

    await client.query(SQL);
}

const createUser = async (name) => {
    const SQL = /*SQL*/ `INSERT INTO users(id, name) VALUES($1, $2) RETURNING *;`
    const response = await client.query(SQL, [uuid.v4(), name]);
    return response.rows[0];
};

const createPlace = async (name) => {
    const SQL = /*SQL*/ `INSERT INTO places(id, name) VALUES($1, $2) RETURNING *;`
    const response = await client.query(SQL, [uuid.v4(), name]);
    return response.rows[0];
};

const createVacation = async ({user_id, place_id, travel_date}) => {
    const SQL = /*SQL*/ `INSERT INTO vacations(id, user_id, place_id, travel_date) VALUES($1, $2, $3, $4) RETURNING *;`
    const response = await client.query(SQL, [uuid.v4(), user_id, place_id, travel_date]);
    return response.rows[0];
}


const seed = async () => {
    await Promise.all([
        createUser('Lee'),
        createUser('Maddie'),
        createUser('Jane'),
        createUser('Caroline'),
        createUser('James'),
        createUser('Ada'),
        createPlace('Virginia'),
        createPlace('Texas'),
        createPlace('Washington DC'),
        createPlace('California'),
        createPlace('Germany')
    ])

    const users = await fetchUsers();
    const places = await fetchPlaces();
    console.log('users seeded', users);
    console.log('places seeded', places);

    await Promise.all(getVacationData(users, places).map(vacation => createVacation(vacation)));

    const vacations = await fetchVacations();
    console.log('vacations seeded', vacations);

}

const fetchUsers = async () => {
    const SQL = /*SQL*/ `SELECT * FROM users;`
    const response = await client.query(SQL)
    return response.rows;
}

const fetchPlaces = async () => {
    const SQL = /*SQL*/ `SELECT * FROM places;`
    const response = await client.query(SQL)
    return response.rows;
}

const fetchVacations = async () => {
    const SQL = /*SQL*/ `SELECT * FROM vacations;`
    const response = await client.query(SQL)
    return response.rows;
}

const destroyVacation = async ({user_id, id}) => {
    const SQL = /*SQL*/ `DELETE FROM vacations WHERE user_id=$1 AND id=$2;`
    await client.query(SQL, [user_id, id]);
};


module.exports = {
    client,
    createTables,
    createUser,
    createPlace,
    createVacation,
    seed,
    fetchUsers,
    fetchPlaces,
    fetchVacations,
    destroyVacation
}
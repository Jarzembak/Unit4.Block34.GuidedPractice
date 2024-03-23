const router = require('express').Router();
const { fetchUsers, destroyVacation, createVacation } = require('../../db');

router.get('/', async (req, res, next) => {
    try {
        const users = await fetchUsers();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
})

router.delete('/:user_id/vacations/:id', async (req, res, next) => {
    try {
        await destroyVacation({user_id: req.params.user_id, id: req.params.id})
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
})

router.post('/:user_id/vacations', async (req, res, next) => {
    try {
        const vacation = await createVacation({ user_id: req.params.user_id, place_id: req.body.place_id, travel_date: req.body.travel_date});
        res.status(200).send(vacation);
    } catch (error) {
        next(error);
    }
})

module.exports = router;



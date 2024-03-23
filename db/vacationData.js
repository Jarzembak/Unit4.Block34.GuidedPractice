const getVacationData = (users, places) => {
    return [
        {
            user_id: users[0].id,
            place_id: places[0].id,
            travel_date: "2021-06-01",
        },
        {
            user_id: users[1].id,
            place_id: places[1].id,
            travel_date: "2021-06-01",
        },
        {
            user_id: users[2].id,
            place_id: places[2].id,
            travel_date: "2021-06-01",
        },
        {
            user_id: users[3].id,
            place_id: places[3].id,
            travel_date: "2021-06-01",
        },
        {
            user_id: users[4].id,
            place_id: places[4].id,
            travel_date: "2021-06-01",
        },
        {
            user_id: users[5].id,
            place_id: places[0].id,
            travel_date: "2021-06-01",
        },
        {
            user_id: users[0].id,
            place_id: places[1].id,
            travel_date: "2021-06-01",
        },
        {
            user_id: users[1].id,
            place_id: places[2].id,
            travel_date: "2021-06-01",
        },
        {
            user_id: users[2].id,
            place_id: places[3].id,
            travel_date: "2021-06-01",
        },
        {
            user_id: users[3].id,
            place_id: places[4].id,
            travel_date: "2021-06-01",
        },
        {
            user_id: users[4].id,
            place_id: places[0].id,
            travel_date: "2021-06-01",
        },
        {
            user_id: users[5].id,
            place_id: places[1].id,
            travel_date: "2021-06-01",
        },
    ];
};

module.exports = getVacationData;
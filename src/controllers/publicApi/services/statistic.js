const { ObjectID } = require("mongodb");

const setVisitsService = (database) => async (req, res) => {
  const visitsCollection = database.collection("visits");
  const visits = await visitsCollection.findOne({});
  await visitsCollection.updateOne(
    { _id: ObjectID(visits._id) },
    {
      $set: {
        day: visits.day + 1,
        week: visits.week + 1,
        month: visits.month + 1,
      },
    }
  );

  res.sendStatus(200);
};

module.exports = {
  setVisitsService,
};

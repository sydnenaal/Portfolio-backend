const path = require("path");

const { restHandlerWrapper } = require("../../utils");
const { STATIC_PATH } = require("../../constants");

const staticService = restHandlerWrapper({
  checkToken: false,
  callback: async (_, res) => {
    /*const visitsCollection = app.locals.db.collection("visits");
        const visits = await visitsCollection.findOne({});
        const ObjectId = Mongo.ObjectID;

        const { _id, day, week, month } = visits;
        await visitsCollection.updateOne(
        { _id: ObjectId(_id) },
        {
            $set: {
            day: day + 1,
            week: week + 1,
            month: month + 1,
            },
        }
        );*/

    res.sendFile(path.join(STATIC_PATH, "index.html"));
  },
});

module.exports = {
  staticService,
};

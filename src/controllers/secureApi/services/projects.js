const { ObjectID } = require("mongodb");

const deleteProjectService = (database) => async (req, res) => {
  const ids = req.body.data;
  const projectsCollection = database.collection("projects");
  await projectsCollection.delete({
    _id: { $in: ids.map((item) => ObjectID(item)) },
  });
  const projects = await projectsCollection.find({}).toArray();
  const response = JSON.stringify(projects);

  res.send(response);
};

const createProjectService = (database) => async (req, res) => {
  const insertionData = req.body.data;
  const projectsCollection = database.collection("projects");
  await projectsCollection.insertOne(insertionData);
  const projects = await projectsCollection.find({}).toArray();
  const response = JSON.stringify(projects);

  res.send(response);
};

const projectsService = (database) => async (_, res) => {
  const projectsCollection = database.collection("projects");
  const projects = await projectsCollection.find({}).toArray();
  const response = JSON.stringify(projects);

  res.send(response);
};

module.exports = {
  projectsService,
  deleteProjectService,
  createProjectService,
};

const { restHandlerWrapper } = require("../../utils");

const projectsService = (database) =>
  restHandlerWrapper(async (_, res) => {
    const projectsCollection = database.collection("projects");
    const projects = await projectsCollection.find({}).toArray();
    const response = JSON.stringify(projects);

    res.send(response);
  });

module.exports = {
  projectsService,
};

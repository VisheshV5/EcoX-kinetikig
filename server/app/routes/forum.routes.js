const controller = require("../controllers/forum.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/forum/create/:userId", controller.createForum);
  app.get("/api/forum/:forumId", controller.getForumById);

  app.get("/api/forum", controller.getAllForum);
};

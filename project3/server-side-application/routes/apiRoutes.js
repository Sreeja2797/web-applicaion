const router = require("express").Router();
const usersController = require("../controllers/usersController");

router.get("/users", usersController.index, usersController.respondJson, usersController.errorJson);

// Used for error handling
router.use((error, req, res, next) => {
    usersController.errorJson(error, req, res, next);
});

module.exports = router;
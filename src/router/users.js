const router = "express".Router();
const { getUsers, addUser } = require('../controller/users')


router.get("/", getUsers);

module.exports = router;

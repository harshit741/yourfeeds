const router = require("express").Router();
const articleRoutes = require("./articles");
const auth = require('../../Middleware/auth');
// Book routes
router.use("/api/articles",auth, articleRoutes);

module.exports = router;
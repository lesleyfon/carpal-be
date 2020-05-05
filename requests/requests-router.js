const express = require("express");
const router = express.Router();
const requestsPut = require("./requests-put");
const requestsGet = require("./requests-get");
const requestsDelete = require("./requests-delete");
const requestsPost = require("./requests-post");
const { validateRideId, getRideDetail } = require("../Middleware/rides");

router.use("/", requestsGet);
router.use("/", validateRideId(), getRideDetail(), requestsPut);
router.use("/", validateRideId(), requestsDelete);
router.use("/", validateRideId(), requestsPost);

module.exports = router;
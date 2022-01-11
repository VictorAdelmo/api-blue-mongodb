const express = require("express");
const router = express.Router();
const controller = require("../controller/controller")

router.get("/characters", controller.getAllPers);
router.get("/characters/:id", controller.getPerId);
router.post("/characters", controller.cadastrar);
router.put("/characters/:id", controller.updatePerId);
router.delete("/characters/:id",controller.deletePerId);

module.exports = router;


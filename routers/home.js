const { Router } = require("express");

//models
const spaceModel = require("../models").space;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const allSpaces = await spaceModel.findAll();

    if (!allSpaces) {
      res.status(404).send("no spaces found!");
    }

    res.json(allSpaces);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

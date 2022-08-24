const { Router } = require("express");

const router = new Router();

router.get("/", async (req, res, next) => {
  res.send("lallalalala");
});

module.exports = router;

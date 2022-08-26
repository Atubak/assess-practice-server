const authMiddleware = require("../auth/middleware");

const { Router } = require("express");
const router = new Router();

//model
const storyModel = require("../models").story;

router.post("/create/:spaceId", authMiddleware, async (req, res, next) => {
  console.log(req.user);
  const userId = req.user.id;
  const { name, content, imageUrl } = req.body;
  //take the spaceid
  const spaceId = req.params.spaceId;
  try {
    //take the story model and create a new story with all given properties
    const newStory = await storyModel.create({
      name,
      content,
      imageUrl,
      spaceId,
    });

    console.log("right after creating the new story", newStory);

    res.json(newStory);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;

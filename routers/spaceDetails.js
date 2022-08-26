const { Router } = require("express");

const router = new Router();

//middleware
const authMiddleware = require("../auth/middleware");

//model
const spaceModel = require("../models").space;
const storiesModel = require("../models").story;

router.get(`/:id`, async (req, res, next) => {
  //get the param id
  const { id } = req.params;

  try {
    //get the space with id from the db and include all stories
    const spaceWithStories = await spaceModel.findByPk(id, {
      include: { model: storiesModel, where: { spaceId: id } },
    });

    //if it doesnt exist show error
    //also gives error if there is no story associated with user
    //in that case just return the space without stories
    if (!spaceWithStories) {
      const spaceWithoutStories = await spaceModel.findByPk(id);

      if (!spaceWithoutStories) return res.status(400).send("space not found");

      res.json(spaceWithoutStories);
    }

    //send it back
    res.json(spaceWithStories);
  } catch (e) {
    console.log(e.message);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    //find instance of story by id and delete it
    await storiesModel.destroy({ where: { id: id } });
    res.send(`story with id ${id} deleted!`);
  } catch (e) {
    console.log(e.message);
    next(e.message);
  }
});

//endpoint to edit the space properties of a user
router.put(`/:id`, authMiddleware, async (req, res, next) => {
  //id of the space in question
  const { id } = req.params;
  const updatedProperties = req.body;
  console.log("updatedprops in put endpoint", updatedProperties);
  try {
    const updatedSpace = await spaceModel.update(updatedProperties, {
      where: { id: id },
    });
    console.log("updated", updatedSpace);
    //updatedSpace is an array with one element which is the number 1

    //update works, now just need to send it back to redux
    res.send("success!");
  } catch (e) {
    console.log(e.message);
    next(e.message);
  }
});

module.exports = router;

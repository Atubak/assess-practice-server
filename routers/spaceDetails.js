const { Router } = require("express");

const router = new Router();

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
    if (!spaceWithStories) return res.status(404).send("space not found");

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
  }
});

module.exports = router;

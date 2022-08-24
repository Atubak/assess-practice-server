"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("spaces", [
      {
        title: "bingo",
        description: "The purpose of our lives is to be happy. — Dalai Lama",
        backgroundColor: "red",
        color: "white",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
      },
      {
        title: "bango",
        description:
          "Life is what happens when you're busy making other plans. — John Lennon",
        backgroundColor: "beige",
        color: "black",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        title: "bananarama",
        description: "Get busy living or get busy dying. — Stephen King",
        backgroundColor: "green",
        color: "purple",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

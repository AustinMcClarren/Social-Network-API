// const { response } = require('express');
const { User,Thought } = require('../models');

async function friendCount() {
  const numberOfFriends = await User.aggregate().count("friendCount");
  return numberOfFriends;
}



module.exports = {
  // Get all users
  getAllUser(req, res) {
    console.log(users)
    User.find()
      .populate("thoughts")
      .then(async (users) => {
        const userObject = {
          users,
          friendCount: await friendCount(),
        };
        return res.json(userObject);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      });
  },




  // Get a User
  getUserById(req, res) {
    User.findOne({ _id: req.params.UserId })
      .select('-__v')
      .populate("friends")
      .populate("thoughts")
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },




  // Create a User
  createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },




  // Delete a User
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.UserId })
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No User with that ID' })
          : User.deleteMany({ _id: { $in: User.User } })
      )
      .then(() => res.json({ message: 'User and user deleted!' }))
      .catch((err) => res.status(500).json(err));
  },





  // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No User with this id!' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },

    // Add a friend 
    addFriend(req, res) {
      console.log('You are adding an Friend');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true }
      )
        .then((User) =>
          !User
            ? res
                .status(404)
                .json({ message: 'friend could not not be added  :(' })
            : res.json(User)
        )
        .catch((err) => res.status(500).json(err));
    },


    // Remove a friend 
    deleteFriend(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.studentId },
        { $pull: { assignment: { UserId: req.params.friendId } } },
        { runValidators: true, new: true }
      )
        .then((User) =>
          !User
            ? res
                .status(404)
                .json({ message: 'friend could not be deleted!:(' })
            : res.json(User)
        )
        .catch((err) => res.status(500).json(err));
    },
  };



// Export module thought controller
// module.exports = userController;

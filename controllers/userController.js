const {User} = require('../models/index');


module.exports = {
  // Get all thought
  getAllUser(req, res) {
    User.find()
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },




  // Get a User
  getSingleThought(req, res) {
    User.findOne({ _id: req.params.UserId })
      .select('-__v')
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No thought with that ID' })
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
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },

    // Add a friend 
    createFriend(req, res) {
      console.log('You are adding an Friend');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true }
      )
        .then((User) =>
          !User
            ? res
                .status(404)
                .json({ message: 'No thoughts found with that ID  :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },


    // Remove a friend 
    deleteFriend(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.studentId },
        { $pull: { assignment: { UserId: req.params.reactionID } } },
        { runValidators: true, new: true }
      )
        .then((User) =>
          !User
            ? res
                .status(404)
                .json({ message: 'No Friend found with that ID :(' })
            : res.json(User)
        )
        .catch((err) => res.status(500).json(err));
    },
  };



// Export module thought controller
module.exports = userController;

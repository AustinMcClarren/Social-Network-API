const { Thought, User, Reaction } = require('../models/index');

module.exports = {
  // Get all thought
  getAllThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },




  // Get a thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !course
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },




  // Create a thought 
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },




  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : Student.deleteMany({ _id: { $in: thought.User } })
      )
      .then(() => res.json({ message: 'thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },





  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
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




    // Add an reaction 
    createReaction(req, res) {
      console.log('You are adding an reaction');
      console.log(req.body);
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'No thoughts found with that ID  :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },





    // Remove a reaction 
    deleteReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.studentId },
        { $pull: { assignment: { thoughtId: req.params.reactionID } } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'No thoughts found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
  };






// Export module thought controller
// module.exports = thoughtController;




const router = require('express').Router();

const{
    getAllThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

//to: /api/thoughts <GET>
router.route('/').get(getSingleThought);

//to: /api/thoughts/:id <GET, PUT, DELETE>
router.route('/:thoughtId').get(getAllThought).put(updateThought).delete(deleteThought); 

//to: /api/thoughts/:userId <POST>
router.route('/:userId').post(createThought);

//to: /api/thoughts/:thoughtId/reactions <POST>
router.route('/:thoughtId/reactions').post(createReaction);

//to: /api/thoughts/:thoughtId/reactionId <DELETE>
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export module router
module.exports = router;

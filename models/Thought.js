const { Schema, model, Types } = require('mongoose');
const reactionSch = require("./reaction");
const moment = require('moment');




const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: { 
        type: String,
        required: true,
        maxlength: 280 
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const ThoughtSch = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    // reactions: [ReactionSchema]
},

    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSch.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create the Thought model
module.exports = model('Thought', ThoughtSch);

// module.exports = Thought;




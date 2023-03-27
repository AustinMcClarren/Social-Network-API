const { Schema, model } = require('mongoose');
//This line of code imports the Schema and model objects from the Mongoose library in Node.js.


const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trimmed: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/],
        },
        thoughts:{
            type: mongoose.Schema.Types.ObjectId,
            //This code specifies that the data type for a field in a Mongoose schema is an ObjectId.
            ref: 'Thought'
        },
        friends:{
            type: mongoose.Schema.Types.ObjectId,
            //This code specifies that the data type for a field in a Mongoose schema is an ObjectId.
            ref: 'User'   
        },
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
    
    );
    
    //We then define a virtual called friendCount using the virtual() method on the schema. This virtual uses a getter function that returns the length of the friends array field for a given user.
    UserSchema.virtual("friendCount").get(function () {
        return this.friends.length;
    });

    //The code const User = model("User", UserSchema); creates a Mongoose model named User using the model() method
    const User = model("User", UserSchema);
    

    module.exports = User;
    
    
    
    // REQUIRED: When a field is mandatory to be filled then in that case we mention it as required.
    // UNIQUE: A unique index ensures that the indexed fields do not store duplicate values; i.e. enforces uniqueness for the indexed fields
    // TRIMMED: Removes white spaces
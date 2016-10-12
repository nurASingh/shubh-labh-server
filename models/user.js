var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({    
    name:  {
        type: Schema.Types.String,
        ref: 'users',
        required: true 
    },
    password:  {
        type: Schema.Types.String,
        ref: 'users',
        required: true 
    },
    phone:  {
        type: Schema.Types.Number,
        ref: 'users',
        required: true 
    },
    licence:  {
        type: Schema.Types.String,
        ref: 'users'
    },
    address:  {
        type: Schema.Types.String,
        ref: 'users'
    }
}, {
    timestamps: true
});

var User = mongoose.model('User', userSchema);

module.exports = User;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserLogin = new Schema({
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
    admin:   {
        type: Schema.Types.Boolean,
        default: false
    }
});

UserLogin.plugin(passportLocalMongoose);

module.exports = mongoose.model('UserLogin', UserLogin);
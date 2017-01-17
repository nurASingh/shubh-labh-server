var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var amountSchema = new Schema({
    amount: { type: Schema.Types.Number }
});

var cashSchema = new Schema({
    phone: {
        type: Schema.Types.Number,
        ref: 'cash',
        required: true
    },
    date: {
        type: Schema.Types.Date,
        ref: 'cash'
    },
    amount: [amountSchema],
    comment: { type: Schema.Types.String }
}, {
        timestamps: true
    });


var Cash = mongoose.model('Cash', cashSchema);

module.exports = Cash;
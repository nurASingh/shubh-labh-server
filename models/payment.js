var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var amountSchema = new Schema({
    name : {type: Schema.Types.String},
    purchase : {type: Schema.Types.Number},
    payment : {type: Schema.Types.Number},
});

var paymentSchema = new Schema({
    phone: {
        type: Schema.Types.Number,
        ref: 'payment',
        required: true
    },
    date: {
        type: Schema.Types.Date,
        ref: 'payment'
    },
    payments: [amountSchema],
    comment: { type: Schema.Types.String }
}, {
        timestamps: true
    });


var Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
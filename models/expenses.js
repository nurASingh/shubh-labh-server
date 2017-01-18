var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var amountSchema = new Schema({
    type: { type: Schema.Types.String },
    amount: { type: Schema.Types.Number }
});

var expensesSchema = new Schema({
    phone: {
        type: Schema.Types.Number,
        ref: 'expense',
        required: true
    },
    date: {
        type: Schema.Types.Date,
        ref: 'expense'
    },
    amount: [amountSchema],
    comment: { type: Schema.Types.String }
}, {
        timestamps: true
    });

var Expense = mongoose.model('Expense', expensesSchema);
module.exports = Expense;
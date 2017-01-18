var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var saleSchema = new Schema({    
    payment: {
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    },
	saving: {
        type: Schema.Types.ObjectId,
        ref: 'Saving'
    },
	expenses: {
        type: Schema.Types.ObjectId,
        ref: 'Expense'
    },
	cash: {
        type: Schema.Types.ObjectId,
        ref: 'Cash'
    }
});

var Sales = mongoose.model('Sales', saleSchema);
module.exports = Sales;
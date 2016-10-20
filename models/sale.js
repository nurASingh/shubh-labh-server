var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var saleSchema = new Schema({    
    phone:  {
        type: Schema.Types.Number,
        ref: 'sales',
        required: true 
    },
    date: {
        type: Schema.Types.Date,
        ref: 'sales',
        required: true
    },
    amount: {
        type: Schema.Types.Number,
        ref: 'sales',
        required: true
    },
    comments :{
        type: Schema.Types.String,
        ref: 'sales',
    }
}, {
    timestamps: true
});

var Sales = mongoose.model('Sales', saleSchema);

module.exports = Sales;
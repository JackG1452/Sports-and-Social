const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create member Schema model
const MemberSchema = new Schema({
    memberName: {
        type: String,
        // required: [true, 'Name field is required']
    },

    seatLocation: {
        type: String,
    },

    filename: {
      type: Schema.Types.Mixed,
    }
});

const Mem = mongoose.model('mem', MemberSchema);

module.exports = Mem;

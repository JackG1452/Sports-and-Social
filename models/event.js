const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create event Schema model
const EventSchema = new Schema({
    eventName: {
        type: String,
        required: [true, 'Name field is required']
    },

    organiser: {
        type: String,
    },

    location: {
        type: String,
        //required: [true, 'Location field is required']
    },

    contact: {
        type: Schema.Types.Mixed,
    },

    budget: {
        type: Number,
    },

    costPerHead: {
        type: Number,
    },

    totalCost: {
        type: Number,
        //required: [true, 'Total cost field is required']
    },

    deductionOffered: {
        type: Number,
    },

    ActualAttendance: {
        type: Number,
    },

    PlannedAttendance: {
        type: Number,
    },

    setupRating: {
        type: Number,
    },

    date: {
        type: String,
        //required: [true, 'Date field is required']
    },

    additionalNotes: {
        type: String,
    },

    instructions: {
        type: String,
    },

    eventType: {
      type: String,
    }

});

const Ev = mongoose.model('ev', EventSchema);

module.exports = Ev;

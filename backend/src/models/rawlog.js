const mongoose = require('mongoose')
// const vaidator = require('validator')

const Rawlog = mongoose.model('Rawlog', {
    datetime: {
        type: String,
        // default: Date.now,
        // required: true,
        trim: true
    },
    src_ip: {
        type: String,
        trim: true
    },
    dest_ip: {
        type: String,
        trim: true
    },
    service: {
        type: String,
        trim: true
    },
    appcat: {
        type: String,
        trim: true
    },
    rawdata: {
        type: String,
        required: true,
        trim: true
    }
})


module.exports = Rawlog

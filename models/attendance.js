const mongoose = require("mongoose")
const createDOMPurify = require("dompurify")
const { JSDOM } = require("jsdom")
const dompurify = createDOMPurify(new JSDOM().window)

const attendanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    sanitizedname: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    subject: {
        type: String,
        required: true
    }
})

attendanceSchema.pre("validate", function(next) {
    if(this.name) {
        this.sanitizedname = dompurify.sanitize(this.name)
    }
    next()
})

module.exports = mongoose.model("Attendance", attendanceSchema)
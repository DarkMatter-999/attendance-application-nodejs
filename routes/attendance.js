const express = require("express")
const router = express.Router()

const Attendance = require("../models/attendance")

router.get("/", async (req, res) => {
    const attendance = await Attendance.find()
    res.render("index", { attendance: attendance })
})

router.get("/add", (req, res) => {
    res.render("add", { attendance: new Attendance()})
})

router.post("/add", async (req, res, next) => {
    req.attendance = new Attendance()
    next()
}, saveAndRedirect("add"))

function saveAndRedirect(path) {
    return async (req, res) => {
        console.log(JSON.stringify(req.body));
        let attendance = req.attendance
        attendance.name = req.body.name
        attendance.batch = req.body.batch
        attendance.subject = req.body.subject

        try{
            attendance = await attendance.save()
            res.redirect("/")
        } catch(e) {
            console.log(e)
            res.render(`${path}`, { attendance : attendance })
        }
    }
}

module.exports = router
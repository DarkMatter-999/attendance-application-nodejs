const express = require("express")
const router = express.Router()

const Attendance = require("../models/attendance")
const Data = require("../models/data")

router.get("/", async (req, res) => {
    const attendance = await Attendance.find()
    res.render("index", { attendance: attendance })
})

router.get("/show/:id", async (req, res) => {
    res.render("show.ejs", { attendance: new Attendance(), id : req.params.id})
})

router.get("/add", (req, res) => {
    res.redirect("/")
    // res.render("add", { attendance: new Attendance()})
})

router.post("/add", async (req, res, next) => {
    req.attendance = new Attendance()
    next()
}, saveAndRedirect("add"))

router.get("/new", (req, res) => {
    res.render("new", { data: new Data()})
})

router.post("/new", async (req, res, next) => {
    req.data = new Data()
    next()
}, saveAndRedirectNew("new"))

router.post("/delete/:id", async (req, res) => {
    await Data.findOneAndRemove({ id: req.params.id})
    res.redirect("/")
})

function saveAndRedirect(path) {
    return async (req, res) => {
        console.log(JSON.stringify(req.body));
        let attendance = req.attendance
        attendance.name = req.body.name
        attendance.batch = req.body.batch
        attendance.att_id = req.body.id

        try{
            attendance = await attendance.save()
            res.redirect("/")
        } catch(e) {
            console.log(e)
            res.render(`${path}`, { attendance : attendance })
        }
    }
}

function saveAndRedirectNew(path) {
    return async (req, res) => {
        console.log(JSON.stringify(req.body));
        let data = req.data
        data.subject = req.body.subject

        try{
            data = await data.save()
            res.redirect("/")
        } catch(e) {
            console.log(e)
            res.render(`${path}`, { data : data })
        }
    }
}

module.exports = router
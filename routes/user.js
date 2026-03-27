
const { Router } = require("express");
const userrouter = Router();


userrouter.post("/signup", async (req, res) => {
    const username = req.body.name;


    res.json({
        message :"Signup Successfully",
    })
});

userrouter.post("/signin", async (req, res) => {});

userrouter.post("/enroll_course", async (req, res) => {});

userrouter.get("/purchase-courses", async (req, res) => {});


module.exports = {
    userrouter
}

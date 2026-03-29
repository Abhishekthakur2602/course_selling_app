const {Router } = require("express");
const courserouter = Router();
const {courserModel} = require("../schema");

courserouter.get("/courses", async (req, res) => {
    res.json({
        message:"List of all courses",
    })
});

courserouter.post("/purchase_course" , async(req,res) =>{

})

module.exports = {
    courserouter
};
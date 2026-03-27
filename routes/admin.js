const { Router } = require("express");
const adminrouter = Router();

adminrouter.post("/signup", async (req, res) => {
  res.json({
    message: "Admin Signup Successfully",
  });
});

adminrouter.post("/signin", async (req, res) => {});

adminrouter.post("/create_course", async (req, res) => {});

adminrouter.delete("/delete_course", async (req, res) => {});

module.exports = {
  adminrouter,
};

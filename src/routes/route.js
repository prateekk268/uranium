const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const controllers1 = require("../controllers/controller1")
const controller2 = require("../controllers/controller2")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", controllers1.createAuthor)
router.post("/createPublisher", controllers1.createPublisher)
router.post("/createBook", controllers1.createBook)
router.get("/getBooksWithAuthorPublisher", controllers1.getBooksWithAuthorPublisher)
router.put("/books/:pname", controllers1.hardCover)


router.post("/branch", controller2.branch)
router.post("/developer", controller2.developer)
router.get("/scholarship", controller2.scholarship)
router.get("/developers" ,controller2.getDeveloper );


router.post("/createAuthor", authorController.createAuthor  )

router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBook", bookController.createBook  )

router.get("/getBooksData", bookController.getBooksData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

module.exports = router;
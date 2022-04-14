const res = require("express/lib/response")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    // savedData.authorName = prateek
    // savedData.save()
    res.send({msg: savedData})
}

const getBooksData= async function (req, res) {
    let allBooks= await BookModel.find()
    res.send({msg: allBooks})
}

const BookList = async function (req, res) {
    let listBooks = await BookModel.find().select({ bookName : 1 , authorName : 1, _id : 0})
    res.send({msq : listBooks})
}

const getXINRBooks = async function (req, res){
    const getXINRBooks = async function(req,res){
        let allBooks = await BookModel.find( { 'prices.indianPrice' :{ $in:["100","200","500"]} } )
        res.send({ msg : allBooks})
    }
}

const getBooksInYear = async function (req,res){
   let yearBook = BookModel.find({year:req.body.year})
   res.send({msq : yearBook})
}


    const getRandomBooks = async function(req,res){
        let allBooks = await BookModel.find( { $or :[{stockAvailable : true},{totalPages : {$gt : 500}}]})
        res.send({msg : allBooks})
   
    }




module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.BookList = BookList
module.exports.getBooksInYear = getBooksInYear
module.exports.getXINRBooks = getXINRBooks 
module.exports.getRandomBooks = getRandomBooks

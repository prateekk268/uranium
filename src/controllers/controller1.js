const AuthorModel = require("../models/authorData")
const PublisherModel = require("../models/publisherData")
const BookModel = require("../models/bookData")
const res = require("express/lib/response")




const createAuthor  = async function ( req, res){
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({ data : authorCreated})
}


const createPublisher = async function (req,res) {
    let publisher = req.body
    let publisherCreate = await PublisherModel.create(publisher)
    res.send({data : publisherCreate})
}


const createBook = async function (req,res){
    let book = req.body
    
    if (book.author == null || book.publisher == null){
        res.send({Error : "details required"})
    }
    else{
        let author = await AuthorModel.find().select({_id : 1})
        let publisher = await PublisherModel.find().select({_id : 1})

        for(let i = 0; i < author1.length; i++){
            let a = author1[i]._id == book.publisher
            if(a){
                for ( let j = 0; j< publisher1.length; j++){
                    let b = publisher1[j]._id == book.publisher
                    if (b){
                        let bookCreated = await BookModel.create(book)
                        res.send({msq : bookCreated})
                        return
                    }
                }
                res.send({msq : "Publisher not found"})
                return
            }
        }
        res.send({msq : 'Author not found'})
    }
}


const getBooksWithAuthorPublisher = async function (req, res){
    let allBook = await BookModel.find().populate('author').populate('publisher')
}

const hardCover = async function (req,res){
    let data = req.params.name
    let publisherId = await PublisherModel.findOne({pname : data}).select({_id})
    let updateBook = await BookModel.updateMany({author : id},{$set : {isHardCover : true}})
    res.send({msq : updateBook})


let authorId = await AuthorModel.find({rating : {$gt : 3.5}})
let updatePrice = await BookModel.updateMany(
    {author : authorId},
    {$inc : {price : 10}}
)
res.send({msq : updataBook , updatePrice})
}






module.exports.createAuthor = createAuthor
module.exports.createPublisher = createPublisher
module.exports.createBook = createBook
module.exports.getBooksWithAuthorPublisher = getBooksWithAuthorPublisher
module.exports.hardCover = hardCover
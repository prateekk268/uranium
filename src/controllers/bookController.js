const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")

const currentFullDate = () => {
  let releasedAtTime = new Date()
  data.releasedAt = releasedAtTime.getFullYear() + "-" + (releasedAtTime.getMonth() + 1) + "-" + releasedAtTime.getDate()
  }

const {
  checkData,
  validString,
  isValidObjectId,
  validDate
} = require("../validator/validation")

const createBook = async function (req, res) {
  try {
    let data = req.body

    if (checkData(data)) return res.status(400).send({
      status: false,
      message: "Enter Books Details"
    })

    //check the value is present or not
    if (!data.title) return res.status(400).send({
      status: false,
      message: "Book Title is required"
    })
    if (!data.excerpt) return res.status(400).send({
      status: false,
      message: "Excerpt is required"
    })
    if (!data.userId) return res.status(400).send({
      status: false,
      message: "UserId is required"
    })
    if (!data.ISBN) return res.status(400).send({
      status: false,
      message: "ISBN is required"
    })
    if (!data.category) return res.status(400).send({
      status: false,
      message: "category is required"
    })
    if (!data.subcategory) return res.status(400).send({
      status: false,
      message: "subcategory is required"
    })

    //check the userId in model

    // let availableUserId = await userModel.findById(data.userId)
    // console.log(availableUserId)
    // if (!availableUserId) {
    //   return res.status(404).send({ status: false, message: "User not found" })
    // }

    //validate title, excerpt, category,subcategory
    if (validString(data.title) || validString(data.excerpt) || validString(data.category) || validString(data.subcategory)) {
      return res.status(400).send({
        status: false,
        message: "data should not contain Numbers its only contains Characters"
      })
    }

    //check title and isbn is unique or not
    let checkUniqueValues = await bookModel.findOne({
      $or: [{
        title: data.title
      }, {
        ISBN: data.ISBN
      }]
    })
    if (checkUniqueValues) return res.status(400).send({
      status: false,
      message: "Title or ISBN is already exist"
    })

    //set date in releasedAt
    data.releasedAt = currentFullDate();

    //create book data
    let bookData = await bookModel.create(data)
    res.status(201).send({
      status: true,
      message: "Books created successfully",
      data: bookData
    })
  } catch (err) {
    res.status(500).send({
      status: false,
      Error: err.message
    })
  }
}

const getFilteredBooks = async (req, res) => {
  try {
    let data = req.query;

    if (data.hasOwnProperty('userId')) {
      if (!isValidObjectId(data.userId)) return res.status(400).send({
        status: false,
        message: "Enter a valid user id"
      });
      let {
        ...tempData
      } = data;
      delete(tempData.userId);
      let checkValues = Object.values(tempData);

      if (validString(checkValues)) return res.status(400).send({
        status: false,
        message: "Filter data should not contain numbers excluding user id"
      })
    } else {
      let checkValues = Object.values(data);

      if (validString(checkValues)) return res.status(400).send({
        status: false,
        message: "Filter data should not contain numbers excluding user id"
      })
    }

    if (checkData(data)) {
      let getBooks = await bookModel.find({
        isDeleted: false
      }).sort({
        title: 1
      }).select({
        title: 1,
        excerpt: 1,
        userId: 1,
        category: 1,
        reviews: 1,
        releasedAt: 1
      });

      if (getBooks.length == 0) return res.status(404).send({
        status: false,
        message: "No books found"
      });
      return res.status(200).send({
        status: true,
        message: "Books list",
        data: getBooks
      });
    }

    data.isDeleted = false;

    let getFilterBooks = await bookModel.find(data).sort({
      title: 1
    }).select({
      title: 1,
      excerpt: 1,
      userId: 1,
      category: 1,
      reviews: 1,
      releasedAt: 1
    });

    if (getFilterBooks.length == 0) return res.status(404).send({
      status: false,
      message: "No books found"
    });

    res.status(200).send({
      status: true,
      message: "Books list",
      data: getFilterBooks
    });

  } catch (err) {
    return res.status(500).send({
      status: false,
      Error: err.message
    })
  }
}

const getBookById = async (req, res) => {
  try {
    let bookId = req.params.bookId
    if (!isValidObjectId(bookId)) return res.status(400).send({
      status: false,
      message: "Enter a correct book id"
    })
    let getBook = await bookModel.findById(bookId).select({
      __v: 0
    })
    if (!getBook) return res.status(404).send({
      status: false,
      message: "No Book found"
    })

    let {
      ...data
    } = getBook._doc

    data.reviewsData = []

    res.status(200).send({
      status: true,
      message: "Books lists",
      data: data
    })
  } catch (err) {
    return res.status(500).send({
      status: false,
      Error: err.message
    })
  }

}

const updateBookDetails = async function (req, res) {
  try {
    let bookId = req.params.bookId

    if (!bookId) return res.status(400).send({status: false,message: "userId not Exist"})

    let searchBook = await bookModel.findOne({_id: bookId})
    if (!searchBook) return res.status(404).send({status: false,message: `Book does not exist by this ${bookId}.`})

    if(searchBook.isDeleted == true) return res.status(404).send({status: false, message: "Data already deleted"})
    
    let data = req.body
    if (checkData(data)) return res.status(400).send({status: false,message: "Data is required for update the document"})

    if(data.hasOwnProperty('title') || data.hasOwnProperty('ISBN')){
      let checkTitleAndIsbn = await bookModel.findOne({$or: [{title: data.title}, {ISBN: data.ISBN}]})
      if (checkTitleAndIsbn) return res.status(400).send({status: false,message: "Title or ISBN already exist"})
    }

    if(validString(data.title) || validString(data.excerpt)) return res.status(400).send({status: false, message: "Data should not contain Numbers"})

    if(validDate(data.releasedAt)) return res.status(200).send({status: false, message: "Enter a valid released date in (YYYY-MM-DD format"})

    let changeDetails = await bookModel.findOneAndUpdate({_id: bookId},data, {new: true})
    res.status(200).send({status: true,message: "Successfully updated book details.", data: changeDetails})
  } catch (err) {
    return res.status(500).send({status: false,Error: err.message})
  }
}










module.exports = {createBook,getFilteredBooks,getBookById,updateBookDetails}
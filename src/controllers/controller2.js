const BranchModel = require("../models/batchesData");
const DeveloperModel = require("../models/developerData");


const branch = async function (req,res){
    let data = req.body
    let savedData = await BranchModel.create(data)
    res.send({msq : savedData})
}

const developer = async function (req,res){
    let data = req.body
    let savedData = await DeveloperModel.create(data)
    res.send({msq : savedData})
}


const scholarship =  async function(req,res){
    let allscholarship = await DeveloperModel.find({gender : "female" , percentage : {$gt : 70}})
    res.send({msq : allscholarship})
} 


const getDeveloper = async function (req, res){
    let data = req.query
    let a = data.percentage
    let b = data.program
    let batchID = await BranchModel.find({name:b}).select({_id:1})
    let c = batchID[0]._id.toString()
    
    let developer = await DeveloperModel.find({percentage:{$gte:a},batch:c}).populate('batch')
    res.send({developer})
    
    }












module.exports.branch = branch
module.exports.developer = developer
module.exports.scholarship = scholarship
module.exports.getDeveloper= getDeveloper
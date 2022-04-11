let players = [
    {
        "name":"manish",
        "dob":"01/01/1995",
        "gender": "male",
        "city": "jalandhar",
        "sports":["swimming"]
    },
    {
        "name":"gopal",
        "dob":"01/09/1995",
        "gender": "male",
        "city": "delhi",
        "sports":["soccer"]

    },
    {
        "name":"lokesh",
        "dob":"01/01/1990",
        "gender": "male",
        "city": "mumbai",
        "sports":["soccer"],
    },
]
let addPlayer = function(req ,res ){
    let data = req.body
    let result =0

    players.map((obj) => {
        if( obj.name === data.name){
            result=1 ;
        }
    })
    if (result === 1){
        return res.status(404).send("Player is already exists in the List");

    }
    else{
        players.push(data);
    }
    console.log(players);
    return res.send({ updatedList : players})
}

module.exports.addPlayer = addPlayer
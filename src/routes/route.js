const express = require('express');
const logger = require('./logger')

const router = express.Router();

router.get('/user-profile/:abcd', function(req, res) {
    console.log(req)
    console.log(req.params.abcd)
    res.send('dummy response')
})

// router.get('/movies', function (req, res) {
// const names = [ 'you', 'parasite', 'batman', 'joker']
// let arry = []
// for(let i = 0; i <= names.length; i++){
//     arry.push(names[i])

// }
//     res.send(arry)
// });



// router.get('/movies/:indexNumber', function (req, res) {
//     const names = [ 'you', 'parasite', 'batman', 'joker']
//     let arry;
//     let n = req.params.indexNumber
//     for(let i = 0; i < names.length; i++){
//         if(i == n){
//             arry = names[i]
        
//         }
    
//     }
//         res.send(arry)
//     });

    router.get('/movies/:indexNumber', function (req, res) {
        const names = [ 'you', 'parasite', 'batman', 'joker']
        let arry;
        let n = req.params.indexNumber
        for(let i = 0; i < names.length; i++){
            if( i < n ){
                arry = "use index between 0 to 3"
            }
            if(i == n){
                arry = names[i]
            
            }
        
        }
            res.send(arry)
        });

        router.get('/films', function (req, res) {
            let films=[ {
                "id": 1,
                "name": "The Shining"
               }, {
                "id": 2,
                "name": "Incendies"
               }, {
                "id": 3,
                "name": "Rang de Basanti"
               }, {
                "id": 4,
                "name": "Finding Nemo"
               }]
             
               res.send(films)
            });
            router.get('/films/:filmId', function (req, res) {
                let films=[ {
                    "id": 1,
                    "name": "The Shining"
                   }, {
                    "id": 2,
                    "name": "Incendies"
                   }, {
                    "id": 3,
                    "name": "Rang de Basanti"
                   }, {
                    "id": 4,
                    "name": "Finding Nemo"
                   }]
                
                   let pramId = req.params.filmId;
                 
                for(let i=0;i<films.length;i++){
                   
                    if(pramId==films[i].id){
                        res.send(films[i])
                        break;
                    }   
                }
                res.send("Error Invalid Id")
                 
                });




module.exports = router;
// adding this comment for no reason
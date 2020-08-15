var express = require('express');
var router = express.Router();
require('dotenv').config();
const fetch = require("node-fetch");
const token = "b50663e05d203186f448263c383b3246de26b8bf";



/* GET home page. */
router.post('/', async function(req, res, next) {
    console.log(req.body.user);
    const rv = {user: req.body.user, success: true};
    const jsonResponse = await getContributions(rv.user);
    res.send(jsonResponse);
});



async function getContributions(user){
    const query = {
        method: 'POST',
        headers : {
            "Authorization" : "bearer " + process.env.API_KEY
        },
        body: JSON.stringify({
            query: `query { 
                      user(login: "${user}"){
                        contributionsCollection{
                          contributionCalendar{
                            weeks{
                              firstDay
                              contributionDays{
                                date
                                contributionCount
                              }
                            }
                          }
                        }
                      }
                    }`
        })};

    const res = await fetch("https://api.github.com/graphql", query);
    return await res.json();


}





module.exports = router;

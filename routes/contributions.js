var express = require('express');
var router = express.Router();
require('dotenv').config();
const fetch = require("node-fetch");



/* GET home page. */
router.post('/', async function(req, res, next) {
    console.log(req.body.user);
    const rv = {user: req.body.user,year: req.body.year, success: true};
    const jsonResponse = await getContributions(rv.user,rv.year);
    res.send(jsonResponse);
});



async function getContributions(user, year){
    const query = {
        method: 'POST',
        headers : {
            "Authorization" : "bearer " + process.env.API_KEY
        },
        body: JSON.stringify({
            query: `query { 
                          user(login: "${user}"){
                            contributionsCollection(from: "${new Date(year+"-01-01").toISOString()}"){
                              contributionYears
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

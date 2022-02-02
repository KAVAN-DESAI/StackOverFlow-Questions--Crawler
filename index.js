// Libraries/Packages needed
const request= require("request-promise")
const cheerio=require("cheerio")
const fs= require("fs")
const json2csv=require("json2csv").Parser;

//Global variable
const webPage = "https://stackoverflow.com/questions"; // link to website

let stackoverflowQuestions = [] // array where all the data will be stored

function fetchQuestionDetails(url){ // recursive function
    request(url, function (err, res, body) {
        if(err){
            console.log(err);
        }
        else
        {
            let $ = cheerio.load(body); // loading of complete HTML body
            $('#questions > div.question-summary ').each(function(index){
                const question = $(this).find('> div.summary > h3 > a').text();
                const answerNum=$(this).find('div.statscontainer > div.stats > div[class="status unanswered"] > strong').text();
                const voteNum=$(this).find('div.statscontainer > div.stats > div.vote > div > span > strong').text();
                const viewNum=$(this).find('div.statscontainer > div.views').text();
                stackoverflowQuestions.push({
                    Question: question,
                    totalAnswers : answerNum,
                    totalVotes: voteNum,
                    totalViews: viewNum,
                })
            });
        }
        const j2cp = new json2csv();
        const csv=j2cp.parse(stackoverflowQuestions);
        fs.writeFileSync("./stackoverflowdata.csv",csv,"utf-8");
    });
}

request(webPage, async function (err, res, body) { // Main function
    if(err){
        console.log(err);
    }
    else{
        let pageCount=1; 
        let numPage=10; // number of pages to fetch data from
        for(;pageCount<=numPage;pageCount+=5){
            let i=0;
            for(;i<5;i++){
                const webLink="https://stackoverflow.com/questions?page="
                const url = webLink.concat(pageCount+i);
                await fetchQuestionDetails(url); // function call to fetch questions
            }
        }
    }
});
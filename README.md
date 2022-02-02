# StackOverFlow-Questions-Crawler
StackOverflow questions Crawler using Nodejs

* This is a web Crawler made using NodeJS
* We are fetching Questions from stackoverflow 
* What will be stored in CSV file

1. Every unique URL (Stack Overflow question) you encountered.
2. The total reference count for every URL (How many times this URL was encountered)(views).
3. Total # of upvotes and total # of answers for every question.

* The solution is asynchronous in nature as I have mainatined the concurrency of 5 requests at all times
* Have use Cherrio for HTML parsing

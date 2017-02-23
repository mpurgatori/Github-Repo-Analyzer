# LaunchPad-Lab-Challenge
Github Repository Analyzer

Description - An application that compares subscriber, fork and commit data between the React, Angular, Ember and Vue frameworks in real-time.

Server - The challenge was done in Node with Express. I created one route file called github_route.js that fetches all the data I want from the Github api and creates a JSON object from that data. For data, I decided to compare total subscribers, total forks and the most recent week's commits. The data is retrieved once on server start and then once every minute. An object is constructed from the multiple api calls and is then passed to a get route for the front end to grab. The server design was made as a way to ensure Github is queried only every minute so as to not surpass the Github api limit.

Client - The only tools used on the client side are Charts.js for making the bar charts and a file called sorttable.js for sorting the table data. Within front_end.js, Ajax calls are made using the Fetch api. Fetch is called to the server api route on page load and every minute after to update the data in the bar charts and table without a page refresh. Front-end styling was done using bootstrap for a simple and responsive design.

Tests - One test file was added to ensure that the routes are working and sending JSON. Testing was done with Supertest and Mocha.

Conclusions - I really enjoyed this challenge, and I appreciate your time in reviewing my code and design decisions.
Thank You, Mike

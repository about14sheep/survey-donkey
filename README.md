# SurveyDonkey
SurveyDoneky is an interactive survey creation and participation site inspired by SurveyMonkey. Designed using PUG templates for HTML and Bulma for CSS on the front end, with express and sequelize to handle the back end.

[SurveyDonkey Live](https://thesurveydonkey.herokuapp.com/)

For initial design documents, please visit the [wiki](https://github.com/about14sheep/survey-donkey/wiki).

Mady by:
- Austin Burger [github](https://github.com/about14sheep) | [linkedin](https://www.linkedin.com/in/austin-burger/)
- Daniel Ramirez [github](https://github.com/danieldotcom2)
- Greg Lloyd [github](https://github.com/Greg001100) | [linkedin](https://www.linkedin.com/in/greglloyd1/)
- Zachery Haley [github](https://github.com/Zackitty) | [linkedin](https://www.linkedin.com/in/zachery-haley-90a1a21b1/)

SurveyDonkey allows users to:
- Create an account and log in and out securely.
- Create, edit, publish, delete and share their own surveys.
- Add unique questions to their surveys, with options for multiple choice, scroll, and free response.
- See the results of any public survey, as well as see what responses they gave to a particular survey.
- See a feed of all public surveys.
- Upvote their favorite surveys.

## Technology Used:
- PUG templates
- PostgreSQL
- Express
- JSON web tokens
- Sequelize
- BCrypt
- Bulma CSS

## Main Views:
**User Authentication**

Users can create an account and log in securely thanks to BCrypt for password hashing and storage. Harmony also uses json web tokens when communicating between the back end and front end to make sure requests are coming from the right place and are only doing what they are allowed to do.

**Servers and Channels**
A key part of Harmony's structure are its servers. Users can create their own server that houses as many separate chat channels as they want. Each server and channel can be customized by name, and users can create private servers and invite their friends.

**Live chat**
The core feature of harmony is live chat. The app uses websockets to keep a constant connection between the user and the server, allowing the server to push new updates to the client without waiting for a refresh or request.



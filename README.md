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
**User dashboard**

When logged in, users are greeted with their dashboard. This is the command center for the app that allows users to see all of their created surveys along with general statistics. From here they can create new surveys, edit old drafts, see results of a survey, share or delete a survey.
![](https://github.com/about14sheep/survey-donkey/blob/master/sdDashboard.png)

**Survey creation and editing**

Users can create surveys by first choosing a name, then working on what questions they want to include. Each question can be multiple choice, free response, or scroll. Users can save the survey as a draft and come back later to edit or finish questions. Once published, the survey will not be editable and will show up on the main public feed for all users to see and fill out.
![](https://github.com/about14sheep/survey-donkey/blob/master/sdSurveyCreate.png)

**Survey Results**

The results of a survey are shown using charts for multiple choice questions or a list of anonymous responses for free response questions. If a user has already taken the survey in question, their response will be highlighted. 
![](https://github.com/about14sheep/survey-donkey/blob/master/sdResults.png)

**Public Survey Feed**

The public feed shows all of the published surveys, as well as their creator and relative stats. Users can take a survey, upvote a survey, and sort surveys by owner, name, creation date, questions, and upvotes. 
![](https://github.com/about14sheep/survey-donkey/blob/master/sdFeed.png)


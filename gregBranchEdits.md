1. updated models/migrations for create-users. Changed name of password to hashedPassword.
2. Also modified models/migrations- made hashedPassword type STRING.BINARY
**changed firstname and lastname to camelCase*
3. Created routes/utils.js that exports csrfProtection and asyncHandler
4. Added csurf, morgan, bcryptjs to package.json
5. Made utils.pug to keep all of our mixins. added validationErrorSummary and (text)field mixin.
6. Created sign-up.js route with all necessary validations and code for hashing passwords

Monday:
7. created sign-up pug, finished sign-up router
8. created login pug and router
9. initial sign in sets user's role to fullUser, as opposed to a guest user
10. installed express-session, dotenv
11. added .env file (and example), created secret key, set up config/index.js
12. set up session cookie storage, made primitive dashboard page, login/logout functionality
13. made requireAuth middleware in auth.js that we can use to require log in for whatever route's we desire

ToDo/ questions for group:
- I think we need to make a 2nd sign up form for just email for users that just want to anonymously fill out a survey (guest user)
- fix login/signup pugs to extend layout.pug
- restrict survey editing only to surveys made by user (checkPermissions section in reading)

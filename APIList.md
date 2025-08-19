# Devtinder APi's

authRouter
- POST /auth/signUp
- POST /auth/login
- POST /auth/logout

profileRouter
- GET /profile/getUserData/:userId
- PATCH /profile/updateProfile
- PATCH /updatePassword

connectionRequestRouter
- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

userRouter
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets user of other flatform



Status -------> ignored, accepted, blocked, active, rejected, intrested

Pagination:
/feed?page=1&limit=10 => first ten users from 1-10

/feed?page=2&limit=10 => second ten users from 11-20

/feed?page=3&limit=10 => third ten users from 20-30

we need to pass like this insted of page and limit
.skip() -> how many doc skip from the skip
.limit() -> set the limit of doc


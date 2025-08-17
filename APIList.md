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


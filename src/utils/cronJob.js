const cron = require("node-cron");
const sendEmail = require("./sendEmail");
const ConnectionRequest = require("../models/connectionRequest");
const {subDays, startOfDay, endOfDay} = require("date-fns");

// This job will run at 8 AM in the morning everyday
cron.schedule("0 8 * * *", async () => {
    try{
        const yesterday = subDays(new Date(), 1);
        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday)

        const pendingConnectionRequests = await ConnectionRequest.find({
            status: "interested",
            createdAt: {
                $gte: yesterdayStart,
                $lt: yesterdayEnd
            },
        }).populate("fromUserId toUserId");

        const listOfEmails = [...new Set(pendingConnectionRequests.map(
            req => req.toUserId.email
        ))]; //[... will convert it to array]

        for(const email of listOfEmails){
            const subject = "New Connection Request";
            const body = "You have received a new connection request";
            try{
                const email = 'gurshreetha@gmail.com';
                //const response = await sendEmail.run(subject, body, email);
                // console.log(response);
            }catch(err){
                console.log(err);
            }
        }
    }catch(err){
        console.log(err);
    }
});


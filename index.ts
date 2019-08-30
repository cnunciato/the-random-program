import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as twilio from "twilio";

const config = new pulumi.Config();

// Twilio account creds.
const sid = config.require("twilio_sid");
const token = config.require("twilio_token");

// My SMS-enabled Twilio phone number.
const from = `+1${config.require("from_number")}`;

// My mobile number.
const to = `+1${config.require("to_number")}`;

// Kid names.
const kids = ["Oliver", "Sam", "Rosemary"];

// Every minute, just for testing.
// const schedule = "rate(1 minute)";

// Every Thursday at 16:20 UTC.
const schedule = "cron(16 20 ? * THU *)";

aws.cloudwatch.onSchedule("schedule", schedule, () => {
    const client = twilio(sid, token);
    const body = `This week's game-playing order: ${kids.sort(() => Math.random() > 0.5 ? -1 : 1).join(", ")}. Yay! 🎉 🕹 👾`

    client.messages.create({ body, from, to })
        .then(message => console.log(message.sid))
        .catch(err => console.error(err));
});

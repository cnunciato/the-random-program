import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

import { AWSError } from "aws-sdk";
import { PublishResponse } from "aws-sdk/clients/sns";

const config = new pulumi.Config();

// My mobile number.
const endpoint = `+1${config.require("to_number")}`;

// Kid names.
const kids = ["Oliver", "Sam", "Rosemary"];

// Every minute, just for testing.
// const schedule = "rate(1 minute)";

// Every Thursday at 16:20 UTC.
const schedule = "cron(20 16 ? * THU *)";

const topic = new aws.sns.Topic("topic");
const sub = new aws.sns.TopicSubscription("sub", { protocol: "sms", endpoint, topic });

aws.cloudwatch.onSchedule("schedule", schedule, async () => {
    const message = `This week's game-playing order: ${kids.sort(() => Math.random() > 0.5 ? -1 : 1).join(", ")}. Yay! 🎉 🕹 👾`;
    const sns = new aws.sdk.SNS();

    await sns.publish(
        {
            Message: message,
            TopicArn: topic.arn.get(),
        },
        (error: AWSError, data: PublishResponse) => {
            if (error) {
                console.error(error.message);
            } else {
                console.log(data.MessageId);
            }
        }
    ).promise();
});

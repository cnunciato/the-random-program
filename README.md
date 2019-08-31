# the-random-program

At our house, Thursday is video-game day. Each kid gets 35 minutes. Invariably, they're
unable to reach a consensus on the order in which to play, so they come running to me,
seeking decision.

Since I'm no great fan of decision in general, I wrote a little
[Pulumi](https://pulumi.com/) program to do the deciding for us. Every Thursday at a
little past nine, a scheduled [CloudWatch](https://aws.amazon.com/cloudwatch/) task runs,
sorts the list of kids randomly, and sends me a text message containing the result, using
only AWS (specifically [Amazon SNS](aws.amazon.com/sns)). The kids call it
"the random program", hence the name:

![image](https://user-images.githubusercontent.com/274700/64045122-6033ac00-cb1d-11e9-8fb9-8afa4a8b9204.png)

Computers FTW.

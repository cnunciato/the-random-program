# the-random-program

At our house, Thursday is video-game day. Each kid gets 35 minutes. Invariably, they're
unable to reach a consensus on the order in which to play, so they come running to me,
seeking decision.

Since I'm no great fan of decision in general, I wrote a little Pulumi program to do the
deciding for us. Every Thursday at a quarter past nine, a schedule CloudWatch task runs,
sorts the list of kids randomly, and sends me a text message containing the result. (The
kids call it "the random program", hence the name.)

Computers FTW.

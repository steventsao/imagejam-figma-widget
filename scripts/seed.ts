import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // comes from https://sundaygolf.com/blogs/news/golfing-terms
  const source = `Ace, Golf slang for a hole in one. When your first shot finds the bottom of the cup!
    Airmail, Golf slang for when you hit your approach shot over the green. You might hear a player say, “I hit too much club on #7 and airmailed the green.”
    Albatross, This golfing term describes when you score 3 below par on a hole. You make a hole in one on a par 4 or a 2 on a par 5. Also known as a double eagle or “the rarest of birds.”
    Alignment, The process of aiming your golf shot. Your alignment is dictated by your feet, shoulders, and your clubface.
    All Square, Golf word that’s used when playing match play to describe a match that’s tied.
    Angle Of Attack, The up or down movement of the clubhead at the time of compression of the golf ball. Attack angle is measured relative to the horizon. Your angle of attack is different with different clubs. This is one of the metrics measured when you use a golf simulator (ie TrackMan).
    Attend The Flag, Often shortened to “tend it”, this is when you have someone (caddy or playing partner) hold the pin/flag while you putt. As your ball approaches the hole, the person removes the flag.
    Automatics, Common golf betting term - it means that automatic new bets start at a specific time in the match. Typically, golfers play “2 down automatics” which means a new bet starts anytime someone is down two holes.
    Back Nine, Golfing term for the 2nd 9 holes of an 18-hole round of golf.
    Backswing, Golfing term for the first half of your swing. Describes your swing from the start until you reach the top.
    Backspin, When your ball lands on the green and spins backward. This happens primarily when you’re hitting an approach shot with a wedge or short iron.
    Below The Hole, You’ll hear a golfer say “the greens are fast, you need to leave your ball below the hole.” This means you don’t want a downhill putt. You want your ball to stop below the hole so you have an uphill putt.
    Birdie, Golfing term for when you score 1 below par on a hole. For example, you make a 3 on a par 4.
    Bladed Shot, Golf slang for when a player hits a shot with the bottom of an iron instead of the face. This causes a low shot that goes way too far.
    Bogey, Golfing term for when you score 1 over par on a hole. For example, you make a 5 on a par 4.
    Break, Describes how a putt is going to curve on the green. A player reads the “break” to determine where to aim their putt.
    Breakfast Ball, Golf slang for a mulligan. If you hit a bad shot on the first hole, you get to hit another one without a penalty.
    Bunker, Synonym for a sand trap. You can have a waste bunker, fairway bunker, or greenside bunker.
    Buzzard, Golf slang for making a double bogey on a hole. A double-bogey is when you score 2 over par. For example, you make a 6 on a par 4.
    Cabbage, golf slang for high grass and deep rough.
    Caddie, Golf word for the person that carries your clubs and gives your advice on how to play.
    Chilly Dip, Golf slang for a poor chip shot. Typically used when you hit behind the ball and it comes up way short of your target.
    Chip, Golfing term for the shot you play when you are close to the green. You typically use a wedge, make a small swing (similar to a putting stroke), and hit the ball onto the putting surface.
    Chunk, Golf slang for when you hit behind the ball and take a large divot. Typically a poor shot that comes up short. You might say, “I chunked that one.”
    Compression, Compression describes a golf ball smashing against the clubface at impact. This is how the club propels the ball forward. Different types of golf balls have different compressions. This is why the best golf ball for you will depend on your clubhead speed.
    Condor, Golf slang for scoring 4-under on a hole. This can only happen by making a 1 on a par 5 and it’s extremely rare.
    Course Rating, Course rating is used when calculating your golf handicap. It’s an evaluation of how hard a specific course should play for a scratch golfer (0 handicap). You can find the course rating on the scorecard.
    Cut, Golf slang for a small slice. For a right-handed golfer, this describes a ball that curves slightly to the right.
    Divot, Golfing term used to describe the hole you leave after hitting the ground during a shot. It is also used when you make a mark on the green when your ball lands.
    Draw, Golf slang for a small hook. For a right-handed golfer, this describes a ball that curves slightly to the left.
    Dogleg, Common golf term for a hole that’s crooked like the “hind leg of a dog.” Typically, the hole is straight for your tee shot but bends to the left or the right for your approach shot.
    Dormie, A golfing term used when playing match play. It means that one player is up by as many holes as are left. In other words, if you’re 5 up with 5 holes to play, you’re “Dormie.”
    Double Bogey, When you score two over par on a hole. For example, you make a 6 on a par 4.
    Double Eagle, Synonym for albatross. When you score 3 under par on a hole. A 1 on a par 4 or a 2 on a par 5.
    Downswing, Golf word for the part of your golf swing from the top to contact with the golf ball.
    Driver, The longest club in your golf bag. You use your driver on most par 4s and par 5s and you typically use a tee. Also known as a 1-wood.
    Duff, Golf slang for a bad shot. One that you mis-hit and didn’t go as far as you intended.
    Eagle, Golfing term for when you score 2 under par on a hole. For example, you make a 3 on a par 5.
    Elevated Green, You’re hitting up to the green. The putting surface is higher than the fairway.
    Even (Even Par), Golfing term for when you score is the same as the par for the course. If you shoot 72 on a par 72 course, you shot even.
    Executive Course, A golf course that’s shorter than a standard course for two reasons. First, the holes themselves are shorter, and second, there are more par 3s than normal. A standard golf course may be a par 70, 71, or 72, but an executive course typically has a total par of 62-65.
    `;
  const lines = source.split("\n");
  const words = lines.map((line) =>
    line.split(",", 2).map((word) => word.trim())
  );

  // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
  // TODO strip off blank and NA definitions
  await prisma.word.createMany({
    data: words.map(([word, definition]) => ({
      word,
      sourceId: 1,
      definition: definition || "NA",
    })),
  });
}
main();

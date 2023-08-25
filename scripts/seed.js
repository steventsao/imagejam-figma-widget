"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var source, lines, words;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    source = "Ace, Golf slang for a hole in one. When your first shot finds the bottom of the cup!\n    Airmail, Golf slang for when you hit your approach shot over the green. You might hear a player say, \u201CI hit too much club on #7 and airmailed the green.\u201D\n    Albatross, This golfing term describes when you score 3 below par on a hole. You make a hole in one on a par 4 or a 2 on a par 5. Also known as a double eagle or \u201Cthe rarest of birds.\u201D\n    Alignment, The process of aiming your golf shot. Your alignment is dictated by your feet, shoulders, and your clubface.\n    All Square, Golf word that\u2019s used when playing match play to describe a match that\u2019s tied.\n    Angle Of Attack, The up or down movement of the clubhead at the time of compression of the golf ball. Attack angle is measured relative to the horizon. Your angle of attack is different with different clubs. This is one of the metrics measured when you use a golf simulator (ie TrackMan).\n    Attend The Flag, Often shortened to \u201Ctend it\u201D, this is when you have someone (caddy or playing partner) hold the pin/flag while you putt. As your ball approaches the hole, the person removes the flag.\n    Automatics, Common golf betting term - it means that automatic new bets start at a specific time in the match. Typically, golfers play \u201C2 down automatics\u201D which means a new bet starts anytime someone is down two holes.\n    Back Nine, Golfing term for the 2nd 9 holes of an 18-hole round of golf.\n    Backswing, Golfing term for the first half of your swing. Describes your swing from the start until you reach the top.\n    Backspin, When your ball lands on the green and spins backward. This happens primarily when you\u2019re hitting an approach shot with a wedge or short iron.\n    Below The Hole, You\u2019ll hear a golfer say \u201Cthe greens are fast, you need to leave your ball below the hole.\u201D This means you don\u2019t want a downhill putt. You want your ball to stop below the hole so you have an uphill putt.\n    Birdie, Golfing term for when you score 1 below par on a hole. For example, you make a 3 on a par 4.\n    Bladed Shot, Golf slang for when a player hits a shot with the bottom of an iron instead of the face. This causes a low shot that goes way too far.\n    Bogey, Golfing term for when you score 1 over par on a hole. For example, you make a 5 on a par 4.\n    Break, Describes how a putt is going to curve on the green. A player reads the \u201Cbreak\u201D to determine where to aim their putt.\n    Breakfast Ball, Golf slang for a mulligan. If you hit a bad shot on the first hole, you get to hit another one without a penalty.\n    Bunker, Synonym for a sand trap. You can have a waste bunker, fairway bunker, or greenside bunker.\n    Buzzard, Golf slang for making a double bogey on a hole. A double-bogey is when you score 2 over par. For example, you make a 6 on a par 4.\n    Cabbage, golf slang for high grass and deep rough.\n    Caddie, Golf word for the person that carries your clubs and gives your advice on how to play.\n    Chilly Dip, Golf slang for a poor chip shot. Typically used when you hit behind the ball and it comes up way short of your target.\n    Chip, Golfing term for the shot you play when you are close to the green. You typically use a wedge, make a small swing (similar to a putting stroke), and hit the ball onto the putting surface.\n    Chunk, Golf slang for when you hit behind the ball and take a large divot. Typically a poor shot that comes up short. You might say, \u201CI chunked that one.\u201D\n    Compression, Compression describes a golf ball smashing against the clubface at impact. This is how the club propels the ball forward. Different types of golf balls have different compressions. This is why the best golf ball for you will depend on your clubhead speed.\n    Condor, Golf slang for scoring 4-under on a hole. This can only happen by making a 1 on a par 5 and it\u2019s extremely rare.\n    Course Rating, Course rating is used when calculating your golf handicap. It\u2019s an evaluation of how hard a specific course should play for a scratch golfer (0 handicap). You can find the course rating on the scorecard.\n    Cut, Golf slang for a small slice. For a right-handed golfer, this describes a ball that curves slightly to the right.\n    Divot, Golfing term used to describe the hole you leave after hitting the ground during a shot. It is also used when you make a mark on the green when your ball lands.\n    Draw, Golf slang for a small hook. For a right-handed golfer, this describes a ball that curves slightly to the left.\n    Dogleg, Common golf term for a hole that\u2019s crooked like the \u201Chind leg of a dog.\u201D Typically, the hole is straight for your tee shot but bends to the left or the right for your approach shot.\n    Dormie, A golfing term used when playing match play. It means that one player is up by as many holes as are left. In other words, if you\u2019re 5 up with 5 holes to play, you\u2019re \u201CDormie.\u201D\n    Double Bogey, When you score two over par on a hole. For example, you make a 6 on a par 4.\n    Double Eagle, Synonym for albatross. When you score 3 under par on a hole. A 1 on a par 4 or a 2 on a par 5.\n    Downswing, Golf word for the part of your golf swing from the top to contact with the golf ball.\n    Driver, The longest club in your golf bag. You use your driver on most par 4s and par 5s and you typically use a tee. Also known as a 1-wood.\n    Duff, Golf slang for a bad shot. One that you mis-hit and didn\u2019t go as far as you intended.\n    Eagle, Golfing term for when you score 2 under par on a hole. For example, you make a 3 on a par 5.\n    Elevated Green, You\u2019re hitting up to the green. The putting surface is higher than the fairway.\n    Even (Even Par), Golfing term for when you score is the same as the par for the course. If you shoot 72 on a par 72 course, you shot even.\n    Executive Course, A golf course that\u2019s shorter than a standard course for two reasons. First, the holes themselves are shorter, and second, there are more par 3s than normal. A standard golf course may be a par 70, 71, or 72, but an executive course typically has a total par of 62-65.\n    ";
                    lines = source.split("\n");
                    words = lines.map(function (line) {
                        return line.split(",", 2).map(function (word) { return word.trim(); });
                    });
                    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
                    // TODO strip off blank and NA definitions
                    return [4 /*yield*/, prisma.word.createMany({
                            data: words.map(function (_a) {
                                var word = _a[0], definition = _a[1];
                                return ({
                                    word: word,
                                    sourceId: 1,
                                    definition: definition || "NA"
                                });
                            })
                        })];
                case 1:
                    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
                    // TODO strip off blank and NA definitions
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();

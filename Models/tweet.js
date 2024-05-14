const mongoose = require("mongoose");
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/relationshipDemo');
    await console.log("MONGO CONNECTED!!!")
}

const userSchema = new mongoose.Schema({
    username: String,
    age: Number
});

const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     // const user = new User({ username: 'Chickenfan99', age: 61 });
//     const user = await User.findOne({ username: 'Chickenfan99' })
//     const tweet2 = new Tweet({ text: 'bock bock my chickens make noises!', likes: 0 });
//     tweet2.user = user;
//     tweet2.save()

// }

// makeTweets();

const findTweet = async () => {
    const t = await Tweet.find({}).populate('user')
    console.log(t)
}

findTweet();
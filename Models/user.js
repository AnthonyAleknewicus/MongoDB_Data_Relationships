const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/relationshipDemo');
    await console.log("MONGO CONNECTED!!!")
}

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    address: [
        {
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]    
});

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter',   
        address: [
            {
                street: '4 Privet Drive',
                city: 'Little Whinging',
                state: 'Surrey',
                country: 'UK'
            }
        ]     
    })
    const res = await u.save();
    console.log(res)
}

makeUser();
const mongoose = require("mongoose");
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/relationshipDemo');
    await console.log("MONGO CONNECTED!!!")
}

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     { name: 'Goddess Melon', price: 6.99, season: 'Summer'},
//     { name: 'Sugar Baby Vaveemelon', price: 4.99, season: 'Summer'},
//     { name: 'Cranberries', price: 2.99, season: 'Winter'},
//     { name: 'Pumpkin', price: 5.99, season: 'Fall'},
// ]);

// const makeFarm = async () => {
//     const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda, CA' });
//     const melon = await Product.findOne({ name: 'Goddess Melon' });
//     farm.products.push(melon)
//     await farm.save();
// }



const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Full Belly Farms' });
    const watermelon = await Product.findOne({ name: 'Sugar Baby Watermelon' });
    farm.products.push(watermelon);
    await farm.save();
    console.log(farm)
}

addProduct();

Farm.findOne({ name: 'Full Belly Farms' })
.populate('products')
.then(farm => console.log(farm));
const mongoose = require('mongoose');
const Product = require('./models/product.model');
require('dotenv').config();

const products = [
    { 
        name: "The Himalayan Retreat", 
        description: "A breathtaking villa nestled in the hills of Budhanilkantha, featuring panoramic views of the Kathmandu Valley and a private heated pool.", 
        price: 155000000, 
        location: "Budhanilkantha, Kathmandu", 
        category: "Villa",
        image: "https://images.unsplash.com/photo-1544894079-e81a9eb1da8b?q=80&w=2070&auto=format&fit=crop"
    },
    { 
        name: "Pokhara Lakeside Manor", 
        description: "Luxury living with an unobstructed view of Fewa Lake and the Annapurna range. Modern architecture meets traditional stone crafted details.", 
        price: 98000000, 
        location: "Lakeside, Pokhara", 
        category: "Villa",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
    },
    { 
        name: "Heritage Heights Apartment", 
        description: "A premium duplex apartment in the heart of Jhamsikhel, blending contemporary design with heritage aesthetics. Fully automated smart home.", 
        price: 45000000, 
        location: "Jhamsikhel, Lalitpur", 
        category: "Apartment",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
    },
    { 
        name: "The Everest View Estate", 
        description: "A sprawling private estate in Nagarkot, perfect for 360-degree mountain views and ultimate privacy. Includes a private helipad.", 
        price: 210000000, 
        location: "Nagarkot, Bhaktapur", 
        category: "Land",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop"
    },
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to DB');
        await Product.deleteMany({});
        console.log('Cleared DB');
        await Product.insertMany(products);
        console.log('Seeded Nepalese Properties');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();

const Product = require('../models/product.model');
const ApiError = require('../utils/ApiError');

const getAllProducts = async () => {
    return await Product.find();
};

const getProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(404, 'Product not found');
    }
    return product;
};

const createProduct = async (productData) => {
    const product = new Product(productData);
    await product.save();
    return product;
};

const seedProducts = async () => {
    try {
        console.log('Clearing existing products...');
        await Product.deleteMany({});

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
        
        console.log('Inserting new products...');
        const result = await Product.insertMany(products);
        console.log(`Successfully seeded ${result.length} products.`);
    } catch (error) {
        console.error('Error seeding products:', error);
        throw error;
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    seedProducts,
};

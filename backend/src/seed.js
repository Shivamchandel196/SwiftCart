import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const MAGENTA = '\x1b[35m';
const BLUE = '\x1b[34m';
const RED = '\x1b[31m';

const log = (message = '') => console.log(message);

const seedData = async () => {
  try {
    await connectDB();

    log(`${CYAN}✨ Clearing existing data...${RESET}`);

    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const users = [
      { name: 'John Doe', email: 'john@example.com', password: hashedPassword, role: 'user', verified: true },
      { name: 'Jane Smith', email: 'jane@example.com', password: hashedPassword, role: 'user', verified: true },
      { name: 'Alice Johnson', email: 'alice@example.com', password: hashedPassword, role: 'user', verified: true },
      { name: 'Bob Wilson', email: 'bob@example.com', password: hashedPassword, role: 'user', verified: false },
      { name: 'Charlie Brown', email: 'charlie@example.com', password: hashedPassword, role: 'user', verified: true },
      { name: 'Diana Prince', email: 'diana@example.com', password: hashedPassword, role: 'user', verified: true },
      { name: 'Super Admin', email: 'superadmin@example.com', password: hashedPassword, role: 'admin', verified: true },
      { name: 'Admin User', email: 'admin@example.com', password: hashedPassword, role: 'admin', verified: true },
    ];

    const createdUsers = await User.insertMany(users);
    log(`${GREEN}✅ Users created: ${createdUsers.length}${RESET}`);

    const products = [
      { name: 'Wireless Headphones', description: 'Noise-cancelling over-ear headphones', price: 199.99, category: 'Electronics', imageUrl: 'https://example.com/headphones.jpg', stock: 50, rating: 4.5, numReviews: 25 },
      { name: 'Smart Watch', description: 'Fitness smart watch with heart rate monitor', price: 299.99, category: 'Electronics', imageUrl: 'https://example.com/smartwatch.jpg', stock: 30, rating: 4.2, numReviews: 18 },
      { name: 'Running Shoes', description: 'Comfortable running shoes for all terrains', price: 89.99, category: 'Sports', imageUrl: 'https://example.com/shoes.jpg', stock: 100, rating: 4.7, numReviews: 42 },
      { name: 'Coffee Maker', description: 'Automatic coffee maker with programmable timer', price: 149.99, category: 'Home & Kitchen', imageUrl: 'https://example.com/coffeemaker.jpg', stock: 25, rating: 4.3, numReviews: 15 },
      { name: 'Laptop Backpack', description: 'Water-resistant laptop backpack with multiple compartments', price: 59.99, category: 'Accessories', imageUrl: 'https://example.com/backpack.jpg', stock: 75, rating: 4.6, numReviews: 33 },
      { name: 'Gaming Mouse', description: 'RGB gaming mouse with programmable buttons and high DPI', price: 79.99, category: 'Electronics', imageUrl: 'https://example.com/gamingmouse.jpg', stock: 40, rating: 4.4, numReviews: 28 },
      { name: 'Yoga Mat', description: 'Non-slip yoga mat with carrying strap', price: 39.99, category: 'Sports', imageUrl: 'https://example.com/yogamat.jpg', stock: 60, rating: 4.8, numReviews: 55 },
      { name: 'Bluetooth Speaker', description: 'Portable wireless speaker with waterproof design', price: 129.99, category: 'Electronics', imageUrl: 'https://example.com/speaker.jpg', stock: 35, rating: 4.1, numReviews: 22 },
      { name: 'Kitchen Blender', description: 'High-speed blender for smoothies and food processing', price: 199.99, category: 'Home & Kitchen', imageUrl: 'https://example.com/blender.jpg', stock: 20, rating: 4.6, numReviews: 31 },
      { name: 'Sunglasses', description: 'UV protection sunglasses with polarized lenses', price: 49.99, category: 'Accessories', imageUrl: 'https://example.com/sunglasses.jpg', stock: 45, rating: 4.3, numReviews: 19 },
      { name: 'Wireless Earbuds', description: 'True wireless earbuds with active noise cancellation', price: 249.99, category: 'Electronics', imageUrl: 'https://example.com/earbuds.jpg', stock: 55, rating: 4.7, numReviews: 67 },
      { name: 'Dumbbells Set', description: 'Adjustable dumbbells for home workouts', price: 299.99, category: 'Sports', imageUrl: 'https://example.com/dumbbells.jpg', stock: 15, rating: 4.5, numReviews: 38 },
      { name: 'Air Fryer', description: 'Healthy cooking air fryer with digital controls', price: 179.99, category: 'Home & Kitchen', imageUrl: 'https://example.com/airfryer.jpg', stock: 25, rating: 4.4, numReviews: 41 },
      { name: 'Leather Wallet', description: 'Genuine leather wallet with RFID protection', price: 49.99, category: 'Accessories', imageUrl: 'https://example.com/wallet.jpg', stock: 80, rating: 4.2, numReviews: 26 },
      { name: 'Tablet', description: '10-inch tablet with high-resolution display', price: 399.99, category: 'Electronics', imageUrl: 'https://example.com/tablet.jpg', stock: 22, rating: 4.3, numReviews: 34 },
    ];

    const createdProducts = await Product.insertMany(products);
    log(`${GREEN}✅ Products created: ${createdProducts.length}${RESET}`);

    const orders = [
      {
        user: createdUsers[0]._id,
        products: [
          { productId: createdProducts[0]._id, quantity: 1, price: createdProducts[0].price },
          { productId: createdProducts[2]._id, quantity: 2, price: createdProducts[2].price },
        ],
        totalPrice: createdProducts[0].price + createdProducts[2].price * 2,
        address: { fullName: 'John Doe', street: '123 Main Street', city: 'New York', postalCode: '10001', country: 'USA' },
        paymentId: 'pay_123456789',
        status: 'Delivered',
      },
      {
        user: createdUsers[1]._id,
        products: [
          { productId: createdProducts[1]._id, quantity: 1, price: createdProducts[1].price },
        ],
        totalPrice: createdProducts[1].price,
        address: { fullName: 'Jane Smith', street: '456 Oak Avenue', city: 'Los Angeles', postalCode: '90210', country: 'USA' },
        paymentId: 'pay_987654321',
        status: 'Processing',
      },
      {
        user: createdUsers[2]._id,
        products: [
          { productId: createdProducts[3]._id, quantity: 1, price: createdProducts[3].price },
          { productId: createdProducts[4]._id, quantity: 1, price: createdProducts[4].price },
        ],
        totalPrice: createdProducts[3].price + createdProducts[4].price,
        address: { fullName: 'Alice Johnson', street: '789 Pine Road', city: 'Chicago', postalCode: '60601', country: 'USA' },
        paymentId: 'pay_555666777',
        status: 'Pending',
      },
      {
        user: createdUsers[3]._id,
        products: [
          { productId: createdProducts[5]._id, quantity: 1, price: createdProducts[5].price },
          { productId: createdProducts[6]._id, quantity: 1, price: createdProducts[6].price },
          { productId: createdProducts[7]._id, quantity: 1, price: createdProducts[7].price },
        ],
        totalPrice: createdProducts[5].price + createdProducts[6].price + createdProducts[7].price,
        address: { fullName: 'Alice Johnson', street: '789 Pine Road', city: 'Chicago', postalCode: '60601', country: 'USA' },
        paymentId: 'pay_111222333',
        status: 'Shipped',
      },
      {
        user: createdUsers[4]._id,
        products: [
          { productId: createdProducts[10]._id, quantity: 2, price: createdProducts[10].price },
        ],
        totalPrice: createdProducts[10].price * 2,
        address: { fullName: 'Charlie Brown', street: '321 Elm Street', city: 'Seattle', postalCode: '98101', country: 'USA' },
        paymentId: 'pay_444555666',
        status: 'Delivered',
      },
      {
        user: createdUsers[5]._id,
        products: [
          { productId: createdProducts[8]._id, quantity: 1, price: createdProducts[8].price },
          { productId: createdProducts[12]._id, quantity: 1, price: createdProducts[12].price },
        ],
        totalPrice: createdProducts[8].price + createdProducts[12].price,
        address: { fullName: 'Diana Prince', street: '555 Wonder Avenue', city: 'Gotham', postalCode: '12345', country: 'USA' },
        paymentId: 'pay_777888999',
        status: 'Processing',
      },
      {
        user: createdUsers[4]._id,
        products: [
          { productId: createdProducts[9]._id, quantity: 1, price: createdProducts[9].price },
          { productId: createdProducts[13]._id, quantity: 1, price: createdProducts[13].price },
        ],
        totalPrice: createdProducts[9].price + createdProducts[13].price,
        address: { fullName: 'Bob Wilson', street: '999 Maple Drive', city: 'Austin', postalCode: '73301', country: 'USA' },
        paymentId: 'pay_000111222',
        status: 'Cancelled',
      },
      {
        user: createdUsers[3]._id,
        products: [
          { productId: createdProducts[14]._id, quantity: 1, price: createdProducts[14].price },
        ],
        totalPrice: createdProducts[14].price,
        address: { fullName: 'Alice Johnson', street: '789 Pine Road', city: 'Chicago', postalCode: '60601', country: 'USA' },
        paymentId: 'pay_333444555',
        status: 'Pending',
      },
    ];

    const createdOrders = await Order.insertMany(orders);
    log(`${GREEN}✅ Orders created: ${createdOrders.length}${RESET}`);

    log('');
    log(`${MAGENTA}🚀 Database seeded successfully!${RESET}`);
    log('');
    log(`${BLUE}🔐 Login Credentials:${RESET}`);
    log('');
    log(`${YELLOW}👑 Admin:${RESET}`);
    log(`Email: admin@example.com`);
    log(`Password: ${password}`);
    log('');
    log(`${YELLOW}👤 User:${RESET}`);
    log(`Email: john@example.com`);
    log(`Password: ${password}`);
    log('');

    process.exit(0);
  } catch (error) {
    console.error(`${RED}❌ Seed failed:${RESET}`, error.message);
    process.exit(1);
  }
};

seedData();

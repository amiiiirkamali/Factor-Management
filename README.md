# Invoice Management System (سیستم مدیریت فاکتور)

A comprehensive web-based invoice management system built with Node.js and Express, featuring Persian/Farsi language support for managing products, customers, sellers, and invoices.

## Features

- **User Authentication**: Registration and login system with cookie-based sessions
- **Product Management**: Add, edit, view, and delete products with various units (kg, gram, liter, etc.)
- **Invoice/Factor Creation**: Create detailed invoices with multiple products, discounts, and calculations
- **Customer & Seller Management**: Manage customer and seller information
- **Responsive Design**: Mobile-friendly interface with Persian RTL support
- **Data Persistence**: JSON file-based data storage

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Template Engine**: EJS
- **Language**: Persian/Farsi with RTL support
- **Data Storage**: JSON files

## Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd invoice-management-system
```

2. Install dependencies:
```bash
npm install express ejs
```

3. Create the required JSON data files in the project root:
```bash
touch users.json products.json factors.json sellers.json customers.json
```

4. Initialize empty JSON arrays in each file:
```json
[]
```

5. Create an `image` folder for static assets:
```bash
mkdir image
```

## Project Structure

```
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── index.html            # Homepage
├── login.html            # Login page
├── register.html         # Registration page
├── product_form.html     # Add product form
├── factor_form.html      # Add invoice/factor form
├── views/                # EJS templates
│   ├── factors.ejs       # Invoice list view
│   ├── factor.ejs        # Single invoice view
│   ├── products.ejs      # Product list view
│   ├── viewProduct.ejs   # Single product view
│   └── editProduct.ejs   # Edit product form
├── image/                # Static images
├── users.json           # User data
├── products.json        # Product data
├── factors.json         # Invoice/factor data
├── sellers.json         # Seller data
└── customers.json       # Customer data
```

## Running the Application

1. Start the server:
```bash
node server.js
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

### Authentication
- `GET /login` - Login page
- `GET /register` - Registration page
- `POST /users_create` - Create new user

### Products
- `GET /products` - View all products
- `GET /products_json` - Get products as JSON
- `POST /products` - Add new product
- `GET /add_product` - Add product form
- `GET /view/:product_id` - View single product
- `GET /edit/:product_id` - Edit product form
- `POST /edit/:product_id` - Update product
- `GET /delete/:product_id` - Delete product

### Invoices/Factors
- `GET /factors` - View all invoices
- `GET /factors_json` - Get invoices as JSON
- `POST /factors` - Create new invoice
- `GET /add_factor` - Add invoice form
- `GET /factor/:factor_id` - View single invoice

### Data Management
- `GET /users_json` - Get users data
- `GET /sellers_json` - Get sellers data
- `GET /customers_json` - Get customers data

## Key Features Explained

### User Authentication
- Cookie-based session management
- Registration with duplicate email prevention
- Login validation against stored user data

### Product Management
- Support for multiple units (kilogram, gram, liter, milliliter, number, meter)
- CRUD operations for products
- Price and description management

### Invoice System
- Multi-product invoices with quantity and discount support
- Automatic total price calculation
- Seller and customer information integration
- Payment type selection (cash/non-cash)
- Unique factor ID generation

### Persian/Farsi Support
- Right-to-left (RTL) text direction
- Persian language interface
- Persian date and time formatting

## Data Models

### User
```json
{
  "user_id": 1,
  "email": "user@example.com",
  "password": "password"
}
```

### Product
```json
{
  "product_id": 1,
  "name": "محصول نمونه",
  "price": 1000,
  "unit": "kilogram",
  "description": "توضیحات محصول"
}
```

### Invoice/Factor
```json
{
  "factorId": 1,
  "seller_name": "نام فروشنده",
  "customer_name": "نام مشتری",
  "products": [...],
  "totalPrice": 5000,
  "payment_type": "debit_payment",
  "date": "1/1/2024 12:00:00 PM"
}
```

## Security Considerations

⚠️ **Important**: This application is designed for development/demo purposes. For production use, consider implementing:

- Password hashing (bcrypt)
- Proper session management
- Input validation and sanitization
- HTTPS encryption
- Database instead of JSON files
- Environment variables for configuration
- CSRF protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues, please create an issue in the repository or contact the development team.

---

**Note**: This system uses Persian/Farsi language interface. Make sure your browser supports UTF-8 encoding for proper display of Persian text.


Written by:Amirreza kamali

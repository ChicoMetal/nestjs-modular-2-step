# NestJS E-commerce API

A modern e-commerce backend built with NestJS, GraphQL, and MongoDB.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications
- **GraphQL**: API query language with Apollo Server implementation
- **MongoDB**: NoSQL database used with Prisma ORM
- **Prisma**: Next-generation ORM for Node.js and TypeScript
- **JWT Authentication**: JSON Web Token based authentication
- **GraphQL Scalars**: Custom scalar types for GraphQL schema
- **Docker**: Containerization for MongoDB database
- **TypeScript**: Programming language for type-safe code

## Prerequisites

- Node.js (v22 or higher)
- Docker and Docker Compose
- MongoDB (via Docker or local installation)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nestjs-modular-2-step
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following content:
```env
API_KEY=1234
DATA_BASE_NAME=my_db
DATA_BASE_PORT=8092
PORT=3000
SECRET_KEY=your-secret-key
DATABASE_URL="mongodb://127.0.0.1:27017/my_db?replicaSet=rs0&retryWrites=true&w=majority"
```

4. Start MongoDB using Docker:
```bash
docker-compose up -d
```

5. Generate Prisma client:
```bash
npm run prisma:generate
```

6. Push the database schema:
```bash
npm run prisma:push
```

## Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

## API Documentation

### REST API
The REST API documentation is available at:
- Swagger UI: `http://localhost:3000/api`

### GraphQL API
The GraphQL playground is available at:
- GraphQL Endpoint: `http://localhost:3000/graphql`

### GraphQL Examples

#### Query Operations
##### Headers
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

```graphql
query ExampleQuery($productId: ID!) {

  # Get all products with their categories
  products {
    id
    name
    categoryId
    category {
      name
    }
  }

  # Get specific product with detailed category info
  product(id: $productId) {
    id
    name
    createAt
    categoryId
    category {
      id
      name
      products {
        id
      }      
    }
  }
  
  # Get all categories with their products
  categories {
    id
    name
    products {
      id
      name
    }
  }
  
  # Get all brands
  brands {
    id
    name
  }
  
  # Get all users
  users {
    email
    role
  }
}
```
##### Variables
```json
{
  "productId": "68282e86876f2705d513fdd6"
}
```



#### Creation and Authentication Operations
##### Headers
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

```graphql
# Create a new product
  mutation($data: ProductCreateInput!) {
    addProduct(data: $data) {
      id
      name
    }
  }

  # Create a new category
  mutation($addCategoryData: CategoryCreateInput!) {
    addCategory(data: $addCategoryData) {
      id
      name
    }
  }

  # Create a new brand
  mutation($addBrandData: BrandCreateInput!) {
    addBrand(data: $addBrandData) {
      id
      name
    }
  }

  # Create a new user
  mutation($addUserData2: UserCreateInput!) {
    addUser(data: $addUserData2) {
      email
      password
    }
  }

  # User login
  mutation($loginUserInput: LoginInput!) {
    login(loginUserInput: $loginUserInput) {
      access_token
      user {
        id
        email
      }
    }
  }

  # User signup
  mutation($signUpLoginUserInput2: LoginInput!) {
    signUp(loginUserInput: $signUpLoginUserInput2) {
      id
      email
    }
  }
```

##### Variables
  ```json
  {
    "data": {
      "name": "smartwatch 4",
      "description": "latest smartwatch",
      "price": 1200,
      "stock": 24,
      "image": "http://myimages/image1.png",
      "categoryId": "6828307dc11f3f65281bb6ee"
    },
    "addCategoryData": {
      "name": "category 2",
      "description": "category description 2"
    },
    "addBrandData": {
      "name": "brand 1",
      "description": "description 1",
      "image": "http://myimages/image2.png"
    },
    "addUserData2": {
      "email": "carlos@gmail.com",
      "password": "123",
      "role": "admin"
    },
    "loginUserInput": {
      "userName": "carlos@gmail.com",
      "password": "123"
    },
    "signUpLoginUserInput2": {
      "userName": "carlos@gmail.com",
      "password": "123"
    }
  }
  ```

#### Update Operations
##### Headers
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

```graphql

  # Update a product
  mutation($updateProductId: ID!, $data: ProductUpdateInput!) {
    updateProduct(id: $updateProductId, data: $data) {
      id
      name
    }
  }
```

##### Variables
  ```json
  {
    "updateProductId": "68282e86876f2705d513fdd6",
    "data": {
      "name": "smartwatch new"
    }
  }
  ```

#### Delete Operations
##### Headers
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

```graphql

  # Delete a brand
  mutation($deleteBrandId: ID!) {
    deleteBrand(id: $deleteBrandId)
  }

  # Delete a product
  mutation($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId)
  }

```
##### Variables
  ```json
  {
    "deleteBrandId": "682831773b1e354a44a51629",
    "deleteProductId": "68282e86876f2705d513fdd6"
  }
  ```

## Features

- User Authentication with JWT
- Role-based Authorization
- GraphQL API with Custom Scalars
- MongoDB Integration with Prisma
- Product Management
- Category Management
- User Management

## Available Scripts

- `npm run start:dev`: Starts the application in development mode
- `npm run build`: Builds the application
- `npm run start:prod`: Starts the application in production mode
- `npm run start:debug`: Starts the application in debug mode
- `npm run prisma:generate`: Generates Prisma client
- `npm run prisma:push`: Pushes schema changes to the database
- `npm run schema:gen`: Generates GraphQL schema types

## Project Structure

```
src/
├── app.module.ts        # Main application module
├── main.ts             # Application entry point
├── auth/               # Authentication related files
├── users/              # User module and components
├── products/           # Product module and components
├── database/           # Database configuration
├── guards/             # Authorization guards
└── prisma/            # Prisma schema and configurations
```

## Security

This application implements several security features:
- JWT-based authentication
- Role-based authorization
- HTTP-only cookies
- Environment variable validation
- Custom guards for GraphQL endpoints

## Development

### Adding New Features
1. Create a new module: `nest generate module <module-name>`
2. Create components: `nest generate controller/service/resolver <name>`
3. Update the Prisma schema if needed
4. Generate new Prisma client after schema changes
5. Implement the feature
6. Add tests

### Testing
```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

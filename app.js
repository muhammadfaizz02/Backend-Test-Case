const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const db = require('./config/db'); 

const app = express();

app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Book Borrowing API',
            version: '1.0.0',
            description: 'API for managing book borrowing in a library',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
const bookRoutes = require('./routes/books');
const memberRoutes = require('./routes/members');

app.use('/books', bookRoutes);
app.use('/members', memberRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

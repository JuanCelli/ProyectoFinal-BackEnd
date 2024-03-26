import swaggerJSDoc from 'swagger-jsdoc'


const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "BackEnd e-commerce",
            description: "Lógica de negocios y backend de ecommerce."
        }
    },
    apis: ['./src/docs/**/*.yaml']
}
const swaggerSpecs = swaggerJSDoc(options);

export  default swaggerSpecs
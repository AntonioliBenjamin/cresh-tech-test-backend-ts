# Cresh

## Installation

```bash
$ git clone https://github.com/AntonioliBenjamin/cresh-tech-test-backend-ts.git
$ cd cresh-tech-test-backend-ts
$ npm install
```
 ## Run 
```bash
$ npm start
```

 ## Test

```bash
$ npm run test
```

## Architecture

The following program has been built respecting as best as possible the principles of clean architecture.

Three major layers:

- **core:** this is the heart of the application, it contains the business code. entities, usescases and interfaces.

- **adapters:** this is the part of the program where all the tools from the outside are implemented and on which the application must not depend, such as the database and the service providers, you will also find a mapper which standardizes the arrival of raw data in the program, 

- **app:** this is the part of the program that makes the link between the core and the adapters. this is where the API points are built and the usescases are implemented by the adapters

## Connection

First, create an **.env** file at the root of the project and create two environment variables:

 1. **MONGODB_URL**
    
 2. **PORT**

  


 

>    //.env file example
>    
>     MONGODB_URL=mongodb://127.0.0.1:27017/cresh
>     PORT=3000

    
    

## API
  
All endpoints return standardized entities,  you will find seven API points:

## **Customers:**

 **- POST - /customers**
 

>   Creation of a new customer

>    *body example:*
>    
>      {
>             "firstname": "John",
>             "lastname": "Doe",
>             "birthdate": "15/05/1992"
>      }

 

**- GET - /customers/all**


> List of all the customers

 **- GET - /customers/transactions/:customerId**
 

>    List of all the transactions related to a given customer
>    
>    example :   /customers/transactions/12345

## **Transactions:**

 **- POST - /transactions**

 

> Create a transaction


>*body example:*


>      { 
>        ammout: 1000.87, 
>        customer_id: "12345", 
>         is_online: true,
>         split: 4,
>         store_name: "The Store"
>      }

 **- GET - /transactions/instalments/:transactionId**

>    List of all the instalments related to a given transaction
>    
>    example : /transactions/instalments/12345

 **- PATCH - /transactions/instalments/:instalmentId**
 

>    Trigger a payment of a specific transaction's instalment
>    
>    example : /transactions/instalments/12345

## **Status:**

**- GET - /status**

> server and db healthcheck 

  

## Test
  
All the layers of the program are tested with Jest, you will find the **unit tests** on the core part, **integration tests** on the adapters part and the **end to end tests** on the app part.  The program has a coverage rate of 100%


## Conclusion

The program is designed and built in such a way that it can be maintained and evolved simply.

Possible improvements for the future would be to implement management of API errors and appropriate status codes.

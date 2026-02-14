# Library Management System

## Backend

### what is pre('save') hook in mongoose

A mongoose middleware function that runs authomatically before a document is saved.

It is a document middleware.

It allows actions such as data validation, modification, logging on before the actual save operation occurs

### Express middleware shape

```js
(req, res, next) => {};
```

**_every_**

an array method to check if all its elements satisfy a condition

### multer

- middleware for handling multipart/ form-data

- Multer parses the request and gives you access to files

### difference between jest and supertest

- **Jest** is a complete test frame work for javascript

- **supertest** is specifically for api testing

### multipart/form-data

multer is an HTTP content type (MIME type) user to send data to a server when a request includes

multiple indepent parts.It is the standard method for uploading files via

HTML forms

#### mongoose lean query

A mongoose lean query is an optimization technique that tell mongoose to return plain javascript

objects instead of full mongoose document objects. This significantly improves performance and reduces

memory usage.

---

## Frontend

### Higher Order components

HOC are an advanced react pattern for reusing component logic.

It is a function that takes existing component as an argument and returns a new enhanced component with

additional state, prop or behaver

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

### Interceptors in react

Interceptors are functions used with HTTP client libraries to **_globally_** manage and modify HTTP

requests and responses.

Request and Response interceptors allows you to intercept request and responses before they are handled

by then or catch.

**_use cases_**

1. Authentication and Authorization

2. Global error handling

3. Token refresh machanism

4. Logging and Monitoring

5. Data Transformation

### Redux

redux state is memory only

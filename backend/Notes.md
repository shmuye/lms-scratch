# Library Management System 

### what is pre('save') hook in mongoose 

- a mongoose middleware function that runs authomatically before a document is saved
- It is a document middleware 
- It allows actions such as data validation, modification, logging on before the actual save operation occurs

### Express middleware shape

```js 
    (req, res, next) => {}

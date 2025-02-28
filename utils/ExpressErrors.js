class ExpressError extends Error { // create a class that extends Error class means it will inherit all the properties of Error class
    constructor(message,status){
        super(); // call the constructor of parent class
        this.message = message;
        this.status = status;
    }
}

module.exports = ExpressError; // export the class so that it can be used in other files
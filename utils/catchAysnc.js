module.exports = func => { // create a function that takes a function as an argument and returns a function with catch chained to it
    return (req, res, next) => { // return a function that takes req, res and next as arguments 
        func(req, res, next).catch(next); // 
    }
}
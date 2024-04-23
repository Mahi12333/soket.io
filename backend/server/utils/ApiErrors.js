// class ApiError extends Error {
//     constructor(status, message) {
//       super(message);
//       this.status = status;
//     }
//   }
  
//   export { ApiError };
  



class ApiError extends Error {
    constructor(
        {statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""}
    ){
        console.log(statusCode,message,errors,stack)
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        //Error.captureStackTrace(this, this.constructor); 

        if (stack) {
            this.stack = stack; // Set stack property if provided
        } else {
            Error.captureStackTrace(this, this.constructor); // Capture stack trace if not provided
        }
    }
}

export {ApiError}

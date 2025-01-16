
interface ErrorType{
    status:number;
    success:boolean;
    message:string;
}

class ErrorHandler extends Error{
    status:number;
    success:boolean;

    constructor({message="Something went wrong...",status,success}:ErrorType){
        super(message);
        this.status=status||500;
        this.success=success||false;

        Error.captureStackTrace(this,this.constructor)
    }
}

export default ErrorHandler;
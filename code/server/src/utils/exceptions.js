class DomainError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ResourceNotFoundError extends DomainError {
    constructor(resource, query) {
        super(`Resource ${resource} was not found.`);
        this.data = {resource, query};
    }
}

class ValidationError extends DomainError{
}

module.exports = {
    ResourceNotFoundError: ResourceNotFoundError,
    ValidationError: ValidationError
}

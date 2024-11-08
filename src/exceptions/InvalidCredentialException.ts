class InvalidCredentialException extends Error {
    constructor(message: string) {
        super(message)
        this.name = "UserNotFound"
    }
}

export { InvalidCredentialException }
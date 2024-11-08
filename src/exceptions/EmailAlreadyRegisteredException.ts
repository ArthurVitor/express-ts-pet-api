class EmailAlreadyRegisteredException extends Error {
    constructor(message: string) {
        super(message)
        this.name = "EmailAlreadyRegistered"
    }
}

export { EmailAlreadyRegisteredException }
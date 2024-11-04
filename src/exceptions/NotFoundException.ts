class NotFoundException extends Error{
    constructor(message: string) {
        super(message)
        this.name = "PetNotFound"
    }
}

export { NotFoundException }
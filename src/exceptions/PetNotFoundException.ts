class PetNotFoundException extends Error {
    constructor(message: string) {
        super(message)
        this.name = "PetNotFound"
    }
}

export { PetNotFoundException }
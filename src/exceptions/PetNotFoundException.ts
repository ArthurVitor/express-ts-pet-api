import { NotFoundException } from "./NotFoundException"

class PetNotFoundException extends NotFoundException {
    constructor(message: string) {
        super(message)
        this.name = "PetNotFound"
    }
}

export { PetNotFoundException }
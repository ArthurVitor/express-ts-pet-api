import { NotFoundException } from "./NotFoundException";

class UserNotFoundException extends NotFoundException {
    constructor(message: string) {
        super(message)
        this.name = "UserNotFound"
    }
}

export { UserNotFoundException }
import Pet from "../interfaces/pet.i";
import { GenericRepository } from "./generic-repository";

const PET_COLLECTION: string = "pet_express_cl";

class PetRepository extends GenericRepository<Pet> {
    constructor() {
        super(PET_COLLECTION)
    }
}


export { PetRepository }
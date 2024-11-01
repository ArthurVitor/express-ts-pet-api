import { dbContext } from "../db/mongo-connection";
import { Collection, Document, ObjectId } from "mongodb";
import Pet from "../interfaces/pet.i";
import { PetNotFoundException } from "../exceptions/PetNotFoundException";

async function getPetById(_id: ObjectId): Promise<Pet> {
    const db = await dbContext();
    const petCollection: Collection<Pet> = db.collection("pet_express_cl");

    const pet = await petCollection.findOne({ _id: _id })
    
    if (!pet) {
        throw new PetNotFoundException("Couldn't find pet with Id dwadwadwadaw" + _id)
    }

    return pet;
}

async function insertPet(pet: Pet): Promise<Pet> {
    try {
        const db = await dbContext();
        const petCollection: Collection<Pet> = db.collection("pet_express_cl");

        const result = await petCollection.insertOne(pet);
        return getPetById(result.insertedId);
        
    } catch (error) {
        throw new Error(String(error));
    }
}


export { getPetById, insertPet }
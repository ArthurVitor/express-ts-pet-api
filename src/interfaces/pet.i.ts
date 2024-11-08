import { ObjectId } from "mongodb";
import Owner from "./owner.i";

export default interface Pet {
    _id: ObjectId,
    name: string,
    specie: string,
    breed: string,
    age: number,
    owners: Owner[]
}
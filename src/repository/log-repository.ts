import { Log } from "../interfaces/log.i";
import { GenericRepository } from "./generic-repository";

const LOG_COLLECTION: string = "log_cl";

class LogRepository extends GenericRepository<Log> {
    constructor() {
        super(LOG_COLLECTION);
    }
}

export { LogRepository }
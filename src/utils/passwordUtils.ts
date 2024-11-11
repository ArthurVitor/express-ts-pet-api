const bcrypt = require('bcrypt');

async function comparePassword(plainTextPass: string, hashedPass: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPass, hashedPass);
}

async function hashPassword(plainTextPass: string) {
    return await bcrypt.hash(plainTextPass, 10);
}

export { comparePassword, hashPassword }
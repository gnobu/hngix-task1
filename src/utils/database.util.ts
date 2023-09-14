import mongoose from "mongoose"

class Database {
    private _dbURI
    constructor(dbURI: string) {
        this._dbURI = dbURI
    }
    public async connect() {
        await mongoose.connect(this._dbURI)
    }
}

export default Database
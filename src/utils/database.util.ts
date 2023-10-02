import mongoose from "mongoose"

class Database {
    private _dbURI
    constructor(dbURI: string) {
        this._dbURI = dbURI
    }
    public async connect() {
        await mongoose.connect(this._dbURI)
        console.log('Connected to MongoDB!')
    }
    public async disconnect() {
        await mongoose.disconnect()
        console.log('Disconnected from MongoDB!')
    }
}

export default Database
import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

const connection = {}

const databaseConnect = async() => {
    if (connection.isConnected) return

    const databaseConnection = await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    connection.isConnected = databaseConnection.connections[0].readyState
}

export const mongodb = {
    connect: databaseConnect,
    connection
}
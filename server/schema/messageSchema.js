import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Message = mongoose.model('message', messageSchema)
export default Message
import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model('comment', commentSchema)
export default Comment 
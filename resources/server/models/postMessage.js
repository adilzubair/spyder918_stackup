import mongoose from "mongoose";

const postSchema= mongoose.Schema({
    user: {
        type: String,
        required: true,
      },
      taskName: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['to do', 'doing', 'done'],
        default: 'to do',
      },
      dueDate: Date
    });

const PostMessage= mongoose.model('PostMessage',postSchema);
export default PostMessage;  
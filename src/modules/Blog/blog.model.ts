import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Blog Title is required'],
    },
    content: {
      type: String,
      trim: true,
      required: [true, 'Blog content is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, 'Author id is required'],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const BlogModel = model<TBlog>('Blogs', blogSchema);

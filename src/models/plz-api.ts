import mongoose, { Schema, Document } from 'mongoose';

interface IPlz extends Document {

  plz: string;
  stadt: string;
}

const PlzSchema: Schema = new Schema({
  plz: { type: String, required: true },
  stadt: { type: String, required: true },
});

export default mongoose.model<IPlz>('plz', PlzSchema);

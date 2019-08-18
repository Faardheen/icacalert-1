import { Schema, model } from 'mongoose';

const DistrictSchema = new Schema({
  geo: {
    type: String,
    required: true
  },
  average: {
    type: Number,
    required: false
  }
});

export default model('District', DistrictSchema);
import mongoose from 'mongoose';

const productShema = mongoose.Schema({
  name: String,
  slug: String,
  price: {
    type: Number,
    default: 0,
  },
  details: String,
  images: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ProductMessage = mongoose.model('ProductMessage', productShema);
export default ProductMessage;

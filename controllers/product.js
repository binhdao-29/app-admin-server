import mongoose from 'mongoose';
import ProductMessage from '../models/productMessage.js';

export const getProducts = async (req, res) => {
  try {
    const products = await ProductMessage.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  const newProduct = new ProductMessage(product);

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Sản phẩm không tồn tại');
  }

  const updateProduct = await ProductMessage.findByIdAndUpdate(_id, { ...product, _id }, { new: true });
  res.json(updateProduct);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('Sản phẩm không tồn tại');
  }

  await ProductMessage.findOneAndRemove(id);

  res.json({ message: 'Xoá sản phẩm thành công' });
};

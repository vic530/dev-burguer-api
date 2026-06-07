import * as Yup from 'yup';
import Category from './../models/Category.js';
import Product from './../models/Product.js';


class ProductsController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const { name, price, category_id, offer } = req.body;
    const { filename } = req.file;

    try {

      const newProduct = await Product.create({
        name,
        price,
        category_id,
        path: filename,
        offer,
      });

      return res.status(201).json(newProduct);
      
    } catch (error) {
      console.log('ERRO COMPLETO');
      console.log(error);

      console.log('ERRO ORIGINAL');
      console.log(error.original);

      return res.status(500).json(error.message);
    }
  }

  async index(_req, res) {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        asttributes: ['id', 'name'],
      },
    });

    return res.status(200).json(products);
  }
}

export default new ProductsController();

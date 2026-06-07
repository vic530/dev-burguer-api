import * as Yup from "yup";
import Category from "./../models/Category.js";
import Product from "./../models/Product.js";

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
      console.log("ERRO COMPLETO");
      console.log(error);

      console.log("ERRO ORIGINAL");
      console.log(error.original);

      return res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const { name, price, category_id, offer } = req.body;
    const { id } = req.params;
    console.log("ID recebido:", id, typeof id); 

    let path;
    if (req.file) {
      const { filename } = req.file;
      path = filename;
    }

    await Product.update(
      {
        name,
        price,
        category_id,
        path,
        offer,
      },
      {
        where: { id },
      },
    );

    return res.status(200).json();
  }

  async index(_req, res) {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
      },
    });

    return res.status(200).json(products);
  }
}

export default new ProductsController();

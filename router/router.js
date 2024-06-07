const { Seller, Product, Category, Variant } = require("../schema/schema");
const { productpipeline, categorypipeline } = require("./pipeline/pipeline");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send("welcome to mongo advance node server");
});

router.post("/seller", async (req, res) => {
  try {
    const seller = await Seller.create(req.body);
    const saveddata = await seller.save();
    res.status(201).send({ response: saveddata });
  } catch (error) {
    res.status(400).send({ error });
  }
});
router.get("/seller", async (req, res) => {
  try {
    const saveddata = await Seller.find().populate({
      path: "products.product",
    });
    res.status(200).send({ response: saveddata });
  } catch (error) {
    res.status(400).send({ error });
  }
});
router.patch("/seller/:id", async (req, res) => {
  try {
    await Seller.findByIdAndUpdate(req.params.id, req.body);
    const updatedData = await Seller.findById(req.params.id);
    res.status(200).send({ response: updatedData });
  } catch (error) {
    res.status(400).send({ error });
  }
});

// Product
router.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    const saveddata = await product.save();
    res.status(201).send({ response: saveddata });
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/product", async (req, res) => {
  try {
    //   const saveddata = await Product.find().populate(["category"]);
    const saveddata = await Product.aggregate(productpipeline);
    res.status(200).send({ response: saveddata });
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.patch("/product/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    const updatedData = await Product.findById(req.params.id);
    res.status(200).send({ response: updatedData });
  } catch (error) {
    res.status(400).send({ error });
  }
});

// variant
router.post("/variant", async (req, res) => {
  try {
    const variant = await Variant.create(req.body);
    const saveddata = await variant.save();
    res.status(201).send({ response: saveddata });
  } catch (error) {
    res.status(400).send({ error });
  }
});

// category
router.post("/category", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    const saveddata = await category.save();
    res.status(201).send({ response: saveddata });
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/category", async (req, res) => {
  try {
    //   const saveddata = await Category.find().populate("products");
    const saveddata = await Category.aggregate(categorypipeline);
    res.status(200).send({ response: saveddata });
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = { router };

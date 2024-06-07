// const productpipeline = [
//     {$match:{product:"Phones"}},
//     {$group:{_id:'$product',totalPrice:{$sum:'$price'}}},
//     {$sort:{totalStock:-1}},
//     {$project:{sellers:0,variants:0}}
// ]

const categorypipeline = [
  {
    $lookup: {
      from: "products",
      localField: "products",
      foreignField: "_id",
      as: "products",
    },
  },
];


const productpipeline = [
  {
    $lookup: {
      from: "categories",
      localField: "category",
      foreignField: "_id",
      as: "category",
    },
  },
  {$project:{category:1}}
];


module.exports = { categorypipeline,productpipeline };

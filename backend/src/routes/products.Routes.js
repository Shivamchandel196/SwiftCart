import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

import { getProducts,createProducts,getProductById,updateProduct,deleteProduct} from "../controller/products.controller.js";

import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, upload.single("image"), createProducts);

router.route("/:id").get(getProductById).put(protect, admin, upload.single("image"), updateProduct).delete(protect, admin, deleteProduct);

export default router;
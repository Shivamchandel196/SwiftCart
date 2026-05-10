import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';



export const getProducts = async(req,res)=>{
    try{

        const proudcts = await Product.find({});

        res.status(200).json(proudcts);

    }catch(err){

        console.log(err);

        res.status(500).json({
            message: err.message
        })

    }
};





export const getProductById = async(req,res)=>{
    try{

        const poduct = await Product.findById(req.params.id);

        if(poduct){

            res.status(200).json(poduct);

        }else{

            res.status(404).json({
                message:"Product not found"
            })

        }

    }catch(err){

        console.log(err);

        res.status(500).json({
            message:"Server error"
        })

    }
};







export const createProducts = async(req,res)=>{
    try{

        const {name,description,price,category,stock} = req.body;

        let imageUrl = "";

        if(req.file){

            const result = await cloudinary.uploader.upload(req.file.path);

            console.log(result);

            imageUrl = result.secure_url;
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);

    }catch(err){

        console.log(err);

        res.status(500).json({
            message:"Server error"
        })

    }
};








export const updateProduct = async(req,res)=>{
    try{

        const {name,description,price,category,stock} = req.body;

        const proudct = await Product.findById(req.params.id);

        if(proudct){

            proudct.name = name || proudct.name;
            proudct.description = description || proudct.description;
            proudct.price = price || proudct.price;
            proudct.category = category || proudct.category;
            proudct.stock = stock || proudct.stock;

            if(req.file){

                const result = await cloudinary.uploader.upload(req.file.path);

                proudct.imageUrl = result.secure_url;
            }

            const updatedProduct = await proudct.save();

            res.status(200).json(updatedProduct);

        }else{

            res.status(404).json({
                message:"Product not found"
            })

        }

    }catch(err){

        console.log(err);

        res.status(500).json({
            message:"Server error"
        })

    }
};








export const deleteProduct = async(req,res)=>{
    try{

        const proudct = await Product.findById(req.params.id);

        if(proudct){

            await proudct.deleteOne();

            res.status(200).json({
                message:"Product removed"
            })

        }else{

            res.status(404).json({
                message:"Product not found"
            })

        }

    }catch(err){

        console.log(err);

        res.status(500).json({
            message:"Server error"
        })

    }
};
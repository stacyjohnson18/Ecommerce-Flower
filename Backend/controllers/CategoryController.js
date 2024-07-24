import slugify from "slugify";
import fs from "fs";
import categoryModel from "../models/categoryModel.js";

export const CategoryController = async (req, res) => {

    try {
        const { name } = req.fields;
        const { photo } = req.files;

        if (!name) {
            return res.status(401).send({
                message: "Name is required"
            });
        }
        // if category name is already exists 
        const existingCategory = await categoryModel.findOne({ name })

        if (existingCategory) {
            res.status(200).send({
                success: true,
                message: "Category Already Exists"
            })
        }
        // Save Category
        const category = new categoryModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            category.photo.data = fs.readFileSync(photo.path)
            category.photo.contentType = photo.type
        }

        await category.save();

        res.status(201).send({
            success: true,
            message: "new category created",
            category,
        });

    } catch (error) {

        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category"
        });

    }

};

//update
export const UpdateCategoryController = async (req, res) => {
    try {
        const { name } = req.fields
        const { id } = req.params
        const { photo } = req.files;

        const category = await categoryModel.findByIdAndUpdate(id, { ...req.fields, slug: slugify(name) },
            { new: true });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await category.save();

        res.status(201).send({
            success: true,
            message: "Category updated Successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Update Category Error"
        })

    }
};

//get all category
export const getCategoryController = async (req, res) => {

    try {
        const category = await categoryModel
            .find({})
            .select("-photo")

        res.status(201).send({
            success: true,
            message: "All category List",
            category,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while getting category"
        });

    }
};


export const getCategoryPhotoController = async (req, res) => {


    try {

        const category = await categoryModel.findById(req.params.pid).select("photo")
        if (category.photo.data) {
            res.set('Content-type', category.photo.contentType)
            return res.status(200).send(category.photo.data)

        }


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while product photo"
        })

    }

}

//single category controller
export const singleCategoryController = async (req, res) => {
    try {

        const category = await categoryModel.findOne({ slug: req.params });
        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            category
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while getting single category",
        });

    }
};

// delete category controller
export const deleteCategoryController = async (req, res) => {

    try {

        const { id } = req.params

        const category = await categoryModel.findByIdAndDelete(id)

        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully",
        })



    } catch (error) {

        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while deleting category",
        })

    }

}
// export default CategoryController;

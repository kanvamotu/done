const Category = require("../models/category")


exports.getCategoryById = async (req, res, next, id) => {

    await Category.findById(id).then(function (category) {
        req.Category = (category);

        next();

    }).catch(function (err) {
        return res.status(400).json({
            err: `user not id not found`
        })
    });

};


exports.createCategory = async (req, res) => {
    const category = new Category(req.body);
    await category.save().then(function (category) {
        return res.json(category);
    }).catch(function (err) {
        return res.status(400).json({
            err: "Not able to save  category in db "
        });
    })
};
exports.getCategory = async (req, res) => {
    return res.json(req.body.category)

};


exports.getAllCategory = async (req, res) => {
    await Category.find().then(function (categories) {
        req.Category = (categories)
        next();
    }).catch(function (err) {
        return res.status(400).json({
            error: "No categories found"
        })
    })


}

exports.updateCategory = async (req, res) => {
    const category = req.Category;
    category.name = req.body.name;
    await category.save()
        .then(function (updatedCategory) {
            return res.json(updatedCategory);
        })
        .catch(function (err) {
            return res.status(400).json({
                error: "Failed to update Category"
            })
        })
};


exports.removeCategory = async (req, res) => {
    const category = req.Category;

    await category.deleteOne().then(function (category) {
        return res.json(category)({
            massage: "Successfully deleted"
        })
    }).catch(function (err) {
        return res.status(400).json({
            error: "Failed to Delete This Category"
        })
    })
}
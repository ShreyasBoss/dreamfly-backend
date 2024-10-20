const Blog = require('../Models/Blog');


//create blogs
exports.createBlogs = async (blog) => {
    try {
        const blogs = new Blog(blog);
        const data = await blogs.save();

        return { errors: false, data: data }

    } catch (e) {
        console.log(e);
        return { errors: true, message: e }
    }
}

//get all blogs
exports.getBlogs = async () => {
    try {

        const data = await Blog.find();
        return { errors: false, data: data }

    } catch (e) {
        return { errors: true, message: e }
    }


}

//get one blog
exports.getBlogById = async (id) => {
    try {

        const data = await Blog.findById(id)
        return { errors: false, data: data }

    } catch (e) {
        return { errors: true, message: e }
    }


}



//update
exports.getBlogUpdate = async (id, blog) => {
    try {

        const data = await Blog.findByIdAndUpdate(id, blog, { new: true })
        return { errors: false, data: data }

    } catch (e) {
        return { errors: true, message: e }
    }


}


//delete one blog
exports.deleteBlog = async (id) => {
    try {

        await Blog.findByIdAndDelete(id)
        return { errors: false, data: "Data Deleted Successfully...!!!" }

    } catch (e) {
        return { errors: true, message: e }
    }


}
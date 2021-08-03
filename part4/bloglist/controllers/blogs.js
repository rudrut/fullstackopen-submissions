const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

//blogsRouter.get("/", (request, response) => {
//	Blog.find({}).then((blogs) => {
//		response.json(blogs);
//	});
//});

blogsRouter.get('/', async (request, response) => { 
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body
  
	const blog = new Blog({
	    "title": body.title,
	    "author": body.author,
	    "url": body.url,
	    "likes": body.likes || 0
	})

	if (body.title === undefined && body.url === undefined) {
		response.status(400).end()
	}
  
	const savedBlog = await blog.save()
	response.json(savedBlog)
})
  
//blogsRouter.post("/", (request, response) => {
//	const blog = new Blog(request.body);
//
//	blog.save().then((result) => {
//		response.status(201).json(result);
//	});
//});

module.exports = blogsRouter;

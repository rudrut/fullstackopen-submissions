const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "FIRST BLOG",
        "author": "MATTI MATTINEN",
        "url": "miukumauku.fi",
        "likes": 666
    },
    {
        "title": "SECOND BLOG",
        "author": "PENTTI PENTTINEN",
        "url": "jwfwjpofw.fi",
        "likes": 3113
    },
    {
        "title": "THIRD BLOG",
        "author": "MIKKO MIKKONEN",
        "url": "asdasdasd.fi",
        "likes": 879879789
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
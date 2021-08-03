const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
  
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

//test('a specific blog is within the returned blogs', async () => {
//    const response = await api.get('/api/blogs')
//  
//    const titles = response.body.map(r => r.title)
//  
//    expect(titles).toContain(
//      'SECOND BLOG'
//    )
//})

test('id verify', async () => {
    const response = await api.get('/api/blogs')
          
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined();
    });
});

test('a valid blog can be added', async () => {
    const newBlog = {
        "title": "ZILLION BLOG",
        "author": "MARTTI OHISALO",
        "url": "ohisalonpaska.fi",
        "likes": 2542564567
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'ZILLION BLOG'
    )
})

test('if likes is missing, default likes to zero', async () => {
    const newBlog = {
        "title": "sdfs",
        "author": "wsdsad",
        "url": "ohisalonpaska.fi",
    }

    const addedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
  
    expect(addedBlog.body.likes).toEqual(0)
})

test('if title and url are missing, 400 bad', async () => {
    const newBlog = {
        "author": "wsdsad",
        "likes": 324324
    }

    const addedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    console.log(addedBlog.body)
  })

afterAll(() => {
  mongoose.connection.close()
})
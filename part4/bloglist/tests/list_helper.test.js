const listHelper = require("../utils/list_helper")

const blogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 13,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 600,
		__v: 0,
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 1,
		__v: 0,
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 41,
		__v: 0,
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 59,
		__v: 0,
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 22,
		__v: 0,
	},
];

test("dummy returns one", () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe('total likes', () => {
	test("of empty list is zero", () => {
		const blogs = [];
	
		const result = listHelper.totalLikes(blogs);
		expect(result).toBe(0);
	});
	
	test("when list has only one blog equals the likes of said blog", () => {
		const listWithOneBlog = [
			{
				_id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
				likes: 5,
				__v: 0,
			},
		];
	
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});
	
	test("of a bigger list is calculated right", () => {
		const result = listHelper.totalLikes(blogs);
		expect(result).toBe(result);
	});
})

describe('blog with most likes', () => {
	test("if the blog with most likes is returned", () => {
		const result = listHelper.favoriteBlog(blogs);
		expect(result).toEqual(
			expect.objectContaining({
				likes: blogs[1].likes
			})
		)
	})
})

describe('author with most blogs', () => {
	test('if the author with most blogs is returned', () => {
		const result = listHelper.mostBlogs(blogs);
		expect(result).toEqual(
			expect.objectContaining({
				author: "Robert C. Martin"
			})
		)
	})
})

describe('author with most likes', () => {
	test('if the author with most likes is returned', () => {
		const result = listHelper.mostLikes(blogs);
		expect(result).toEqual(
			expect.objectContaining({
				author: "Edsger W. Dijkstra"
			})
		)
	})
})

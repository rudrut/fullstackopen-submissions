const _ = require("lodash");

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	if (blogs.length === 0) {
		return 0;
	}
	if (blogs.length === 1) {
		return blogs[blogs.length - 1].likes;
	}
	blogs.reduce((currentTotal, blog) => {
		return blog.likes + currentTotal;
	}, 0);
};

const favoriteBlog = (blogs) => {
	let maxLikes = 0;

	for (let i = 0; i < blogs.length; i++) {
		if (maxLikes < blogs[i].likes) {
			maxLikes = blogs[i].likes;
		}
	}

	const favoriteBlog = blogs.find((blog) => {
		return blog.likes === maxLikes;
	});
	const { title, author, likes } = favoriteBlog;
	return { title, author, likes };
};

const mostBlogs = (blogs) => {
	const grouped = _.reduce(
		blogs,
		(result, blog) => {
			(result[blog.author] || (result[blog.author] = [])).push(blog);
			return result;
		},
		{}
	);

	const entries = _.entries(grouped);
	let initialAuthor = "";
	let most = 0;
	for (const [key, value] of entries) {
		if (most < value.length) {
			most = value.length;
			initialAuthor = key;
		}
	}

    const final = {author: initialAuthor, blogs : most}
    return final
};

const mostLikes = (blogs) => {
	const grouped = _.reduce(
		blogs,
		(result, blog) => {
			(result[blog.author] || (result[blog.author] = [])).push(blog);
			return result;
		},
		{}
	);

	const authors = _.keys(grouped);

	let initialAuthor = "";
	let mostLikes = 0;

	for (let i = 0; i < authors.length; i++) {
		let filteredLikes = blogs
			.filter((blog) => blog.author === authors[i])
			.reduce((acc, blog) => acc + blog.likes, 0);
		if (mostLikes < filteredLikes) {
			mostLikes = filteredLikes;
			initialAuthor = authors[i];
		}
	}

	const final = { author: initialAuthor, likes: mostLikes };
	return final;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
    mostLikes
};

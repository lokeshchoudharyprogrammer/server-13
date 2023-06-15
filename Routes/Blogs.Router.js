
const express = require("express")

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { BlogModel } = require("../Model/Blog.Schema");

const BlogRouter = express.Router()

const cors = require("cors");
BlogRouter.use(cors());

BlogRouter.get('/api/blogs', async (req, res) => {
    try {


        const blogs = await Blog.BlogModel({ author: decodedToken.userId });

        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'error' });
    }
});



BlogRouter.get('/api/blogs', async (req, res) => {
    try {

        const { page = 1, limit = 5 } = req.query;


        const blogs = await BlogModel.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json(blogs);
    } catch (error) {

        res.status(500).json({ message: 'error' });
    }
});


BlogRouter.get('/api/blogs', async (req, res) => {
    try {

        const { title } = req.query;

        const blogs = await BlogModel.find({ title });

        res.json(blogs);
    } catch (error) {

        res.status(500).json({ message: 'error' });
    }
});

BlogRouter.get('/api/blogs', async (req, res) => {
    try {


        const { category } = req.query;

        const blogs = await BlogModel.find({ category });

        res.json(blogs);
    } catch (error) {

        res.status(500).json({ message: 'error' });
    }
});



BlogRouter.post('/api/blogs', async (req, res) => {
    try {

        const { title, content, category } = req.body;

        const blog = new BlogModel({
            title,
            content,
            category

        });

        await blog.save();
        res.status(201).json({ message: 'Blog created successfully' });
    } catch (error) {

        res.status(500).json({ message: 'error' });
    }
});



BlogRouter.patch('/api/blogs/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const { title, content, category } = req.body;

        // Find the blog by id
        const blog = await BlogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.author.toString() !== decodedToken.userId) {
            return res.status(403).json({ message: 'error' });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.category = category || blog.category;
        await blog.save();

        res.json({ message: 'Blog updated successfully' });
    } catch (error) {
        console.error('Error in /api/blogs/:id:', error);
        res.status(500).json({ message: 'error' });
    }
});



BlogRouter.delete('/api/blogs/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const blog = await BlogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'not found' });
        }
        if (blog.author.toString() !== decodedToken.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await blog.remove();

        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {

        res.status(500).json({ message: 'error' });
    }
});



module.exports = { BlogRouter }; 
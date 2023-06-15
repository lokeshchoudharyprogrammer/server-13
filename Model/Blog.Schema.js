const express = require('express');
const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    title: {
        type: String,

    },
    content: {
        type: String,

    },
    category: {
        type: String,

    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [{
        content: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});




const BlogModel = mongoose.model('Blogs', blogSchema);


module.exports = { BlogModel };
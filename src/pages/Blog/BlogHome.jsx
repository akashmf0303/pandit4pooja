import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Calendar } from 'lucide-react';
import { blogsData, categories } from '../../data/blogs';
import './Blog.css';

const BlogHome = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredBlogs = activeCategory === 'All' 
    ? blogsData 
    : blogsData.filter(blog => blog.category === activeCategory);

  return (
    <div className="blog-layout slide-up">
      <section className="blog-hero">
        <div className="container">
          <h1>Spiritual Wisdom & Guidance</h1>
          <p>Explore our library of authentic Vedic knowledge, pooja guides, and astrological insights to elevate your spiritual journey.</p>
          
          <div className="blog-categories">
            <button 
              className={`blog-category-pill ${activeCategory === 'All' ? 'active' : ''}`}
              onClick={() => setActiveCategory('All')}
            >
              All Topics
            </button>
            {categories.map((cat, idx) => (
              <button 
                key={idx} 
                className={`blog-category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="blog-grid">
          {filteredBlogs.map(blog => (
            <Link to={`/blogs/${blog.id}`} key={blog.id} className="blog-card">
              <div className="blog-card-image">
                <div className="blog-card-badge">{blog.category}</div>
                <img src={blog.image} alt={blog.title} />
              </div>
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {blog.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {blog.readTime}</span>
                </div>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
                <div className="blog-card-footer">
                  <span className="blog-author">{blog.author}</span>
                  <span className="read-more">Read Article <ChevronRight size={16} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogHome;

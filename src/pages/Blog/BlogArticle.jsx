import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, MessageCircle } from 'lucide-react';
import { blogsData } from '../../data/blogs';
import { poojasData } from '../../data/poojas';
import './Blog.css';

const BlogArticle = () => {
  const { slug } = useParams();
  const blog = blogsData.find(b => b.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return <Navigate to="/blogs" />;
  }

  // Find related poojas
  const relatedPoojasList = poojasData.filter(p => blog.relatedPoojas?.includes(p.id));

  const renderContent = (content) => {
    const lines = content.split('\n');
    let html = [];
    let inList = false;

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      if (trimmed.startsWith('## ')) {
        html.push(<h2 key={index} id={trimmed.replace('## ', '').toLowerCase().replace(/\s+/g, '-')}>{trimmed.replace('## ', '')}</h2>);
      } else if (trimmed.startsWith('### ')) {
        html.push(<h3 key={index}>{trimmed.replace('### ', '')}</h3>);
      } else if (trimmed.startsWith('> ')) {
        html.push(<blockquote key={index}>{trimmed.replace('> ', '')}</blockquote>);
      } else if (trimmed.startsWith('- ') || trimmed.match(/^\d+\.\s/)) {
        if (!inList) {
          html.push(<ul key={`ul-${index}`} style={{ paddingLeft: '24px', marginBottom: '24px' }}></ul>);
          inList = true;
        }
        // Very hacky list appending for visual purposes
        html.push(<li key={index} style={{ marginBottom: '12px' }}>{trimmed.replace(/^(-\s|\d+\.\s)/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>);
      } else {
        inList = false;
        // Bold parsing
        const parsedText = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
        html.push(<p key={index} dangerouslySetInnerHTML={{ __html: parsedText }}></p>);
      }
    });
    return html;
  };

  // Generate Table of Contents
  const getTableOfContents = (content) => {
    const lines = content.split('\n');
    const toc = [];
    lines.forEach(line => {
      if (line.trim().startsWith('## ')) {
        const title = line.trim().replace('## ', '');
        const id = title.toLowerCase().replace(/\s+/g, '-');
        toc.push({ id, title });
      }
    });
    return toc;
  };

  const toc = getTableOfContents(blog.content);

  return (
    <div className="blog-layout slide-up">
      <section className="article-hero">
        <div className="container">
          <div className="article-meta">
            <span style={{ color: 'var(--color-accent-primary)', fontWeight: '600' }}>{blog.category}</span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {blog.date}</span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {blog.readTime}</span>
          </div>
          <h1>{blog.title}</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
            By <strong>{blog.author}</strong>
          </p>
        </div>
      </section>

      <div className="container">
        <div className="article-featured-image">
          <img src={blog.image} alt={blog.title} />
        </div>
      </div>

      <div className="article-body-container">
        <article className="article-content">
          {renderContent(blog.content)}

          <div className="article-footer">
            <h3 style={{ marginTop: 0 }}>Related Spiritual Services</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
              {relatedPoojasList.map(pooja => (
                <div key={pooja.id} style={{ border: '1px solid rgba(110, 38, 14, 0.1)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '18px' }}>{pooja.title}</h4>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>{pooja.price}</p>
                  <Link to={`/poojas/${pooja.id}`} className="btn-outline" style={{ padding: '8px', fontSize: '14px', textAlign: 'center' }}>View Details</Link>
                </div>
              ))}
            </div>
          </div>
        </article>

        <aside className="article-sidebar">
          {toc.length > 0 && (
            <div className="toc-card">
              <h4>In this Article</h4>
              <ul className="toc-list">
                {toc.map(item => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="conversion-card">
            <h4>Need Spiritual Guidance?</h4>
            <p>Our Head Acharya is available to answer your questions and help you find the perfect Muhurat.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/booking" className="btn-primary" style={{ background: 'white', color: 'var(--color-accent-secondary)', width: '100%' }}>
                Book Consultation
              </Link>
              <a href="https://wa.me/917009894907" target="_blank" rel="noreferrer" className="btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <MessageCircle size={18} /> WhatsApp Us
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogArticle;

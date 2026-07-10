import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Type, Settings, CheckCircle, BarChart2, X, Trash2 } from 'lucide-react';
import { blogsData, syncLocalBlogs, categories } from '../../../data/blogs';
import toast from 'react-hot-toast';

const translations = {
  English: {
    title: "Content Hub & SEO",
    subtitle: "Draft articles, schedule devotions, and optimize search settings.",
    addNew: "New Article",
    tabAll: "All Articles",
    tabEditor: "Article Editor",
    colTitle: "Article Title",
    colCategory: "Category",
    colDate: "Published Date",
    colActions: "Actions",
    noBlogs: "No articles drafted yet.",
    edit: "Edit",
    delete: "Delete",
    labelTitle: "Article Title *",
    labelSlug: "SEO Friendly Slug (URL path) *",
    labelCategory: "Article Category",
    labelExcerpt: "Short Excerpt (Brief description for list views)",
    labelImage: "Featured Image",
    labelContent: "Full Article Content (Markdown/HTML supported) *",
    clickUpload: "Click to select/upload file",
    cancel: "Cancel",
    publish: "Publish Article",
    saveChanges: "Save Changes",
    publishingDetails: "Publishing Details"
  },
  Hindi: {
    title: "कंटेंट हब और एसईओ",
    subtitle: "लेख ड्राफ्ट करें, भक्ति कार्यक्रम निर्धारित करें, और खोज सेटिंग्स अनुकूलित करें।",
    addNew: "नया लेख",
    tabAll: "सभी लेख",
    tabEditor: "लेख संपादक",
    colTitle: "लेख का शीर्षक",
    colCategory: "श्रेणी",
    colDate: "प्रकाशन तिथि",
    colActions: "कार्रवाई",
    noBlogs: "अभी तक कोई लेख ड्राफ्ट नहीं किया गया है।",
    edit: "संपादित करें",
    delete: "हटाएं",
    labelTitle: "लेख का शीर्षक *",
    labelSlug: "एसईओ अनुकूल स्लग (URL पथ) *",
    labelCategory: "लेख श्रेणी",
    labelExcerpt: "संक्षिप्त उद्धरण (सूची दृश्यों के लिए संक्षिप्त विवरण)",
    labelImage: "विशेष रुप से प्रदर्शित छवि",
    labelContent: "पूर्ण लेख सामग्री (मार्कडाउन/एचटीएमएल समर्थित) *",
    clickUpload: "फ़ाइल चुनने/अपलोड करने के लिए क्लिक करें",
    cancel: "रद्द करें",
    publish: "लेख प्रकाशित करें",
    saveChanges: "परिवर्तन सहेजें",
    publishingDetails: "प्रकाशन विवरण"
  },
  Sanskrit: {
    title: "लेखसंग्रहः अन्वेषणोपायः च",
    subtitle: "लेखाः रचयन्तु, भक्तिविषयान् नियोजयन्तु, अन्वेषणविवरणानि च संशोधयन्तु।",
    addNew: "नूतन-लेखः",
    tabAll: "सर्वे लेखाः",
    tabEditor: "लेख-संपादकः",
    colTitle: "लेख-शीर्षकम्",
    colCategory: "वर्गः",
    colDate: "प्रकाशन-तिथिः",
    colActions: "प्रचालनम्",
    noBlogs: "कोऽपि लेखः न रचितः।",
    edit: "संशोधनम्",
    delete: "निष्कासनम्",
    labelTitle: "लेख-शीर्षकम् *",
    labelSlug: "अन्वेषणानुकूलं स्लग (URL-मार्गः) *",
    labelCategory: "लेख-वर्गः",
    labelExcerpt: "संक्षिप्त-विवरणम् (सूची-दर्शनाय संक्षिप्तं वृत्तम्)",
    labelImage: "मुख्य-चित्रम्",
    labelContent: "सम्पूर्ण-लेख-सामग्री (Markdown/HTML समर्थितम्) *",
    clickUpload: "चित्रपटलं प्रेषयितुं नुदन्तु",
    cancel: "निरस्तीकरणम्",
    publish: "लेखं प्रकाशयतु",
    saveChanges: "परिवर्तनानि रक्षन्तु",
    publishingDetails: "प्रकाशन-वृत्तान्तः"
  }
};

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'editor'
  const [blogs, setBlogs] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [lang, setLang] = useState('English');
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    slug: '',
    category: 'Pooja Guides',
    image: '',
    excerpt: ''
  });

  useEffect(() => {
    const savedLang = localStorage.getItem('admin_language') || 'English';
    setLang(savedLang);

    const handleLangChange = () => {
      setLang(localStorage.getItem('admin_language') || 'English');
    };
    window.addEventListener('admin_language_changed', handleLangChange);
    return () => window.removeEventListener('admin_language_changed', handleLangChange);
  }, []);

  const t = translations[lang] || translations.English;

  useEffect(() => {
    const localKey = 'admin_blogs';
    const localData = localStorage.getItem(localKey);
    if (localData) {
      setBlogs(JSON.parse(localData));
    } else {
      localStorage.setItem(localKey, JSON.stringify(blogsData));
      setBlogs(blogsData);
    }
  }, []);

  const saveToLocal = (updatedList) => {
    localStorage.setItem('admin_blogs', JSON.stringify(updatedList));
    setBlogs(updatedList);
    syncLocalBlogs();
  };

  const handleOpenEditor = (blog = null) => {
    if (blog) {
      setEditingBlogId(blog.id);
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        slug: blog.id || '',
        category: blog.category || 'Pooja Guides',
        image: blog.image || '',
        excerpt: blog.excerpt || ''
      });
    } else {
      setEditingBlogId(null);
      setFormData({
        title: '',
        content: '',
        slug: '',
        category: 'Pooja Guides',
        image: '',
        excerpt: ''
      });
    }
    setActiveTab('editor');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required.');
      return;
    }

    const slug = formData.slug.trim().toLowerCase().replace(/\s+/g, '-') || formData.title.toLowerCase().replace(/\s+/g, '-');

    const blogObj = {
      id: slug,
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt || formData.content.slice(0, 150) + '...',
      category: formData.category,
      image: formData.image || '/images/satyanarayan_1778447088142.png',
      author: 'Acharya Ankush Shukla',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      readTime: Math.max(1, Math.ceil(formData.content.split(/\s+/).length / 200)) + ' min read',
      featured: false,
      relatedPoojas: []
    };

    let updatedList;
    if (editingBlogId) {
      updatedList = blogs.map(b => b.id === editingBlogId ? { ...b, ...blogObj, id: editingBlogId } : b);
      toast.success('Article updated successfully!');
    } else {
      updatedList = [blogObj, ...blogs];
      toast.success('New article published successfully!');
    }

    saveToLocal(updatedList);
    setActiveTab('list');
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const updatedList = blogs.filter(b => b.id !== id);
      saveToLocal(updatedList);
      toast.success('Article deleted.');
    }
  };

  return (
    <div className="fade-in">
      <div className="admin-header">
        <div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        {activeTab === 'list' ? (
          <button className="btn-admin-primary" onClick={() => handleOpenEditor()}>
            <Plus size={18} /> {t.addNew}
          </button>
        ) : (
          <button className="btn-admin-outline" onClick={() => setActiveTab('list')}>
            {t.cancel}
          </button>
        )}
      </div>

      {activeTab === 'list' && (
        <div className="admin-panel">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t.colTitle}</th>
                  <th>{t.colCategory}</th>
                  <th>SEO Status</th>
                  <th>{t.colDate}</th>
                  <th>{t.colActions}</th>
                </tr>
              </thead>
              <tbody>
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-secondary)' }}>
                      {t.noBlogs}
                    </td>
                  </tr>
                ) : (
                  blogs.map(blog => (
                    <tr key={blog.id}>
                      <td>
                        <div style={{ fontWeight: '600' }}>{blog.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--admin-text-secondary)', marginTop: '4px' }}>/{blog.id}</div>
                      </td>
                      <td><span style={{ fontSize: '12px', background: 'var(--admin-bg)', padding: '4px 8px', borderRadius: '4px', color: 'var(--admin-text-primary)' }}>{blog.category}</span></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--admin-success)', fontSize: '12px' }}>
                          <BarChart2 size={14} /> Optimized
                        </div>
                      </td>
                      <td style={{ color: 'var(--admin-text-secondary)' }}>{blog.date}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn-admin-action" onClick={() => handleOpenEditor(blog)}><Edit3 size={16} /> {t.edit}</button>
                          <button className="btn-admin-action" onClick={() => handleDeleteBlog(blog.id)} style={{ color: '#e53e3e', borderColor: 'rgba(229, 62, 62, 0.2)' }}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'editor' && (
        <form onSubmit={handleFormSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
          {/* Main Editor Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="admin-panel" style={{ padding: '32px', marginBottom: 0 }}>
              <input 
                type="text" 
                placeholder="Article Title..." 
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={{ width: '100%', border: 'none', borderBottom: '2px solid var(--admin-border)', fontSize: '32px', fontFamily: 'var(--font-heading)', paddingBottom: '16px', marginBottom: '24px', outline: 'none', background: 'transparent', color: 'var(--admin-text-primary)' }}
              />
              
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '16px' }}>
                <button type="button" className="btn-admin-action" style={{ background: 'transparent' }}><Type size={18} /> Format</button>
                <button type="button" className="btn-admin-action" style={{ background: 'transparent' }} onClick={() => setFormData({ ...formData, content: formData.content + '\n## ' })}>H2</button>
                <button type="button" className="btn-admin-action" style={{ background: 'transparent' }} onClick={() => setFormData({ ...formData, content: formData.content + '\n### ' })}>H3</button>
                <button type="button" className="btn-admin-action" style={{ background: 'transparent' }} onClick={() => setFormData({ ...formData, content: formData.content + '\n> ' })}>Quote</button>
                <button type="button" className="btn-admin-action" style={{ background: 'transparent' }} onClick={() => setFormData({ ...formData, content: formData.content + '\n- ' })}>List</button>
              </div>

              <textarea 
                placeholder="Write your spiritual wisdom here. Use Markdown for styling..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                style={{ width: '100%', minHeight: '500px', border: 'none', resize: 'vertical', fontSize: '16px', lineHeight: '1.8', fontFamily: 'var(--font-body)', outline: 'none', background: 'transparent', color: 'var(--admin-text-primary)' }}
              />
            </div>
          </div>

          {/* Sidebar Settings Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="admin-panel" style={{ padding: '24px', marginBottom: 0 }}>
              <h3 style={{ fontSize: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--admin-accent)', fontFamily: 'var(--font-heading)' }}>
                <Settings size={18} /> {t.publishingDetails}
              </h3>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--admin-text-secondary)', marginBottom: '8px' }}>{t.labelSlug}</label>
                <input 
                  type="text" 
                  placeholder="e.g. importance-of-havan" 
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)' }} 
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--admin-text-secondary)', marginBottom: '8px' }}>{t.labelCategory}</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)' }}
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--admin-text-secondary)', marginBottom: '8px' }}>{t.labelImage}</label>
                <div style={{ width: '100%', height: '140px', border: '2px dashed var(--admin-border)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-text-secondary)', cursor: 'pointer', position: 'relative', overflow: 'hidden', background: 'var(--admin-bg)' }}>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData(prev => ({ ...prev, image: reader.result }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                  />
                  {formData.image ? (
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                      <img src={formData.image} alt="Featured Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', opacity: 0, transition: 'opacity 0.2s' }} className="image-hover-overlay">
                        Click to Change
                      </div>
                    </div>
                  ) : (
                    <span style={{ fontSize: '13px' }}>{t.clickUpload}</span>
                  )}
                </div>
              </div>

              <button type="submit" className="btn-admin-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <CheckCircle size={18} /> {editingBlogId ? t.saveChanges : t.publish}
              </button>
            </div>

            {/* AI Assistant Stub */}
            <div className="admin-panel" style={{ padding: '24px', background: 'rgba(224, 110, 56, 0.02)', borderColor: 'rgba(224, 110, 56, 0.2)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px', color: 'var(--admin-accent)', fontFamily: 'var(--font-heading)' }}>AI SEO Assistant</h3>
              <p style={{ fontSize: '13px', color: 'var(--admin-text-secondary)', marginBottom: '16px' }}>
                Let our AI scan your text to generate Schema Markup, Meta Descriptions, and suggest internal links to related Poojas.
              </p>
              <button type="button" className="btn-admin-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '13px', borderColor: 'var(--admin-accent)', color: 'var(--admin-accent)' }}>
                Analyze Content
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContentManagement;

import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Image as ImageIcon, Trash2, X } from 'lucide-react';
import { poojasData, syncLocalCatalog } from '../../../data/poojas';
import toast from 'react-hot-toast';

const translations = {
  English: {
    title: "Pooja Catalog",
    subtitle: "Manage offerings, pricing, descriptions, and SEO details.",
    addNew: "Add New Pooja",
    colImage: "Image",
    colTitle: "Ritual Title",
    colPrice: "Base Price",
    colStatus: "Status",
    colActions: "Actions",
    noPooja: "No rituals found in the catalog.",
    showing: "Showing",
    ritualsInCatalog: "rituals in catalog",
    edit: "Edit",
    delete: "Delete",
    editOffering: "Edit Pooja Offering",
    addOffering: "Add New Pooja Offering",
    labelTitle: "Ritual Title *",
    labelSubtitle: "Subtitle / Short Description",
    labelPrice: "Base Price *",
    labelStatus: "Catalog Status",
    labelPhoto: "Upload Ritual Photo",
    clickUpload: "Click to select/upload file",
    cancel: "Cancel",
    addPooja: "Add Pooja",
    saveChanges: "Save Changes"
  },
  Hindi: {
    title: "पूजा सूची",
    subtitle: "अनुष्ठानों, मूल्य निर्धारण, विवरण और एसईओ का प्रबंधन करें।",
    addNew: "नई पूजा जोड़ें",
    colImage: "छवि",
    colTitle: "अनुष्ठान का नाम",
    colPrice: "मूल मूल्य",
    colStatus: "स्थिति",
    colActions: "कार्रवाई",
    noPooja: "सूची में कोई अनुष्ठान नहीं मिला।",
    showing: "दिखाया जा रहा है",
    ritualsInCatalog: "पूजा सूची में शामिल",
    edit: "संशोधित करें",
    delete: "हटाएं",
    editOffering: "पूजा विवरण संशोधित करें",
    addOffering: "नया पूजा अनुष्ठान जोड़ें",
    labelTitle: "अनुष्ठान का नाम *",
    labelSubtitle: "उपशीर्षक / संक्षिप्त विवरण",
    labelPrice: "मूल मूल्य *",
    labelStatus: "सूची स्थिति",
    labelPhoto: "अनुष्ठान चित्र अपलोड करें",
    clickUpload: "फ़ाइल चुनने/अपलोड करने के लिए क्लिक करें",
    cancel: "रद्द करें",
    addPooja: "पूजा जोड़ें",
    saveChanges: "परिवर्तन सहेजें"
  },
  Sanskrit: {
    title: "पूजा-अनुष्ठान-विवरणम्",
    subtitle: "पूजा-प्रकाराः, मूल्य-निर्धारणम्, विवरणानि, अन्वेषण-व्यवस्थापनं च सम्पाद्यताम्।",
    addNew: "नूतन-पूजा-संयोजनम्",
    colImage: "चित्रम्",
    colTitle: "अनुष्ठान-नाम",
    colPrice: "मूल-मूल्यम्",
    colStatus: "स्थितिः",
    colActions: "प्रचालनम्",
    noPooja: "पूजा-विवरणं न लब्धम्।",
    showing: "विवरणं दर्शयति",
    ritualsInCatalog: "पूजा-प्रकाराः सूच्याम्",
    edit: "संशोधनम्",
    delete: "निष्कासनम्",
    editOffering: "पूजा-विवरणं परिवर्तयन्तु",
    addOffering: "नूतन-पूजा-अनुष्ठानं योजयन्तु",
    labelTitle: "अनुष्ठान-नाम *",
    labelSubtitle: "उपशीर्षकम् / लघुविवरणम्",
    labelPrice: "मूल-मूल्यम् *",
    labelStatus: "सूची-स्थितिः",
    labelPhoto: "अनुष्ठान-चित्रं प्रेषयन्तु",
    clickUpload: "चित्रपटलं प्रेषयितुं नुदन्तु",
    cancel: "निरस्तीकरणम्",
    addPooja: "पूजां योजयतु",
    saveChanges: "परिवर्तनानि रक्षन्तु"
  }
};

const PoojaManagement = () => {
  const [poojas, setPoojas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPooja, setEditingPooja] = useState(null);
  const [lang, setLang] = useState('English');
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    price: '',
    image: '',
    status: 'Active'
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
    const localKey = 'admin_poojas_catalog';
    const localData = localStorage.getItem(localKey);
    if (localData) {
      setPoojas(JSON.parse(localData));
    } else {
      localStorage.setItem(localKey, JSON.stringify(poojasData));
      setPoojas(poojasData);
    }
  }, []);

  const saveToLocal = (updatedList) => {
    localStorage.setItem('admin_poojas_catalog', JSON.stringify(updatedList));
    setPoojas(updatedList);
    syncLocalCatalog();
  };

  const handleOpenModal = (pooja = null) => {
    if (pooja) {
      setEditingPooja(pooja);
      setFormData({
        title: pooja.title || '',
        subtitle: pooja.subtitle || '',
        price: pooja.price || '',
        image: pooja.image || '',
        status: pooja.status || 'Active'
      });
    } else {
      setEditingPooja(null);
      setFormData({
        title: '',
        subtitle: '',
        price: '',
        image: '',
        status: 'Active'
      });
    }
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      toast.error('Title and price are required.');
      return;
    }

    let updatedList;
    if (editingPooja) {
      updatedList = poojas.map(p => p.id === editingPooja.id ? { ...p, ...formData } : p);
      toast.success('Pooja details updated successfully!');
    } else {
      const newPooja = {
        id: formData.title.toLowerCase().replace(/\s+/g, '-'),
        ...formData
      };
      updatedList = [newPooja, ...poojas];
      toast.success('New Pooja added to catalog!');
    }

    saveToLocal(updatedList);
    setIsModalOpen(false);
  };

  const handleDeletePooja = (id) => {
    if (window.confirm('Are you sure you want to remove this pooja from the catalog?')) {
      const updatedList = poojas.filter(p => p.id !== id);
      saveToLocal(updatedList);
      toast.success('Pooja removed from catalog.');
    }
  };

  return (
    <div className="fade-in">
      <div className="admin-header">
        <div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-admin-primary">
          <Plus size={18} /> {t.addNew}
        </button>
      </div>

      <div className="admin-panel">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t.colImage}</th>
                <th>{t.colTitle}</th>
                <th>{t.colPrice}</th>
                <th>{t.colStatus}</th>
                <th>{t.colActions}</th>
              </tr>
            </thead>
            <tbody>
              {poojas.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-secondary)' }}>
                    {t.noPooja}
                  </td>
                </tr>
              ) : (
                poojas.map((pooja) => (
                  <tr key={pooja.id}>
                    <td>
                      <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'var(--admin-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {pooja.image ? (
                          <img src={pooja.image} alt={pooja.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <ImageIcon size={20} color="var(--admin-text-secondary)" />
                        )}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '600' }}>{pooja.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--admin-text-secondary)', maxWidth: '350px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pooja.subtitle || 'No description'}</div>
                    </td>
                    <td style={{ fontWeight: '500' }}>{pooja.price}</td>
                    <td>
                      <span className={`status-badge ${pooja.status === 'Inactive' ? 'status-pending' : 'status-confirmed'}`}>
                        {pooja.status || 'Active'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleOpenModal(pooja)} className="btn-admin-action"><Edit3 size={16} /> {t.edit}</button>
                        <button onClick={() => handleDeletePooja(pooja.id)} className="btn-admin-action" style={{ color: '#e53e3e', borderColor: 'rgba(229, 62, 62, 0.2)' }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '16px 24px', textAlign: 'center', borderTop: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', fontSize: '14px' }}>
          {t.showing} {poojas.length} {t.ritualsInCatalog}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000, backdropFilter: 'blur(4px)', padding: '20px', overflowY: 'auto' }}>
          <form onSubmit={handleFormSubmit} style={{ background: 'var(--admin-bg-panel)', border: '1px solid var(--admin-border)', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', color: 'var(--admin-text-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', margin: 0, color: 'var(--admin-accent)', fontFamily: 'var(--font-heading)' }}>{editingPooja ? t.editOffering : t.addOffering}</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--admin-text-secondary)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-text-secondary)' }}>{t.labelTitle}</label>
                <input 
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Mahamrityunjay Jaap"
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-text-secondary)' }}>{t.labelSubtitle}</label>
                <input 
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Vedic Chants for health and longevity"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-text-secondary)' }}>{t.labelPrice}</label>
                  <input 
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. ₹21,000"
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-text-secondary)' }}>{t.labelStatus}</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '14px' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-text-secondary)' }}>{t.labelPhoto}</label>
                <div style={{ border: '2px dashed var(--admin-border)', padding: '16px', borderRadius: '8px', textAlign: 'center', background: 'var(--admin-bg)', cursor: 'pointer', position: 'relative' }}>
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                      <img src={formData.image} alt="Preview" style={{ height: '40px', width: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                      <span style={{ fontSize: '13px', color: 'var(--admin-text-primary)', fontWeight: '500' }}>{t.labelPhoto}</span>
                    </div>
                  ) : (
                    <div>
                      <Plus size={20} style={{ margin: '0 auto 6px', color: 'var(--admin-text-secondary)' }} />
                      <span style={{ fontSize: '13px', color: 'var(--admin-text-secondary)' }}>{t.clickUpload}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn-admin-outline" 
                style={{ padding: '10px 20px' }}
              >
                {t.cancel}
              </button>
              <button 
                type="submit"
                className="btn-admin-primary" 
                style={{ padding: '10px 20px' }}
              >
                {editingPooja ? t.saveChanges : t.addPooja}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PoojaManagement;

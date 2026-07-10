import React, { useState, useEffect } from 'react';
import { Plus, Star, MapPin, CheckCircle, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

const defaultPandits = [
  {
    id: 1,
    name: "Acharya Ankush Shukla",
    location: "Head Acharya (Mumbai/Online)",
    languages: ["Hindi", "Sanskrit"],
    image: "/images/pandit_ankush_1778447215487.png",
    status: "Available",
    rating: "5.0",
    reviews: 124
  },
  {
    id: 2,
    name: "Acharya Ramakant Shastri",
    location: "Vedic Ritual Specialist (Delhi/NCR)",
    languages: ["Hindi", "Sanskrit", "Maithili"],
    image: "/images/pandit_ankush_1778447215487.png",
    status: "Available",
    rating: "4.9",
    reviews: 86
  }
];

const translations = {
  English: {
    title: "Pandit Roster",
    subtitle: "Manage acharyas, availability, and language skills.",
    onboardBtn: "Onboard Pandit",
    noPandits: "No acharyas currently onboarded.",
    viewSchedule: "View Schedule",
    modalTitle: "Onboard New Pandit",
    labelName: "Full Name *",
    labelLoc: "Designation & Location *",
    labelLang: "Languages (comma-separated) *",
    labelStatus: "Status",
    labelPhoto: "Upload Profile Photo",
    cancel: "Cancel",
    onboardAction: "Onboard Pandit"
  },
  Hindi: {
    title: "पंडित सूची",
    subtitle: "आचार्यों, उपलब्धता और भाषा कौशल का प्रबंधन करें।",
    onboardBtn: "पंडित नियुक्त करें",
    noPandits: "वर्तमान में कोई आचार्य सूचीबद्ध नहीं हैं।",
    viewSchedule: "समय-सारणी देखें",
    modalTitle: "नए पंडित को ऑनबोर्ड करें",
    labelName: "पूरा नाम *",
    labelLoc: "पद और स्थान *",
    labelLang: "भाषाएं (अल्पविराम से अलग करें) *",
    labelStatus: "स्थिति",
    labelPhoto: "प्रोफ़ाइल चित्र अपलोड करें",
    cancel: "रद्द करें",
    onboardAction: "पंडित जोड़ें"
  },
  Sanskrit: {
    title: "आचार्याणां विवरणम्",
    subtitle: "आचार्याः, तेषां उपलब्धता, भाषाकौशलं च व्यवस्थाप्यताम्।",
    onboardBtn: "आचार्य-संयोजनम्",
    noPandits: "सम्प्रति कोऽपि आचार्यः नियुक्तः नास्ति।",
    viewSchedule: "समय-तालिका पश्यन्तु",
    modalTitle: "नूतन-आचार्यस्य संयोजनम्",
    labelName: "पूर्णं नाम *",
    labelLoc: "पदं स्थानं च *",
    labelLang: "भाषाः (अल्पविरामेण पृथक् कुर्वन्तु) *",
    labelStatus: "स्थितिः",
    labelPhoto: "चित्रं प्रेषयन्तु",
    cancel: "निरस्तीकरणम्",
    onboardAction: "आचार्यं योजयतु"
  }
};

const PanditManagement = () => {
  const [pandits, setPandits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lang, setLang] = useState('English');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    languages: '',
    image: '',
    status: 'Available'
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
    const localKey = 'admin_pandits_roster';
    const localData = localStorage.getItem(localKey);
    if (localData) {
      setPandits(JSON.parse(localData));
    } else {
      localStorage.setItem(localKey, JSON.stringify(defaultPandits));
      setPandits(defaultPandits);
    }
  }, []);

  const saveToLocal = (updatedList) => {
    localStorage.setItem('admin_pandits_roster', JSON.stringify(updatedList));
    setPandits(updatedList);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location) {
      toast.error('Name and location are required.');
      return;
    }

    const newPandit = {
      id: Date.now(),
      name: formData.name,
      location: formData.location,
      languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean),
      image: formData.image || '/images/pandit_ankush_1778447215487.png',
      status: formData.status,
      rating: "5.0",
      reviews: 0
    };

    const updatedList = [...pandits, newPandit];
    saveToLocal(updatedList);
    toast.success('Pandit onboarded successfully!');
    setIsModalOpen(false);
    setFormData({
      name: '',
      location: '',
      languages: '',
      image: '',
      status: 'Available'
    });
  };

  const handleDeletePandit = (id) => {
    if (window.confirm('Are you sure you want to offboard this pandit?')) {
      const updatedList = pandits.filter(p => p.id !== id);
      saveToLocal(updatedList);
      toast.success('Pandit offboarded.');
    }
  };

  return (
    <div className="fade-in">
      <div className="admin-header">
        <div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-admin-primary">
          <Plus size={18} /> {t.onboardBtn}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {pandits.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--admin-text-secondary)', background: 'var(--admin-bg-panel)', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
            {t.noPandits}
          </div>
        ) : (
          pandits.map((pandit) => (
            <div key={pandit.id} className="metric-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
              <button 
                onClick={() => handleDeletePandit(pandit.id)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer' }}
                title="Offboard Pandit"
              >
                <Trash2 size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--admin-accent)' }}>
                  <img src={pandit.image} alt={pandit.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ paddingRight: '24px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--admin-text-primary)' }}>{pandit.name}</h3>
                  <div style={{ color: 'var(--admin-text-secondary)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <MapPin size={12} /> {pandit.location}
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {pandit.languages.map((lang, idx) => (
                  <span key={idx} style={{ fontSize: '12px', background: 'var(--admin-bg)', padding: '4px 10px', borderRadius: '20px', color: 'var(--admin-text-secondary)', border: '1px solid var(--admin-border)' }}>{lang}</span>
                ))}
                <span style={{ 
                  fontSize: '12px', 
                  background: pandit.status === 'Available' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  color: pandit.status === 'Available' ? 'var(--admin-success)' : '#ef4444', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px' 
                }}>
                  <CheckCircle size={12} /> {pandit.status}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--admin-border)', paddingTop: '16px', marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--admin-warning)', fontWeight: '600' }}>
                  <Star size={16} fill="currentColor" /> {pandit.rating} <span style={{ color: 'var(--admin-text-secondary)', fontWeight: '400', fontSize: '12px' }}>({pandit.reviews})</span>
                </div>
                <button className="btn-admin-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>{t.viewSchedule}</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Onboard Pandit Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000, backdropFilter: 'blur(4px)', padding: '20px', overflowY: 'auto' }}>
          <form onSubmit={handleFormSubmit} style={{ background: 'var(--admin-bg-panel)', border: '1px solid var(--admin-border)', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', color: 'var(--admin-text-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', margin: 0, color: 'var(--admin-accent)', fontFamily: 'var(--font-heading)' }}>{t.modalTitle}</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--admin-text-secondary)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-text-secondary)' }}>{t.labelName}</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Acharya Ankush Shukla"
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-text-secondary)' }}>{t.labelLoc}</label>
                <input 
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Head Acharya (Mumbai/Online)"
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-text-secondary)' }}>{t.labelLang}</label>
                <input 
                  type="text"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  placeholder="e.g. Hindi, Sanskrit, English"
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-text-secondary)' }}>{t.labelStatus}</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '14px' }}
                  >
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                    <option value="Offline">Offline</option>
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
                      <img src={formData.image} alt="Preview" style={{ height: '40px', width: '40px', borderRadius: '40%', objectFit: 'cover' }} />
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
                {t.onboardAction}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PanditManagement;

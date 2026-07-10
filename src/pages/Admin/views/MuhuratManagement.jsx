import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

const defaultMuhurats = [
  {
    id: 1,
    title: "Griha Pravesh Muhurat",
    date: "2026-07-24",
    time: "08:15 AM - 11:45 AM",
    tithi: "Dwitiya Tithi, Pushya Nakshatra"
  },
  {
    id: 2,
    title: "Satyanarayan Pujan Muhurat",
    date: "2026-08-18",
    time: "04:30 PM - 07:30 PM",
    tithi: "Purnima Tithi, Shravana Nakshatra"
  },
  {
    id: 3,
    title: "Maha Rudrabhishek Muhurat",
    date: "2026-08-31",
    time: "06:00 AM - 09:00 AM",
    tithi: "Trayodashi (Pradosh), Shravana Somvar"
  }
];

const translations = {
  English: {
    title: "Muhurat Calendar",
    subtitle: "Define auspicious dates and block unavailable periods.",
    addNew: "Add Auspicious Event",
    colEvent: "Auspicious Event",
    colDate: "Auspicious Date",
    colTime: "Auspicious Time Range",
    colTithi: "Tithi / Nakshatra details",
    colActions: "Actions",
    noMuhurats: "No auspicious dates listed.",
    modalTitle: "Add Auspicious Date",
    labelTitle: "Event / Ritual Title *",
    labelDate: "Auspicious Date *",
    labelTime: "Auspicious Time Range *",
    labelTithi: "Tithi / Nakshatra details",
    cancel: "Cancel",
    addMuhurat: "Add Muhurat"
  },
  Hindi: {
    title: "शुभ मुहूर्त कैलेंडर",
    subtitle: "शुभ तिथियां परिभाषित करें और अनुपलब्ध अवधियों को ब्लॉक करें।",
    addNew: "शुभ मुहूर्त जोड़ें",
    colEvent: "शुभ मुहूर्त / अनुष्ठान",
    colDate: "शुभ तिथि",
    colTime: "शुभ समय सीमा",
    colTithi: "तिथि / नक्षत्र विवरण",
    colActions: "कार्रवाई",
    noMuhurats: "कोई शुभ मुहूर्त सूचीबद्ध नहीं है।",
    modalTitle: "शुभ मुहूर्त जोड़ें",
    labelTitle: "मुहूर्त / अनुष्ठान का नाम *",
    labelDate: "शुभ तिथि *",
    labelTime: "शुभ समय सीमा *",
    labelTithi: "तिथि / नक्षत्र विवरण",
    cancel: "रद्द करें",
    addMuhurat: "मुहूर्त जोड़ें"
  },
  Sanskrit: {
    title: "शुभमुहूर्त-तालिका",
    subtitle: "शुभतिथीन् निर्धारयन्तु, अनुपलब्ध-कालखण्डान् च रोधयन्तु।",
    addNew: "नूतन-मुहूर्त-संयोजनम्",
    colEvent: "शुभमुहूर्तः / अनुष्ठानम्",
    colDate: "शुभतिथिः",
    colTime: "शुभसमयः",
    colTithi: "तिथिः / नक्षत्र-विवरणम्",
    colActions: "प्रचालनम्",
    noMuhurats: "कोऽपि शुभमुहूर्तः सूचीबद्धः नास्ति।",
    modalTitle: "शुभतिथिं योजयतु",
    labelTitle: "मुहूर्तस्य / अनुष्ठानस्य नाम *",
    labelDate: "शुभतिथिः *",
    labelTime: "शुभसमयः *",
    labelTithi: "तिथिः / नक्षत्र-विवरणम्",
    cancel: "निरस्तीकरणम्",
    addMuhurat: "मुहूर्तं योजयतु"
  }
};

const MuhuratManagement = () => {
  const [muhurats, setMuhurats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lang, setLang] = useState('English');
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    tithi: ''
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
    const localKey = 'admin_muhurats';
    const localData = localStorage.getItem(localKey);
    if (localData) {
      setMuhurats(JSON.parse(localData));
    } else {
      localStorage.setItem(localKey, JSON.stringify(defaultMuhurats));
      setMuhurats(defaultMuhurats);
    }
  }, []);

  const saveToLocal = (updatedList) => {
    localStorage.setItem('admin_muhurats', JSON.stringify(updatedList));
    setMuhurats(updatedList);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) {
      toast.error('Title, Date and Time are required.');
      return;
    }

    const newMuhurat = {
      id: Date.now(),
      title: formData.title,
      date: formData.date,
      time: formData.time,
      tithi: formData.tithi || 'Auspicious Siddhi Yoga'
    };

    const updatedList = [...muhurats, newMuhurat];
    saveToLocal(updatedList);
    toast.success('Auspicious Muhurat added successfully!');
    setIsModalOpen(false);
    setFormData({
      title: '',
      date: '',
      time: '',
      tithi: ''
    });
  };

  const handleDeleteMuhurat = (id) => {
    if (window.confirm('Are you sure you want to delete this Muhurat?')) {
      const updatedList = muhurats.filter(m => m.id !== id);
      saveToLocal(updatedList);
      toast.success('Muhurat deleted.');
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
          <Plus size={18} /> {t.addNew}
        </button>
      </div>

      <div className="admin-panel">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t.colEvent}</th>
                <th>{t.colDate}</th>
                <th>{t.colTime}</th>
                <th>{t.colTithi}</th>
                <th>{t.colActions}</th>
              </tr>
            </thead>
            <tbody>
              {muhurats.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-secondary)' }}>
                    {t.noMuhurats}
                  </td>
                </tr>
              ) : (
                muhurats.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <div style={{ fontWeight: '600' }}>{m.title}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                        <CalendarIcon size={14} color="var(--admin-accent)" /> {m.date}
                      </div>
                    </td>
                    <td style={{ color: 'var(--admin-text-secondary)' }}>{m.time}</td>
                    <td>
                      <span style={{ fontSize: '13px', background: 'rgba(224, 110, 56, 0.08)', color: 'var(--admin-accent)', padding: '4px 10px', borderRadius: '4px', fontWeight: '500' }}>
                        {m.tithi}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDeleteMuhurat(m.id)}
                        className="btn-admin-action" 
                        style={{ color: '#e53e3e', borderColor: 'rgba(229, 62, 62, 0.2)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '16px 24px', textAlign: 'center', borderTop: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', fontSize: '14px' }}>
          {t.showing || 'Showing'} {muhurats.length} {t.noMuhurats ? (lang === 'Hindi' ? 'मुहूर्त सूची में' : lang === 'Sanskrit' ? 'शुभमुहूर्ताः' : 'auspicious dates') : 'auspicious dates'}
        </div>
      </div>

      {/* Add Muhurat Modal */}
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
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-text-secondary)' }}>{t.labelTitle}</label>
                <input 
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Griha Pravesh Pujan"
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-text-secondary)' }}>{t.labelDate}</label>
                <input 
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-text-secondary)' }}>{t.labelTime}</label>
                <input 
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="e.g. 08:30 AM - 12:00 PM"
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--admin-text-secondary)' }}>{t.labelTithi}</label>
                <input 
                  type="text"
                  value={formData.tithi}
                  onChange={(e) => setFormData({ ...formData, tithi: e.target.value })}
                  placeholder="e.g. Dwitiya Tithi, Pushya Nakshatra"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '14px' }}
                />
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
                {t.addMuhurat}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MuhuratManagement;

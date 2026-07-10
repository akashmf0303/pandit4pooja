const getImage = (title, index) => {
  const t = title.toLowerCase();
  
  // 1. Lakshmi Ganesh
  if (t.includes('lakshmi ganesh') || t.includes('laxmi ganesh')) {
    return '/images/lakshmi_ganesh_1778447148678.png';
  }
  
  // 2. Grih Shanti
  if (t.includes('grih shanti')) {
    return '/images/real_family_havan.jpg';
  }
  
  // 3. Navgrah Shanti
  if (t.includes('navgrah')) {
    return '/images/navgrah_1778447118805.png';
  }
  
  // 4. Satyanarayan
  if (t.includes('satyanarayan')) {
    return '/images/satyanarayan_1778447088142.png';
  }
  
  // 5. Mangalik Dosh
  if (t.includes('mangalik') || t.includes('mangal dosh')) {
    return '/images/hanuman_puja_1778447133698.png';
  }
  
  // 6. Gandmool Shanti
  if (t.includes('gandmool')) {
    return '/images/navgrah_1778447118805.png';
  }
  
  // 7. Gayatri Jaap
  if (t.includes('gayatri')) {
    return '/images/goddess_gayatri.png';
  }
  
  // 8. Mahamrityunjaya Jaap
  if (t.includes('mahamrityunjaya')) {
    return '/anushthan_mahamrityunjay.png';
  }
  
  // 9. Kartik Shanti
  if (t.includes('kartik')) {
    return '/images/lord_kartikeya.png';
  }
  
  // 10. Griha Pravesh
  if (t.includes('griha pravesh')) {
    return '/images/griha_pravesh.png';
  }
  
  // 11. Chandi Path / Yagya / Devi Bhagwat
  if (t.includes('chandi') || t.includes('devi bhagwat')) {
    return '/images/durga_chandi.png';
  }
  
  // 12. Sundarkand
  if (t.includes('sundarkand')) {
    return '/images/hanuman_puja_1778447133698.png';
  }
  
  // 13. Ramcharit Manas
  if (t.includes('ramcharit') || t.includes('manas')) {
    return '/images/lord_rama.png';
  }
  
  // 14. Pitra Dosh / Amavas Shanti
  if (t.includes('pitra') || t.includes('amavas')) {
    return '/images/pitru_puja.png';
  }
  
  // 15. Kalsarp Dosh
  if (t.includes('kalsarp')) {
    return '/images/kalsarp_shanti.png';
  }
  
  // 16. Bhagwat Puran
  if (t.includes('bhagwat puran')) {
    return '/images/lord_krishna.png';
  }
  
  // 17. Shiv Mahapuran / Rudrabhishek
  if (t.includes('shiv mahapuran')) {
    return '/images/shiva_puja_1778447103439.png';
  }
  if (t.includes('rudrabhishek')) {
    return '/anushthan_rudrabhishek.png';
  }
  
  // 18. Garud Puran
  if (t.includes('garud')) {
    return '/images/garud_puran.png';
  }
  
  // 19. Grih Shuddhi
  if (t.includes('grih shuddhi')) {
    return '/images/real_family_havan.jpg';
  }
  
  // 20. Naam Karan
  if (t.includes('naam karan') || t.includes('naamkaran')) {
    return '/images/naamkaran.png';
  }
  
  // 21. Vivah Pujan
  if (t.includes('vivah')) {
    return '/images/vivah_sanskar.png';
  }
  
  // 22. Baglamukhi
  if (t.includes('baglamukhi')) {
    return '/images/goddess_baglamukhi.png';
  }
  
  // 23. Shodas Sanskar
  if (t.includes('shodas sanskar')) {
    return '/images/shodas_sanskar.png';
  }

  // General fallbacks based on keywords
  if (t.includes('shiv') || t.includes('rudra')) {
    return '/images/shiva_puja_1778447103439.png';
  }
  if (t.includes('havan') || t.includes('yagya') || t.includes('shanti') || t.includes('dosh')) {
    return '/images/real_hero_havan.jpg';
  }
  
  return '/images/real_pooja_samagri.jpg';
};

// Helper to generate slug
export const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const allPoojasList = [
  { title: 'Lakshmi Ganesh Pujan', price: '₹3,500' },
  { title: 'Grih Shanti Pujan', price: '₹5,100' },
  { title: 'Navgrah Shanti Pujan', price: '₹7,500' },
  { title: 'Satyanarayan Katha', price: '₹3,100' },
  { title: 'Mangalik Dosh Nivaran', price: '₹11,000' },
  { title: 'Gandmool Shanti Pujan', price: '₹7,100' },
  { title: 'Gayatri Jaap Anushthan', price: '₹15,000' },
  { title: 'Mahamrityunjaya Jaap', price: '₹21,000' },
  { title: 'Kartik Shanti Pujan', price: '₹5,100' },
  { title: 'Griha Pravesh Puja', price: '₹5,100' },
  { title: 'Chandi Path Havan', price: '₹11,000' },
  { title: 'Chandi Yagya', price: '₹25,000' },
  { title: 'Sundarkand Path', price: '₹4,100' },
  { title: 'Ramcharit Manas Path', price: '₹21,000' },
  { title: 'Amavas Shanti Pujan', price: '₹5,100' },
  { title: 'Pitra Dosh Nivaran', price: '₹11,000' },
  { title: 'Kalsarp Dosh Nivaran', price: '₹15,000' },
  { title: 'Bhagwat Puran Mool Path', price: '₹31,000' },
  { title: 'Shiv Mahapuran Path', price: '₹31,000' },
  { title: 'Devi Bhagwat Puran', price: '₹31,000' },
  { title: 'Garud Puran Katha', price: '₹11,000' },
  { title: 'Rudrabhishek Pujan', price: '₹5,100' },
  { title: 'Grih Shuddhi Pujan', price: '₹3,100' },
  { title: 'Naam Karan Sanskar', price: '₹4,100' },
  { title: 'Vivah Pujan Sanskar', price: '₹21,000' },
  { title: 'Maa Baglamukhi Anushthan', price: '₹31,000' },
  { title: 'Shodas Sanskar Pujan', price: '₹11,000' }
];

const defaultPoojas = allPoojasList.map((pooja, index) => {
  const isDoshNivaran = pooja.title.toLowerCase().includes('dosh');
  const isPath = pooja.title.toLowerCase().includes('path') || pooja.title.toLowerCase().includes('puran');
  const isSanskar = pooja.title.toLowerCase().includes('sanskar');
  
  let subtitle = `Experience divine blessings and spiritual harmony through the sacred ${pooja.title}.`;
  let about = `The ${pooja.title} is a deeply revered Vedic ritual performed to invoke divine grace and spiritual alignment. Rooted in ancient scriptures, this authentic ceremony ensures that the cosmic energies surrounding you and your family are harmonized. Our highly learned Acharyas perform this ritual with strict adherence to the Shastras, ensuring every mantra and offering creates a profound spiritual impact in your life.`;
  
  if (isDoshNivaran) {
    subtitle = `Neutralize negative planetary influences and restore peace and prosperity with the powerful ${pooja.title}.`;
    about = `Astrological doshas can create unseen hurdles in career, health, and family life. The ${pooja.title} is a specialized Vedic remedy designed to pacify malefic planetary alignments. Through rigorous mantra chanting and specific havan offerings, our experienced Pandits help neutralize these cosmic imbalances, opening the doors to a life of stability, peace, and spiritual protection.`;
  } else if (isPath) {
    subtitle = `Immerse your home in divine vibrations with the continuous recitation of the sacred ${pooja.title}.`;
    about = `The recitation of sacred texts holds immense spiritual power. The ${pooja.title} involves the disciplined and rhythmic chanting of divine scriptures by our expert Acharyas. This powerful resonance cleanses the environment of negative energies, imparts deep spiritual wisdom to the listeners, and brings immense peace and prosperity to the household.`;
  } else if (isSanskar) {
    subtitle = `Sanctify the vital milestones of your life with the traditional ${pooja.title}.`;
    about = `In the Vedic tradition, life's transitions are marked by sacred rites known as Sanskars. The ${pooja.title} is performed to bless the individual at this crucial juncture, ensuring divine protection and guidance for the future. Our Pandits conduct these ceremonies with deep emotional reverence and exact traditional precision, making your family's milestones truly auspicious.`;
  }

  // Griha Pravesh specific override
  if (pooja.title === 'Griha Pravesh Puja') {
    subtitle = "Purify your new home, remove negative energies, and invite divine blessings for lifelong prosperity and peace.";
    about = "A Griha Pravesh Puja is a deeply sacred Vedic ceremony performed before moving into a new home. According to Vastu Shastra, a home is a living entity, and this ritual cleanses the space of any negative energies or doshas accumulated during construction. By invoking Lord Ganesha, the Navgrahas, and the Vastu Purusha, we ensure that the household is blessed with harmony, health, and spiritual abundance. It is more than just a tradition; it is the emotional and spiritual foundation of your family's future in a new space.";
  }

  return {
    id: generateSlug(pooja.title),
    title: pooja.title,
    subtitle: subtitle,
    price: pooja.price,
    image: getImage(pooja.title, index),
    about: about,
    benefits: [
      {
        title: "Spiritual Elevation",
        description: "Creates a powerful aura of positivity and spiritual peace within your environment."
      },
      {
        title: "Obstacle Removal",
        description: "Helps in clearing unseen hurdles in your personal and professional life through divine grace."
      },
      {
        title: "Family Prosperity",
        description: "Invites abundance, health, and deep harmony among all family members."
      }
    ],
    audiences: [
      {
        title: "Facing Life Challenges",
        description: "Ideal for individuals experiencing unexplained delays or hurdles in their endeavors."
      },
      {
        title: "Seeking Peace & Growth",
        description: "Perfect for families wanting to maintain an atmosphere of joy, health, and financial stability."
      },
      {
        title: "Special Occasions",
        description: "Highly recommended during significant life events, festivals, or spiritual milestones."
      }
    ],
    process: [
      {
        title: "Sankalp & Invocation",
        description: "Taking a solemn vow (Sankalp) followed by the invocation of the presiding deities."
      },
      {
        title: "Main Ritual / Chanting",
        description: "The core procedure involving specialized mantras, paths, or specific offerings."
      },
      {
        title: "Havan (Fire Sacrifice)",
        description: "Offering sacred herbs and ghee into the holy fire to amplify the spiritual energy."
      },
      {
        title: "Aarti & Blessings",
        description: "Concluding with the Aarti, distribution of Prasad, and receiving the Acharya's blessings."
      }
    ],
    samagri: [
      "Turmeric, Kumkum, Sandalwood Paste",
      "Betel Leaves and Nuts",
      "Coconuts and Fresh Fruits",
      "Havan Kund and Sacred Woods",
      "Ghee, Camphor, and Incense",
      "Kalash and Mango Leaves",
      "Panchamrit (Milk, Curd, Ghee, Honey, Sugar)"
    ],
    faqs: [
      {
        question: `How long does the ${pooja.title} take?`,
        answer: "Depending on the specific requirements and scale, the duration typically ranges from 2 to 5 hours. Extensive paths or Anushthans may span across multiple days."
      },
      {
        question: "Do you provide all the Puja Samagri?",
        answer: "Yes, our premium package includes 100% pure and authentic Puja Samagri. You only need to arrange basic household items like utensils, fruits, and sweets."
      },
      {
        question: "Can we perform this Puja online?",
        answer: "Yes, we offer expert online guidance where our Acharya connects via video call and guides you step-by-step through the rituals if you cannot perform it offline."
      },
      {
        question: "How do we choose the right Muhurat (date and time)?",
        answer: "Once you book a consultation, our expert astrologers will analyze your family's birth charts (Kundlis) and suggest the most auspicious dates for the ceremony."
      }
    ],
    related: [
      {
        title: 'Satyanarayan Katha',
        price: '₹3,100',
        image: '/images/satyanarayan_1778447088142.png',
        slug: 'satyanarayan-katha'
      },
      {
        title: 'Lakshmi Ganesh Pujan',
        price: '₹3,500',
        image: '/images/lakshmi_ganesh_1778447148678.png',
        slug: 'lakshmi-ganesh-pujan'
      },
      {
        title: 'Navgrah Shanti Pujan',
        price: '₹7,500',
        image: '/images/navgrah_1778447118805.png',
        slug: 'navgrah-shanti-pujan'
      }
    ]
  };
});

export const poojasData = [...defaultPoojas];

export const syncLocalCatalog = () => {
  if (typeof window !== 'undefined') {
    const localData = localStorage.getItem('admin_poojas_catalog');
    if (localData) {
      try {
        const list = JSON.parse(localData);
        poojasData.length = 0;
        poojasData.push(...list);
      } catch (e) {
        console.warn('Failed to parse admin_poojas_catalog:', e);
      }
    } else {
      localStorage.setItem('admin_poojas_catalog', JSON.stringify(defaultPoojas));
    }
  }
};

syncLocalCatalog();

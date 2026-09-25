import { useState } from 'react'

type Screen =
  | 'splash'
  | 'home'
  | 'expert'
  | 'expert-detail'
  | 'production'
  | 'processing'
  | 'waste'
  | 'market'
  | 'market-detail'
  | 'transport'
  | 'tracking'
  | 'profile'

const LANG_OPTIONS = ['English', 'हिंदी', 'मराठी', 'తెలుగు', 'ਪੰਜਾਬੀ']

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= rating ? '#F4A261' : '#DDD9D0', fontSize: 14 }}>★</span>
      ))}
    </span>
  )
}

function VerifiedBadge() {
  return <span className="tag-verified">✓ Verified</span>
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: '#2D6A4F', fontFamily: 'Outfit', fontWeight: 600, fontSize: 15, padding: '4px 0' }}>
      <span style={{ fontSize: 20 }}>←</span> Back
    </button>
  )
}

function BottomNav({ current, navigate }: { current: Screen; navigate: (s: Screen) => void }) {
  const tabs = [
    { id: 'home' as Screen, icon: '🏠', label: 'Home' },
    { id: 'tracking' as Screen, icon: '📊', label: 'Track' },
    { id: 'market' as Screen, icon: '🤝', label: 'Market' },
    { id: 'profile' as Screen, icon: '👨‍🌾', label: 'Profile' },
  ]
  return (
    <nav style={{ background: '#FFFFFF', borderTop: '1.5px solid #E8E4DC', display: 'flex', padding: '8px 0 20px', position: 'sticky', bottom: 0, zIndex: 20 }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => navigate(tab.id)}
          style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 4px' }}>
          <span style={{ fontSize: 22 }}>{tab.icon}</span>
          <span style={{ fontFamily: 'Outfit', fontWeight: current === tab.id ? 700 : 500, fontSize: 11, color: current === tab.id ? '#2D6A4F' : '#6B7C6B' }}>{tab.label}</span>
          {current === tab.id && <span style={{ width: 18, height: 3, borderRadius: 2, background: '#2D6A4F', marginTop: 1 }} />}
        </button>
      ))}
    </nav>
  )
}

// ─── SPLASH ────────────────────────────────────────────────────────────────────
function SplashScreen({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div style={{ minHeight: '100dvh', background: 'linear-gradient(160deg, #1B4332 0%, #2D6A4F 55%, #52B788 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', gap: 0 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center', gap: 24 }}>
        <div style={{ width: 100, height: 100, background: 'rgba(255,255,255,0.12)', borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,0.2)' }}>
          🌾
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 38, color: '#FFFFFF', margin: 0, letterSpacing: -0.5 }}>Krishi<span style={{ color: '#F4A261' }}>Connect</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginTop: 10, fontFamily: 'Nunito', lineHeight: 1.5 }}>From Farm to Value,<br />One Connected Journey</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px' }}>
            <span style={{ fontSize: 22 }}>🌱</span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontFamily: 'Nunito', fontWeight: 500 }}>Expert guidance at every stage</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px' }}>
            <span style={{ fontSize: 22 }}>🤝</span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontFamily: 'Nunito', fontWeight: 500 }}>Connect buyers, processors & transport</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px' }}>
            <span style={{ fontSize: 22 }}>💰</span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontFamily: 'Nunito', fontWeight: 500 }}>Get the best value for your produce</span>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16 }}>
        <button className="btn-accent" onClick={() => navigate('home')} style={{ background: '#F4A261', fontSize: 17 }}>Get Started 🚀</button>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, textAlign: 'center', margin: 0, fontFamily: 'Nunito' }}>Available in 12 regional languages</p>
      </div>
    </div>
  )
}

// ─── HOME ───────────────────────────────────────────────────────────────────────
function HomeScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [lang, setLang] = useState('English')
  const [showLang, setShowLang] = useState(false)

  const cards = [
    { id: 'expert' as Screen, icon: '👨‍🏫', label: 'Ask an Expert', desc: 'Get guidance from specialists', color: '#E8F5E9', border: '#A5D6A7' },
    { id: 'production' as Screen, icon: '🌱', label: 'Production Support', desc: 'Crop care & problem solving', color: '#FFF8E1', border: '#FFD54F' },
    { id: 'processing' as Screen, icon: '⚙️', label: 'Processing', desc: 'Value-add your produce', color: '#E3F2FD', border: '#90CAF9' },
    { id: 'processing' as Screen, icon: '💎', label: 'Value Addition', desc: 'Premium products & price', color: '#F3E5F5', border: '#CE93D8' },
    { id: 'waste' as Screen, icon: '♻️', label: 'Waste-to-Value', desc: 'Turn waste into income', color: '#E8F5E9', border: '#81C784' },
    { id: 'market' as Screen, icon: '🤝', label: 'Find Buyers', desc: 'Connect with verified buyers', color: '#FFF3E0', border: '#FFCC02' },
    { id: 'transport' as Screen, icon: '🚚', label: 'Find Transport', desc: 'Book reliable transporters', color: '#FCE4EC', border: '#F48FB1' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)', padding: '20px 20px 24px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, margin: 0, fontFamily: 'Nunito' }}>Good morning 🌅</p>
            <h2 style={{ color: '#FFFFFF', fontFamily: 'Outfit', fontWeight: 700, fontSize: 22, margin: '4px 0 0' }}>Ramesh Kumar</h2>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button onClick={() => setShowLang(!showLang)} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10, padding: '6px 10px', color: '#FFFFFF', fontFamily: 'Nunito', fontSize: 13, cursor: 'pointer' }}>
              🌐 {lang}
            </button>
            <button style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer' }}>🔔</button>
          </div>
        </div>
        {showLang && (
          <div style={{ position: 'absolute', top: 64, right: 20, background: '#FFFFFF', borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', zIndex: 30, minWidth: 140 }}>
            {LANG_OPTIONS.map(l => (
              <button key={l} onClick={() => { setLang(l); setShowLang(false) }}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px', background: l === lang ? '#E8F5E9' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Nunito', fontSize: 14, color: l === lang ? '#2D6A4F' : '#1A2E1A', fontWeight: l === lang ? 700 : 400 }}>
                {l} {l === lang && '✓'}
              </button>
            ))}
          </div>
        )}
        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 14px' }}>
          <span>📍</span>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, fontFamily: 'Nunito', fontWeight: 600 }}>Nashik, Maharashtra</span>
          <span style={{ color: '#F4A261', fontSize: 13, marginLeft: 'auto', fontFamily: 'Outfit', fontWeight: 600 }}>Change</span>
        </div>
      </div>

      {/* Voice Button */}
      <div style={{ padding: '16px 20px 0' }}>
        <button style={{ width: '100%', background: 'linear-gradient(135deg, #F4A261, #e8904e)', border: 'none', borderRadius: 14, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', boxShadow: '0 4px 16px rgba(244,162,97,0.3)' }}>
          <span style={{ fontSize: 24 }}>🎤</span>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#1A2E1A', margin: 0 }}>Tap to Speak</p>
            <p style={{ fontFamily: 'Nunito', fontSize: 12, color: 'rgba(26,46,26,0.65)', margin: 0 }}>Ask anything in your language</p>
          </div>
          <span style={{ marginLeft: 'auto', fontSize: 20 }}>▶</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div style={{ padding: '16px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '14px 16px', border: '1.5px solid #E8E4DC' }}>
          <p style={{ fontSize: 11, color: '#6B7C6B', fontFamily: 'Outfit', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>Active Requests</p>
          <p style={{ fontSize: 28, fontFamily: 'Outfit', fontWeight: 800, color: '#2D6A4F', margin: '4px 0 0' }}>3</p>
        </div>
        <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '14px 16px', border: '1.5px solid #E8E4DC' }}>
          <p style={{ fontSize: 11, color: '#6B7C6B', fontFamily: 'Outfit', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>This Season</p>
          <p style={{ fontSize: 28, fontFamily: 'Outfit', fontWeight: 800, color: '#F4A261', margin: '4px 0 0' }}>₹2.4L</p>
        </div>
      </div>

      {/* Services Grid */}
      <div style={{ padding: '20px 20px 0' }}>
        <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: '#1A2E1A', margin: '0 0 14px' }}>What do you need? 🌾</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {cards.map((card, i) => (
            <button key={i} onClick={() => navigate(card.id)} className="card-hover"
              style={{ background: card.color, border: `1.5px solid ${card.border}`, borderRadius: 16, padding: '16px 14px', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 30 }}>{card.icon}</span>
              <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#1A2E1A', margin: 0 }}>{card.label}</p>
              <p style={{ fontFamily: 'Nunito', fontSize: 12, color: '#6B7C6B', margin: 0, lineHeight: 1.4 }}>{card.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ padding: '20px 20px 24px' }}>
        <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: '#1A2E1A', margin: '0 0 14px' }}>Recent Activity</h3>
        {[
          { icon: '⚙️', title: 'Tomato Processing — Accepted', sub: 'Nashik Agro Pvt. Ltd.', time: '2h ago', status: 'active' },
          { icon: '🤝', title: 'Buyer Request — Onion (5 tonnes)', sub: 'Ref. price: ₹18/kg', time: '1d ago', status: 'pending' },
        ].map((item, i) => (
          <div key={i} onClick={() => navigate('tracking')} style={{ background: '#FFFFFF', borderRadius: 14, padding: '14px 16px', marginBottom: 10, border: '1.5px solid #E8E4DC', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 14, color: '#1A2E1A', margin: 0 }}>{item.title}</p>
              <p style={{ fontFamily: 'Nunito', fontSize: 12, color: '#6B7C6B', margin: '2px 0 0' }}>{item.sub}</p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <span style={{ fontSize: 11, color: item.status === 'active' ? '#2D6A4F' : '#F4A261', fontWeight: 700, fontFamily: 'Outfit', background: item.status === 'active' ? '#E8F5E9' : '#FFF8E1', padding: '3px 8px', borderRadius: 8 }}>
                {item.status === 'active' ? 'Active' : 'Pending'}
              </span>
              <p style={{ fontSize: 11, color: '#6B7C6B', margin: '4px 0 0', fontFamily: 'Nunito' }}>{item.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 8 }} />
    </div>
  )
}

// ─── EXPERT ─────────────────────────────────────────────────────────────────────
function ExpertScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [crop, setCrop] = useState('')
  const [problem, setProblem] = useState('')
  const [photoUploaded, setPhotoUploaded] = useState(false)

  const experts = [
    { name: 'Dr. Priya Sharma', role: 'Agricultural Scientist', crops: 'Tomato, Onion, Wheat', rating: 5, reviews: 128, img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&auto=format', verified: true, lang: 'Hindi, Marathi', wait: '~10 min' },
    { name: 'Suresh Patil', role: 'Senior Farmer (25 yrs exp)', crops: 'Grapes, Pomegranate', rating: 4, reviews: 89, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format', verified: true, lang: 'Marathi, Hindi', wait: '~5 min' },
    { name: 'Anita Reddy', role: 'Soil & Pest Specialist', crops: 'Rice, Cotton, Soybean', rating: 5, reviews: 214, img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&auto=format', verified: true, lang: 'Telugu, Hindi', wait: '~20 min' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)', padding: '20px 20px 28px' }}>
        <BackButton onBack={() => navigate('home')} />
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 26, color: '#FFFFFF', margin: '12px 0 4px' }}>👨‍🏫 Ask an Expert</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontFamily: 'Nunito', margin: 0 }}>Get expert guidance in your language</p>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Crop + Problem */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '18px', border: '1.5px solid #E8E4DC' }}>
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: '#1A2E1A', margin: '0 0 14px' }}>What's the issue?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <select value={crop} onChange={e => setCrop(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #DDD9D0', fontFamily: 'Nunito', fontSize: 15, color: crop ? '#1A2E1A' : '#6B7C6B', background: '#F7F4EE', appearance: 'none' }}>
              <option value="">🌾 Select your crop</option>
              <option>Tomato</option><option>Onion</option><option>Wheat</option><option>Rice</option><option>Grapes</option><option>Cotton</option>
            </select>
            <select value={problem} onChange={e => setProblem(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #DDD9D0', fontFamily: 'Nunito', fontSize: 15, color: problem ? '#1A2E1A' : '#6B7C6B', background: '#F7F4EE', appearance: 'none' }}>
              <option value="">🔎 Select problem type</option>
              <option>Pest / Disease</option><option>Soil & Nutrients</option><option>Water / Irrigation</option><option>Weather damage</option><option>Low yield</option>
            </select>
          </div>
        </div>

        {/* Photo/Voice Upload */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '18px', border: '1.5px solid #E8E4DC' }}>
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: '#1A2E1A', margin: '0 0 14px' }}>Add evidence</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button onClick={() => setPhotoUploaded(true)}
              style={{ background: photoUploaded ? '#E8F5E9' : '#F7F4EE', border: `2px ${photoUploaded ? 'solid #52B788' : 'dashed #DDD9D0'}`, borderRadius: 12, padding: '16px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <span style={{ fontSize: 28 }}>{photoUploaded ? '✅' : '📷'}</span>
              <span style={{ fontFamily: 'Nunito', fontSize: 13, color: photoUploaded ? '#2D6A4F' : '#6B7C6B', fontWeight: 600 }}>{photoUploaded ? 'Photo added' : 'Upload Photo'}</span>
            </button>
            <button style={{ background: '#F7F4EE', border: '2px dashed #DDD9D0', borderRadius: 12, padding: '16px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <span style={{ fontSize: 28 }}>🎤</span>
              <span style={{ fontFamily: 'Nunito', fontSize: 13, color: '#6B7C6B', fontWeight: 600 }}>Voice Input</span>
            </button>
          </div>
        </div>

        {/* Expert List */}
        <div>
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 17, color: '#1A2E1A', margin: '0 0 14px' }}>Available Experts</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {experts.map((e, i) => (
              <div key={i} onClick={() => navigate('expert-detail')}
                style={{ background: '#FFFFFF', borderRadius: 16, padding: '16px', border: '1.5px solid #E8E4DC', cursor: 'pointer', display: 'flex', gap: 14 }} className="card-hover">
                <img src={e.img} alt={e.name} style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 2 }}>
                    <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#1A2E1A' }}>{e.name}</span>
                    {e.verified && <VerifiedBadge />}
                  </div>
                  <p style={{ fontFamily: 'Nunito', fontSize: 12, color: '#6B7C6B', margin: '2px 0' }}>{e.role}</p>
                  <p style={{ fontFamily: 'Nunito', fontSize: 12, color: '#2D6A4F', margin: '2px 0' }}>🌾 {e.crops}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <StarRating rating={e.rating} />
                      <span style={{ fontSize: 12, color: '#6B7C6B', fontFamily: 'Nunito' }}>({e.reviews})</span>
                    </div>
                    <span style={{ fontSize: 12, color: '#2D6A4F', fontFamily: 'Outfit', fontWeight: 600, background: '#E8F5E9', padding: '3px 8px', borderRadius: 8 }}>{e.wait}</span>
                  </div>
                  <p style={{ fontFamily: 'Nunito', fontSize: 11, color: '#6B7C6B', margin: '4px 0 0' }}>🌐 {e.lang}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── EXPERT DETAIL ──────────────────────────────────────────────────────────────
function ExpertDetailScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)', padding: '20px 20px 40px' }}>
        <BackButton onBack={() => navigate('expert')} />
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginTop: 16 }}>
          <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&auto=format" alt="Dr. Priya Sharma" style={{ width: 72, height: 72, borderRadius: 16, objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }} />
          <div>
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: '#FFFFFF', margin: '0 0 4px' }}>Dr. Priya Sharma</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, fontFamily: 'Nunito', margin: '0 0 6px' }}>Agricultural Scientist · 15 yrs exp</p>
            <VerifiedBadge />
          </div>
        </div>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16, marginTop: -20 }}>
        {/* Stats */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '16px', border: '1.5px solid #E8E4DC', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center' }}>
          {[['⭐ 4.9', 'Rating'], ['128', 'Reviews'], ['~10 min', 'Resp. Time']].map(([val, label], i) => (
            <div key={i}>
              <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: '#1A2E1A', margin: 0 }}>{val}</p>
              <p style={{ fontFamily: 'Nunito', fontSize: 11, color: '#6B7C6B', margin: '2px 0 0' }}>{label}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '18px', border: '1.5px solid #E8E4DC' }}>
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#1A2E1A', margin: '0 0 10px' }}>Expertise</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Tomato', 'Onion', 'Wheat', 'Pest Control', 'Soil Health', 'Organic Farming'].map(tag => (
              <span key={tag} style={{ background: '#E8F5E9', color: '#2D6A4F', borderRadius: 20, padding: '5px 12px', fontSize: 13, fontFamily: 'Nunito', fontWeight: 600 }}>{tag}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '18px', border: '1.5px solid #E8E4DC' }}>
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#1A2E1A', margin: '0 0 12px' }}>Reviews</p>
          {[
            { name: 'Mohan K.', text: 'Very helpful! My tomato crop was saved. Explained everything clearly in Marathi.', stars: 5 },
            { name: 'Sita Devi', text: 'Quick response and practical advice. Highly recommend.', stars: 4 },
          ].map((r, i) => (
            <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i === 0 ? '1px solid #E8E4DC' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 14, color: '#1A2E1A' }}>{r.name}</span>
                <StarRating rating={r.stars} />
              </div>
              <p style={{ fontFamily: 'Nunito', fontSize: 13, color: '#6B7C6B', margin: 0, lineHeight: 1.5 }}>{r.text}</p>
            </div>
          ))}
        </div>

        {sent ? (
          <div style={{ background: '#E8F5E9', borderRadius: 16, padding: '20px', textAlign: 'center', border: '1.5px solid #81C784' }}>
            <p style={{ fontSize: 40, margin: '0 0 8px' }}>✅</p>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: '#2D6A4F', margin: 0 }}>Guidance Requested!</p>
            <p style={{ fontFamily: 'Nunito', fontSize: 14, color: '#52B788', margin: '6px 0 0' }}>Dr. Priya will respond in ~10 minutes</p>
            <button onClick={() => navigate('tracking')} style={{ marginTop: 16, background: '#2D6A4F', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', fontFamily: 'Outfit', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Track Request</button>
          </div>
        ) : (
          <button className="btn-primary" onClick={() => setSent(true)}>🙏 Request Guidance</button>
        )}
      </div>
    </div>
  )
}

// ─── PRODUCTION ─────────────────────────────────────────────────────────────────
function ProductionScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [selected, setSelected] = useState('')
  const crops = [
    { name: 'Tomato', icon: '🍅', issue: '⚠️ Late Blight Risk' },
    { name: 'Onion', icon: '🧅', issue: '' },
    { name: 'Wheat', icon: '🌾', issue: '' },
    { name: 'Grapes', icon: '🍇', issue: '' },
    { name: 'Cotton', icon: '☁️', issue: '⚠️ Pest Alert' },
    { name: 'Rice', icon: '🍚', issue: '' },
  ]
  const suppliers = [
    { name: 'AgroNashik Inputs', type: 'Seeds & Fertilizers', dist: '4.2 km', rating: 5, verified: true },
    { name: 'Krishi Seva Center', type: 'Pesticides & Tools', dist: '2.8 km', rating: 4, verified: true },
    { name: 'GreenGrow Organics', type: 'Bio-fertilizers', dist: '7.1 km', rating: 4, verified: false },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)', padding: '20px 20px 28px' }}>
        <BackButton onBack={() => navigate('home')} />
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 26, color: '#FFFFFF', margin: '12px 0 4px' }}>🌱 Production Support</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontFamily: 'Nunito', margin: 0 }}>Identify problems · Find inputs nearby</p>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, margin: '0 0 12px', color: '#1A2E1A' }}>Select Your Crop</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {crops.map(c => (
              <button key={c.name} onClick={() => setSelected(c.name)}
                style={{ background: selected === c.name ? '#E8F5E9' : '#FFFFFF', border: `2px solid ${selected === c.name ? '#2D6A4F' : '#E8E4DC'}`, borderRadius: 14, padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', position: 'relative' }}>
                <span style={{ fontSize: 30 }}>{c.icon}</span>
                <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 13, color: '#1A2E1A' }}>{c.name}</span>
                {c.issue && <span style={{ fontSize: 9, color: '#E53E3E', fontWeight: 700, fontFamily: 'Outfit' }}>{c.issue}</span>}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <>
            <div style={{ background: '#FFF8E1', borderRadius: 16, padding: '16px', border: '1.5px solid #FFD54F' }}>
              <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#1A2E1A', margin: '0 0 10px' }}>📸 Problem Identification</p>
              <button onClick={() => {}} style={{ width: '100%', background: 'rgba(255,255,255,0.7)', border: '2px dashed #FFD54F', borderRadius: 12, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <span style={{ fontSize: 32 }}>📷</span>
                <span style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 14, color: '#6B7C6B' }}>Upload photo of your {selected}</span>
                <span style={{ fontFamily: 'Nunito', fontSize: 12, color: '#9BA89B' }}>AI will identify disease/pest</span>
              </button>
            </div>

            <div>
              <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, margin: '0 0 12px', color: '#1A2E1A' }}>📍 Nearby Suppliers</p>
              {suppliers.map((s, i) => (
                <div key={i} style={{ background: '#FFFFFF', borderRadius: 14, padding: '14px 16px', marginBottom: 10, border: '1.5px solid #E8E4DC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#1A2E1A' }}>{s.name}</span>
                      {s.verified && <VerifiedBadge />}
                    </div>
                    <p style={{ fontFamily: 'Nunito', fontSize: 12, color: '#6B7C6B', margin: '2px 0' }}>{s.type}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <StarRating rating={s.rating} />
                      <span style={{ fontSize: 12, color: '#6B7C6B' }}>📍 {s.dist}</span>
                    </div>
                  </div>
                  <button style={{ background: '#2D6A4F', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 14px', fontFamily: 'Outfit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Call</button>
                </div>
              ))}
            </div>
          </>
        )}
        {!selected && (
          <div style={{ textAlign: 'center', padding: '30px 20px', color: '#6B7C6B' }}>
            <p style={{ fontSize: 40 }}>☝️</p>
            <p style={{ fontFamily: 'Nunito', fontSize: 14 }}>Select a crop above to see guidance and nearby suppliers</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── PROCESSING ─────────────────────────────────────────────────────────────────
function ProcessingScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [crop, setCrop] = useState('Tomato')
  const pathways = {
    Tomato: [
      { product: 'Tomato Paste / Puree', value: '₹35-45/kg', color: '#FFEBEE', border: '#EF9A9A', icon: '🍅' },
      { product: 'Dried Tomato Flakes', value: '₹120-150/kg', color: '#FFF3E0', border: '#FFCC02', icon: '🌶️' },
      { product: 'Tomato Ketchup', value: '₹60-80/kg', color: '#FCE4EC', border: '#F48FB1', icon: '🫙' },
    ],
    Onion: [
      { product: 'Dehydrated Onion Powder', value: '₹80-100/kg', color: '#FFF8E1', border: '#FFD54F', icon: '🧅' },
      { product: 'Pickled Onion', value: '₹40-60/kg', color: '#F3E5F5', border: '#CE93D8', icon: '🫙' },
    ],
  } as Record<string, { product: string; value: string; color: string; border: string; icon: string }[]>

  const processors = [
    { name: 'Nashik Agro Pvt. Ltd.', capacity: '5-50 tonnes/day', rating: 5, verified: true, dist: '12 km' },
    { name: 'Maharashtra Food Park', capacity: '10-100 tonnes/day', rating: 4, verified: true, dist: '28 km' },
  ]

  const currentPathways = pathways[crop] || pathways['Tomato']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #1565C0 0%, #1976D2 100%)', padding: '20px 20px 28px' }}>
        <BackButton onBack={() => navigate('home')} />
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 26, color: '#FFFFFF', margin: '12px 0 4px' }}>⚙️ Processing & Value Addition</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontFamily: 'Nunito', margin: 0 }}>Turn raw produce into higher-value products</p>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <select value={crop} onChange={e => setCrop(e.target.value)}
          style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: '1.5px solid #DDD9D0', fontFamily: 'Outfit', fontWeight: 600, fontSize: 16, color: '#1A2E1A', background: '#FFFFFF', appearance: 'none' }}>
          <option>Tomato</option><option>Onion</option><option>Wheat</option><option>Grapes</option>
        </select>

        <div>
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, margin: '0 0 12px', color: '#1A2E1A' }}>💎 Processing Pathways</p>
          {currentPathways.map((p, i) => (
            <div key={i} style={{ background: p.color, border: `1.5px solid ${p.border}`, borderRadius: 14, padding: '16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 36 }}>{p.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#1A2E1A', margin: 0 }}>{p.product}</p>
                <p style={{ fontFamily: 'Nunito', fontSize: 13, color: '#6B7C6B', margin: '4px 0 0' }}>Reference value: <strong style={{ color: '#2D6A4F' }}>{p.value}</strong></p>
              </div>
              <button style={{ background: '#2D6A4F', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 14px', fontFamily: 'Outfit', fontWeight: 600, fontSize: 13, cursor: 'pointer', flexShrink: 0 }}>Connect</button>
            </div>
          ))}
        </div>

        <div>
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, margin: '0 0 12px', color: '#1A2E1A' }}>🏭 Nearby Processors</p>
          {processors.map((p, i) => (
            <div key={i} style={{ background: '#FFFFFF', borderRadius: 14, padding: '14px 16px', marginBottom: 10, border: '1.5px solid #E8E4DC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#1A2E1A' }}>{p.name}</span>
                    {p.verified && <VerifiedBadge />}
                  </div>
                  <p style={{ fontFamily: 'Nunito', fontSize: 12, color: '#6B7C6B', margin: '3px 0' }}>Capacity: {p.capacity}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <StarRating rating={p.rating} />
                    <span style={{ fontSize: 12, color: '#6B7C6B' }}>📍 {p.dist}</span>
                  </div>
                </div>
                <button style={{ background: '#1565C0', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 14px', fontFamily: 'Outfit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Request</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── WASTE-TO-VALUE ──────────────────────────────────────────────────────────────
function WasteScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [type, setType] = useState('')
  const [qty, setQty] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const pathways = [
    { title: 'Vermicompost / Compost', value: '₹8-12/kg', icon: '🪱', partners: 3 },
    { title: 'Biogas Production', value: '₹5-8/kg', icon: '⛽', partners: 2 },
    { title: 'Animal Feed (by-products)', value: '₹4-6/kg', icon: '🐄', partners: 5 },
    { title: 'Biomass / Fuel', value: '₹3-5/kg', icon: '🔥', partners: 4 },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #388E3C 100%)', padding: '20px 20px 28px' }}>
        <BackButton onBack={() => navigate('home')} />
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 26, color: '#FFFFFF', margin: '12px 0 4px' }}>♻️ Waste-to-Value</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontFamily: 'Nunito', margin: 0 }}>Turn agricultural waste into income</p>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '18px', border: '1.5px solid #E8E4DC' }}>
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: '#1A2E1A', margin: '0 0 14px' }}>Tell us about your waste</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <select value={type} onChange={e => setType(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #DDD9D0', fontFamily: 'Nunito', fontSize: 15, color: type ? '#1A2E1A' : '#6B7C6B', background: '#F7F4EE', appearance: 'none' }}>
              <option value="">♻️ Select waste type</option>
              <option>Tomato stems & leaves</option><option>Onion peels</option><option>Wheat straw</option><option>Sugarcane bagasse</option><option>Fruit pulp / pomace</option>
            </select>
            <div style={{ display: 'flex', gap: 10 }}>
              <input type="number" placeholder="Quantity (kg)" value={qty} onChange={e => setQty(e.target.value)}
                style={{ flex: 1, padding: '12px 14px', borderRadius: 12, border: '1.5px solid #DDD9D0', fontFamily: 'Nunito', fontSize: 15, background: '#F7F4EE', outline: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'center', background: '#F7F4EE', borderRadius: 12, border: '1.5px solid #DDD9D0', padding: '12px 14px', fontSize: 14, color: '#2D6A4F', fontFamily: 'Outfit', fontWeight: 600, whiteSpace: 'nowrap' }}>📍 Nashik</div>
            </div>
          </div>
        </div>

        <div>
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, margin: '0 0 12px', color: '#1A2E1A' }}>💡 Value Pathways</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {pathways.map((p, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: 14, padding: '16px', border: '1.5px solid #E8E4DC', textAlign: 'center' }}>
                <span style={{ fontSize: 36 }}>{p.icon}</span>
                <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: '#1A2E1A', margin: '8px 0 4px', lineHeight: 1.3 }}>{p.title}</p>
                <p style={{ fontFamily: 'Nunito', fontSize: 12, color: '#2D6A4F', fontWeight: 700, margin: '0 0 4px' }}>{p.value}</p>
                <p style={{ fontFamily: 'Nunito', fontSize: 11, color: '#6B7C6B', margin: 0 }}>{p.partners} partners</p>
              </div>
            ))}
          </div>
        </div>

        {!submitted ? (
          <button className="btn-primary" onClick={() => setSubmitted(true)}>Find Waste-Utilization Partners ♻️</button>
        ) : (
          <div style={{ background: '#E8F5E9', borderRadius: 16, padding: '20px', textAlign: 'center', border: '1.5px solid #81C784' }}>
            <p style={{ fontSize: 36, margin: 0 }}>✅</p>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: '#2D6A4F', margin: '8px 0 4px' }}>3 Partners Found!</p>
            <p style={{ fontFamily: 'Nunito', fontSize: 13, color: '#52B788', margin: 0 }}>They will contact you within 24 hours</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── MARKET ─────────────────────────────────────────────────────────────────────
function MarketScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [filter, setFilter] = useState('All')
  const buyers = [
    { name: 'FreshMart India Pvt. Ltd.', type: 'Retailer', produce: 'Tomato, Onion, Leafy Veg', price: '₹18-22/kg', rating: 5, verified: true, location: 'Nashik', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=60&h=60&fit=crop&auto=format' },
    { name: 'Export House — Al Madina', type: 'Exporter', produce: 'Onion, Pomegranate', price: '₹24-30/kg', rating: 4, verified: true, location: 'Mumbai', img: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?w=60&h=60&fit=crop&auto=format' },
    { name: 'Krishi Mandi APMC', type: 'Market', produce: 'All produce', price: 'Market rate', rating: 4, verified: true, location: 'Nashik APMC', img: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=60&h=60&fit=crop&auto=format' },
    { name: 'Reliance Fresh Sourcing', type: 'Retailer', produce: 'Tomato, Potato', price: '₹16-20/kg', rating: 5, verified: true, location: 'Pan India', img: 'https://images.unsplash.com/photo-1565118531796-763e5082d113?w=60&h=60&fit=crop&auto=format' },
  ]
  const filters = ['All', 'Retailer', 'Exporter', 'Market']
  const filtered = filter === 'All' ? buyers : buyers.filter(b => b.type === filter)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #B45309 0%, #D97706 100%)', padding: '20px 20px 28px' }}>
        <BackButton onBack={() => navigate('home')} />
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 26, color: '#FFFFFF', margin: '12px 0 4px' }}>🤝 Find Buyers</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontFamily: 'Nunito', margin: 0 }}>Connect with verified buyers nationwide</p>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ background: filter === f ? '#D97706' : '#FFFFFF', color: filter === f ? '#FFFFFF' : '#6B7C6B', border: `1.5px solid ${filter === f ? '#D97706' : '#E8E4DC'}`, borderRadius: 20, padding: '8px 18px', fontFamily: 'Outfit', fontWeight: 600, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((b, i) => (
          <div key={i} onClick={() => navigate('market-detail')} className="card-hover"
            style={{ background: '#FFFFFF', borderRadius: 16, padding: '16px', border: '1.5px solid #E8E4DC', cursor: 'pointer', display: 'flex', gap: 14 }}>
            <img src={b.img} alt={b.name} style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#1A2E1A' }}>{b.name}</span>
                    {b.verified && <VerifiedBadge />}
                  </div>
                  <p style={{ fontFamily: 'Nunito', fontSize: 12, color: '#6B7C6B', margin: '2px 0' }}>{b.type} · {b.location}</p>
                  <p style={{ fontFamily: 'Nunito', fontSize: 12, color: '#6B7C6B', margin: '2px 0' }}>{b.produce}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#2D6A4F', margin: 0 }}>{b.price}</p>
                  <StarRating rating={b.rating} />
                </div>
              </div>
              <button onClick={e => { e.stopPropagation(); navigate('market-detail') }}
                style={{ marginTop: 10, background: '#D97706', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 16px', fontFamily: 'Outfit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                Send Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── MARKET DETAIL ───────────────────────────────────────────────────────────────
function MarketDetailScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [sent, setSent] = useState(false)
  const [qty, setQty] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=420&h=180&fit=crop&auto=format" alt="FreshMart India" style={{ width: '100%', height: 160, objectFit: 'cover' }} />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BackButton onBack={() => navigate('market')} />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: '#1A2E1A', margin: 0 }}>FreshMart India Pvt. Ltd.</h2>
            <VerifiedBadge />
          </div>
          <p style={{ fontFamily: 'Nunito', fontSize: 14, color: '#6B7C6B', margin: '4px 0 0' }}>Retailer · Nashik, Maharashtra</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <StarRating rating={5} />
            <span style={{ fontFamily: 'Nunito', fontSize: 13, color: '#6B7C6B' }}>4.9 (312 reviews)</span>
          </div>
        </div>

        <div style={{ background: '#E8F5E9', borderRadius: 14, padding: '14px 16px', border: '1.5px solid #81C784', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[['Tomato', '₹20/kg'], ['Onion', '₹18/kg'], ['Potato', '₹15/kg'], ['Min. quantity', '500 kg']].map(([label, val]) => (
            <div key={label}>
              <p style={{ fontFamily: 'Nunito', fontSize: 12, color: '#6B7C6B', margin: 0 }}>{label}</p>
              <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#2D6A4F', margin: '2px 0 0' }}>{val}</p>
            </div>
          ))}
        </div>

        {!sent ? (
          <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '18px', border: '1.5px solid #E8E4DC' }}>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: '#1A2E1A', margin: '0 0 14px' }}>Send Request</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <select style={{ padding: '12px 14px', borderRadius: 12, border: '1.5px solid #DDD9D0', fontFamily: 'Nunito', fontSize: 15, background: '#F7F4EE', appearance: 'none' }}>
                <option>🍅 Tomato</option><option>🧅 Onion</option>
              </select>
              <input type="number" placeholder="Quantity (kg)" value={qty} onChange={e => setQty(e.target.value)}
                style={{ padding: '12px 14px', borderRadius: 12, border: '1.5px solid #DDD9D0', fontFamily: 'Nunito', fontSize: 15, background: '#F7F4EE', outline: 'none' }} />
              <button className="btn-primary" onClick={() => setSent(true)}>🤝 Send Request</button>
            </div>
          </div>
        ) : (
          <div style={{ background: '#E8F5E9', borderRadius: 16, padding: '20px', textAlign: 'center', border: '1.5px solid #81C784' }}>
            <p style={{ fontSize: 40, margin: 0 }}>✅</p>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 17, color: '#2D6A4F', margin: '8px 0 4px' }}>Request Sent!</p>
            <p style={{ fontFamily: 'Nunito', fontSize: 14, color: '#52B788', margin: '0 0 16px' }}>FreshMart will respond within 4 hours</p>
            <button onClick={() => navigate('tracking')} style={{ background: '#2D6A4F', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', fontFamily: 'Outfit', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Track this Request</button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── TRANSPORT ───────────────────────────────────────────────────────────────────
function TransportScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [booked, setBooked] = useState(false)

  const transporters = [
    { name: 'Ramesh Logistics', vehicle: '10 Tonne Truck · Refrigerated', rating: 5, price: '₹12/km', verified: true, avail: 'Available now' },
    { name: 'Nashik Freight Co.', vehicle: '5 Tonne Mini Truck', rating: 4, price: '₹8/km', verified: true, avail: 'Available 6 AM' },
    { name: 'AgroCargo Express', vehicle: '15 Tonne Truck · Cold Chain', rating: 5, price: '₹15/km', verified: true, avail: 'Available now' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)', padding: '20px 20px 28px' }}>
        <BackButton onBack={() => navigate('home')} />
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 26, color: '#FFFFFF', margin: '12px 0 4px' }}>🚚 Find Transport</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontFamily: 'Nunito', margin: 0 }}>Book reliable transport for your produce</p>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '18px', border: '1.5px solid #E8E4DC', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: '#E8F5E9', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📍</div>
            <input value={from} onChange={e => setFrom(e.target.value)} placeholder="Pickup location"
              style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '1.5px solid #DDD9D0', fontFamily: 'Nunito', fontSize: 15, background: '#F7F4EE', outline: 'none' }} />
          </div>
          <div style={{ width: 2, height: 16, background: '#DDD9D0', marginLeft: 17 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: '#FCE4EC', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏁</div>
            <input value={to} onChange={e => setTo(e.target.value)} placeholder="Destination"
              style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '1.5px solid #DDD9D0', fontFamily: 'Nunito', fontSize: 15, background: '#F7F4EE', outline: 'none' }} />
          </div>
          <select style={{ padding: '12px 14px', borderRadius: 12, border: '1.5px solid #DDD9D0', fontFamily: 'Nunito', fontSize: 15, background: '#F7F4EE', appearance: 'none' }}>
            <option>Produce type — Tomato (500 kg)</option><option>Onion (1000 kg)</option><option>Mixed Vegetables</option>
          </select>
        </div>

        {!booked ? (
          <>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, margin: '4px 0 0', color: '#1A2E1A' }}>🚛 Available Transporters</p>
            {transporters.map((t, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: 14, padding: '16px', border: '1.5px solid #E8E4DC', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 48, background: '#F3E5F5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>🚚</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#1A2E1A' }}>{t.name}</span>
                    {t.verified && <VerifiedBadge />}
                  </div>
                  <p style={{ fontFamily: 'Nunito', fontSize: 12, color: '#6B7C6B', margin: '2px 0' }}>{t.vehicle}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                    <StarRating rating={t.rating} />
                    <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: '#8E24AA' }}>{t.price}</span>
                    <span style={{ fontFamily: 'Nunito', fontSize: 12, color: '#2D6A4F', fontWeight: 600 }}>{t.avail}</span>
                  </div>
                  <button onClick={() => setBooked(true)}
                    style={{ marginTop: 10, background: '#8E24AA', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 20px', fontFamily: 'Outfit', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div style={{ background: '#F3E5F5', borderRadius: 16, padding: '24px 20px', textAlign: 'center', border: '1.5px solid #CE93D8' }}>
            <p style={{ fontSize: 44, margin: 0 }}>🚚</p>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: '#6A1B9A', margin: '10px 0 4px' }}>Transport Booked!</p>
            <p style={{ fontFamily: 'Nunito', fontSize: 14, color: '#8E24AA', margin: '0 0 16px' }}>Ramesh Logistics confirmed · Pickup at 6 AM</p>
            <button onClick={() => navigate('tracking')} style={{ background: '#6A1B9A', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', fontFamily: 'Outfit', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Track Shipment</button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── TRACKING ───────────────────────────────────────────────────────────────────
function TrackingScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const steps = ['Request', 'Accepted', 'Processing', 'Ready', 'Transport', 'Completed']

  const requests = [
    { id: 'REQ-2024-001', title: 'Tomato Processing', partner: 'Nashik Agro Pvt. Ltd.', step: 2, date: 'Sep 22', status: 'active' },
    { id: 'REQ-2024-002', title: 'Onion Buyer Request', partner: 'FreshMart India', step: 1, date: 'Sep 23', status: 'pending' },
    { id: 'REQ-2024-003', title: 'Transport Booking', partner: 'Ramesh Logistics', step: 3, date: 'Sep 20', status: 'active' },
    { id: 'REQ-2024-004', title: 'Expert Guidance', partner: 'Dr. Priya Sharma', step: 5, date: 'Sep 18', status: 'completed' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)', padding: '20px 20px 28px' }}>
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 26, color: '#FFFFFF', margin: '0 0 4px' }}>📊 My Requests</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontFamily: 'Nunito', margin: 0 }}>Track all your active and past requests</p>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {requests.map((req, i) => (
          <div key={i} style={{ background: '#FFFFFF', borderRadius: 16, padding: '18px', border: '1.5px solid #E8E4DC' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#1A2E1A', margin: 0 }}>{req.title}</p>
                <p style={{ fontFamily: 'Nunito', fontSize: 12, color: '#6B7C6B', margin: '2px 0 0' }}>{req.partner} · {req.date}</p>
              </div>
              <span style={{ fontSize: 11, fontFamily: 'Outfit', fontWeight: 700, padding: '4px 10px', borderRadius: 20,
                background: req.status === 'completed' ? '#E8F5E9' : req.status === 'active' ? '#E3F2FD' : '#FFF8E1',
                color: req.status === 'completed' ? '#2D6A4F' : req.status === 'active' ? '#1565C0' : '#B45309' }}>
                {req.status === 'completed' ? '✓ Done' : req.status === 'active' ? '● Active' : '⏳ Pending'}
              </span>
            </div>

            {/* Progress Track */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, overflowX: 'auto' }}>
              {steps.map((step, si) => (
                <div key={si} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700,
                      background: si <= req.step ? '#2D6A4F' : '#E8E4DC',
                      color: si <= req.step ? '#FFFFFF' : '#6B7C6B' }}>
                      {si <= req.step ? '✓' : si + 1}
                    </div>
                    <span style={{ fontFamily: 'Nunito', fontSize: 9, color: si <= req.step ? '#2D6A4F' : '#6B7C6B', fontWeight: si <= req.step ? 700 : 400, textAlign: 'center', width: 42, lineHeight: 1.2 }}>{step}</span>
                  </div>
                  {si < steps.length - 1 && (
                    <div style={{ flex: 1, height: 3, background: si < req.step ? '#2D6A4F' : '#E8E4DC', borderRadius: 2, marginBottom: 18 }} />
                  )}
                </div>
              ))}
            </div>

            <p style={{ fontFamily: 'Nunito', fontSize: 13, color: '#1A2E1A', margin: '12px 0 0', fontWeight: 600 }}>
              {req.step < steps.length - 1 ? `Current: ${steps[req.step]}` : '✅ Completed successfully'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── PROFILE ────────────────────────────────────────────────────────────────────
function ProfileScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const stats = [
    { label: 'Requests', value: '24' },
    { label: 'Saved', value: '₹48K' },
    { label: 'Rating', value: '4.8 ⭐' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)', padding: '28px 20px 56px', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, background: '#F4A261', borderRadius: '50%', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, border: '3px solid rgba(255,255,255,0.3)' }}>👨‍🌾</div>
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 24, color: '#FFFFFF', margin: '0 0 4px' }}>Ramesh Kumar</h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, fontFamily: 'Nunito', margin: '0 0 10px' }}>📍 Nashik, Maharashtra · Since 2020</p>
        <VerifiedBadge />
      </div>

      <div style={{ padding: '0 20px', marginTop: -28 }}>
        <div style={{ background: '#FFFFFF', borderRadius: 18, padding: '18px', border: '1.5px solid #E8E4DC', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center' }}>
          {stats.map(s => (
            <div key={s.label}>
              <p style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 20, color: '#2D6A4F', margin: 0 }}>{s.value}</p>
              <p style={{ fontFamily: 'Nunito', fontSize: 12, color: '#6B7C6B', margin: '2px 0 0' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '18px', border: '1.5px solid #E8E4DC' }}>
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, margin: '0 0 12px', color: '#1A2E1A' }}>🌾 My Farm Details</p>
          {[['Crops Grown', 'Tomato, Onion, Wheat'], ['Land Area', '4.5 Acres'], ['Irrigation', 'Drip + Borewell'], ['Location', 'Nashik, Maharashtra']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F0EDE6' }}>
              <span style={{ fontFamily: 'Nunito', fontSize: 14, color: '#6B7C6B' }}>{k}</span>
              <span style={{ fontFamily: 'Nunito', fontSize: 14, color: '#1A2E1A', fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '18px', border: '1.5px solid #E8E4DC' }}>
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, margin: '0 0 12px', color: '#1A2E1A' }}>⚙️ Settings</p>
          {[
            { icon: '🌐', label: 'Language', val: 'Marathi' },
            { icon: '🔔', label: 'Notifications', val: 'On' },
            { icon: '📶', label: 'Offline Mode', val: 'Enabled' },
            { icon: '💾', label: 'Auto-save Drafts', val: 'On' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? '1px solid #F0EDE6' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ fontFamily: 'Nunito', fontSize: 14, color: '#1A2E1A' }}>{item.label}</span>
              </div>
              <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 14, color: '#2D6A4F' }}>{item.val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFF8E1', borderRadius: 14, padding: '14px 16px', border: '1.5px solid #FFD54F', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>📶</span>
          <div>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#1A2E1A', margin: 0 }}>Low-network mode active</p>
            <p style={{ fontFamily: 'Nunito', fontSize: 12, color: '#6B7C6B', margin: '2px 0 0' }}>Drafts saved. Will sync when connected.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ROOT ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const navigate = (s: Screen) => setScreen(s)

  const showNav = !['splash', 'expert-detail', 'market-detail'].includes(screen)

  return (
    <div style={{ minHeight: '100dvh', background: '#E8E4DC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="screen-container" style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: screen === 'splash' ? 'hidden' : 'auto', display: 'flex', flexDirection: 'column' }}>
          {screen === 'splash' && <SplashScreen navigate={navigate} />}
          {screen === 'home' && <HomeScreen navigate={navigate} />}
          {screen === 'expert' && <ExpertScreen navigate={navigate} />}
          {screen === 'expert-detail' && <ExpertDetailScreen navigate={navigate} />}
          {screen === 'production' && <ProductionScreen navigate={navigate} />}
          {screen === 'processing' && <ProcessingScreen navigate={navigate} />}
          {screen === 'waste' && <WasteScreen navigate={navigate} />}
          {screen === 'market' && <MarketScreen navigate={navigate} />}
          {screen === 'market-detail' && <MarketDetailScreen navigate={navigate} />}
          {screen === 'transport' && <TransportScreen navigate={navigate} />}
          {screen === 'tracking' && <TrackingScreen navigate={navigate} />}
          {screen === 'profile' && <ProfileScreen navigate={navigate} />}
        </div>
        {showNav && <BottomNav current={screen} navigate={navigate} />}
      </div>
    </div>
  )
}

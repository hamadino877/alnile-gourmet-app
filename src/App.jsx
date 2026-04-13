import React, { useState, useMemo } from "react";

// ─── CONFIGURATION & IMAGES ───────────────────────────────────────
const WA_NUMBER = "971554099255";
const ADMIN_PASSWORD = "0123456"; 

const I = [
  "https://i.ibb.co/Zpv9j47X/mixboard-image-26.png","https://i.ibb.co/KxZx2D5V/mixboard-image-27.png","https://i.ibb.co/LdpQ99Tj/mixboard-image-28.png","https://i.ibb.co/jZbg72wS/mixboard-image-29.png","https://i.ibb.co/fVtzhdbD/mixboard-image-31.png","https://i.ibb.co/HTnGqnsP/mixboard-image-32.png","https://i.ibb.co/S4bJvycf/mixboard-image-34.png","https://i.ibb.co/R8QFnVB/mixboard-image-35.png","https://i.ibb.co/d0Km2Y2v/mixboard-image-36.png","https://i.ibb.co/20XxtbCH/mixboard-image-39.png","https://i.ibb.co/TS1SRBZ/mixboard-image-40.png","https://i.ibb.co/CKvjN3hY/mixboard-image-41.png","https://i.ibb.co/FqYPRvbx/mixboard-image-42.png","https://i.ibb.co/CKS23Hhq/mixboard-image-43.png","https://i.ibb.co/32DWrh8/mixboard-image-44.png","https://i.ibb.co/jPLWgdJM/mixboard-image-45.png","https://i.ibb.co/DgSXmv68/mixboard-image-46.png","https://i.ibb.co/rGqCCbBG/mixboard-image-47.png","https://i.ibb.co/mr6hkgFy/mixboard-image-48.png","https://i.ibb.co/C5Y1ks0k/mixboard-image-49.png","https://i.ibb.co/gMSk1PBm/mixboard-image-50.png","https://i.ibb.co/JjjMLZw0/mixboard-image-51.png","https://i.ibb.co/1G1RcmBb/mixboard-image-52.png","https://i.ibb.co/0jMHC6b6/mixboard-image-53.png","https://i.ibb.co/fGpPyF1t/mixboard-image-54.png","https://i.ibb.co/GQW8GWWw/mixboard-image-55.png","https://i.ibb.co/WWh5Y27H/mixboard-image-56.png","https://i.ibb.co/Hp4Zh20r/mixboard-image-57.png","https://i.ibb.co/pjS5PcCD/mixboard-image-58.png","https://i.ibb.co/q35fM5nJ/mixboard-image-59.png","https://i.ibb.co/Y4NV7grw/mixboard-image-60.png","https://i.ibb.co/RkYC0PV4/mixboard-image-61.png","https://i.ibb.co/LhbsQSDB/mixboard-image-62.png","https://i.ibb.co/4ZDGTXgS/mixboard-image-63.png","https://i.ibb.co/fdnvcGqq/mixboard-image-64.png","https://i.ibb.co/7B4HHky/mixboard-image-65.png","https://i.ibb.co/p6JSqmXr/mixboard-image-66.png","https://i.ibb.co/J9kxNLn/mixboard-image-67.png","https://i.ibb.co/6RTCnfPH/mixboard-image-68.png","https://i.ibb.co/wFmcVXmf/mixboard-image-69.png","https://i.ibb.co/GQKt9G9m/mixboard-image-71.png","https://i.ibb.co/ym2LDbWc/mixboard-image-72.png","https://i.ibb.co/fGBddskr/mixboard-image-73.png","https://i.ibb.co/23vry85M/mixboard-image-74.png","https://i.ibb.co/TDfh2Vc2/mixboard-image-75.png","https://i.ibb.co/hFsQZPTb/mixboard-image-76.png","https://i.ibb.co/SXKfdWsx/mixboard-image-77.png","https://i.ibb.co/0pHGfmdS/mixboard-image-78.png","https://i.ibb.co/WWGL1QcG/mixboard-image-79.png"
];

// ─── MASSIVE MENU DATA ────────────────────────────────────────────
const rawButcher = [
  {section:"beef", title:"اللحوم البقري الطازجة", items:[
    {ar:"انتركوت بقري",price:"75 درهم",img:I[0]},{ar:"مكعبات كباب حلة",price:"60 درهم",img:I[1]},{ar:"لحم مفروم ممتاز",price:"60 درهم",img:I[2]},{ar:"موزة بقري",price:"65 درهم",img:I[3]},{ar:"عرق فلتو",price:"80 درهم",img:I[4]},{ar:"كبدة بلدي",price:"58 درهم",img:I[5]}
  ]},
  {section:"lamb", title:"اللحوم الضاني", items:[
    {ar:"فخدة ضاني كاملة",price:"120 درهم",img:I[6]},{ar:"ريش ضاني",price:"85 درهم",img:I[7]},{ar:"موزة ضاني",price:"70 درهم",img:I[8]},{ar:"مفروم ضاني",price:"65 درهم",img:I[9]}
  ]},
  {section:"poultry", title:"طيور طازجة", items:[
    {ar:"دجاج كامل",price:"25 درهم",img:I[10]},{ar:"صدور دجاج (بانيه)",price:"35 درهم",img:I[11]},{ar:"شيش طاووق متبل",price:"40 درهم",img:I[12]},{ar:"بط بلدي مصري",price:"45 درهم",img:I[13]},{ar:"جوز حمام طازج",price:"50 درهم",img:I[14]}
  ]},
  {section:"ready", title:"مصنعات جاهزة للتسوية", items:[
    {ar:"كفتة حاتي (نية)",price:"55 درهم",img:I[15]},{ar:"حواوشي بلدي (ني)",price:"20 درهم",img:I[16]},{ar:"سجق بلدي",price:"50 درهم",img:I[17]},{ar:"برجر النيل",price:"45 درهم",img:I[18]},{ar:"ممبار محشي (ني)",price:"40 درهم",img:I[19]}
  ]}
];

const rawRestaurant = [
  {section:"grills", title:"مشويات النيل على الفحم", items:[
    {ar:"كيلو كباب وكفتة",price:"140 درهم",img:I[20]},{ar:"كيلو كفتة حاتي",price:"110 درهم",img:I[21]},{ar:"ريش ضاني مشوية",price:"130 درهم",img:I[22]},{ar:"دجاجة مشوية",price:"45 درهم",img:I[23]},{ar:"طرب مشوي",price:"120 درهم",img:I[24]}
  ]},
  {section:"tagines", title:"طواجن مصري أصيلة", items:[
    {ar:"طاجن عكاوي بالبصل",price:"65 درهم",img:I[25]},{ar:"طاجن بامية باللحم",price:"55 درهم",img:I[26]},{ar:"طاجن تورلي باللحمة",price:"50 درهم",img:I[27]},{ar:"مكرونة بشاميل",price:"35 درهم",img:I[28]},{ar:"مسقعة باللحم المفروم",price:"40 درهم",img:I[29]}
  ]},
  {section:"mahashi", title:"المحاشي والطلبات الخاصة", items:[
    {ar:"كيلو ممبار محمر",price:"70 درهم",img:I[30]},{ar:"مشكل محاشي",price:"55 درهم",img:I[31]},{ar:"ورق عنب بالكوارع",price:"60 درهم",img:I[32]},{ar:"حمام محشي أرز",price:"65 درهم",img:I[33]}
  ]},
  {section:"fatteh", title:"الفتة والشوربات", items:[
    {ar:"فتة كوارع",price:"50 درهم",img:I[34]},{ar:"فتة موزة ضاني",price:"65 درهم",img:I[35]},{ar:"شوربة كوارع",price:"25 درهم",img:I[36]},{ar:"شوربة لسان عصفور",price:"15 درهم",img:I[37]}
  ]},
  {section:"meals", title:"وجبات التوفير", items:[
    {ar:"وجبة دجاج شواية مع الأرز",price:"35 درهم",img:I[38]},{ar:"وجبة كفتة مع المكرونة",price:"40 درهم",img:I[39]},{ar:"حواوشي مستوي",price:"25 درهم",img:I[40]}
  ]}
];

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────
const parsePrice = (s) => parseFloat(String(s).replace(/[^\d.]/g, "")) || 0;

// ─── MAIN APP COMPONENT ───────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("restaurant");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Admin States
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passInput, setPassInput] = useState("");

  // Filtering Logic
  const currentData = useMemo(() => {
    const source = activeTab === "restaurant" ? rawRestaurant : rawButcher;
    if (!searchTerm) return source; // Return all if search is empty
    return source.map(sec => ({
      ...sec,
      items: sec.items.filter(i => i.ar.includes(searchTerm))
    })).filter(sec => sec.items.length > 0);
  }, [activeTab, searchTerm]);

  const totalAmount = useMemo(() => 
    cart.reduce((sum, i) => sum + parsePrice(i.price), 0), [cart]
  );

  const handleOrder = () => {
    const msg = `طلب جديد من تطبيق النيل جورميه:%0A${cart.map(i => `• ${i.ar} (${i.price})`).join('%0A')}%0A%0Aالإجمالي: ${totalAmount} درهم`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`);
  };

  const loginAdmin = () => {
    if (passInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLogin(false);
    } else {
      alert("كلمة السر غير صحيحة!");
    }
  };

  return (
    <div style={s.shell}>
      {/* Header */}
      <header style={s.header}>
        <div style={s.logoArea}>
          <h1 style={s.goldText}>Al-Nile Gourmet</h1>
          <p style={s.subText}>Butchery & Grill • Dubai</p>
        </div>
        <input 
          style={s.search} 
          placeholder="ابحث عن وجبتك أو طلبك..." 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </header>

      {/* Tabs */}
      <div style={s.tabs}>
        <button style={activeTab === 'restaurant' ? s.tabOn : s.tabOff} onClick={() => setActiveTab('restaurant')}>🍽️ المطعم</button>
        <button style={activeTab === 'butcher' ? s.tabOn : s.tabOff} onClick={() => setActiveTab('butcher')}>🥩 الملحمة</button>
      </div>

      {/* Grid Content */}
      <div style={s.grid}>
        {currentData.length === 0 && (
          <p style={{gridColumn: '1/-1', textAlign: 'center', color: '#888'}}>لا يوجد نتائج بحث متطابقة.</p>
        )}
        {currentData.map((sec, sid) => (
          <React.Fragment key={sid}>
            <h2 style={s.sectionTitle}>{sec.title}</h2>
            {sec.items.map((item, idx) => (
              <div key={idx} style={s.card}>
                <img src={item.img} style={s.img} alt={item.ar} />
                <div style={{padding: '12px'}}>
                  <div style={s.itemName}>{item.ar}</div>
                  <div style={s.itemPrice}>{item.price}</div>
                  <button style={s.addBtn} onClick={() => setCart([...cart, item])}>إضافة للسلة 🛒</button>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <button style={s.floatCart} onClick={() => setIsCartOpen(true)}>
          <span style={s.cartCount}>{cart.length}</span>
          إتمام الطلب - {totalAmount} درهم
        </button>
      )}

      {/* Admin Secret Button */}
      <button style={s.adminToggle} onClick={() => setShowLogin(true)}>الإدارة</button>

      {/* Modals: Cart */}
      {isCartOpen && (
        <div style={s.overlay} onClick={() => setIsCartOpen(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <h2 style={{borderBottom: '1px solid #C9A227', paddingBottom: '10px', marginBottom: '15px'}}>سلة المشتريات</h2>
            <div style={{maxHeight: '250px', overflowY: 'auto'}}>
              {cart.map((item, i) => (
                <div key={i} style={s.cartItem}>
                  <span>{item.ar}</span>
                  <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                    <span style={{color: '#C9A227'}}>{item.price}</span>
                    <button onClick={() => setCart(cart.filter((_, idx) => idx !== i))} style={{color: '#ff4d4d', background:'none', border:'none', fontSize:'16px'}}>✕</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop: '20px'}}>
               <h3 style={{textAlign: 'center', marginBottom: '10px'}}>الإجمالي: {totalAmount} درهم</h3>
               <button style={s.waBtn} onClick={handleOrder}>تأكيد الطلب عبر واتساب ✅</button>
            </div>
          </div>
        </div>
      )}

      {/* Modals: Admin Login */}
      {showLogin && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <h3 style={{marginBottom: '15px', color: '#C9A227', textAlign: 'center'}}>تسجيل دخول المدير</h3>
            <input type="password" style={s.search} placeholder="أدخل كلمة السر (0123456)" onChange={e => setPassInput(e.target.value)} />
            <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
               <button style={s.addBtn} onClick={loginAdmin}>دخول</button>
               <button style={s.cancelBtn} onClick={() => setShowLogin(false)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}

      {/* Modals: Admin Dashboard */}
      {isAdmin && (
        <div style={s.adminPanel}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '15px'}}>
            <h2 style={{color: '#C9A227'}}>لوحة تحكم Al-Nile Gourmet</h2>
            <button onClick={() => setIsAdmin(false)} style={s.cancelBtn}>خروج</button>
          </div>
          <div style={{marginTop: '20px'}}>
             <div style={s.statCard}>
               <p>إجمالي المبالغ في السلة الحالية</p>
               <h3 style={{fontSize: '24px'}}>{totalAmount} درهم</h3>
             </div>
             <p style={{marginTop: '20px', color: '#888'}}>أدوات الإدارة قريباً (تعديل الأسعار وإضافة منتجات سيتم ربطها بـ Firebase في المرحلة القادمة).</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────
const s = {
  shell: { background: '#080808', minHeight: '100vh', color: '#F5F0E8', direction: 'rtl', fontFamily: 'Cairo, sans-serif', paddingBottom: '80px' },
  header: { padding: '20px', textAlign: 'center', background: '#111', borderBottom: '1px solid #222' },
  logoArea: { marginBottom: '15px' },
  goldText: { color: '#C9A227', margin: 0, fontWeight: '900', fontSize: '26px' },
  subText: { fontSize: '11px', color: '#A89F8E', margin: '5px 0 0 0' },
  search: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #333', background: '#1a1a1a', color: '#fff', boxSizing: 'border-box' },
  tabs: { display: 'flex', gap: '10px', padding: '15px' },
  tabOn: { flex: 1, padding: '12px', background: '#C9A227', color: '#000', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 4px 10px rgba(201,162,39,0.3)' },
  tabOff: { flex: 1, padding: '12px', background: '#1a1a1a', color: '#A89F8E', borderRadius: '12px', border: 'none', fontSize: '16px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '15px', padding: '15px' },
  sectionTitle: { gridColumn: '1/-1', color: '#fff', fontSize: '20px', marginTop: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' },
  card: { background: '#141414', borderRadius: '15px', overflow: 'hidden', border: '1px solid #222', transition: 'transform 0.2s' },
  img: { width: '100%', height: '140px', objectFit: 'cover' },
  itemName: { fontSize: '15px', fontWeight: 'bold', marginBottom: '5px' },
  itemPrice: { color: '#C9A227', fontWeight: 'bold', marginBottom: '10px' },
  addBtn: { width: '100%', padding: '10px', background: 'linear-gradient(90deg, #C9A227 0%, #D4AF37 100%)', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
  floatCart: { position: 'fixed', bottom: '20px', left: '20px', right: '20px', padding: '15px', background: '#C9A227', color: '#000', borderRadius: '15px', fontWeight: '900', fontSize: '16px', zIndex: 100, border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  cartCount: { background: '#000', color: '#C9A227', padding: '2px 8px', borderRadius: '50%', marginLeft: '10px', fontSize: '14px' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modal: { background: '#141414', padding: '25px', borderRadius: '20px', width: '90%', maxWidth: '400px', border: '1px solid #C9A227' },
  cartItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px dashed #333' },
  waBtn: { width: '100%', padding: '14px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' },
  cancelBtn: { flex: 1, padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
  adminToggle: { position: 'absolute', top: '15px', left: '15px', opacity: 0.3, fontSize: '10px', color: '#fff', background: 'none', border: 'none', cursor: 'pointer' },
  adminPanel: { position: 'fixed', inset: 0, background: '#080808', zIndex: 2000, padding: '30px', boxSizing: 'border-box' },
  statCard: { background: 'rgba(201,162,39,0.1)', padding: '20px', borderRadius: '15px', border: '1px solid #C9A227', textAlign: 'center', color: '#C9A227' }
};

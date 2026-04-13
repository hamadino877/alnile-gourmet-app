import React, { useState, useMemo, useEffect } from "react";

// ─── CONFIGURATION ────────────────────────────────────────────────
const WA_NUMBER = "971554099255";
const ADMIN_PASSWORD = "0123456"; 
const BRAND_NAME = "Al-Nile Gourmet";

const I = [
  "https://i.ibb.co/Zpv9j47X/mixboard-image-26.png","https://i.ibb.co/KxZx2D5V/mixboard-image-27.png","https://i.ibb.co/LdpQ99Tj/mixboard-image-28.png","https://i.ibb.co/jZbg72wS/mixboard-image-29.png","https://i.ibb.co/fVtzhdbD/mixboard-image-31.png","https://i.ibb.co/HTnGqnsP/mixboard-image-32.png","https://i.ibb.co/S4bJvycf/mixboard-image-34.png","https://i.ibb.co/R8QFnVB/mixboard-image-35.png","https://i.ibb.co/d0Km2Y2v/mixboard-image-36.png","https://i.ibb.co/20XxtbCH/mixboard-image-39.png","https://i.ibb.co/TS1SRBZ/mixboard-image-40.png","https://i.ibb.co/CKvjN3hY/mixboard-image-41.png","https://i.ibb.co/FqYPRvbx/mixboard-image-42.png","https://i.ibb.co/CKS23Hhq/mixboard-image-43.png","https://i.ibb.co/32DWrh8/mixboard-image-44.png","https://i.ibb.co/jPLWgdJM/mixboard-image-45.png","https://i.ibb.co/DgSXmv68/mixboard-image-46.png","https://i.ibb.co/rGqCCbBG/mixboard-image-47.png","https://i.ibb.co/mr6hkgFy/mixboard-image-48.png","https://i.ibb.co/C5Y1ks0k/mixboard-image-49.png","https://i.ibb.co/gMSk1PBm/mixboard-image-50.png","https://i.ibb.co/JjjMLZw0/mixboard-image-51.png","https://i.ibb.co/1G1RcmBb/mixboard-image-52.png","https://i.ibb.co/0jMHC6b6/mixboard-image-53.png","https://i.ibb.co/fGpPyF1t/mixboard-image-54.png","https://i.ibb.co/GQW8GWWw/mixboard-image-55.png","https://i.ibb.co/WWh5Y27H/mixboard-image-56.png","https://i.ibb.co/Hp4Zh20r/mixboard-image-57.png","https://i.ibb.co/pjS5PcCD/mixboard-image-58.png","https://i.ibb.co/q35fM5nJ/mixboard-image-59.png","https://i.ibb.co/Y4NV7grw/mixboard-image-60.png","https://i.ibb.co/RkYC0PV4/mixboard-image-61.png","https://i.ibb.co/LhbsQSDB/mixboard-image-62.png","https://i.ibb.co/4ZDGTXgS/mixboard-image-63.png","https://i.ibb.co/fdnvcGqq/mixboard-image-64.png","https://i.ibb.co/7B4HHky/mixboard-image-65.png","https://i.ibb.co/p6JSqmXr/mixboard-image-66.png","https://i.ibb.co/J9kxNLn/mixboard-image-67.png","https://i.ibb.co/6RTCnfPH/mixboard-image-68.png","https://i.ibb.co/wFmcVXmf/mixboard-image-69.png","https://i.ibb.co/GQKt9G9m/mixboard-image-71.png","https://i.ibb.co/ym2LDbWc/mixboard-image-72.png","https://i.ibb.co/fGBddskr/mixboard-image-73.png","https://i.ibb.co/23vry85M/mixboard-image-74.png","https://i.ibb.co/TDfh2Vc2/mixboard-image-75.png","https://i.ibb.co/hFsQZPTb/mixboard-image-76.png","https://i.ibb.co/SXKfdWsx/mixboard-image-77.png","https://i.ibb.co/0pHGfmdS/mixboard-image-78.png","https://i.ibb.co/WWGL1QcG/mixboard-image-79.png"
];

// ─── DATA HANDLER ─────────────────────────────────────────────────
const parsePrice = (s) => parseFloat(String(s).replace(/[^\d.]/g, "")) || 0;

// ─── APP COMPONENT ────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("restaurant");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Admin States
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passInput, setPassInput] = useState("");

  const addToCart = (item) => setCart([...cart, item]);
  const removeFromCart = (idx) => setCart(cart.filter((_, i) => i !== idx));

  const totalAmount = useMemo(() => 
    cart.reduce((sum, i) => sum + parsePrice(i.price), 0), [cart]
  );

  const sendOrder = () => {
    const list = cart.map(i => `• ${i.ar} (${i.price})`).join('%0A');
    const msg = `طلب جديد من التطبيق:%0A${list}%0A%0Aالإجمالي: ${totalAmount} درهم`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`);
  };

  const loginAdmin = () => {
    if (passInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLogin(false);
    } else {
      alert("كلمة السر غير صحيحة");
    }
  };

  return (
    <div style={styles.shell}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logoArea}>
          <h1 style={styles.gText}>{BRAND_NAME}</h1>
          <p style={{fontSize: '11px', color: '#A89F8E'}}>Butchery & Grill • Dubai</p>
        </div>
        <input 
          style={styles.search} 
          placeholder="ابحث عن وجبتك المفضلة..." 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      {/* Main Tabs */}
      <div style={styles.tabs}>
        <button 
          style={activeTab === 'restaurant' ? styles.tabOn : styles.tabOff} 
          onClick={() => setActiveTab('restaurant')}
        >🍽️ المطعم</button>
        <button 
          style={activeTab === 'butcher' ? styles.tabOn : styles.tabOff} 
          onClick={() => setActiveTab('butcher')}
        >🥩 الملحمة</button>
      </div>

      {/* Admin Panel Button (Secret) */}
      <div style={{textAlign: 'center', padding: '10px'}}>
        {!isAdmin ? (
          <button style={styles.adminLink} onClick={() => setShowLogin(true)}>دخول الإدارة</button>
        ) : (
          <div style={styles.adminBadge}>وضع المدير نشط ✅</div>
        )}
      </div>

      {/* Grid Content */}
      <main style={styles.grid}>
        {/* سيتم هنا عرض العناصر بناءً على الفلترة والتبويب */}
        <p style={{gridColumn: 'span 2', textAlign: 'center', color: '#555', fontSize: '12px'}}>
          سيتم عرض المنتجات هنا بناءً على التبويب النشط: {activeTab === 'restaurant' ? 'قائمة المطعم' : 'قائمة الملحمة'}
        </p>
      </main>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <button style={styles.floatBtn} onClick={() => setIsCartOpen(true)}>
          <span style={styles.cartCount}>{cart.length}</span>
          🛒 عرض السلة
        </button>
      )}

      {/* MODAL: Login */}
      {showLogin && (
        <div style={styles.modal}>
          <div style={styles.loginBox}>
            <h3 style={{marginBottom: '15px'}}>لوحة التحكم</h3>
            <input 
              type="password" 
              style={styles.search} 
              placeholder="أدخل كلمة السر" 
              onChange={(e) => setPassInput(e.target.value)}
            />
            <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
              <button style={styles.btnGold} onClick={loginAdmin}>دخول</button>
              <button style={styles.btnSec} onClick={() => setShowLogin(false)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Cart Drawer */}
      {isCartOpen && (
        <div style={styles.modal} onClick={() => setIsCartOpen(false)}>
          <div style={styles.drawer} onClick={e => e.stopPropagation()}>
            <h2 style={{borderBottom: '1px solid #C9A227', paddingBottom: '10px'}}>سلتك</h2>
            <div style={{maxHeight: '300px', overflowY: 'auto'}}>
              {cart.map((item, idx) => (
                <div key={idx} style={styles.cartItem}>
                  <span>{item.ar}</span>
                  <button onClick={() => removeFromCart(idx)} style={{color: 'red'}}>✕</button>
                </div>
              ))}
            </div>
            <div style={{marginTop: '20px'}}>
              <h3>الإجمالي: {totalAmount} درهم</h3>
              <button style={styles.btnWa} onClick={sendOrder}>تأكيد عبر واتساب</button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Operations Display */}
      {isAdmin && (
        <div style={styles.adminFull}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
             <h2>لوحة المدير</h2>
             <button onClick={() => setIsAdmin(false)}>خروج</button>
          </div>
          <div style={styles.adminCard}>
            <p>إجمالي المبيعات المحتملة بالسلة: {totalAmount} درهم</p>
            <button style={styles.btnGold}>تحديث الأسعار</button>
            <button style={styles.btnGold}>إضافة خصم 10%</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────
const styles = {
  shell: { backgroundColor: '#080808', minHeight: '100vh', color: '#F5F0E8', fontFamily: 'Cairo, sans-serif', direction: 'rtl' },
  header: { padding: '20px', background: '#111', borderBottom: '1px solid #222', textAlign: 'center' },
  gText: { color: '#C9A227', fontWeight: '900' },
  search: { width: '90%', padding: '12px', borderRadius: '10px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff', marginTop: '10px' },
  tabs: { display: 'flex', padding: '15px', gap: '10px' },
  tabOn: { flex: 1, padding: '12px', background: '#C9A227', color: '#000', fontWeight: 'bold', borderRadius: '12px' },
  tabOff: { flex: 1, padding: '12px', background: '#1a1a1a', color: '#A89F8E', borderRadius: '12px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '15px' },
  floatBtn: { position: 'fixed', bottom: '20px', left: '20px', right: '20px', padding: '15px', background: '#C9A227', color: '#000', borderRadius: '15px', fontWeight: '900', fontSize: '18px', zIndex: 100 },
  cartCount: { background: '#000', color: '#fff', padding: '2px 8px', borderRadius: '50%', marginLeft: '10px' },
  modal: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  loginBox: { background: '#141414', padding: '30px', borderRadius: '20px', border: '1px solid #C9A227', width: '80%', maxWidth: '350px' },
  drawer: { position: 'absolute', bottom: 0, left: 0, right: 0, background: '#141414', padding: '25px', borderTopLeftRadius: '25px', borderTopRightRadius: '25px' },
  cartItem: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #222' },
  btnGold: { flex: 1, padding: '10px', background: '#C9A227', color: '#000', borderRadius: '8px', fontWeight: 'bold' },
  btnSec: { flex: 1, padding: '10px', background: '#333', color: '#fff', borderRadius: '8px' },
  btnWa: { width: '100%', padding: '15px', background: '#25D366', color: '#fff', borderRadius: '12px', marginTop: '15px', fontSize: '17px', fontWeight: 'bold' },
  adminLink: { fontSize: '10px', color: '#333', border: 'none', background: 'none' },
  adminBadge: { fontSize: '12px', color: '#C9A227', padding: '5px', background: 'rgba(201,162,39,0.1)', borderRadius: '5px' },
  adminFull: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#080808', zIndex: 2000, padding: '20px' },
  adminCard: { background: '#141414', padding: '20px', borderRadius: '15px', marginTop: '20px', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '10px' }
};

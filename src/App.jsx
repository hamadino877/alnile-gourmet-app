import { useState, useMemo, useEffect, useRef } from "react";

// ─── WHATSAPP CONFIG ──────────────────────────────────────────────
const WA_NUMBER = "971554099255";
const PHONE_NUMBER = "0554099255";
const ADMIN_PASSWORD = "0123456"; // ← غيّر كلمة السر هنا
const ADDRESS = "دبي، البرشاء جنوب الثالثة، أرجان، بناية روز بالاس، محل رقم 15";
const SOCIAL = {
  facebook: "https://www.facebook.com/alnilegourmet/",
  instagram: "https://www.instagram.com/al_nile_gourmet",
  tiktok: "https://www.tiktok.com/@nile.gourmet",
  talabat: "https://www.talabat.com/uae/restaurant/731697/alnil-gourmet-al-barsha-south?aid=6822",
  deliveroo: "https://deliveroo.ae/menu/dubai/south-barsha-arjan/al-nile-gourmet",
  noon: "https://food.noon.com/uae-ar/outlet/LNLGRMZMHT/",
};

// ─── IMAGE ARRAYS ─────────────────────────────────────────────────
const I = [
  "https://i.ibb.co/Zpv9j47X/mixboard-image-26.png","https://i.ibb.co/KxZx2D5V/mixboard-image-27.png","https://i.ibb.co/LdpQ99Tj/mixboard-image-28.png","https://i.ibb.co/jZbg72wS/mixboard-image-29.png","https://i.ibb.co/fVtzhdbD/mixboard-image-31.png","https://i.ibb.co/HTnGqnsP/mixboard-image-32.png","https://i.ibb.co/S4bJvycf/mixboard-image-34.png","https://i.ibb.co/R8QFnVB/mixboard-image-35.png","https://i.ibb.co/d0Km2Y2v/mixboard-image-36.png","https://i.ibb.co/20XxtbCH/mixboard-image-39.png","https://i.ibb.co/TS1SRBZ/mixboard-image-40.png","https://i.ibb.co/CKvjN3hY/mixboard-image-41.png","https://i.ibb.co/FqYPRvbx/mixboard-image-42.png","https://i.ibb.co/CKS23Hhq/mixboard-image-43.png","https://i.ibb.co/32DWrh8/mixboard-image-44.png","https://i.ibb.co/jPLWgdJM/mixboard-image-45.png","https://i.ibb.co/DgSXmv68/mixboard-image-46.png","https://i.ibb.co/rGqCCbBG/mixboard-image-47.png","https://i.ibb.co/mr6hkgFy/mixboard-image-48.png","https://i.ibb.co/C5Y1ks0k/mixboard-image-49.png","https://i.ibb.co/gMSk1PBm/mixboard-image-50.png","https://i.ibb.co/JjjMLZw0/mixboard-image-51.png","https://i.ibb.co/1G1RcmBb/mixboard-image-52.png","https://i.ibb.co/0jMHC6b6/mixboard-image-53.png","https://i.ibb.co/fGpPyF1t/mixboard-image-54.png","https://i.ibb.co/GQW8GWWw/mixboard-image-55.png","https://i.ibb.co/WWh5Y27H/mixboard-image-56.png","https://i.ibb.co/Hp4Zh20r/mixboard-image-57.png","https://i.ibb.co/pjS5PcCD/mixboard-image-58.png","https://i.ibb.co/q35fM5nJ/mixboard-image-59.png","https://i.ibb.co/Y4NV7grw/mixboard-image-60.png","https://i.ibb.co/RkYC0PV4/mixboard-image-61.png","https://i.ibb.co/LhbsQSDB/mixboard-image-62.png","https://i.ibb.co/4ZDGTXgS/mixboard-image-63.png","https://i.ibb.co/fdnvcGqq/mixboard-image-64.png","https://i.ibb.co/7B4HHky/mixboard-image-65.png","https://i.ibb.co/p6JSqmXr/mixboard-image-66.png","https://i.ibb.co/J9kxNLn/mixboard-image-67.png","https://i.ibb.co/6RTCnfPH/mixboard-image-68.png","https://i.ibb.co/wFmcVXmf/mixboard-image-69.png","https://i.ibb.co/GQKt9G9m/mixboard-image-71.png","https://i.ibb.co/ym2LDbWc/mixboard-image-72.png","https://i.ibb.co/fGBddskr/mixboard-image-73.png","https://i.ibb.co/23vry85M/mixboard-image-74.png","https://i.ibb.co/TDfh2Vc2/mixboard-image-75.png","https://i.ibb.co/hFsQZPTb/mixboard-image-76.png","https://i.ibb.co/SXKfdWsx/mixboard-image-77.png","https://i.ibb.co/0pHGfmdS/mixboard-image-78.png","https://i.ibb.co/WWGL1QcG/mixboard-image-79.png"
];

// Fallback image for broken links
const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%231E1E1E'/%3E%3Ctext x='100' y='110' font-size='50' text-anchor='middle' fill='%23C9A227'%3E🍖%3C/text%3E%3C/svg%3E";

const parsePrice = (s) => parseFloat(String(s).replace(/[^\d.]/g, "")) || 0;

// ─── RAW DATA ─────────────────────────────────────────────────────
const rawButcher = [
  {section:"beef",title:"اللحوم البقري",titleEn:"Beef",items:[
    {ar:"انتركوت",en:"Entrecôte",price:"75 درهم",img:I[0]},{ar:"مكعبات لحم",en:"Beef Cubes",price:"60 درهم",img:I[1]},{ar:"لحم مفروم",en:"Minced Meat",price:"60 درهم",img:I[2]},{ar:"روستو",en:"Roast Beef",price:"60 درهم",img:I[3]},{ar:"بيكاتا",en:"Piccata",price:"60 درهم",img:I[4]},{ar:"بوفتيك",en:"Buftek",price:"60 درهم",img:I[5]},{ar:"بيف استروجانوف",en:"Beef Stroganoff",price:"60 درهم",img:I[6]},{ar:"شاورما اللحم",en:"Meat Shawarma",price:"60 درهم",img:I[7]},{ar:"فيليه أستيك",en:"Steak Fillet",price:"115 درهم",img:I[8]},{ar:"كبدة بقري",en:"Sliced Liver",price:"58 درهم",img:I[9]},{ar:"ريش بتلو",en:"Beef Chops",price:"80 درهم",img:I[10]},{ar:"ريب آي",en:"Ribeye",price:"75 درهم",img:I[11]},{ar:"موزة بقري بدون عظم",en:"Beef Shank boneless",price:"60 درهم",img:I[12]},{ar:"موزة بقري بالعظم",en:"Beef Shank with bone",price:"58 درهم",img:I[13]},{ar:"كبدة إسكندراني",en:"Alexandrian Liver",price:"58 درهم",img:I[14]},{ar:"رقبة بتلو",en:"Neck Beef",price:"58 درهم",img:I[15]},{ar:"عكاوي",en:"Oxtail",price:"42 درهم",img:I[16]},{ar:"كوارع",en:"Trotters",price:"35 درهم",img:I[17]},
  ]},
  {section:"naimi",title:"لحوم ضاني نعيمي",titleEn:"Naimi Lamb",items:[
    {ar:"موزة ضاني نعيمي",en:"Naimi Lamb Shank",price:"69 درهم",img:I[18]},{ar:"كتف ضاني نعيمي",en:"Naimi Lamb Shoulder",price:"68 درهم",img:I[19]},{ar:"ريش ضاني نعيمي",en:"Naimi Lamb Chops",price:"115 درهم",img:I[20]},{ar:"خروف نعيمي بدون عظم",en:"Naimi Lamb boneless",price:"79 درهم",img:I[21]},{ar:"فخذة ضاني نعيمي",en:"Naimi Lamb Leg",price:"68 درهم",img:I[22]},{ar:"رقبة ضاني نعيمي",en:"Naimi Lamb Neck",price:"68 درهم",img:I[23]},
  ]},
  {section:"aus",title:"لحوم ضاني أسترالي",titleEn:"Australian Lamb",items:[
    {ar:"رقبة ضاني أسترالي",en:"Aus. Lamb Neck",price:"58 درهم",img:I[24]},{ar:"فخذة ضاني أسترالي",en:"Aus. Lamb Leg",price:"58 درهم",img:I[25]},{ar:"كتف ضاني أسترالي",en:"Aus. Lamb Shoulder",price:"58 درهم",img:I[26]},{ar:"لحم أسترالي بدون عظم",en:"Aus. Lamb boneless",price:"70 درهم",img:I[27]},{ar:"ريش ضاني أسترالي",en:"Aus. Lamb Chops",price:"115 درهم",img:I[28]},{ar:"موزة ضاني أسترالي",en:"Aus. Lamb Shank",price:"60 درهم",img:I[29]},
  ]},
  {section:"chicken",title:"دجاج وطيور",titleEn:"Poultry",items:[
    {ar:"أفخاذ بالعظم",en:"Chicken Thighs",price:"38 درهم",img:I[30]},{ar:"دجاج مكعبات",en:"Chicken Cubes",price:"45 درهم",img:I[31]},{ar:"صدور دجاج أستيك",en:"Chicken Steak",price:"45 درهم",img:I[32]},{ar:"صدور دجاج مخلية",en:"Chicken Breast",price:"45 درهم",img:I[33]},{ar:"دجاجة كاملة",en:"Full Chicken",price:"25 درهم",img:I[34]},{ar:"جوز حمام مصري",en:"Egyptian Pigeons",price:"50 درهم",img:I[35]},{ar:"دجاج بلدي مصري",en:"Egyptian Chicken",price:"45 درهم",img:I[36]},{ar:"بط بلدي مصري",en:"Egyptian Duck",price:"45 درهم",img:I[37]},{ar:"أرنب بلدي مصري",en:"Egyptian Rabbit",price:"46 درهم",img:I[38]},{ar:"ديك رومي أمريكي",en:"American Turkey",price:"39 درهم",img:I[39]},{ar:"ديك رومي مصري",en:"Egyptian Turkey",price:"47 درهم",img:I[40]},
  ]},
  {section:"grill-ready",title:"جاهز للشواء",titleEn:"Ready-to-Grill",items:[
    {ar:"ستيك فيليه متبل",en:"Marinated Steak Fillet",price:"115 درهم",img:I[41]},{ar:"سجق متبل",en:"Marinated Sausages",price:"58 درهم",img:I[42]},{ar:"كبدة شرايح متبلة",en:"Marinated Liver",price:"60 درهم",img:I[43]},{ar:"طرب متبل",en:"Marinated Tarb",price:"60 درهم",img:I[44]},{ar:"ريش متبلة",en:"Marinated Lamb Chops",price:"115 درهم",img:I[45]},{ar:"كفتة متبلة",en:"Marinated Kofta",price:"58 درهم",img:I[46]},{ar:"كباب متبل",en:"Marinated Kabab",price:"100 درهم",img:I[47]},{ar:"ريب آي متبل",en:"Marinated Ribeye",price:"78 درهم",img:I[48]},{ar:"شيش طاووق متبل",en:"Marinated Shish Taoug",price:"45 درهم",img:I[0]},{ar:"رغيف حواوشي بلدي",en:"Hawawshi Meat",price:"13 درهم",img:I[1]},{ar:"برجر فراخ",en:"Chicken Burger",price:"45 درهم",img:I[2]},{ar:"برجر واجيو",en:"Wagyu Burger",price:"80 درهم",img:I[3]},{ar:"دجاج كامل متبل",en:"Marinated Whole Chicken",price:"45 درهم",img:I[4]},{ar:"ستيك دجاج متبل",en:"Marinated Chicken Steak",price:"45 درهم",img:I[5]},{ar:"أفخاذ دجاج متبلة",en:"Marinated Chicken Thighs",price:"50 درهم",img:I[6]},{ar:"شيش طاووق أفخاذ",en:"Shish Tawook Thighs",price:"50 درهم",img:I[7]},
  ]},
  {section:"fry-ready",title:"جاهز على التحمير",titleEn:"Ready-to-Fry",items:[
    {ar:"كفتة فراخ بانيه",en:"Chicken Kofta Pane",price:"50 درهم",img:I[8]},{ar:"كفتة لحمة بانيه",en:"Meat Kofta Pane",price:"50 درهم",img:I[9]},{ar:"اسكالوب فراخ",en:"Chicken Escalope",price:"45 درهم",img:I[10]},{ar:"اسكالوب لحمة",en:"Meat Escalope",price:"60 درهم",img:I[11]},{ar:"فرخة محشية رز",en:"Chicken Stuffed Rice",price:"35 درهم",img:I[12]},{ar:"جوز حمام بالفريك",en:"Pigeon Freekeh",price:"75 درهم",img:I[13]},{ar:"جوز حمام بالأرز",en:"Pigeon Rice",price:"73 درهم",img:I[14]},{ar:"كفتة رز",en:"Rice Kofta",price:"48 درهم",img:I[15]},{ar:"شاورما لحم",en:"Beef Shawarma",price:"62 درهم",img:I[16]},{ar:"شاورما دجاج",en:"Chicken Shawarma",price:"45 درهم",img:I[17]},{ar:"كبدة إسكندراني",en:"Alexandrian Liver",price:"60 درهم",img:I[18]},{ar:"كبدة بالردة",en:"Breaded Liver",price:"60 درهم",img:I[19]},{ar:"ممبار",en:"Mumbar",price:"60 درهم",img:I[20]},
  ]},
];

const rawRestaurant = [
  {section:"soups",title:"الشوربة",titleEn:"Soups",items:[
    {ar:"شوربة عدس",en:"Lentil Soup",price:"15 درهم",img:I[64]},{ar:"شوربة لسان عصفور",en:"Orzo Soup",price:"15 درهم",img:I[65]},{ar:"شوربة كوارع",en:"Trotters Soup",price:"25 درهم",img:I[63]},
  ]},
  {section:"salads",title:"السلطات والمقبلات",titleEn:"Salads",items:[
    {ar:"سلطة بلدي",en:"Baladi Salad",price:"15 درهم",img:I[58]},{ar:"حمص",en:"Hummus",price:"20 درهم",img:I[62]},{ar:"بابا غنوج",en:"Baba Ghanoush",price:"20 درهم",img:I[62]},{ar:"طحينة",en:"Tahini",price:"18 درهم",img:I[60]},{ar:"تومية",en:"Toum",price:"18 درهم",img:I[59]},
  ]},
  {section:"hot",title:"مقبلات ساخنة",titleEn:"Hot Appetizers",items:[
    {ar:"كبدة إسكندراني",en:"Alexandrian Liver",price:"31.99 درهم",img:I[51]},{ar:"سجق إسكندراني",en:"Alexandrian Sausage",price:"31.99 درهم",img:I[53]},{ar:"فراخ محمرة ١/٤",en:"Fried Chicken 1/4",price:"15 درهم",img:I[52]},{ar:"بطاطس مقلية",en:"French Fries",price:"15 درهم",img:I[50]},
  ]},
  {section:"mahashi",title:"المحاشي",titleEn:"Mahashi",items:[
    {ar:"ورق عنب",en:"Grape Leaves",price:"30 درهم",img:I[33]},{ar:"ممبار",en:"Mombar",price:"40 درهم",img:I[54]},{ar:"محشي كرنب",en:"Stuffed Cabbage",price:"30 درهم",img:I[56]},{ar:"محاشي مشكلة",en:"Mixed Mahashi",price:"40 درهم",img:I[55]},{ar:"محاشي مشكلة ١ كيلو",en:"Mixed Mahashi 1KG",price:"70 درهم",img:I[55]},
  ]},
  {section:"nile",title:"أطباق النيل المميزة",titleEn:"Nile Specialties",items:[
    {ar:"مكرونة بشاميل",en:"Béchamel Pasta",price:"35 درهم",img:I[35]},{ar:"معكرونة بالسجق الشرقي",en:"Pasta Oriental Sausage",price:"35 درهم",img:I[49]},{ar:"رقاق باللحم المفروم",en:"Minced Meat Ragaq",price:"30 درهم",img:I[29]},{ar:"إسكالوب دجاج",en:"Chicken Escalope",price:"35 درهم",img:I[43]},{ar:"فتة بمكعبات لحم بقري",en:"Fattah Beef Cubes",price:"55 درهم",img:I[27]},{ar:"فتة موزة ضاني",en:"Fattah Lamb Shank",price:"60 درهم",img:I[42]},{ar:"فتة مع كوارع",en:"Fattah Trotters",price:"55 درهم",img:I[41]},{ar:"دجاجة كاملة محشوة",en:"Whole Stuffed Chicken",price:"50 درهم",img:I[4]},{ar:"حمام محشو بالأرز (حبة)",en:"Stuffed Pigeon Rice (1pc)",price:"55 درهم",img:I[28]},{ar:"حمام محشو بالأرز (حبتان)",en:"Stuffed Pigeon Rice (2pc)",price:"105 درهم",img:I[28]},{ar:"حمام محشو بالفريك (حبة)",en:"Pigeon Freek (1pc)",price:"55 درهم",img:I[28]},{ar:"حمام محشو بالفريك (حبتان)",en:"Pigeon Freek (2pc)",price:"110 درهم",img:I[28]},{ar:"نصف بطة مع محاشي",en:"Half Duck with Mahashi",price:"110 درهم",img:I[32]},{ar:"نصف بطة مشوية بالفرن",en:"Half Roasted Duck",price:"100 درهم",img:I[32]},{ar:"كتف ضأني بالفرن",en:"Baked Lamb Shoulder",price:"200 درهم",img:I[39]},
  ]},
  {section:"grills",title:"المشويات",titleEn:"Grills",items:[
    {ar:"كباب",en:"Kebab",price:"59 درهم",img:I[74],variants:[{l:"نص كيلو",v:"87.5 درهم"},{l:"كيلو",v:"175 درهم"}]},{ar:"كفتة",en:"Kofta",price:"55 درهم",img:I[68],variants:[{l:"نص كيلو",v:"80 درهم"},{l:"كيلو",v:"160 درهم"}]},{ar:"ريش ضاني مشوية",en:"Grilled Lamb Chops",price:"60 درهم",img:I[79],variants:[{l:"نص كيلو",v:"92.5 درهم"},{l:"كيلو",v:"185 درهم"}]},{ar:"طرب",en:"Tarab",price:"55 درهم",img:I[67],variants:[{l:"نص كيلو",v:"82.5 درهم"},{l:"كيلو",v:"165 درهم"}]},{ar:"شيش طاووق",en:"Shish Tawook",price:"50 درهم",img:I[78],variants:[{l:"نص كيلو",v:"62.5 درهم"},{l:"كيلو",v:"125 درهم"}]},{ar:"مشاوي مشكلة النيل",en:"Nile Mixed Grills",price:"59 درهم",img:I[79],variants:[{l:"نص كيلو",v:"87.5 درهم"},{l:"كيلو",v:"175 درهم"}]},{ar:"مشاوي مشكلة لحوم",en:"Mixed Meat Grills",price:"60 درهم",img:I[76],variants:[{l:"نص كيلو",v:"90 درهم"},{l:"كيلو",v:"180 درهم"}]},{ar:"كبدة مشوية",en:"Grilled Liver",price:"40 درهم",img:I[73]},{ar:"سجق مشوي",en:"Grilled Sausage",price:"45 درهم",img:I[71]},{ar:"حواوشي",en:"Hawawshi",price:"22 درهم",img:I[75]},{ar:"صدور دجاج مشوية",en:"Grilled Chicken Breast",price:"40 درهم",img:I[72]},{ar:"موزة مشوية",en:"Grilled Lamb Shank",price:"60 درهم",img:I[42]},{ar:"نص فرخة مشوية",en:"Half Grilled Chicken",price:"35 درهم",img:I[69]},
  ]},
  {section:"tageen",title:"طواجن وخضار",titleEn:"Tagens",items:[
    {ar:"ملوخية سادة",en:"Plain Molokhia",price:"38 درهم",img:I[17]},{ar:"ملوخية مع دجاج مقلي",en:"Molokhia Fried Chicken",price:"49 درهم",img:I[18]},{ar:"ملوخية مع مكعبات لحم",en:"Molokhia Fried Meat",price:"54 درهم",img:I[19]},{ar:"طاجن مسقعة باللحم المفروم",en:"Moussaka Minced Meat",price:"40 درهم",img:I[20]},{ar:"طاجن مسقعة بالبشاميل",en:"Moussaka Béchamel",price:"45 درهم",img:I[21]},{ar:"طاجن بطاطس سادة",en:"Plain Potato Tagen",price:"35 درهم",img:I[22]},{ar:"طاجن بطاطس بالدجاج",en:"Potato Tagen Chicken",price:"45 درهم",img:I[23]},{ar:"طاجن بطاطس باللحم",en:"Potato Tagen Meat",price:"45 درهم",img:I[24]},{ar:"ورقة لحمة",en:"War'et Lahma",price:"50 درهم",img:I[25]},{ar:"طاجن بامية سادة",en:"Plain Okra Tagen",price:"35 درهم",img:I[26]},{ar:"طاجن بامية باللحم",en:"Okra Tagen Meat",price:"45 درهم",img:I[27]},{ar:"طاجن لحم بالبصل",en:"Meat Tagen Onion",price:"45 درهم",img:I[28]},{ar:"عكاوي بالبصل",en:"Akawi Onion",price:"46 درهم",img:I[29]},{ar:"أرز معمر سادة",en:"Plain Maamar Rice",price:"30 درهم",img:I[30]},{ar:"أرز معمر باللحم",en:"Maamar Rice Meat",price:"50 درهم",img:I[31]},{ar:"أرز معمر بالحمام",en:"Maamar Rice Pigeon",price:"70 درهم",img:I[32]},{ar:"ورق عنب بالكوارع",en:"Grape Leaves Trotters",price:"50 درهم",img:I[33]},{ar:"طاجن موزة بالبطاطس",en:"Lamb Shank Tagen",price:"65 درهم",img:I[34]},
  ]},
  {section:"feteer",title:"الفطير المصري",titleEn:"Egyptian Feteer",items:[
    {ar:"فطيرة مشلتت سادة",en:"Plain Feteer Meshaltet",price:"69 درهم",img:I[35]},{ar:"فطيرة مكس جبن",en:"Mixed Cheese Feteer",price:"49 درهم",img:I[36]},{ar:"فطيرة مكس لحوم",en:"Mixed Meat Feteer",price:"59 درهم",img:I[37]},{ar:"فطيرة خضار مشكلة",en:"Mixed Vegetable Feteer",price:"49 درهم",img:I[38]},{ar:"فطيرة حلو النيل",en:"Nile Sweet Feteer",price:"55 درهم",img:I[39]},
  ]},
  {section:"sides",title:"أطباق جانبية",titleEn:"Sides",items:[
    {ar:"أرز بالشعيرية",en:"Vermicelli Rice",price:"15 درهم",img:I[40]},{ar:"أرز أبيض",en:"White Rice",price:"15 درهم",img:I[41]},{ar:"رز بالخلطة",en:"Mixed Rice",price:"18 درهم",img:I[42]},
  ]},
];

// Customer reviews
const REVIEWS = [
  { name: "أحمد محمد", rating: 5, text: "أفضل لحمة في دبي! الجودة ممتازة والتوصيل سريع. ما شاء الله على المكان.", date: "قبل يومين", avatar: "أ" },
  { name: "سارة الأنصاري", rating: 5, text: "الأكل زي بيتنا في مصر 😭❤️ المشاوي رائعة وحجم الطبق كبير بالسعر ده.", date: "قبل أسبوع", avatar: "س" },
  { name: "محمد خالد", rating: 5, text: "الملحمة ممتازة، اللحمة طازة والتقطيع احترافي. هنطلب تاني إن شاء الله", date: "قبل أسبوعين", avatar: "م" },
  { name: "نور الدين", rating: 4, text: "المطعم جميل والطعام لذيذ. الخدمة سريعة. أنصح بالفتة والمشاوي!", date: "قبل شهر", avatar: "ن" },
  { name: "ريم العلي", rating: 5, text: "طلبت حمام محشي وكان خرافي! أفضل حاجة أكلتها في دبي من بعيد 🔥", date: "قبل شهر", avatar: "ر" },
];

function buildData(raw, type) {
  const cats = [], items = [];
  raw.forEach(sec => {
    const cid = `${type}_${sec.section}`;
    cats.push({ id: cid, name: sec.title, nameEn: sec.titleEn, type });
    sec.items.forEach((item, idx) => {
      items.push({ id: `${cid}_${idx}`, cid, name: item.ar, nameEn: item.en, price: parsePrice(item.price), priceStr: item.price, img: item.img, variants: item.variants || null, type });
    });
  });
  return { cats, items };
}

const butcherBase = buildData(rawButcher, "butcher");
const restaurantBase = buildData(rawRestaurant, "restaurant");
const BASE_ITEMS = [...butcherBase.items, ...restaurantBase.items];
const ALL_CATS = [...butcherBase.cats, ...restaurantBase.cats];

// ─── ICONS ───────────────────────────────────────────────────────
const IconCart = ({ size }) => <svg width={size||22} height={size||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
const IconHome = ({ size }) => <svg width={size||22} height={size||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconOrders = ({ size }) => <svg width={size||22} height={size||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const IconUser = ({ size }) => <svg width={size||22} height={size||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconSearch = ({ size }) => <svg width={size||18} height={size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const IconPlus = ({ size }) => <svg width={size||16} height={size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconMinus = ({ size }) => <svg width={size||16} height={size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconBack = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const IconCheck = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconWa = ({ size }) => <svg width={size||20} height={size||20} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.523 5.837L.057 23.882l6.19-1.443A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.787 9.787 0 01-5.002-1.375l-.36-.213-3.714.865.93-3.617-.234-.373A9.786 9.786 0 012.182 12C2.182 6.565 6.565 2.182 12 2.182S21.818 6.565 21.818 12 17.435 21.818 12 21.818z"/></svg>;
const IconStar = ({ filled, size }) => <svg width={size||14} height={size||14} viewBox="0 0 24 24" fill={filled?"#C9A227":"none"} stroke="#C9A227" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IconAdmin = ({ size }) => <svg width={size||22} height={size||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const IconEdit = ({ size }) => <svg width={size||16} height={size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;

// Logo SVG
const LogoSVG = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="56" fill="none" stroke="#C9A227" strokeWidth="2.5"/>
    <circle cx="60" cy="60" r="50" fill="none" stroke="#C9A227" strokeWidth="0.7"/>
    <ellipse cx="60" cy="52" rx="19" ry="11" fill="#C9A227" opacity="0.9"/>
    <rect x="41" y="63" width="38" height="3.5" rx="1.8" fill="#C9A227"/>
    <line x1="51" y1="66" x2="47" y2="80" stroke="#C9A227" strokeWidth="2.8" strokeLinecap="round"/>
    <line x1="69" y1="66" x2="73" y2="80" stroke="#C9A227" strokeWidth="2.8" strokeLinecap="round"/>
    <line x1="60" y1="66" x2="60" y2="80" stroke="#C9A227" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M46 52 Q43 44 47 41 Q45 47 49 46 Q46 43 50 39 Q49 46 53 45 Q50 42 53 38 Q54 46 51 49" fill="#E88C15" opacity="0.9"/>
    <path d="M74 52 Q71 44 75 41 Q73 47 77 46 Q74 43 78 39 Q77 46 81 45 Q78 42 81 38 Q82 46 79 49" fill="#E88C15" opacity="0.9"/>
    <line x1="34" y1="29" x2="34" y2="60" stroke="#C9A227" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="31" y1="33" x2="34" y2="38" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="34" y1="33" x2="34" y2="38" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="37" y1="33" x2="34" y2="38" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="86" y1="29" x2="86" y2="60" stroke="#C9A227" strokeWidth="2.2" strokeLinecap="round"/>
    <rect x="80" y="27" width="12" height="7" rx="1.8" fill="#C9A227"/>
    <text x="12" y="62" fontSize="8" fill="#C9A227">★</text>
    <text x="100" y="62" fontSize="8" fill="#C9A227">★</text>
    <path id="topArc" d="M 14,60 A 46,46 0 1,1 106,60" fill="none"/>
    <text fontSize="8" fill="#C9A227" fontFamily="serif" letterSpacing="2.5" fontWeight="600">
      <textPath href="#topArc" startOffset="10%">AL-NILE GOURMET</textPath>
    </text>
  </svg>
);

// ─── CSS ──────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --g:#C9A227;--gl:#E8C060;--gd:#8A6A10;--gg:rgba(201,162,39,.22);
  --ink:#080808;--d1:#0E0E0E;--d2:#141414;--d3:#1A1A1A;--d4:#222;
  --sf1:#181818;--sf2:#1F1F1F;
  --bd:rgba(201,162,39,.18);--bdl:rgba(255,255,255,.07);
  --t1:#F5F0E8;--t2:#A89F8E;--t3:#5E574F;
  --red:#EF4444;--grn:#22C55E;--wa:#25D366;
  --r:14px;--rsm:10px;--rlg:20px;--nav:66px;--maxw:430px;
  font-family:'Cairo',sans-serif;
}
html,body{background:var(--ink);color:var(--t1);direction:rtl;overflow-x:hidden;-webkit-font-smoothing:antialiased;overscroll-behavior:none}
::-webkit-scrollbar{width:0;height:0}
button{cursor:pointer;border:none;background:none;font-family:inherit;color:inherit}
input,textarea{font-family:inherit;color:var(--t1)}
img{display:block;width:100%;object-fit:cover}

.shell{max-width:var(--maxw);margin:0 auto;min-height:100dvh;background:var(--d1);position:relative;overflow:hidden}
.scr{min-height:100dvh;padding-bottom:calc(var(--nav) + 16px);overflow-y:auto;overscroll-behavior:contain}

/* BOTTOM NAV */
.bnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:var(--maxw);height:var(--nav);background:rgba(10,10,10,.96);backdrop-filter:blur(16px);border-top:1px solid var(--bdl);display:flex;align-items:center;justify-content:space-around;z-index:100;padding:0 8px}
.nb{display:flex;flex-direction:column;align-items:center;gap:3px;padding:7px 12px;border-radius:12px;color:var(--t3);transition:all .18s;position:relative;flex:1}
.nb:hover,.nb.on{color:var(--g)}
.nb.on{background:rgba(201,162,39,.08)}
.nl{font-size:9.5px;font-weight:700}
.nbdg{position:absolute;top:4px;right:8px;background:var(--red);color:#fff;font-size:9px;font-weight:900;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center}

/* HERO */
.hero{position:relative;height:300px;overflow:hidden}
.hero img{height:100%;width:100%;object-fit:cover}
.hero-ov{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.1) 0%,rgba(0,0,0,.3) 40%,rgba(8,8,8,.97) 100%)}
.hero-cnt{position:absolute;bottom:0;left:0;right:0;padding:20px 18px;text-align:center}
.logo-ring{width:88px;height:88px;border-radius:50%;border:2px solid rgba(201,162,39,.4);background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;margin:0 auto 10px;box-shadow:0 0 30px rgba(201,162,39,.2)}
.hero-name{font-size:28px;font-weight:900;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.8)}
.hero-sub{font-size:13px;color:rgba(201,162,39,.85);font-weight:700;margin-top:2px}
.hero-pills{display:flex;gap:7px;justify-content:center;margin-top:10px;flex-wrap:wrap}
.hpill{background:rgba(255,255,255,.1);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.15);border-radius:20px;padding:4px 11px;font-size:11px;font-weight:700;color:#fff}

/* SEARCH */
.srch{padding:14px 15px 8px}
.srch-box{display:flex;align-items:center;gap:9px;background:var(--sf1);border:1px solid var(--bdl);border-radius:12px;padding:10px 14px;transition:border-color .18s}
.srch-box:focus-within{border-color:rgba(201,162,39,.4)}
.srch-box input{flex:1;background:none;border:none;outline:none;font-size:13.5px;color:var(--t1)}
.srch-box input::placeholder{color:var(--t3)}

/* TYPE TABS */
.type-tabs{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px 15px}
.ttab{display:flex;align-items:center;justify-content:center;gap:6px;padding:11px;border-radius:12px;background:var(--sf1);border:1.5px solid var(--bdl);font-size:13.5px;font-weight:800;color:var(--t2);transition:all .18s}
.ttab.on{background:rgba(201,162,39,.1);border-color:var(--g);color:var(--g)}

/* CATEGORY PILLS */
.cscr{display:flex;gap:8px;padding:6px 15px 10px;overflow-x:auto;scrollbar-width:none}
.cc{white-space:nowrap;padding:7px 14px;border-radius:20px;background:var(--sf1);border:1.5px solid var(--bdl);font-size:12px;font-weight:700;color:var(--t2);transition:all .18s;flex-shrink:0}
.cc.on{background:rgba(201,162,39,.12);border-color:var(--g);color:var(--g)}

/* SECTION HEADER */
.sec-hd{display:flex;align-items:center;justify-content:space-between;padding:14px 18px 10px}
.sec-title{font-size:18px;font-weight:900}
.see-all{font-size:12.5px;font-weight:800;color:var(--g)}
.sth{display:flex;align-items:center;justify-content:space-between;padding:14px 18px 10px;gap:10px}
.sth-title{font-size:20px;font-weight:900}

/* GRID */
.grid{display:grid;grid-template-columns:1fr 1fr;gap:11px;padding:0 15px 8px}

/* FOOD CARD */
.fc{background:var(--sf1);border-radius:14px;overflow:hidden;border:1px solid var(--bdl);transition:transform .18s,border-color .18s;animation:fadeUp .35s ease both}
.fc:active{transform:scale(.98)}
.fc:hover{border-color:rgba(201,162,39,.25)}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.fc-img{height:125px;overflow:hidden;position:relative}
.fc-img img{height:100%;transition:transform .3s}
.fc-img-placeholder{height:125px;background:var(--sf2);display:flex;align-items:center;justify-content:center;font-size:36px}
.fc:hover .fc-img img{transform:scale(1.04)}
.unavail-badge{position:absolute;top:8px;right:8px;background:rgba(239,68,68,.85);color:#fff;font-size:9px;font-weight:900;padding:3px 7px;border-radius:8px}
.fc-body{padding:10px 11px 12px}
.fc-name{font-size:13.5px;font-weight:800;line-height:1.35;cursor:pointer;margin-bottom:2px}
.fc-en{font-size:10.5px;color:var(--t3);margin-bottom:8px}
.fc-foot{display:flex;align-items:center;justify-content:space-between}
.fc-price{font-size:14px;font-weight:900;color:var(--g)}
.btn-add{display:flex;align-items:center;gap:4px;background:rgba(201,162,39,.12);color:var(--g);border:1px solid rgba(201,162,39,.3);border-radius:8px;padding:5px 10px;font-size:11.5px;font-weight:800;transition:all .15s}
.btn-add:hover{background:var(--g);color:#000}
.btn-add:disabled{opacity:.4;cursor:not-allowed}

/* WIDE CARD */
.fc-wide{grid-column:span 2;background:var(--sf1);border-radius:14px;overflow:hidden;border:1px solid var(--bdl);transition:border-color .18s}
.fc-wide:hover{border-color:rgba(201,162,39,.25)}
.fc-wide-inner{display:flex;gap:0}
.fc-wide-img{width:130px;flex-shrink:0;height:130px;overflow:hidden}
.fc-wide-img img{height:100%;width:130px;object-fit:cover}
.fc-wide-body{flex:1;padding:12px}
.fc-wide-name{font-size:14px;font-weight:800;margin-bottom:2px;cursor:pointer}
.fc-wide-en{font-size:10.5px;color:var(--t3);margin-bottom:8px}
.variants{display:flex;flex-direction:column;gap:5px}
.vrow{display:flex;align-items:center;gap:6px}
.vlbl{font-size:11px;color:var(--t2);font-weight:700;min-width:45px}
.vbtn{flex:1;background:rgba(201,162,39,.1);color:var(--g);border:1px solid rgba(201,162,39,.25);border-radius:7px;padding:4px 8px;font-size:11px;font-weight:800;transition:all .15s}
.vbtn:hover{background:var(--g);color:#000}

/* DETAIL */
.det-hero{position:relative;height:260px;overflow:hidden}
.det-hero img{height:100%;object-fit:cover}
.det-ov{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(8,8,8,.98) 100%)}
.det-back{position:absolute;top:14px;right:14px;background:rgba(0,0,0,.5);backdrop-filter:blur(8px);border-radius:10px;width:38px;height:38px;display:flex;align-items:center;justify-content:center;color:#fff;border:1px solid rgba(255,255,255,.1)}
.det-cnt{padding:14px 16px}
.det-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px}
.det-cat{font-size:11px;background:rgba(201,162,39,.12);color:var(--g);border:1px solid rgba(201,162,39,.25);border-radius:7px;padding:3px 8px;display:inline-block;margin-bottom:5px}
.det-name{font-size:22px;font-weight:900;line-height:1.25}
.det-price{font-size:24px;font-weight:900;color:var(--g);white-space:nowrap}
.det-en{color:var(--t3);font-size:13px;margin-bottom:16px}
.var-sec{background:var(--sf1);border-radius:12px;padding:14px;border:1px solid var(--bdl);margin-bottom:16px}
.var-hd{font-size:13px;font-weight:800;color:var(--t2);margin-bottom:10px}
.var-row{display:flex;align-items:center;gap:9px;margin-bottom:7px}
.var-lbl{font-size:12.5px;font-weight:700;min-width:60px}
.var-price{font-size:13px;font-weight:900;color:var(--g);flex:1}
.var-addbtn{background:rgba(201,162,39,.12);color:var(--g);border:1px solid rgba(201,162,39,.25);border-radius:8px;padding:5px 12px;font-size:12px;font-weight:800}
.qty-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.qty-ctrl{display:flex;align-items:center;gap:10px;background:var(--sf1);border-radius:10px;padding:5px 10px;border:1px solid var(--bdl)}
.qbtn{width:28px;height:28px;border-radius:7px;background:var(--sf2);display:flex;align-it

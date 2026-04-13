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
.qbtn{width:28px;height:28px;border-radius:7px;background:var(--sf2);display:flex;align-items:center;justify-content:center;color:var(--g);border:1px solid var(--bdl)}
.qval{font-size:15px;font-weight:900;min-width:22px;text-align:center}
.btn-addlg{width:100%;padding:14px;background:var(--g);color:#000;border-radius:12px;font-size:15px;font-weight:900;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .18s;margin-bottom:16px}
.btn-addlg:hover{background:var(--gl)}

/* CART */
.clist{display:flex;flex-direction:column;gap:10px;padding:0 15px}
.ci{display:flex;gap:11px;padding:13px;background:var(--sf1);border-radius:14px;border:1px solid var(--bdl)}
.ci-info{flex:1}
.ci-name{font-size:13.5px;font-weight:800;margin-bottom:2px}
.ci-sub{font-size:11px;color:var(--t3);margin-bottom:3px}
.ci-p{font-size:12px;color:var(--t3);margin-bottom:8px}
.qty-sm{display:flex;align-items:center;gap:7px}
.qbsm{width:24px;height:24px;border-radius:6px;background:var(--sf2);display:flex;align-items:center;justify-content:center;color:var(--g);border:1px solid var(--bdl)}
.ci-r{display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between}
.rmbtn{font-size:16px;padding:2px}
.ci-tot{font-size:14.5px;font-weight:900;color:var(--g)}

/* SUMMARY */
.summary{margin:14px 15px;background:var(--sf1);border-radius:14px;padding:14px;border:1px solid var(--bdl)}
.srow{display:flex;justify-content:space-between;font-size:13.5px;margin-bottom:8px}
.srow:last-child{margin-bottom:0}
.stotal{font-size:16px;font-weight:900}
.sdiv{height:1px;background:var(--bdl);margin:10px 0}
.free{color:var(--grn)!important;font-weight:800}
.hint{font-size:11px;color:var(--t3);text-align:center;margin-top:7px}
.chk-bar{padding:12px 15px 4px}
.btn-chk{width:100%;padding:15px;background:var(--g);color:#000;border-radius:12px;font-size:15.5px;font-weight:900;transition:all .18s}
.btn-chk:hover{background:var(--gl)}

/* PROMO CARD */
.promo{margin:0 15px 16px;background:linear-gradient(135deg,#1A0E00,#221400);border:1px solid rgba(201,162,39,.2);border-radius:14px;padding:14px 16px;display:flex;align-items:center;justify-content:space-between}
.promo h3{font-size:14.5px;font-weight:900;color:var(--g)}
.promo p{font-size:11.5px;color:var(--t3);margin-top:2px}

/* WA BANNER */
.wa-banner{margin:0 15px 14px;background:linear-gradient(135deg,#075E54,#128C7E);border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:opacity .15s}
.wa-banner:hover{opacity:.9}
.wa-txt h4{font-size:14px;font-weight:900;color:#fff}
.wa-txt p{font-size:11.5px;color:rgba(255,255,255,.75);margin-top:2px}

/* DELIVERY PLATFORMS */
.platforms{margin:0 15px 14px}
.plat-title{font-size:13px;font-weight:800;color:var(--t3);margin-bottom:9px;padding:0 2px}
.plat-row{display:flex;gap:8px}
.plat-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 6px;background:var(--sf1);border:1px solid var(--bdl);border-radius:12px;font-size:10.5px;font-weight:800;color:var(--t2);transition:all .18s;cursor:pointer;text-decoration:none}
.plat-btn:hover{border-color:rgba(201,162,39,.3);color:var(--g)}
.plat-btn span:first-child{font-size:22px}

/* CHECKOUT SHEET */
.shov{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:200;display:flex;align-items:flex-end;justify-content:center}
.sh{width:100%;max-width:var(--maxw);background:var(--d2);border-radius:22px 22px 0 0;padding:18px 18px 28px;border-top:1px solid var(--bdl)}
.shndl{width:38px;height:4px;background:var(--bdl);border-radius:2px;margin:0 auto 16px}
.shtitle{font-size:18px;font-weight:900;margin-bottom:14px}
.flbl{font-size:12.5px;font-weight:800;color:var(--t2);margin-bottom:7px}
.fta,.finp{width:100%;background:var(--sf1);border:1.5px solid var(--bdl);border-radius:10px;padding:10px 13px;font-size:13.5px;color:var(--t1);outline:none;resize:none;margin-bottom:13px;transition:border-color .18s}
.fta:focus,.finp:focus{border-color:var(--g)}
.finp{resize:none;height:42px}
.chk-sm{background:var(--sf1);border-radius:var(--rsm);padding:13px;border:1px solid var(--bdl);margin-bottom:14px}

/* ORDERS */
.olist{padding:7px 15px;display:flex;flex-direction:column;gap:11px}
.ocard{padding:13px;background:var(--sf1);border-radius:var(--r);border:1px solid var(--bdl);cursor:pointer;transition:border-color .18s,transform .13s}
.ocard:active{transform:scale(.99)}
.ocard:hover{border-color:rgba(201,162,39,.28)}
.ocard-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:11px}
.oid{font-size:12.5px;font-weight:900}
.odate{font-size:10.5px;color:var(--t3);margin-top:2px}
.ostatus{display:flex;align-items:center;gap:4px;padding:4px 9px;border-radius:18px;font-size:10.5px;font-weight:800}
.thumbrow{display:flex;gap:5px;margin-bottom:11px}
.othumb{width:42px;height:42px;border-radius:9px;object-fit:cover;border:2px solid var(--bdl)}
.omoreimg{display:flex;align-items:center;justify-content:center;width:42px;height:42px;background:var(--sf2);color:var(--t3);font-size:11px;font-weight:800;border-radius:9px;border:2px solid var(--bdl)}
.ofoot{display:flex;align-items:center;gap:7px;font-size:12.5px;color:var(--t3)}
.ototl{margin-right:auto;font-size:14.5px;font-weight:900;color:var(--g)}

/* TRACKING */
.mapph{height:180px;background:linear-gradient(135deg,#0C1828,#182840);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.mapph::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 35% 50%,rgba(201,162,39,.1) 0%,transparent 55%)}
.mappin{font-size:38px;animation:bounce 1.6s infinite;z-index:1}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.tcard{margin:14px;padding:15px;background:var(--sf1);border-radius:var(--rlg);border:1px solid var(--bdl)}
.thd{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid var(--bdl)}
.steps{display:flex;flex-direction:column}
.step{display:flex;gap:13px;align-items:flex-start}
.step-ic{display:flex;flex-direction:column;align-items:center}
.sdot{font-size:18px;width:35px;height:35px;display:flex;align-items:center;justify-content:center;background:var(--sf2);border-radius:50%;border:2px solid var(--bdl)}
.step.done .sdot{border-color:var(--g);background:rgba(201,162,39,.1)}
.sline{width:2px;height:21px;background:var(--bdl);margin:2px 16.5px}
.sline.done{background:var(--g)}
.slbl{font-size:12.5px;font-weight:700;color:var(--t3);padding:7px 0}
.step.done .slbl{color:var(--t1)}
.step.curr .slbl{color:var(--g)}
.taddr{display:flex;gap:7px;align-items:flex-start;padding:11px;background:var(--sf2);border-radius:var(--rsm);margin-bottom:13px;font-size:12.5px;color:var(--t2)}
.titems{display:flex;flex-direction:column;gap:7px;margin-bottom:15px}
.titem{display:flex;gap:9px;align-items:center;font-size:12.5px}
.titem img{width:38px;height:38px;border-radius:7px;object-fit:cover;flex-shrink:0}
.btn-call{width:100%;padding:12px;border:1px solid var(--bdl);border-radius:var(--rsm);font-size:13.5px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:7px;transition:all .18s;text-decoration:none;color:var(--t1)}
.btn-call:hover{border-color:var(--g);color:var(--g)}

/* PROFILE */
.pcard{margin:11px 15px 0;padding:18px;background:linear-gradient(135deg,#1A1100,#241800);border-radius:var(--rlg);border:1px solid rgba(201,162,39,.22);display:flex;flex-direction:column;align-items:center;gap:11px}
.ava{width:78px;height:78px;border-radius:50%;background:var(--sf1);border:2px solid var(--g);display:flex;align-items:center;justify-content:center;font-size:34px;box-shadow:0 0 18px var(--gg)}
.pname{font-size:19px;font-weight:900}
.pphone{font-size:12.5px;color:var(--t3)}
.pstats{display:flex;width:100%;justify-content:space-around;padding-top:11px;border-top:1px solid rgba(201,162,39,.14)}
.pstat{text-align:center}
.psv{font-size:17px;font-weight:900;color:var(--g)}
.psl{font-size:10.5px;color:var(--t3);margin-top:1px}
.psdiv{width:1px;background:rgba(201,162,39,.18)}
.pmenu{margin:14px 15px;background:var(--sf1);border-radius:var(--rlg);border:1px solid var(--bdl);overflow:hidden}
.plink{display:flex;align-items:center;gap:11px;padding:13px 15px;cursor:pointer;border-bottom:1px solid var(--bdl);transition:background .14s}
.plink:last-child{border-bottom:none}
.plink:hover{background:var(--sf2)}
.pico{width:36px;height:36px;border-radius:9px;background:rgba(201,162,39,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:17px}
.plbl{font-size:13.5px;font-weight:800}
.psub{font-size:11.5px;color:var(--t3);margin-top:1px}

/* ABOUT / INFO */
.info-section{margin:0 15px 14px;background:var(--sf1);border-radius:14px;border:1px solid var(--bdl);overflow:hidden}
.info-row{display:flex;align-items:center;gap:12px;padding:12px 15px;border-bottom:1px solid var(--bdl)}
.info-row:last-child{border-bottom:none}
.info-ico{font-size:20px;width:36px;text-align:center}
.info-text{flex:1}
.info-label{font-size:11px;color:var(--t3);margin-bottom:2px}
.info-val{font-size:13px;font-weight:700}
.social-row{display:flex;gap:8px;padding:12px 15px}
.soc-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:11px 6px;background:var(--sf2);border-radius:12px;border:1px solid var(--bdl);font-size:10px;font-weight:800;color:var(--t2);cursor:pointer;text-decoration:none;transition:all .18s}
.soc-btn:hover{border-color:rgba(201,162,39,.3);color:var(--g)}
.soc-btn span:first-child{font-size:20px}

/* REVIEWS */
.review-card{margin:0 15px 10px;background:var(--sf1);border-radius:14px;padding:14px;border:1px solid var(--bdl)}
.rev-header{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.rev-avatar{width:36px;height:36px;border-radius:50%;background:rgba(201,162,39,.15);border:1.5px solid rgba(201,162,39,.3);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:var(--g);flex-shrink:0}
.rev-name{font-size:13px;font-weight:800}
.rev-date{font-size:10.5px;color:var(--t3);margin-top:1px}
.rev-stars{display:flex;gap:2px;margin-right:auto}
.rev-text{font-size:12.5px;color:var(--t2);line-height:1.5}
.add-review-btn{margin:0 15px 14px;width:calc(100% - 30px);padding:12px;border-radius:12px;border:1.5px dashed rgba(201,162,39,.3);color:var(--g);font-size:13px;font-weight:800;background:rgba(201,162,39,.05);transition:all .18s}
.add-review-btn:hover{background:rgba(201,162,39,.1)}
.review-form{margin:0 15px 14px;background:var(--sf1);border-radius:14px;padding:14px;border:1px solid rgba(201,162,39,.2)}
.star-select{display:flex;gap:8px;margin-bottom:12px}
.star-btn{font-size:26px;background:none;border:none;cursor:pointer;transition:transform .15s}
.star-btn:hover{transform:scale(1.2)}

/* SUCCESS */
.succ-pg{height:calc(100dvh - var(--nav));display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;flex-direction:column;gap:16px}
.succ-ring{width:80px;height:80px;border-radius:50%;background:rgba(34,197,94,.1);border:2px solid rgba(34,197,94,.4);display:flex;align-items:center;justify-content:center;color:var(--grn)}
.succ-pg h2{font-size:26px;font-weight:900;color:var(--g)}
.succ-pg p{color:var(--t3);font-size:14px;max-width:260px}
.btn-pri{padding:13px 28px;background:rgba(201,162,39,.1);color:var(--g);border:1.5px solid rgba(201,162,39,.3);border-radius:12px;font-size:14px;font-weight:800;transition:all .18s}
.btn-pri:hover{background:rgba(201,162,39,.2)}

/* TOAST */
.toast{position:fixed;top:18px;left:50%;transform:translateX(-50%);background:var(--sf1);border:1px solid var(--bd);border-radius:var(--r);padding:11px 18px;font-size:13.5px;font-weight:700;z-index:999;box-shadow:0 4px 22px rgba(0,0,0,.45);animation:tin .28s ease;max-width:88%;text-align:center;pointer-events:none}
.toast.ok{border-color:var(--grn);color:var(--grn)}
.toast.err{border-color:var(--red);color:var(--red)}
@keyframes tin{from{opacity:0;transform:translateX(-50%) translateY(-18px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

/* RCOUNT */
.rcount{display:flex;justify-content:space-between;padding:8px 18px;font-size:12.5px;color:var(--t3)}
.rccat{color:var(--g);font-weight:800}

/* EMPTY */
.empty-pg{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;gap:12px;text-align:center}
.empty-ico{font-size:52px;margin-bottom:4px}
.empty-pg h2{font-size:20px;font-weight:900}
.empty-pg p{font-size:13.5px;color:var(--t3);max-width:220px}

/* ADMIN PANEL */
.admin-header{background:linear-gradient(135deg,#1A0E00,#2A1800);padding:16px 18px;border-bottom:1px solid rgba(201,162,39,.2);display:flex;align-items:center;justify-content:space-between}
.admin-title{font-size:18px;font-weight:900;color:var(--g)}
.admin-subtitle{font-size:11px;color:var(--t3);margin-top:2px}
.admin-card{margin:10px 15px 0;background:var(--sf1);border-radius:14px;border:1px solid var(--bdl);overflow:hidden}
.admin-item{display:flex;align-items:center;gap:12px;padding:11px 14px;border-bottom:1px solid var(--bdl);transition:background .14s}
.admin-item:last-child{border-bottom:none}
.admin-item-img{width:52px;height:52px;border-radius:10px;object-fit:cover;flex-shrink:0;background:var(--sf2)}
.admin-item-info{flex:1;min-width:0}
.admin-item-name{font-size:13px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.admin-item-price{font-size:12px;color:var(--g);font-weight:700;margin-top:2px}
.admin-item-actions{display:flex;align-items:center;gap:8px;flex-shrink:0}
.tgl{width:42px;height:23px;border-radius:11px;background:var(--sf2);border:1px solid var(--bdl);position:relative;transition:background .18s;cursor:pointer}
.tgl.on{background:var(--g);border-color:var(--g)}
.tglth{position:absolute;top:2px;right:2px;width:17px;height:17px;border-radius:50%;background:var(--t3);transition:transform .18s,background .18s}
.tgl.on .tglth{transform:translateX(-19px);background:var(--ink)}
.edit-btn{width:30px;height:30px;background:rgba(201,162,39,.1);border:1px solid rgba(201,162,39,.2);border-radius:7px;display:flex;align-items:center;justify-content:center;color:var(--g);transition:all .18s}
.edit-btn:hover{background:rgba(201,162,39,.2)}
.admin-cat-header{padding:9px 14px;background:rgba(0,0,0,.3);border-bottom:1px solid var(--bdl)}
.admin-cat-name{font-size:12px;font-weight:800;color:var(--t2)}
.edit-modal-ov{position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:300;display:flex;align-items:flex-end;justify-content:center}
.edit-modal{width:100%;max-width:var(--maxw);background:var(--d2);border-radius:22px 22px 0 0;padding:20px 18px 32px;border-top:1px solid var(--bdl);max-height:90dvh;overflow-y:auto}
.edit-modal h3{font-size:17px;font-weight:900;margin-bottom:16px}
.form-group{margin-bottom:13px}
.form-label{font-size:12px;font-weight:800;color:var(--t2);margin-bottom:6px;display:block}
.form-input{width:100%;background:var(--sf1);border:1.5px solid var(--bdl);border-radius:10px;padding:10px 13px;font-size:13.5px;color:var(--t1);outline:none;transition:border-color .18s}
.form-input:focus{border-color:var(--g)}
.btn-save{width:100%;padding:14px;background:var(--g);color:#000;border-radius:12px;font-size:15px;font-weight:900;margin-top:4px}
.btn-cancel{width:100%;padding:12px;background:none;border:1px solid var(--bdl);border-radius:12px;font-size:14px;font-weight:800;color:var(--t2);margin-top:8px}
.admin-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;padding:14px 15px}
.astat{background:var(--sf1);border-radius:12px;padding:12px 10px;text-align:center;border:1px solid var(--bdl)}
.astat-val{font-size:20px;font-weight:900;color:var(--g)}
.astat-label{font-size:10px;color:var(--t3);margin-top:3px}
.logout{display:flex;align-items:center;justify-content:center;gap:7px;width:calc(100% - 30px);margin:0 15px;padding:13px;border-radius:var(--r);border:1px solid rgba(239,68,68,.28);color:var(--red);font-size:14.5px;font-weight:800;transition:all .18s;background:none}
.logout:hover{background:rgba(239,68,68,.07)}
.appver{text-align:center;font-size:11.5px;color:var(--t3);padding:14px 18px}
@media(min-width:431px){.shell{box-shadow:0 0 60px rgba(0,0,0,.85)}}
@media(max-width:360px){.grid{gap:9px}.fc-img{height:108px}.hero{height:260px}}

/* ADMIN LOGIN */
.admin-login-ov{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:500;display:flex;align-items:center;justify-content:center;padding:20px}
.admin-login-box{width:100%;max-width:340px;background:var(--d2);border-radius:22px;padding:28px 22px;border:1px solid rgba(201,162,39,.25);display:flex;flex-direction:column;align-items:center;gap:14px}
.admin-login-logo{font-size:44px;margin-bottom:4px}
.admin-login-title{font-size:20px;font-weight:900;color:var(--g);text-align:center}
.admin-login-sub{font-size:12.5px;color:var(--t3);text-align:center;margin-top:-6px}
.admin-login-inp{width:100%;background:var(--sf1);border:1.5px solid var(--bdl);border-radius:12px;padding:13px 15px;font-size:15px;color:var(--t1);outline:none;letter-spacing:4px;text-align:center;transition:border-color .18s}
.admin-login-inp:focus{border-color:var(--g)}
.admin-login-btn{width:100%;padding:14px;background:var(--g);color:#000;border-radius:12px;font-size:15px;font-weight:900;transition:opacity .18s}
.admin-login-btn:hover{opacity:.88}
.admin-login-err{font-size:12.5px;color:var(--red);font-weight:700;text-align:center}
.admin-logout-btn{display:flex;align-items:center;gap:7px;background:none;border:1px solid rgba(239,68,68,.3);color:var(--red);border-radius:10px;padding:7px 13px;font-size:12.5px;font-weight:800;transition:all .18s;cursor:pointer}
.admin-logout-btn:hover{background:rgba(239,68,68,.08)}
`;


// ─── TOAST HOOK ──────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState(null);
  const show = (msg, type = "ok") => {
    setToast({ msg, type, key: Date.now() });
    setTimeout(() => setToast(null), 2500);
  };
  return [toast, show];
}

// ─── IMAGE WITH FALLBACK ─────────────────────────────────────────
function SafeImg({ src, alt, className, style, onClick }) {
  const [err, setErr] = useState(false);
  return (
    <img
      src={err ? FALLBACK_IMG : src}
      alt={alt}
      className={className}
      style={style}
      onClick={onClick}
      onError={() => setErr(true)}
      loading="lazy"
    />
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [prevPage, setPrevPage] = useState("home");
  const [shopType, setShopType] = useState("butcher");
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [detailItem, setDetailItem] = useState(null);
  const [detailQty, setDetailQty] = useState(1);
  const [trackId, setTrackId] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, showToast] = useToast();
  const [adminItems, setAdminItems] = useState(() =>
    BASE_ITEMS.reduce((acc, it) => { acc[it.id] = { available: true, price: it.price, priceStr: it.priceStr, img: it.img }; return acc; }, {})
  );
  const [editingItem, setEditingItem] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [reviews, setReviews] = useState(REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 5 });
  const scrollRef = useRef(null);
  const adminTapRef = useRef(0);
  const adminTapTimerRef = useRef(null);

  const handleSecretTap = () => {
    adminTapRef.current += 1;
    clearTimeout(adminTapTimerRef.current);
    if (adminTapRef.current >= 5) {
      adminTapRef.current = 0;
      if (!isAdmin) setShowAdminLogin(true);
    }
    adminTapTimerRef.current = setTimeout(() => { adminTapRef.current = 0; }, 2000);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const go = (p) => {
    setPrevPage(page);
    setPage(p);
    scrollRef.current?.scrollTo(0, 0);
  };

  // Merge admin overrides into items
  const ALL_ITEMS = useMemo(() =>
    BASE_ITEMS.map(it => {
      const ov = adminItems[it.id];
      return ov ? { ...it, price: ov.price, priceStr: ov.priceStr, img: ov.img, available: ov.available } : { ...it, available: true };
    }), [adminItems]);

  const cats = useMemo(() => ALL_CATS.filter(c => c.type === shopType), [shopType]);

  const items = useMemo(() => {
    return ALL_ITEMS.filter(it => {
      if (it.type !== shopType) return false;
      if (activeCat !== "all" && it.cid !== activeCat) return false;
      if (search) {
        const q = search.toLowerCase();
        return it.name.includes(search) || it.nameEn.toLowerCase().includes(q);
      }
      return true;
    });
  }, [ALL_ITEMS, shopType, activeCat, search]);

  const addToCart = (item, price, varLabel) => {
    if (!item.available) { showToast("هذا الصنف غير متاح حالياً", "err"); return; }
    const p = price ?? item.price;
    const cid = varLabel ? `${item.id}_${varLabel}` : item.id;
    setCart(prev => {
      const ex = prev.find(c => c.id === cid);
      if (ex) return prev.map(c => c.id === cid ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: cid, item, qty: 1, price: p, varLabel }];
    });
    showToast("✓ أضيف للسلة");
  };

  const updateQty = (cid, delta) => {
    setCart(prev => prev.map(c => c.id === cid ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0));
  };

  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  // ── REAL WHATSAPP ORDER ────────────────────────────────────────
  const sendWhatsAppOrder = (addr, name, phone) => {
    const del = cartTotal >= 150 ? 0 : 15;
    const grand = cartTotal + del;
    const orderId = "ORD-" + Math.random().toString(36).slice(2, 7).toUpperCase();

    let msg = `🌿 *طلب جديد - النيل جورمية*\n`;
    msg += `━━━━━━━━━━━━━━━━━\n`;
    msg += `🔢 رقم الطلب: *${orderId}*\n\n`;
    msg += `👤 الاسم: *${name || "عميل"}*\n`;
    if (phone) msg += `📱 الموبايل: *${phone}*\n`;
    msg += `📍 العنوان: *${addr}*\n\n`;
    msg += `📋 *تفاصيل الطلب:*\n`;
    msg += `━━━━━━━━━━━━━━━━━\n`;
    cart.forEach(c => {
      msg += `• ${c.item.name}${c.varLabel ? ` (${c.varLabel})` : ""} × ${c.qty} = *${(c.price * c.qty).toFixed(0)} د.إ*\n`;
    });
    msg += `━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 المجموع: *${cartTotal.toFixed(0)} د.إ*\n`;
    msg += `🚚 التوصيل: *${del === 0 ? "مجاني 🎉" : del + " د.إ"}*\n`;
    msg += `✅ الإجمالي: *${grand.toFixed(0)} د.إ*\n`;
    msg += `━━━━━━━━━━━━━━━━━\n`;
    msg += `⏰ وقت الطلب: ${new Date().toLocaleString("ar-AE")}\n`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, "_blank");

    const order = {
      id: orderId,
      items: [...cart],
      total: grand,
      status: "confirmed",
      date: new Date().toISOString(),
      addr,
    };
    setOrders(prev => [order, ...prev]);
    setCart([]);
    setCheckoutOpen(false);
    go("success");
  };

  const openDetail = (item) => {
    setDetailItem(item);
    setDetailQty(1);
    go("detail");
  };

  const toggleAvailable = (id) => {
    setAdminItems(prev => ({ ...prev, [id]: { ...prev[id], available: !prev[id].available } }));
  };

  const saveItemEdit = (id, updates) => {
    setAdminItems(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates, price: parsePrice(updates.priceStr || prev[id].priceStr) }
    }));
    setEditingItem(null);
    showToast("✓ تم الحفظ");
  };

  // ─────────────────────────────────────────────────────────────
  // SCREENS
  // ─────────────────────────────────────────────────────────────

  const HomeScreen = () => {
    const popular = ALL_ITEMS.filter(it => it.type === shopType && it.available).slice(0, 6);
    return (
      <div>
        {/* Hero */}
        <div className="hero">
          <SafeImg src={I[42]} alt="النيل جورمية" style={{height:"100%",width:"100%",objectFit:"cover"}} />
          <div className="hero-ov" />
          <div className="hero-cnt">
            <div className="logo-ring" onClick={handleSecretTap} style={{cursor:"default"}}><LogoSVG size={88} /></div>
            <h1 className="hero-name">النيل جورمية</h1>
            <p className="hero-sub">هتدوق طعم مصر 🔥</p>
            <div className="hero-pills">
              <span className="hpill">📍 دبي - أرجان</span>
              <span className="hpill">⏱ ٣٠-٤٥ دقيقة</span>
              <span className="hpill">⭐ ٤.٩</span>
              <span className="hpill">🕐 مفتوح الآن</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="srch">
          <div className="srch-box">
            <IconSearch />
            <input placeholder="ابحث عن وجبتك أو قطعتك..." value={search} onChange={e => setSearch(e.target.value)} onFocus={() => go("menu")} />
          </div>
        </div>

        {/* Type tabs */}
        <div className="type-tabs">
          {[["butcher","🥩","الملحمة"],["restaurant","🍽️","المطعم"]].map(([t,ic,l]) => (
            <button key={t} className={`ttab ${shopType===t?"on":""}`} onClick={() => { setShopType(t); setActiveCat("all"); }}>
              <span style={{fontSize:18}}>{ic}</span>{l}
            </button>
          ))}
        </div>

        {/* Cats */}
        <div className="cscr">
          {cats.map(c => (
            <button key={c.id} className={`cc ${activeCat===c.id?"on":""}`} onClick={() => { setActiveCat(c.id); go("menu"); }}>
              {c.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* WA Banner */}
        <div className="wa-banner" onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("مرحباً، أريد الطلب من النيل جورمية 🌿")}`, "_blank")}>
          <IconWa size={26} />
          <div className="wa-txt">
            <h4>اطلب عبر واتساب</h4>
            <p>تواصل معنا مباشرة الآن</p>
          </div>
          <span style={{marginRight:"auto",color:"rgba(255,255,255,.6)",fontSize:20}}>›</span>
        </div>

        {/* Delivery Platforms */}
        <div className="platforms">
          <p className="plat-title">اطلب عبر تطبيقات التوصيل</p>
          <div className="plat-row">
            <a className="plat-btn" href={SOCIAL.talabat} target="_blank" rel="noreferrer"><span>🛵</span>طلبات</a>
            <a className="plat-btn" href={SOCIAL.deliveroo} target="_blank" rel="noreferrer"><span>🟦</span>ديليفرو</a>
            <a className="plat-btn" href={SOCIAL.noon} target="_blank" rel="noreferrer"><span>🟡</span>نون فود</a>
          </div>
        </div>

        {/* Popular */}
        <div className="sec-hd">
          <h2 className="sec-title">🔥 الأكثر طلباً</h2>
          <button className="see-all" onClick={() => go("menu")}>عرض الكل ›</button>
        </div>
        <div className="grid">
          {popular.map((item, i) => <FoodCard key={item.id} item={item} onAdd={() => addToCart(item)} onView={() => openDetail(item)} idx={i} />)}
        </div>

        {/* Promo */}
        <div className="promo">
          <div><h3>توصيل مجاني</h3><p>على الطلبات فوق ١٥٠ درهم</p></div>
          <span style={{fontSize:34}}>🚀</span>
        </div>

        {/* Reviews snippet */}
        <div className="sec-hd" style={{paddingTop:6}}>
          <h2 className="sec-title">⭐ آراء العملاء</h2>
          <button className="see-all" onClick={() => go("about")}>عرض الكل ›</button>
        </div>
        {reviews.slice(0,2).map((r, i) => <ReviewCard key={i} review={r} />)}

        <div style={{height:20}} />
      </div>
    );
  };

  const MenuScreen = () => (
    <div>
      <div className="sth">
        <h1 className="sth-title">القائمة</h1>
        <span style={{fontSize:12,color:"var(--g)",fontWeight:800,background:"var(--sf1)",padding:"4px 10px",borderRadius:20,border:"1px solid var(--bd)"}}>{items.length} عنصر</span>
      </div>
      <div style={{padding:"0 15px 0"}}>
        <div className="type-tabs" style={{margin:0,padding:0}}>
          {[["butcher","🥩","الملحمة"],["restaurant","🍽️","المطعم"]].map(([t,ic,l]) => (
            <button key={t} className={`ttab ${shopType===t?"on":""}`} onClick={() => { setShopType(t); setActiveCat("all"); }}>
              <span style={{fontSize:16}}>{ic}</span>{l}
            </button>
          ))}
        </div>
      </div>
      <div className="cscr" style={{paddingTop:12}}>
        <button className={`cc ${activeCat==="all"?"on":""}`} onClick={() => setActiveCat("all")}>الكل</button>
        {cats.map(c => <button key={c.id} className={`cc ${activeCat===c.id?"on":""}`} onClick={() => setActiveCat(c.id)}>{c.name}</button>)}
      </div>
      <div className="srch" style={{paddingTop:0}}>
        <div className="srch-box">
          <IconSearch />
          <input placeholder="ابحث في القائمة..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="rcount">
        <span>{items.length} عنصر</span>
        <span className="rccat">{activeCat === "all" ? "الكل" : cats.find(c=>c.id===activeCat)?.name || ""}</span>
      </div>
      <div className="grid" style={{paddingBottom:24}}>
        {items.map((item, i) =>
          item.variants
            ? <WideCard key={item.id} item={item} onAdd={(p, lbl) => addToCart(item, p, lbl)} onView={() => openDetail(item)} />
            : <FoodCard key={item.id} item={item} onAdd={() => addToCart(item)} onView={() => openDetail(item)} idx={i} />
        )}
        {items.length === 0 && (
          <div style={{gridColumn:"span 2",textAlign:"center",padding:"40px 0",color:"var(--t3)"}}>
            <div style={{fontSize:42,marginBottom:12}}>🔍</div>
            <p>لا توجد نتائج مطابقة</p>
          </div>
        )}
      </div>
    </div>
  );

  const DetailScreen = () => {
    if (!detailItem) return null;
    const it = detailItem;
    const cat = ALL_CATS.find(c => c.id === it.cid);
    return (
      <div>
        <div className="det-hero">
          <SafeImg src={it.img} alt={it.name} style={{height:"100%",width:"100%",objectFit:"cover"}} />
          <div className="det-ov" />
          <button className="det-back" onClick={() => go(prevPage)}><IconBack /></button>
          {!it.available && (
            <div style={{position:"absolute",top:14,left:14,background:"rgba(239,68,68,.9)",color:"#fff",fontSize:11,fontWeight:900,padding:"5px 11px",borderRadius:9}}>
              غير متاح
            </div>
          )}
        </div>
        <div className="det-cnt">
          <div className="det-top">
            <div>
              <span className="det-cat">{cat?.name || ""}</span>
              <h1 className="det-name">{it.name}</h1>
            </div>
            <div className="det-price">{it.price}<small> د.إ</small></div>
          </div>
          <p className="det-en">{it.nameEn}</p>
          {it.variants ? (
            <div className="var-sec">
              <div className="var-hd">اختر الحجم</div>
              <div className="var-row">
                <span className="var-lbl">الأساسي</span>
                <span className="var-price">{it.priceStr}</span>
                <button className="var-addbtn" onClick={() => { addToCart(it); go(prevPage); }}>+ أضف</button>
              </div>
              {it.variants.map((v, i) => (
                <div key={i} className="var-row">
                  <span className="var-lbl">{v.l}</span>
                  <span className="var-price">{v.v}</span>
                  <button className="var-addbtn" onClick={() => { addToCart(it, parsePrice(v.v), v.l); go(prevPage); }}>+ أضف</button>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="qty-row">
                <span style={{fontSize:14.5,fontWeight:800}}>الكمية</span>
                <div className="qty-ctrl">
                  <button className="qbtn" onClick={() => setDetailQty(q => Math.max(1, q-1))}><IconMinus /></button>
                  <span className="qval">{detailQty}</span>
                  <button className="qbtn" onClick={() => setDetailQty(q => q+1)}><IconPlus /></button>
                </div>
              </div>
              <button
                className="btn-addlg"
                disabled={!it.available}
                style={!it.available ? {opacity:.5,cursor:"not-allowed"} : {}}
                onClick={() => { for(let i=0;i<detailQty;i++) addToCart(it); go(prevPage); }}
              >
                <IconCart size={20} /> {it.available ? `أضف للسلة — ${it.price * detailQty} د.إ` : "غير متاح حالياً"}
              </button>
            </>
          )}
          <h3 style={{fontSize:15.5,fontWeight:900,marginBottom:11}}>منتجات مشابهة</h3>
          <div className="grid" style={{padding:0}}>
            {ALL_ITEMS.filter(r => r.cid === it.cid && r.id !== it.id).slice(0,4).map((r,i) => (
              <FoodCard key={r.id} item={r} onAdd={() => addToCart(r)} onView={() => { setDetailItem(r); setDetailQty(1); scrollRef.current?.scrollTo(0,0); }} idx={i} />
            ))}
          </div>
          <div style={{height:20}} />
        </div>
      </div>
    );
  };

  const CartScreen = () => {
    const del = cartTotal >= 150 ? 0 : 15;
    const grand = cartTotal + del;
    if (cart.length === 0) return (
      <div>
        <div className="sth"><h1 className="sth-title">سلة الطلبات</h1></div>
        <div className="empty-pg">
          <div className="empty-ico">🛒</div>
          <h2>السلة فارغة</h2>
          <p>أضف وجباتك أو قطعتك المفضلة</p>
          <button className="btn-pri" onClick={() => go("menu")}>تصفح القائمة</button>
        </div>
      </div>
    );
    return (
      <div>
        <div className="sth">
          <h1 className="sth-title">سلة الطلبات</h1>
          <span style={{background:"var(--sf1)",border:"1px solid var(--bd)",borderRadius:20,padding:"4px 10px",fontSize:12,fontWeight:800,color:"var(--g)"}}>{cart.length} عنصر</span>
        </div>
        <div className="clist">
          {cart.map(c => (
            <div key={c.id} className="ci">
              <SafeImg src={c.item.img} alt={c.item.name} style={{width:68,height:68,borderRadius:11,objectFit:"cover",flexShrink:0}} />
              <div className="ci-info">
                <p className="ci-name">{c.item.name}</p>
                {c.varLabel && <p className="ci-sub">{c.varLabel}</p>}
                <p className="ci-p">{c.price} د.إ / الوحدة</p>
                <div className="qty-sm">
                  <button className="qbsm" onClick={() => updateQty(c.id, -1)}><IconMinus size={12} /></button>
                  <span style={{fontSize:13,fontWeight:900,minWidth:18,textAlign:"center"}}>{c.qty}</span>
                  <button className="qbsm" onClick={() => updateQty(c.id, 1)}><IconPlus size={12} /></button>
                </div>
              </div>
              <div className="ci-r">
                <button className="rmbtn" onClick={() => setCart(prev => prev.filter(x => x.id !== c.id))}>🗑</button>
                <span className="ci-tot">{(c.price * c.qty).toFixed(0)} د.إ</span>
              </div>
            </div>
          ))}
        </div>
        <div className="summary">
          <div className="srow"><span>المجموع</span><span>{cartTotal.toFixed(0)} د.إ</span></div>
          <div className="srow"><span>التوصيل</span><span className={del===0?"free":""}>{del===0?"مجاناً 🎉":`${del} د.إ`}</span></div>
          {del > 0 && <p className="hint">أضف {(150-cartTotal).toFixed(0)} د.إ للتوصيل المجاني</p>}
          <div className="sdiv" />
          <div className="srow stotal"><span>الإجمالي</span><span>{grand.toFixed(0)} د.إ</span></div>
        </div>
        <div className="chk-bar">
          <button className="btn-chk" onClick={() => setCheckoutOpen(true)}>
            🛍 إتمام الطلب — {grand.toFixed(0)} د.إ
          </button>
        </div>
        <div style={{height:20}} />
      </div>
    );
  };

  const OrdersScreen = () => {
    const statMap = {
      confirmed: {l:"تم التأكيد",bg:"rgba(34,197,94,.12)",c:"#22C55E"},
      preparing: {l:"قيد التحضير",bg:"rgba(99,102,241,.12)",c:"#818CF8"},
      ready: {l:"جاهز للتوصيل",bg:"rgba(14,165,233,.12)",c:"#38BDF8"},
      delivered: {l:"تم التوصيل",bg:"rgba(34,197,94,.12)",c:"#22C55E"},
    };
    if (orders.length === 0) return (
      <div>
        <div className="sth"><h1 className="sth-title">طلباتي</h1></div>
        <div className="empty-pg">
          <div className="empty-ico">📋</div>
          <h2>لا توجد طلبات</h2>
          <p>ابدأ طلبك الأول الآن</p>
          <button className="btn-pri" onClick={() => go("menu")}>تصفح القائمة</button>
        </div>
      </div>
    );
    return (
      <div>
        <div className="sth"><h1 className="sth-title">طلباتي</h1></div>
        <div className="olist">
          {orders.map(o => {
            const st = statMap[o.status] || statMap.confirmed;
            const d = new Date(o.date);
            return (
              <div key={o.id} className="ocard" onClick={() => { setTrackId(o.id); go("track"); }}>
                <div className="ocard-top">
                  <div>
                    <p className="oid">{o.id}</p>
                    <p className="odate">{d.toLocaleDateString("ar-AE")} — {d.toLocaleTimeString("ar-AE",{hour:"2-digit",minute:"2-digit"})}</p>
                  </div>
                  <div className="ostatus" style={{background:st.bg,color:st.c}}>{st.l}</div>
                </div>
                <div className="thumbrow">
                  {o.items.slice(0,3).map((c,i) => <SafeImg key={i} src={c.item.img} alt={c.item.name} style={{width:42,height:42,borderRadius:9,objectFit:"cover",border:"2px solid var(--bdl)"}} />)}
                  {o.items.length > 3 && <div className="omoreimg">+{o.items.length-3}</div>}
                </div>
                <div className="ofoot">
                  <span>{o.items.length} عنصر</span>
                  <span className="ototl">{o.total} د.إ</span>
                  <span>›</span>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{height:20}} />
      </div>
    );
  };

  const TrackScreen = () => {
    const order = orders.find(o => o.id === trackId);
    if (!order) return <div className="empty-pg"><p>الطلب غير موجود</p></div>;
    const STEPS = [
      {k:"pending",l:"تم استلام الطلب",ic:"📱"},
      {k:"confirmed",l:"تم تأكيد الطلب",ic:"✅"},
      {k:"preparing",l:"قيد التحضير",ic:"👨‍🍳"},
      {k:"ready",l:"خرج للتوصيل",ic:"🛵"},
      {k:"delivered",l:"تم التوصيل",ic:"🎉"},
    ];
    const si = STEPS.findIndex(s => s.k === order.status);
    return (
      <div>
        <div className="sth">
          <button style={{display:"flex",alignItems:"center",color:"var(--t1)"}} onClick={() => go("orders")}><IconBack /></button>
          <h1 className="sth-title">تتبع الطلب</h1>
          <div style={{width:28}} />
        </div>
        <div className="mapph">
          <div style={{textAlign:"center",zIndex:1}}>
            <div className="mappin">📍</div>
            <p style={{fontSize:12.5,color:"var(--t3)",marginTop:7}}>دبي - أرجان</p>
          </div>
        </div>
        <div className="tcard">
          <div className="thd">
            <div>
              <p style={{fontSize:13.5,fontWeight:900}}>{order.id}</p>
              <p style={{fontSize:11.5,color:"var(--t3)",marginTop:3}}>⏱ الوقت المتوقع: ٣٠-٤٥ دقيقة</p>
            </div>
            <p style={{fontSize:17.5,fontWeight:900,color:"var(--g)"}}>{order.total} د.إ</p>
          </div>
          <div className="steps">
            {STEPS.map((s, i) => {
              const done = i <= si, curr = i === si;
              return (
                <div key={s.k} className={`step ${done?"done":""} ${curr?"curr":""}`}>
                  <div className="step-ic">
                    <div className="sdot">{done ? s.ic : "○"}</div>
                    {i < STEPS.length-1 && <div className={`sline ${i < si ? "done" : ""}`} />}
                  </div>
                  <p className="slbl">{s.l}</p>
                </div>
              );
            })}
          </div>
          <div className="taddr">📍 <span>{order.addr}</span></div>
          <div className="titems">
            {order.items.map((c,i) => (
              <div key={i} className="titem">
                <SafeImg src={c.item.img} alt={c.item.name} style={{width:38,height:38,borderRadius:7,objectFit:"cover"}} />
                <span>{c.item.name}</span>
                <span style={{marginRight:"auto",color:"var(--t3)"}}>×{c.qty}</span>
              </div>
            ))}
          </div>
          <a href={`tel:+${WA_NUMBER}`} className="btn-call">📞 اتصل بالمطعم</a>
        </div>
        <div style={{height:20}} />
      </div>
    );
  };

  // ABOUT / معلومات المطعم
  const AboutScreen = () => (
    <div>
      <div className="sth"><h1 className="sth-title">عن المطعم</h1></div>

      {/* Info card */}
      <div className="info-section">
        <div className="info-row">
          <div className="info-ico">📍</div>
          <div className="info-text">
            <div className="info-label">العنوان</div>
            <div className="info-val" style={{fontSize:12}}>{ADDRESS}</div>
          </div>
        </div>
        <div className="info-row" style={{cursor:"pointer"}} onClick={() => window.open(`tel:+${WA_NUMBER}`)}>
          <div className="info-ico">📞</div>
          <div className="info-text">
            <div className="info-label">اتصل بنا</div>
            <div className="info-val">{PHONE_NUMBER}</div>
          </div>
          <span style={{color:"var(--g)"}}>›</span>
        </div>
        <div className="info-row" style={{cursor:"pointer"}} onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("مرحباً أريد الاستفسار")}`, "_blank")}>
          <div className="info-ico"><IconWa size={20} /></div>
          <div className="info-text">
            <div className="info-label">واتساب</div>
            <div className="info-val">{PHONE_NUMBER}</div>
          </div>
          <span style={{color:"var(--grn)"}}>›</span>
        </div>
        <div className="info-row">
          <div className="info-ico">🕐</div>
          <div className="info-text">
            <div className="info-label">ساعات العمل</div>
            <div className="info-val">يومياً ١١ ص – ١١ م</div>
          </div>
        </div>
      </div>

      {/* Social */}
      <div className="info-section" style={{margin:"10px 15px 14px"}}>
        <div style={{padding:"12px 15px 8px",borderBottom:"1px solid var(--bdl)"}}>
          <p style={{fontSize:13,fontWeight:800,color:"var(--t2)"}}>تابعنا على السوشيال ميديا</p>
        </div>
        <div className="social-row">
          <a className="soc-btn" href={SOCIAL.facebook} target="_blank" rel="noreferrer"><span>📘</span>فيسبوك</a>
          <a className="soc-btn" href={SOCIAL.instagram} target="_blank" rel="noreferrer"><span>📸</span>انستاجرام</a>
          <a className="soc-btn" href={SOCIAL.tiktok} target="_blank" rel="noreferrer"><span>🎵</span>تيك توك</a>
        </div>
      </div>

      {/* Delivery */}
      <div className="platforms">
        <p className="plat-title">اطلب عبر تطبيقات التوصيل</p>
        <div className="plat-row">
          <a className="plat-btn" href={SOCIAL.talabat} target="_blank" rel="noreferrer"><span>🛵</span>طلبات</a>
          <a className="plat-btn" href={SOCIAL.deliveroo} target="_blank" rel="noreferrer"><span>🟦</span>ديليفرو</a>
          <a className="plat-btn" href={SOCIAL.noon} target="_blank" rel="noreferrer"><span>🟡</span>نون فود</a>
        </div>
      </div>

      {/* Reviews */}
      <div className="sec-hd">
        <h2 className="sec-title">⭐ آراء العملاء</h2>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          {[1,2,3,4,5].map(s => <IconStar key={s} filled size={13}/>)}
          <span style={{fontSize:12,fontWeight:800,color:"var(--g)",marginRight:4}}>4.9</span>
        </div>
      </div>

      {reviews.map((r, i) => <ReviewCard key={i} review={r} />)}

      {/* Add Review */}
      {!showReviewForm ? (
        <button className="add-review-btn" onClick={() => setShowReviewForm(true)}>+ أضف تقييمك</button>
      ) : (
        <div className="review-form">
          <p style={{fontSize:14,fontWeight:900,marginBottom:12}}>أضف تقييمك 🌟</p>
          <div className="star-select">
            {[1,2,3,4,5].map(s => (
              <button key={s} className="star-btn" onClick={() => setNewReview(r => ({...r, rating: s}))}>
                {s <= newReview.rating ? "⭐" : "☆"}
              </button>
            ))}
          </div>
          <input className="form-input" placeholder="اسمك" value={newReview.name} onChange={e => setNewReview(r => ({...r, name: e.target.value}))} style={{marginBottom:10,display:"block"}} />
          <textarea className="form-input" style={{resize:"none",height:80,display:"block",marginBottom:12}} placeholder="شاركنا تجربتك..." value={newReview.text} onChange={e => setNewReview(r => ({...r, text: e.target.value}))} />
          <button className="btn-save" onClick={() => {
            if (!newReview.name || !newReview.text) { showToast("أكمل البيانات", "err"); return; }
            setReviews(prev => [{ name: newReview.name, rating: newReview.rating, text: newReview.text, date: "الآن", avatar: newReview.name[0] }, ...prev]);
            setNewReview({ name: "", text: "", rating: 5 });
            setShowReviewForm(false);
            showToast("✓ شكراً على تقييمك!");
          }}>إرسال التقييم</button>
          <button className="btn-cancel" onClick={() => setShowReviewForm(false)}>إلغاء</button>
        </div>
      )}

      <div style={{height:20}} />
    </div>
  );

  // ADMIN PANEL
  const AdminScreen = () => {
    const availCount = Object.values(adminItems).filter(v => v.available).length;
    const unavailCount = Object.values(adminItems).length - availCount;

    // Group items by category for display
    const grouped = ALL_CATS.map(cat => ({
      cat,
      items: ALL_ITEMS.filter(it => it.cid === cat.id)
    })).filter(g => g.items.length > 0);

    return (
      <div>
        <div className="admin-header">
          <div>
            <p className="admin-title">⚙️ لوحة التحكم</p>
            <p className="admin-subtitle">إدارة المنتجات والأسعار والصور</p>
          </div>
          <button className="admin-logout-btn" onClick={() => { setIsAdmin(false); go("home"); }}>
            خروج 🔓
          </button>
        </div>
        <div className="admin-stats">
          <div className="astat"><div className="astat-val">{ALL_ITEMS.length}</div><div className="astat-label">منتج</div></div>
          <div className="astat"><div className="astat-val" style={{color:"var(--grn)"}}>{availCount}</div><div className="astat-label">متاح</div></div>
          <div className="astat"><div className="astat-val" style={{color:"var(--red)"}}>{unavailCount}</div><div className="astat-label">غير متاح</div></div>
        </div>

        {grouped.map(({ cat, items }) => (
          <div key={cat.id} className="admin-card">
            <div className="admin-cat-header">
              <span className="admin-cat-name">{cat.name} · {cat.nameEn}</span>
            </div>
            {items.map(item => {
              const ov = adminItems[item.id];
              const isAvail = ov?.available ?? true;
              return (
                <div key={item.id} className="admin-item">
                  <SafeImg src={item.img} alt={item.name} style={{width:52,height:52,borderRadius:10,objectFit:"cover",flexShrink:0,opacity:isAvail?1:.45}} />
                  <div className="admin-item-info">
                    <div className="admin-item-name" style={{color:isAvail?"var(--t1)":"var(--t3)"}}>{item.name}</div>
                    <div className="admin-item-price">{item.priceStr}</div>
                  </div>
                  <div className="admin-item-actions">
                    <button className="edit-btn" onClick={() => setEditingItem(item)}><IconEdit size={14} /></button>
                    <button className={`tgl ${isAvail?"on":""}`} onClick={() => toggleAvailable(item.id)}>
                      <span className="tglth" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div style={{height:20}} />
      </div>
    );
  };

  const SuccessScreen = () => (
    <div className="succ-pg">
      <div className="succ-ring"><IconCheck /></div>
      <h2>تم إرسال طلبك! 🎉</h2>
      <p>تم إرسال طلبك على واتساب النيل جورمية وسيتم التواصل معك قريباً</p>
      <button className="btn-pri" onClick={() => go("orders")}>عرض طلباتي</button>
      <button onClick={() => go("home")} style={{color:"var(--g)",fontWeight:800,fontSize:14,marginTop:4}}>العودة للرئيسية</button>
    </div>
  );

  const navPages = ["home","menu","cart","orders","about","admin"];
  const activeNav = navPages.includes(page) ? page : (["detail","track"].includes(page) ? prevPage : "home");

  // Admin Login Modal
  const AdminLoginModal = () => {
    const [pw, setPw] = useState("");
    const [err, setErr] = useState(false);
    const handleLogin = () => {
      if (pw === ADMIN_PASSWORD) {
        setIsAdmin(true);
        setShowAdminLogin(false);
        go("admin");
        setErr(false);
      } else {
        setErr(true);
        setPw("");
      }
    };
    return (
      <div className="admin-login-ov" onClick={() => setShowAdminLogin(false)}>
        <div className="admin-login-box" onClick={e => e.stopPropagation()}>
          <div className="admin-login-logo">🔐</div>
          <p className="admin-login-title">لوحة التحكم</p>
          <p className="admin-login-sub">أدخل كلمة السر للوصول</p>
          <input
            className="admin-login-inp"
            type="password"
            placeholder="••••••••"
            value={pw}
            onChange={e => { setPw(e.target.value); setErr(false); }}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            autoFocus
          />
          {err && <p className="admin-login-err">❌ كلمة السر غير صحيحة</p>}
          <button className="admin-login-btn" onClick={handleLogin}>دخول ←</button>
          <button className="btn-cancel" onClick={() => setShowAdminLogin(false)}>إلغاء</button>
        </div>
      </div>
    );
  };

  return (
    <div className="shell" dir="rtl">
      <div className="scr" ref={scrollRef} key={page}>
        {page === "home" && <HomeScreen />}
        {page === "menu" && <MenuScreen />}
        {page === "detail" && <DetailScreen />}
        {page === "cart" && <CartScreen />}
        {page === "orders" && <OrdersScreen />}
        {page === "track" && <TrackScreen />}
        {page === "about" && <AboutScreen />}
        {page === "admin" && (isAdmin ? <AdminScreen /> : <HomeScreen />)}
        {page === "success" && <SuccessScreen />}
      </div>

      {/* Bottom Nav */}
      <nav className="bnav">
        {[
          {id:"home",label:"الرئيسية",Icon:IconHome},
          {id:"menu",label:"القائمة",Icon:({size})=><svg width={size||22} height={size||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>},
          {id:"cart",label:"السلة",Icon:IconCart,badge:cartCount},
          {id:"orders",label:"طلباتي",Icon:IconOrders},
          {id:"about",label:"معلومات",Icon:({size})=><svg width={size||22} height={size||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>},
        ].map(({id,label,Icon,badge}) => (
          <button key={id} className={`nb ${activeNav===id?"on":""}`} onClick={() => go(id)}>
            <Icon size={20} />
            {badge > 0 && <span className="nbdg">{badge}</span>}
            <span className="nl">{label}</span>
          </button>
        ))}
        {/* زر الإدارة السري - يظهر فقط للأدمن */}
        {isAdmin && (
          <button className={`nb ${activeNav==="admin"?"on":""}`} onClick={() => go("admin")}>
            <IconAdmin size={20} />
            <span className="nl">إدارة</span>
          </button>
        )}
        {/* دخول سري للأدمن بالضغط المطوّل على زر "معلومات" - مخفي */}
      </nav>

      {/* Checkout Sheet */}
      {checkoutOpen && (
        <CheckoutSheet
          cartTotal={cartTotal}
          cart={cart}
          onClose={() => setCheckoutOpen(false)}
          onConfirm={sendWhatsAppOrder}
          showToast={showToast}
        />
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <EditItemModal
          item={editingItem}
          currentData={adminItems[editingItem.id]}
          onSave={saveItemEdit}
          onClose={() => setEditingItem(null)}
        />
      )}

      {/* Toast */}
      {toast && <div key={toast.key} className={`toast ${toast.type}`}>{toast.msg}</div>}

      {/* Admin Login Modal */}
      {showAdminLogin && <AdminLoginModal />}

      {/* Secret Admin Entry: Logo long-press in header (hidden from users) */}
      <div
        style={{position:"fixed",bottom:0,left:0,width:0,height:0,opacity:0,zIndex:-1}}
        id="admin-secret-trigger"
      />
    </div>
  );
}

// ── REVIEW CARD ───────────────────────────────────────────────────
function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="rev-header">
        <div className="rev-avatar">{review.avatar}</div>
        <div>
          <div className="rev-name">{review.name}</div>
          <div className="rev-date">{review.date}</div>
        </div>
        <div className="rev-stars">
          {[1,2,3,4,5].map(s => <IconStar key={s} filled={s <= review.rating} size={13} />)}
        </div>
      </div>
      <p className="rev-text">{review.text}</p>
    </div>
  );
}

// ── FOOD CARD ─────────────────────────────────────────────────────
function FoodCard({ item, onAdd, onView, idx }) {
  return (
    <div className="fc" style={{animationDelay:`${idx*0.04}s`}}>
      <div className="fc-img" onClick={onView} style={{position:"relative"}}>
        <SafeImg src={item.img} alt={item.name} style={{height:"100%",width:"100%",objectFit:"cover"}} />
        {!item.available && <div className="unavail-badge">غير متاح</div>}
      </div>
      <div className="fc-body">
        <h3 className="fc-name" onClick={onView}>{item.name}</h3>
        <p className="fc-en">{item.nameEn}</p>
        <div className="fc-foot">
          <span className="fc-price">{item.price} <small>د.إ</small></span>
          <button className="btn-add" disabled={!item.available} onClick={onAdd}><IconPlus size={13} /> أضف</button>
        </div>
      </div>
    </div>
  );
}

// ── WIDE CARD ─────────────────────────────────────────────────────
function WideCard({ item, onAdd, onView }) {
  return (
    <div className="fc-wide">
      <div className="fc-wide-inner">
        <div className="fc-wide-img" onClick={onView} style={{cursor:"pointer"}}>
          <SafeImg src={item.img} alt={item.name} style={{height:"100%",width:"100%",objectFit:"cover"}} />
        </div>
        <div className="fc-wide-body">
          <h3 className="fc-wide-name" onClick={onView}>{item.name}</h3>
          <p className="fc-wide-en">{item.nameEn}</p>
          <div className="variants">
            <div className="vrow">
              <span className="vlbl">أساسي</span>
              <button className="vbtn" onClick={() => onAdd(item.price, null)}>أضف ({item.priceStr})</button>
            </div>
            {item.variants.map((v,i) => (
              <div key={i} className="vrow">
                <span className="vlbl">{v.l}</span>
                <button className="vbtn" onClick={() => onAdd(parsePrice(v.v), v.l)}>أضف ({v.v})</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CHECKOUT SHEET ────────────────────────────────────────────────
function CheckoutSheet({ cartTotal, cart, onClose, onConfirm, showToast }) {
  const [addr, setAddr] = useState("دبي - أرجان");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const del = cartTotal >= 150 ? 0 : 15;
  const grand = cartTotal + del;

  const handleConfirm = () => {
    if (!addr.trim()) { showToast("أدخل عنوان التوصيل", "err"); return; }
    onConfirm(addr, name, phone);
  };

  return (
    <div className="shov" onClick={onClose}>
      <div className="sh" onClick={e => e.stopPropagation()}>
        <div className="shndl" />
        <h3 className="shtitle">تفاصيل الطلب</h3>

        <p className="flbl">👤 اسمك</p>
        <input className="finp" value={name} onChange={e=>setName(e.target.value)} placeholder="اسمك الكريم..." style={{marginBottom:10,display:"block",width:"100%"}} />

        <p className="flbl">📱 رقم الموبايل</p>
        <input className="finp" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+971..." style={{marginBottom:10,display:"block",width:"100%"}} />

        <p className="flbl">📍 عنوان التوصيل</p>
        <textarea className="fta" rows={3} value={addr} onChange={e=>setAddr(e.target.value)} placeholder="المنطقة، الشارع، رقم المبنى..." />

        <div className="chk-sm">
          <div className="srow"><span>المجموع</span><span>{cartTotal.toFixed(0)} د.إ</span></div>
          <div className="srow"><span>التوصيل</span><span className={del===0?"free":""}>{del===0?"مجاناً 🎉":`${del} د.إ`}</span></div>
          <div className="sdiv" />
          <div className="srow stotal"><span>الإجمالي</span><span>{grand.toFixed(0)} د.إ</span></div>
        </div>

        <button className="btn-chk" style={{marginTop:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8}} onClick={handleConfirm}>
          <IconWa size={18} /> إرسال الطلب على واتساب
        </button>
      </div>
    </div>
  );
}

// ── EDIT ITEM MODAL ───────────────────────────────────────────────
function EditItemModal({ item, currentData, onSave, onClose }) {
  const [priceStr, setPriceStr] = useState(currentData?.priceStr || item.priceStr);
  const [img, setImg] = useState(currentData?.img || item.img);

  return (
    <div className="edit-modal-ov" onClick={onClose}>
      <div className="edit-modal" onClick={e => e.stopPropagation()}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <SafeImg src={img} alt={item.name} style={{width:56,height:56,borderRadius:11,objectFit:"cover",border:"1px solid var(--bdl)"}} />
          <div>
            <h3 style={{fontSize:15,fontWeight:900,margin:0}}>{item.name}</h3>
            <p style={{fontSize:11,color:"var(--t3)",marginTop:2}}>{item.nameEn}</p>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">السعر (مثال: 60 درهم)</label>
          <input className="form-input" value={priceStr} onChange={e => setPriceStr(e.target.value)} placeholder="60 درهم" />
        </div>

        <div className="form-group">
          <label className="form-label">رابط الصورة (URL)</label>
          <input className="form-input" value={img} onChange={e => setImg(e.target.value)} placeholder="https://..." />
        </div>

        {img && (
          <div style={{marginBottom:14}}>
            <label className="form-label">معاينة الصورة</label>
            <SafeImg src={img} alt="preview" style={{height:100,borderRadius:10,objectFit:"cover",border:"1px solid var(--bdl)"}} />
          </div>
        )}

        <button className="btn-save" onClick={() => onSave(item.id, { priceStr, img })}>حفظ التغييرات</button>
        <button className="btn-cancel" onClick={onClose}>إلغاء</button>
      </div>
    </div>
  );
}

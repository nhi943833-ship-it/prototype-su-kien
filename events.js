// ============================================================
// MLBL EVENTS — Tươi Xanh Nhanh Ngon (P1)
// Sự kiện (loop) + Hoạt động (riêng P1)
// Mock mapping SP theo brand/heuristic — sẽ thay bằng tag thực
// ============================================================

window.MLBL_EVENTS = (function(){

  // Lấy hôm nay từ window.MLBL_TODAY nếu có (cho phép test khác ngày),
  // fallback ngày hiện tại của hệ thống.
  function today(){
    return window.MLBL_TODAY ? new Date(window.MLBL_TODAY) : new Date();
  }

  // ---------- 27 Sự kiện loop áp dụng cho P1 ----------
  // season: [startMonth, startDay, endMonth, endDay]  (1-12, 1-31)
  //   year wrap khi endMonth < startMonth.
  //   season = 'always' → quanh năm (Tân gia, Sinh nhật...).
  //   season = 'monthly' với days = [from, to] → lặp mỗi tháng.
  const events = [
    { code:'TET01',  name:'Tết Nguyên Đán',          icon:'🧧', type:'Âm lịch',  period:'Tháng Chạp – Mùng 5 Tết',     season:[12,15,2,15], desc:'Mua sắm Tết, dọn nhà, biếu tặng, làm đẹp đón năm mới' },
    { code:'TET02',  name:'Sau Tết – Reset Năm Mới', icon:'🌱', type:'Dương lịch', period:'Mùng 6 Tết – hết T2',          season:[2,6,2,28],   desc:'Tâm lý làm mới: giảm cân, gym, sửa soạn công sở' },
    { code:'RAM01',  name:'Rằm tháng Giêng',         icon:'🪷', type:'Âm lịch',  period:'15/01 AL',                      season:[2,1,2,25],   desc:'Cúng đầu năm — đồ chay, hoa quả, hàng cúng' },
    { code:'PN01',   name:'Quốc tế Phụ nữ 8/3',      icon:'🌷', type:'Quốc tế', period:'08/03',                          season:[3,1,3,10],   desc:'Quà tặng + tự thưởng + đẩy hàng nữ' },
    { code:'HE01',   name:'Vào Hè – Mùa Nóng',       icon:'☀️', type:'Mùa',     period:'T4 – T7',                        season:[4,1,7,31],   desc:'Đồ giải nhiệt, chống nắng, đồ uống mát, sữa tắm' },
    { code:'DL01',   name:'Du Lịch Hè – Biển',       icon:'🏖️', type:'Mùa',     period:'T5 – T8',                        season:[5,1,8,31],   desc:'Đồ du lịch, chống nắng, đồ tắm, đồ ăn vặt mang đi' },
    { code:'ME01',   name:'Ngày của Mẹ',             icon:'💐', type:'Quốc tế', period:'CN tuần 2 T5',                   season:[5,1,5,15],   desc:'Quà tặng mẹ' },
    { code:'TE01',   name:'Quốc tế Thiếu nhi 1/6',   icon:'🎈', type:'Quốc tế', period:'01/06',                          season:[5,25,6,5],   desc:'Quà cho con, đồ chơi, workshop trẻ em' },
    { code:'HW01',   name:'Mùa Cưới',                icon:'💍', type:'Mùa',     period:'T10 – T2',                       season:[10,1,2,28],  desc:'Cô dâu chú rể chuẩn bị + khách mời mua quà' },
    { code:'HW02',   name:'Tân Gia / Về Nhà Mới',    icon:'🏡', type:'Cá nhân', period:'Quanh năm',                      season:'always',     desc:'Đồ về nhà mới: gia dụng, trang trí, dự trữ' },
    { code:'HS01',   name:'Tựu Trường – Khai Giảng', icon:'🎒', type:'Dương lịch', period:'T8 – T9',                     season:[8,1,9,30],   desc:'Đồ học sinh, dụng cụ, balo, hộp cơm' },
    { code:'MUA01',  name:'Mùa Mưa',                 icon:'☔', type:'Mùa',     period:'T5 – T10',                       season:[5,1,10,31],  desc:'Giấy, nước lau sàn, khử mùi, chống ẩm' },
    { code:'DONG01', name:'Mùa Đông – Hanh Khô',     icon:'🧣', type:'Mùa',     period:'T11 – T2',                       season:[11,1,2,28],  desc:'Dưỡng ẩm, đồ ấm, đồ uống nóng' },
    { code:'LULUT',  name:'Mùa Lũ / Mùa Bão',        icon:'🌊', type:'Mùa',     period:'T9 – T11',                       season:[9,1,11,30],  desc:'Combo cứu trợ, hàng từ thiện' },
    { code:'VL01',   name:'Vu Lan – Báo Hiếu',       icon:'🕯️', type:'Âm lịch',  period:'Tháng 7 AL (~T8 DL)',           season:[8,1,9,5],    desc:'Quà cha mẹ, đồ chay, hàng cúng' },
    { code:'TT01',   name:'Tết Trung Thu',           icon:'🥮', type:'Âm lịch',  period:'15/08 AL (~T9-10 DL)',          season:[9,1,10,15],  desc:'Bánh trung thu, lồng đèn, quà tặng trẻ em' },
    { code:'PNVN01', name:'Phụ Nữ Việt Nam 20/10',   icon:'🌹', type:'Quốc gia', period:'20/10',                         season:[10,15,10,25],desc:'Tôn vinh phụ nữ Việt — quà tặng, hoa, mỹ phẩm' },
    { code:'NGAY',   name:'Nhà Giáo VN 20/11',       icon:'🌺', type:'Quốc gia', period:'20/11',                         season:[11,15,11,25],desc:'Quà tặng giáo viên — hoa, mỹ phẩm' },
    { code:'XMAS',   name:'Giáng Sinh',              icon:'🎄', type:'Quốc tế', period:'20–25/12',                       season:[12,15,12,28],desc:'Trang trí, quà tặng, hẹn hò, tiệc' },
    { code:'NY01',   name:'Tết Dương Lịch',          icon:'🎆', type:'Dương lịch', period:'31/12 – 01/01',               season:[12,28,1,5],  desc:'Tiệc cuối năm, đồ uống, du lịch ngắn' },
    { code:'WC01',   name:'World Cup / Euro',        icon:'⚽', type:'Thể thao', period:'T6 – T7',                       season:[6,1,7,31],   desc:'Bóng đá đỉnh cao — đồ nhậu, áo đấu, tụ tập' },
    { code:'VL02',   name:'V-League – Giải Việt',    icon:'🏆', type:'Thể thao', period:'T8 – T5 năm sau',               season:[8,1,5,31],   desc:'Bóng đá nội mỗi cuối tuần — đồ nhậu, áo CLB' },
    { code:'LUONG',  name:'Đầu Tháng – Vào Lương',   icon:'💰', type:'Chu kỳ',  period:'Mùng 1–10 mỗi tháng',           season:'monthly', days:[1,10],   desc:'Tâm lý chi tiêu thoải mái, tạp hoá nhập hàng' },
    { code:'TKIEM',  name:'Cuối Tháng – Tiết Kiệm',  icon:'🪙', type:'Chu kỳ',  period:'25–30 mỗi tháng',                season:'monthly', days:[25,31],  desc:'Combo giá rẻ, hàng thiết yếu, gói nhỏ' },
    { code:'THOI01', name:'Thôi Nôi – Đầy Tháng',    icon:'👶', type:'Cá nhân', period:'Quanh năm',                      season:'always',     desc:'Quà thôi nôi, đồ tiệc nhỏ' },
    { code:'BD01',   name:'Sinh Nhật',               icon:'🎂', type:'Cá nhân', period:'Quanh năm',                      season:'always',     desc:'Quà sinh nhật cho mình, người thân, bạn bè' },
    { code:'MTHO',   name:'Mừng Thọ',                icon:'🎎', type:'Cá nhân', period:'Quanh năm',                      season:'always',     desc:'Quà mừng thọ ông bà, đồ chăm sóc cao tuổi' },
  ];

  // ---------- 8 Hoạt động riêng P1 (luôn hiển thị) ----------
  const activities = [
    { code:'P1_ACT01', name:'Bữa Cơm Hàng Ngày',          icon:'🍚', insight:'Nội trợ quyết bữa ăn 4–5 lần/tuần, ngại nghĩ thực đơn',  pType:'Thịt, cá, rau, gia vị — đủ 3 món/bữa' },
    { code:'P1_ACT02', name:'Bữa Cơm Dinh Dưỡng Đặc Biệt', icon:'💊', insight:'Có người tiểu đường, huyết áp, trẻ nhỏ, người cao tuổi', pType:'Thực phẩm ít muối/đường, mềm dễ tiêu, ngũ cốc' },
    { code:'P1_ACT03', name:'Eat Clean – Giảm Cân',        icon:'🥗', insight:'Đô thị 20–40, quan tâm vóc dáng',                       pType:'Ức gà, cá hồi, rau hữu cơ, ngũ cốc nguyên cám' },
    { code:'P1_ACT04', name:'Mâm Cơm Đãi Tiệc Cuối Tuần',  icon:'🍷', insight:'Khách hoặc gia đình tụ họp',                            pType:'Mâm cỗ 6–10 người: thịt nguyên khối, gà, tôm' },
    { code:'P1_ACT05', name:'Tủ Lạnh Tuần',                icon:'❄️', insight:'Bận, không có thời gian đi chợ hàng ngày',              pType:'Combo đông lạnh + tươi dùng 7 ngày' },
    { code:'P1_ACT06', name:'Đặc Sản Mùa Nào Thức Nấy',    icon:'🍇', insight:'Thích đặc sản theo mùa địa phương',                    pType:'Măng, sấu, vải, nhãn, hồng, bưởi…' },
    { code:'P1_ACT07', name:'Đồ Chay – Cúng Mùng 1 & Rằm', icon:'🪔', insight:'Ăn chay hoặc cúng 2 lần/tháng',                         pType:'Đậu hũ, nấm, rau, đồ chay, hoa quả cúng' },
    { code:'P1_ACT08', name:'Đồ Ăn Sáng Nhanh',            icon:'🥖', insight:'Đi làm/đi học cần ăn sáng nhanh, gọn',                 pType:'Bánh mì, xôi, cháo gói, sữa, ngũ cốc' },
  ];

  // ---------- Trạng thái sự kiện theo ngày ----------
  // Trả về: 'active' | 'upcoming' | 'inactive'
  function statusOf(ev, ref){
    const t = ref || today();
    if (ev.season === 'always') return 'active';

    if (ev.season === 'monthly') {
      const d = t.getDate();
      const [from, to] = ev.days;
      if (d >= from && d <= to) return 'active';
      const daysToFrom = (from >= d) ? from - d : (daysInMonth(t) - d) + from;
      if (daysToFrom <= 7) return 'upcoming';
      return 'inactive';
    }

    const [sm, sd, em, ed] = ev.season;
    const yr = t.getFullYear();
    const wrap = em < sm; // năm sang
    const start = new Date(yr, sm-1, sd);
    const end   = wrap ? new Date(yr+1, em-1, ed) : new Date(yr, em-1, ed);
    const startPrev = wrap ? new Date(yr-1, sm-1, sd) : null;
    const endPrev   = wrap ? new Date(yr, em-1, ed)   : null;

    // active nếu đang trong (start..end) hoặc (startPrev..endPrev) với year wrap
    if (t >= start && t <= end) return 'active';
    if (wrap && startPrev && t >= startPrev && t <= endPrev) return 'active';

    // upcoming nếu start cách <= 30 ngày
    const daysToStart = Math.ceil((start - t) / 86400000);
    if (daysToStart > 0 && daysToStart <= 30) return 'upcoming';
    return 'inactive';
  }
  function daysInMonth(d){ return new Date(d.getFullYear(), d.getMonth()+1, 0).getDate(); }

  // ---------- Mock mapping SP theo event/activity ----------
  // Lưu ý: data thật của trang chỉ có 4 brand HPC (ALO CLEAN, MENCODE, KEYONE MEN,
  // BEAUTY REPUBLIC) — không có thực phẩm/Tết items. Mapping dưới đây là HEURISTIC
  // theo brand để demo luồng; tag thật sẽ do team Marketing TT cấu hình per-SKU.
  const eventMap = {
    TET01:  { brands:['ALO CLEAN','BEAUTY REPUBLIC','MENCODE','KEYONE MEN'], note:'Tết — dọn nhà, biếu, làm đẹp' },
    TET02:  { brands:['MENCODE','KEYONE MEN'], note:'Reset năm — fitness, công sở' },
    RAM01:  { brands:['ALO CLEAN'], note:'Cúng rằm — đồ vệ sinh nhà cửa' },
    PN01:   { brands:['BEAUTY REPUBLIC'], note:'8/3 — quà cho phái nữ' },
    HE01:   { brands:['BEAUTY REPUBLIC','ALO CLEAN'], note:'Mùa hè — chống nắng, thơm mát' },
    DL01:   { brands:['BEAUTY REPUBLIC','MENCODE'], limit:8, note:'Du lịch biển — gọn nhẹ' },
    ME01:   { brands:['BEAUTY REPUBLIC'], note:'Ngày của Mẹ' },
    TE01:   { brands:['ALO CLEAN','BEAUTY REPUBLIC'], limit:6, note:'1/6 — gia đình' },
    HW01:   { brands:['BEAUTY REPUBLIC','KEYONE MEN'], note:'Mùa cưới — cô dâu/chú rể' },
    HW02:   { brands:['ALO CLEAN'], note:'Tân gia — dọn nhà mới' },
    HS01:   { brands:['ALO CLEAN','MENCODE'], limit:8, note:'Tựu trường' },
    MUA01:  { brands:['ALO CLEAN'], note:'Mùa mưa — khô ráo, khử mùi' },
    DONG01: { brands:['BEAUTY REPUBLIC'], note:'Mùa đông — dưỡng ẩm' },
    LULUT:  { brands:['ALO CLEAN'], limit:5, note:'Cứu trợ — đồ vệ sinh thiết yếu' },
    VL01:   { brands:['ALO CLEAN'], note:'Vu lan — cúng, dọn dẹp' },
    TT01:   { brands:['BEAUTY REPUBLIC','ALO CLEAN'], limit:6, note:'Trung thu' },
    PNVN01: { brands:['BEAUTY REPUBLIC'], note:'20/10' },
    NGAY:   { brands:['BEAUTY REPUBLIC'], note:'20/11 quà giáo viên' },
    XMAS:   { brands:['BEAUTY REPUBLIC','MENCODE','KEYONE MEN'], note:'Giáng sinh' },
    NY01:   { brands:['BEAUTY REPUBLIC','MENCODE'], limit:5, note:'Tết Dương' },
    WC01:   { brands:['MENCODE','KEYONE MEN'], note:'World Cup — đồ cho nam' },
    VL02:   { brands:['MENCODE','KEYONE MEN'], note:'V-League — đồ cho nam' },
    LUONG:  { sort:'price-desc', limit:8, note:'Vào lương — SP cao cấp + quà nhiều' },
    TKIEM:  { sort:'price-asc',  limit:8, note:'Tiết kiệm — SP giá tốt nhất' },
    THOI01: { brands:['BEAUTY REPUBLIC','ALO CLEAN'], limit:6, note:'Thôi nôi' },
    BD01:   { brands:['BEAUTY REPUBLIC','MENCODE','KEYONE MEN'], limit:8, note:'Sinh nhật' },
    MTHO:   { brands:['BEAUTY REPUBLIC'], note:'Mừng thọ — chăm sóc người cao tuổi' },
  };

  const activityMap = {
    P1_ACT01: { brands:['ALO CLEAN'], limit:10 },
    P1_ACT02: { brands:['BEAUTY REPUBLIC'], limit:8 },
    P1_ACT03: { brands:['BEAUTY REPUBLIC','MENCODE'], limit:8 },
    P1_ACT04: { brands:['ALO CLEAN','BEAUTY REPUBLIC'] },
    P1_ACT05: { limit:12 },
    P1_ACT06: { sort:'price-asc', limit:8 },
    P1_ACT07: { brands:['ALO CLEAN'] },
    P1_ACT08: { brands:['ALO CLEAN','BEAUTY REPUBLIC'], limit:6 },
  };

  function productsFor(code, allProducts){
    const cfg = eventMap[code] || activityMap[code];
    if (!cfg) return allProducts.slice(0, 8);
    let list = allProducts.slice();
    if (cfg.brands) list = list.filter(p => cfg.brands.includes(p.BRAND));
    if (cfg.sort === 'price-desc') list.sort((a,b) => (b.GIA_SI_SAU_KM_THUNG||0) - (a.GIA_SI_SAU_KM_THUNG||0));
    if (cfg.sort === 'price-asc')  list.sort((a,b) => (a.GIA_SI_SAU_KM_THUNG||0) - (b.GIA_SI_SAU_KM_THUNG||0));
    if (cfg.limit) list = list.slice(0, cfg.limit);
    return list.length ? list : allProducts.slice(0, 6);
  }

  function note(code){
    return (eventMap[code] || activityMap[code] || {}).note || '';
  }

  // ---------- Sinh túi đề xuất theo sự kiện ----------
  // 8 biến thể: theo giá (Tiết Kiệm/Đầy Đủ/Cao Cấp), size (Mini/Trọn Bộ),
  // và mục đích (Tặng Quà, Gia Đình, Hạng Sang)
  function combosFor(code, allProducts){
    const prods = productsFor(code, allProducts);
    if (prods.length < 2) return [];
    const sortedAsc  = prods.slice().sort((a,b) => (a.GIA_SI_SAU_KM_THUNG||0) - (b.GIA_SI_SAU_KM_THUNG||0));
    const sortedDesc = sortedAsc.slice().reverse();
    const byGift = prods.slice().sort((a,b) => (b.QUA_TANG||0) - (a.QUA_TANG||0));
    const item = events.find(e => e.code === code) || activities.find(a => a.code === code) || { name:'', icon:'🎁' };
    const n = sortedAsc.length;
    const mid4 = Math.max(0, Math.floor((n - 4) / 2));

    // safeSlice: cắt đoạn, nếu không đủ thì cycle qua đầu mảng
    const safeSlice = (arr, start, count) => {
      if (arr.length === 0) return [];
      const out = [];
      for (let i = 0; i < count; i++) out.push(arr[(start + i) % arr.length]);
      return out;
    };

    const variants = [
      { tag:'Tiết Kiệm',  icon:'🪙', badge:'#0ea5e9', items: safeSlice(sortedAsc, 0, 4) },
      { tag:'Mini',       icon:'⚡', badge:'#06b6d4', items: safeSlice(sortedAsc, 0, 2) },
      { tag:'Đầy Đủ',     icon:'✨', badge:'#16a34a', items: safeSlice(sortedAsc, mid4, 4) },
      { tag:'Tặng Quà',   icon:'🎁', badge:'#ec4899', items: safeSlice(byGift, 0, 4) },
      { tag:'Gia Đình',   icon:'👨‍👩‍👧', badge:'#8b5cf6', items: safeSlice(sortedAsc, Math.floor(n/4), 6) },
      { tag:'Cao Cấp',    icon:'👑', badge:'#f59e0b', items: safeSlice(sortedDesc, 0, 4) },
      { tag:'Hạng Sang',  icon:'🏆', badge:'#dc2626', items: safeSlice(sortedDesc, 0, 5) },
      { tag:'Trọn Bộ',    icon:'💎', badge:'#7c3aed', items: safeSlice(sortedAsc, 0, Math.min(8, n)) },
    ];

    return variants
      .filter(v => v.items.length >= 2)
      .map((v, i) => ({
        id: `evt-${code}-${i}`,
        name: `Túi ${v.tag} – ${item.name}`,
        theme: `${item.icon} ${item.name} · gói ${v.tag.toLowerCase()}`,
        tag:   v.tag,
        tagColor: v.badge,
        products: v.items,
      }));
  }

  return { events, activities, statusOf, productsFor, combosFor, note, today };
})();

(() => {
  const STORE='lws_lang';
  const langs=['lo','th','en'];
  const dict={
    lo:{home:'ໜ້າຫຼັກ',services:'ບໍລິການ',portfolio:'ຜົນງານ',pricing:'ລາຄາ',contact:'ຕິດຕໍ່',
      quote:'ຂໍໃບສະເໜີລາຄາ',name:'ຊື່',phone:'ເບີໂທ',email:'ອີເມວ',business:'ທຸລະກິດ',
      service:'ປະເພດບໍລິການ',budget:'ງົບປະມານ',message:'ລາຍລະອຽດໂຄງການ',
      preferred:'ຊ່ອງທາງຕິດຕໍ່',submit:'ສົ່ງຄຳຂໍ',success:'ສົ່ງຄຳຂໍສຳເລັດແລ້ວ',
      failed:'ບໍ່ສາມາດສົ່ງໄດ້ ກະລຸນາລອງໃໝ່',dashboard:'ພາບລວມ',leads:'ລູກຄ້າ',
      calendar:'ນັດໝາຍ',quotations:'ໃບສະເໜີລາຄາ',tasks:'ວຽກ',kanban:'Kanban',
      invoices:'ໃບແຈ້ງໜີ້',reports:'ລາຍງານ',settings:'ຕັ້ງຄ່າ',team:'ທີມງານ',
      login:'ເຂົ້າລະບົບ',logout:'ອອກຈາກລະບົບ'},
    th:{home:'หน้าหลัก',services:'บริการ',portfolio:'ผลงาน',pricing:'ราคา',contact:'ติดต่อ',quote:'ขอใบเสนอราคา',
      name:'ชื่อ',phone:'เบอร์โทร',email:'อีเมล',business:'ธุรกิจ',service:'ประเภทบริการ',budget:'งบประมาณ',
      message:'รายละเอียดโครงการ',preferred:'ช่องทางติดต่อ',submit:'ส่งคำขอ',success:'ส่งคำขอสำเร็จแล้ว',
      failed:'ไม่สามารถส่งได้ กรุณาลองใหม่',dashboard:'ภาพรวม',leads:'ลูกค้า',calendar:'นัดหมาย',
      quotations:'ใบเสนอราคา',tasks:'งาน',kanban:'Kanban',invoices:'ใบแจ้งหนี้',reports:'รายงาน',
      settings:'ตั้งค่า',team:'ทีมงาน',login:'เข้าสู่ระบบ',logout:'ออกจากระบบ'},
    en:{home:'Home',services:'Services',portfolio:'Portfolio',pricing:'Pricing',contact:'Contact',quote:'Request a quote',
      name:'Name',phone:'Phone',email:'Email',business:'Business',service:'Service',budget:'Budget',
      message:'Project details',preferred:'Preferred contact',submit:'Submit request',success:'Request sent successfully',
      failed:'Unable to send. Please try again.',dashboard:'Dashboard',leads:'Leads',calendar:'Calendar',
      quotations:'Quotations',tasks:'Tasks',kanban:'Kanban',invoices:'Invoices',reports:'Reports',
      settings:'Settings',team:'Team',login:'Login',logout:'Logout'}
  };
  function get(){const v=localStorage.getItem(STORE); return langs.includes(v)?v:'lo'}
  function t(k){return dict[get()]?.[k]||dict.en[k]||k}
  function apply(){
    document.documentElement.lang=get();
    document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>el.placeholder=t(el.dataset.i18nPlaceholder));
    const sel=document.querySelector('#language-select');
    if(sel){sel.value=get(); sel.onchange=()=>{localStorage.setItem(STORE,sel.value);location.reload()}}
  }
  window.LWS_I18N={get,t,apply};
  document.addEventListener('DOMContentLoaded',apply);
})();
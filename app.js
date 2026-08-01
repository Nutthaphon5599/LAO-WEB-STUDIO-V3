(() => {
  const q = s => document.querySelector(s);
  const form = q('#quote-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const status=q('#form-status');
    const t=window.LWS_I18N.t;
    status.className='status'; status.textContent='...';

    try{
      if(!window.LWS.supabase) throw new Error('NOT_CONFIGURED');
      const fd=new FormData(form);
      const payload={
        p_name:String(fd.get('name')||'').trim(),
        p_phone:String(fd.get('phone')||'').trim(),
        p_email:String(fd.get('email')||'').trim()||null,
        p_business_name:String(fd.get('business_name')||'').trim()||null,
        p_service:String(fd.get('service')||'website'),
        p_budget:String(fd.get('budget')||'').trim()||null,
        p_message:String(fd.get('message')||'').trim(),
        p_preferred_contact:String(fd.get('preferred_contact')||'whatsapp'),
        p_language:window.LWS_I18N.get()
      };
      const {data,error}=await window.LWS.supabase.rpc('submit_public_lead',payload);
      if(error) throw error;
      form.reset(); status.className='status ok'; status.textContent=t('success');
    }catch(err){
      console.error(err); status.className='status err'; status.textContent=t('failed');
    }
  });
})();
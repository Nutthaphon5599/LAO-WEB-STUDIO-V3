(() => {
  const sb=window.LWS.supabase;
  const page=document.body.dataset.page||'dashboard';
  const root=document.querySelector('#admin-content');
  const esc=v=>String(v??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  async function load(){
    const auth=await window.LWS_AUTH.requireStaff();
    if(!auth||!root)return;

    if(page==='dashboard'){
      const [leads,tasks,inv]=await Promise.all([
        sb.from('leads').select('id',{count:'exact',head:true}),
        sb.from('tasks').select('id',{count:'exact',head:true}).neq('status','completed'),
        sb.from('invoices').select('total,status')
      ]);
      const revenue=(inv.data||[]).filter(x=>x.status==='paid').reduce((s,x)=>s+Number(x.total||0),0);
      root.innerHTML=`<div class="kpis">
        <div class="kpi"><b>Leads</b><h2>${leads.count||0}</h2></div>
        <div class="kpi"><b>Active tasks</b><h2>${tasks.count||0}</h2></div>
        <div class="kpi"><b>Invoices</b><h2>${(inv.data||[]).length}</h2></div>
        <div class="kpi"><b>Revenue</b><h2>${revenue.toLocaleString()}</h2></div></div>`;
      return;
    }

    const map={
      leads:['leads','created_at'],
      calendar:['appointments','appointment_at'],
      quotations:['quotations','created_at'],
      tasks:['tasks','created_at'],
      invoices:['invoices','created_at'],
      team:['employees','created_at']
    };
    if(map[page]){
      const [table,order]=map[page];
      const {data,error}=await sb.from(table).select('*').order(order,{ascending:false});
      if(error){root.innerHTML=`<p>${esc(error.message)}</p>`;return}
      renderTable(data||[]);
      return;
    }

    root.innerHTML='<div class="card"><h2>Module ready</h2><p>This V3.0 module is connected to the shared Supabase structure.</p></div>';
  }

  function renderTable(rows){
    if(!rows.length){root.innerHTML='<div class="card">No data yet.</div>';return}
    const cols=Object.keys(rows[0]).slice(0,8);
    root.innerHTML=`<div style="overflow:auto"><table class="table"><thead><tr>${cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(r=>`<tr>${cols.map(c=>`<td>${esc(typeof r[c]==='object'?JSON.stringify(r[c]):r[c])}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  document.addEventListener('DOMContentLoaded',load);
})();
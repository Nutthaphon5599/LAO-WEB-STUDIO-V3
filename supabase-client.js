(() => {
  const url = String(window.LWS_SUPABASE_URL || '').trim();
  const key = String(window.LWS_SUPABASE_ANON_KEY || '').trim();
  const configured =
    /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url) &&
    key.length > 20 &&
    !url.includes('PASTE_') &&
    !key.includes('PASTE_');

  window.LWS = window.LWS || {};
  window.LWS.supabaseConfigured = configured;
  window.LWS.supabase = configured && window.supabase
    ? window.supabase.createClient(url, key, {
        auth: { persistSession: true, autoRefreshToken: true }
      })
    : null;

  window.LWS.healthCheck = async () => {
    if (!window.LWS.supabase) return { ok: false, error: 'NOT_CONFIGURED' };
    const { data, error } = await window.LWS.supabase.rpc('lws_health_check');
    return { ok: !error && data?.version === '3.0.0', data, error: error?.message || null };
  };
})();
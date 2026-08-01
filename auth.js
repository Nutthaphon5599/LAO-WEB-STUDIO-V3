(() => {
  const sb=window.LWS.supabase;
  async function login(email,password){
    if(!sb) throw new Error('NOT_CONFIGURED');
    return sb.auth.signInWithPassword({email,password});
  }
  async function logout(){ if(sb) await sb.auth.signOut(); location.href='admin-login.html'; }
  async function requireStaff(){
    if(!sb){location.href='admin-login.html';return null}
    const {data:{user}}=await sb.auth.getUser();
    if(!user){location.href='admin-login.html';return null}
    const {data:profile}=await sb.from('profiles').select('*').eq('id',user.id).single();
    if(!profile || !['owner','manager','staff'].includes(profile.role)){location.href='admin-login.html';return null}
    return {user,profile};
  }
  window.LWS_AUTH={login,logout,requireStaff};
})();
export default {
 async fetch(request, env) {
  const incoming = new URL(request.url);
  const target = new URL(incoming);
  if (target.pathname === "/" || target.pathname === "/index.html") target.pathname = "/index.html";
  const response = await env.ASSETS.fetch(new Request(target.toString(), request));
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;
  const css = `
<style id="gl-metallic-theme">
:root{color-scheme:dark}
body{background-color:#07172d!important;background-image:radial-gradient(ellipse at 50% 0%,#244b78 0%,#0a1b32 48%,#040b16 100%)!important;color:#f4f8ff!important}
header,nav,.site-header,.header{background:linear-gradient(180deg,#061225f5,#0b2340f5)!important;border-color:#8fcaff66!important}
button,.button,.btn,input[type=submit]{background:linear-gradient(110deg,#075ee0,#159bff 55%,#b6e5ff)!important;color:#041326!important;border:1px solid #d8f0ff!important;box-shadow:0 7px 24px #087cff55,inset 0 1px #fff9!important}
a:hover{color:#7acaff!important}
.card,.product-card,.panel,.contact-card{border-color:#94c9ff66!important;box-shadow:inset 0 1px #ffffff30,0 16px 42px #0005!important}
.gl-mascot-logo{position:absolute;left:18px;top:8px;z-index:30;display:flex;align-items:center;width:clamp(116px,20vw,190px);height:auto}
.gl-mascot-logo img{display:block;width:100%;height:auto;filter:drop-shadow(0 5px 15px #168bff66)}
#gl-our-story{padding:64px 22px;background:linear-gradient(135deg,#f2f8ff,#cbdcf0 55%,#fff);color:#10233d;border-block:1px solid #9ac9f0}
#gl-our-story .gl-wrap{max-width:1100px;margin:auto;display:grid;grid-template-columns:.75fr 1.25fr;gap:38px;align-items:center}
#gl-our-story .gl-kicker{font-size:11px;letter-spacing:.23em;font-weight:900;color:#0875d5}
#gl-our-story h2{font-size:clamp(34px,5vw,56px);line-height:1;margin:12px 0;color:#10233d!important}
#gl-our-story p{font-size:16px;line-height:1.8;color:#334e6b}
#gl-our-story .gl-storybox{padding:28px;background:linear-gradient(145deg,#fff,#e8f2fc);border:1px solid #9bbfe2;box-shadow:0 18px 48px #163c641c;border-left:4px solid #087cff}
@media(max-width:700px){#gl-our-story .gl-wrap{grid-template-columns:1fr;gap:18px}}
.gl-approved-mascot{display:block;width:min(220px,42vw);height:auto;max-height:118px;object-fit:contain;filter:drop-shadow(0 4px 15px #078bff55)}
@media(max-width:700px){.gl-approved-mascot{width:min(190px,45vw);max-height:104px}}
#gl-centrepiece{position:relative;isolation:isolate;overflow:hidden;min-height:760px;display:grid;place-items:center;padding:54px 22px 48px;text-align:center;background:radial-gradient(ellipse at 50% 36%,#174f91 0%,#0a2446 42%,#050d1c 78%);border-bottom:1px solid #6bbcff55}
#gl-centrepiece:before,#gl-centrepiece:after{content:"";position:absolute;z-index:-1;border:1px solid #58aaff38;border-radius:50%;width:min(88vw,980px);aspect-ratio:1;left:50%;top:46%;transform:translate(-50%,-50%);box-shadow:0 0 70px #087cff18,inset 0 0 70px #087cff12}
#gl-centrepiece:after{width:min(70vw,760px);border-color:#d4edff22}
.gl-centre-inner{width:min(1120px,100%);margin:auto;display:flex;align-items:center;flex-direction:column}
.gl-centre-eyebrow{display:flex;align-items:center;gap:16px;color:#a9d8ff;font-size:12px;letter-spacing:.28em;font-weight:800}
.gl-centre-eyebrow span{display:block;width:44px;height:1px;background:linear-gradient(90deg,transparent,#56baff)}
.gl-centre-emblem{display:block;width:min(760px,92vw);height:auto;max-height:490px;object-fit:contain;margin:18px auto 2px;filter:drop-shadow(0 24px 45px #007bff55)}
#gl-centrepiece h1{font-size:clamp(38px,6vw,76px);line-height:.98;letter-spacing:-.045em;margin:12px 0;color:#f6fbff!important;text-shadow:0 4px 28px #168cff55}
#gl-centrepiece p{max-width:680px;margin:12px auto 24px;color:#c8ddf4;font-size:clamp(16px,2vw,21px);line-height:1.65}
.gl-centre-actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.gl-centre-actions a{display:inline-flex;align-items:center;justify-content:center;min-width:190px;padding:16px 24px;border:1px solid #91d0ff;background:linear-gradient(110deg,#075ee0,#159bff 60%,#b6e5ff);color:#06172c!important;text-decoration:none;font-size:12px;font-weight:900;letter-spacing:.15em;box-shadow:0 8px 28px #087cff44}
.gl-centre-actions a:last-child{background:#0b2340;color:#eaf6ff!important}
.gl-centre-foot{margin-top:36px;padding-top:18px;border-top:1px solid #9ccfff35;width:min(650px,90%);font-size:10px;letter-spacing:.3em;color:#91b7db}
.gl-centre-foot i{font-style:normal;color:#4cb6ff;padding:0 12px}
@media(max-width:700px){#gl-centrepiece{min-height:690px;padding:45px 20px 38px}.gl-centre-emblem{width:min(560px,105vw);max-height:350px;margin:24px auto 8px}.gl-centre-eyebrow{font-size:9px;letter-spacing:.16em;gap:8px}.gl-centre-eyebrow span{width:22px}.gl-centre-actions{width:100%;flex-direction:column}.gl-centre-actions a{width:100%;box-sizing:border-box}.gl-centre-foot{font-size:9px;letter-spacing:.2em}}
</style>`;

  const mascotScript = `
<script id="gl-centrepiece-hero">
(function(){
 function install(){
  if(document.getElementById('gl-centrepiece')) return;
  const oldHeading=[...document.querySelectorAll('h1')].find(e=>/BUILT TO STAND APART/i.test(e.textContent));
  if(oldHeading){
   let old=oldHeading;
   while(old.parentElement && old.parentElement!==document.body && !/^(SECTION|MAIN)$/.test(old.tagName)) old=old.parentElement;
   if(old && old!==document.body) old.style.display='none';
  }
  const hero=document.createElement('section');
  hero.id='gl-centrepiece';
  hero.innerHTML='<div class="gl-centre-inner"><div class="gl-centre-eyebrow"><span></span> GORILLA LABS — DISTINCTIVE BY DESIGN <span></span></div><img class="gl-centre-emblem" src="/media/gorilla-mascot-electric-blue.webp" alt="GORILLA LABS electric blue gorilla mascot and emblem"><h1>BUILT TO STAND APART.</h1><p>A bold identity shaped by precision, character and an uncompromising attention to detail.</p><div class="gl-centre-actions"><a href="#collection-preview">EXPLORE THE BRAND</a><a href="#gl-our-story">OUR STORY</a></div><div class="gl-centre-foot">PRECISION <i>•</i> CHARACTER <i>•</i> GORILLA LABS</div></div>';
  const main=document.querySelector('main');
  const header=document.querySelector('header');
  if(main) main.prepend(hero); else if(header) header.after(hero); else document.body.prepend(hero);
 }
 if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true}); else install();
})();
</script>`;
  const story = `
<section id="gl-our-story"><div class="gl-wrap">
<div><div class="gl-kicker">THE PEOPLE & PURPOSE</div><h2>OUR STORY</h2><p>The thinking, ambition and inspiration behind GORILLA LABS.</p></div>
<div class="gl-storybox"><div id="gl-story-heading" class="gl-kicker">THE STORY BEHIND THE BRAND</div><p id="gl-story-text">Our story is being written. Check back soon to discover how GORILLA LABS began and the ideas behind the brand.</p></div>
</div></section>
<script>fetch('/site-settings.json').then(r=>r.ok?r.json():null).then(s=>{if(!s)return;if(s.story_heading)document.getElementById('gl-story-heading').textContent=s.story_heading;if(s.story_text&&s.story_text.trim())document.getElementById('gl-story-text').textContent=s.story_text}).catch(()=>{});</script>`;
  return new HTMLRewriter()
   .on("head",{element(e){e.append(css,{html:true})}})
   .on("footer",{element(e){e.before(story,{html:true})}})
   .on("body",{element(e){e.append(mascotScript,{html:true})}})
   .transform(response);
 }
};
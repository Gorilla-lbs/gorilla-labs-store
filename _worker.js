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
</style>`;

  const mascotScript = `
<script id="gl-install-approved-mascot">
(function(){
 const h=document.querySelector('header');
 if(!h || h.querySelector('.gl-approved-mascot')) return;
 const leaves=[...h.querySelectorAll('*')].filter(e=>e.children.length===0 && e.textContent.trim()==='G');
 let target=null;
 for(const leaf of leaves){
   let node=leaf;
   for(let i=0;i<6 && node && node!==h;i++,node=node.parentElement){
     const t=(node.innerText||node.textContent||'').replace(/\\s+/g,' ').trim();
     if(/GORILLA/i.test(t)&&/LABS/i.test(t)){target=node;break;}
   }
   if(target)break;
 }
 if(!target){
   const links=[...h.querySelectorAll('a')];
   target=links.find(e=>/GORILLA/i.test(e.textContent)&&/LABS/i.test(e.textContent));
 }
 if(target){
   target.innerHTML='<img class="gl-approved-mascot" src="/media/gorilla-mascot-electric-blue.webp" alt="GORILLA LABS electric blue gorilla mascot logo">';
   target.setAttribute('aria-label','GORILLA LABS');
   target.style.display='flex';
   target.style.alignItems='center';
   target.style.maxWidth='220px';
 }
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
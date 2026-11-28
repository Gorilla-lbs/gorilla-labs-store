export default {
 async fetch(request, env) {
  const url = new URL(request.url);
  const assetRequest = url.pathname === "/" ? new Request(new URL("/index.html", url), request) : request;
  const response = await env.ASSETS.fetch(assetRequest);
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;
  const css = `
<style id="gl-metallic-store-refresh">
:root{--black:#071321;--red:#168cff;--line:#35506b;--muted:#b8c8da}
body{background:#071321!important;color:#f2f7ff!important}
.top{background:linear-gradient(90deg,#071321,#12365e,#071321)!important;color:#c6e6ff!important;border-color:#5c91c455!important}
header{background:linear-gradient(180deg,#050d19,#0c2038)!important;border-color:#6eaee455!important}
.hero{position:relative;overflow:hidden;background:radial-gradient(ellipse at 75% 35%,#1769bd55,transparent 42%),linear-gradient(125deg,#050d19 4%,#0d2745 58%,#071321)!important}
.hero:before{background:repeating-linear-gradient(128deg,transparent 0 110px,#d9efff09 112px,#d9efff09 114px,transparent 116px 220px)!important}
.hero .wrap{position:relative;z-index:1}
.hero h1{color:#f7fbff!important;text-shadow:0 5px 24px #168cff33}
.hero .kicker,.kicker{color:#8ecfff!important}
.hero-logo{display:none!important}
.logo{filter:drop-shadow(0 4px 12px #168cff33)}
.btn{background:linear-gradient(110deg,#0868d7,#168fff 58%,#b8e5ff)!important;color:#061426!important;border:1px solid #b9e3ff!important;box-shadow:0 8px 24px #087cff35!important}
.btn.alt{background:transparent!important;color:#eaf6ff!important;border:1px solid #8ecaff!important}
.content{background:linear-gradient(145deg,#0a1c31,#0c2745)!important;border-color:#5d91bf33!important}
.content h2,.content h3{color:#f3f8ff!important}
.cat,.product,.contact{background:linear-gradient(145deg,#102b49,#091a2e)!important;border:1px solid #8bc7ff40!important;box-shadow:0 12px 32px #0005,inset 0 1px #ffffff10!important}
.product img{background:#f4f8fc!important}
.price{color:#9ed6ff!important}
.muted,.content p{color:#bdcfe2!important}
.cartbar{background:rgba(4,13,25,.96)!important;border-top:1px solid #8ecaff55!important;backdrop-filter:blur(12px)}
footer{background:#030a14!important;border-color:#5b8fbd55!important}
#gl-our-story{padding:68px 22px;background:linear-gradient(130deg,#f4f8fd,#dce8f4 65%,#fff);color:#10243c;border-block:1px solid #8fb9df}
#gl-our-story .gl-story-wrap{max-width:1120px;margin:auto;display:grid;grid-template-columns:.8fr 1.2fr;gap:36px;align-items:center}
#gl-our-story .gl-eyebrow{font-size:11px;letter-spacing:.22em;font-weight:900;color:#0876d8}
#gl-our-story h2{font-size:clamp(34px,5vw,54px);line-height:1;margin:12px 0;color:#10243c}
#gl-our-story p{font-size:16px;line-height:1.8;color:#304b68}
#gl-our-story .gl-story-card{padding:28px;background:linear-gradient(145deg,#fff,#e8f2fc);border:1px solid #a7c5e3;border-left:4px solid #168cff;box-shadow:0 16px 42px #163c641c}
@media(max-width:700px){.hero-logo{width:min(340px,88vw)!important;max-height:300px!important;margin:22px auto 0!important}#gl-our-story .gl-story-wrap{grid-template-columns:1fr;gap:16px}}
</style>`;
  const story = `
<section id="gl-our-story"><div class="gl-story-wrap"><div><div class="gl-eyebrow">THE PEOPLE & PURPOSE</div><h2>OUR STORY</h2><p>The thinking, ambition and inspiration behind GORILLA LABS.</p></div><div class="gl-story-card"><div id="gl-story-heading" class="gl-eyebrow">THE STORY BEHIND THE BRAND</div><p id="gl-story-text">Your story belongs here. Add how GORILLA LABS began and what inspired the brand through Store Settings.</p></div></div></section>
<script>fetch('/site-settings.json').then(r=>r.ok?r.json():null).then(s=>{if(!s)return;if(s.story_heading)document.getElementById('gl-story-heading').textContent=s.story_heading;if(s.story_text&&s.story_text.trim())document.getElementById('gl-story-text').textContent=s.story_text}).catch(()=>{});</script>`;
  return new HTMLRewriter()
   .on("head",{element(e){e.append(css,{html:true})}})
   .on("#shop",{element(e){e.before(story,{html:true})}})
   .on("a[href='#contact']",{element(e){e.setAttribute("href","mailto:gorillalbs@gmail.com")}})
   .transform(response);
 }
};
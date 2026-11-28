export default {
 async fetch(request, env) {
  const response = await env.ASSETS.fetch(request);
  const url = new URL(request.url);
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;
  const css = `
<style id="gl-premium-refresh">
:root{color-scheme:dark}
body{background:#071321!important;color:#eef5ff!important}
header,nav,.site-header,.header{background:linear-gradient(180deg,#050d19,#0b2038)!important;border-color:#7399bd55!important}
main{background:transparent!important}
section{scroll-margin-top:90px}
button,.button,.btn,input[type=submit]{background:linear-gradient(110deg,#0759bb,#1689e8 58%,#b8e3ff)!important;color:#061426!important;border:1px solid #c8e9ff!important;box-shadow:0 6px 20px #087cff30!important}
a{transition:color .2s ease,opacity .2s ease}
a:hover{color:#7fcaff!important}
.card,.product-card,.panel,.contact-card{background:linear-gradient(145deg,#10243b,#091626)!important;border:1px solid #8ab8e055!important;box-shadow:0 14px 36px #0005,inset 0 1px #ffffff10!important}
h1,h2,h3{color:#f4f8ff!important;letter-spacing:-.025em}
.gl-mascot-feature{display:block;width:min(440px,78vw);max-height:330px;object-fit:contain;margin:0 auto 20px;filter:drop-shadow(0 16px 35px #078bff55)}
.gl-mascot-stage{position:relative;isolation:isolate;text-align:center;padding-top:26px!important}
.gl-mascot-stage:before{content:"";position:absolute;z-index:-1;width:min(620px,90vw);aspect-ratio:1;left:50%;top:40%;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,#14549a66 0%,#0b2a4d44 45%,transparent 72%);pointer-events:none}
#gl-our-story{padding:66px 22px;background:linear-gradient(135deg,#f3f8ff,#d5e5f5 55%,#fff);color:#142a43;border-block:1px solid #9bbbd8}
#gl-our-story .gl-wrap{max-width:1100px;margin:auto;display:grid;grid-template-columns:.75fr 1.25fr;gap:38px;align-items:center}
#gl-our-story .gl-kicker{font-size:11px;letter-spacing:.23em;font-weight:900;color:#0875d5}
#gl-our-story h2{font-size:clamp(34px,5vw,56px);line-height:1;margin:12px 0;color:#10233d!important}
#gl-our-story p{font-size:16px;line-height:1.8;color:#334e6b}
#gl-our-story .gl-storybox{padding:28px;background:linear-gradient(145deg,#fff,#e8f2fc);border:1px solid #9bbfe2;box-shadow:0 18px 48px #163c641c;border-left:4px solid #087cff}
@media(max-width:700px){#gl-our-story .gl-wrap{grid-template-columns:1fr;gap:18px}.gl-mascot-feature{width:min(330px,84vw);max-height:260px}}
</style>`;
  const additions = `
<script id="gl-original-homepage-enhancements">
(()=>{
 const email="mailto:gorillalbs@gmail.com";
 const norm=v=>(v||"").replace(/\\s+/g," ").trim().toLowerCase();
 document.addEventListener("click",event=>{
  const path=typeof event.composedPath==="function"?event.composedPath():[event.target];
  const contact=path.some(n=>n&&n.textContent&&n.tagName&&["contact","get in touch","contact gorilla labs"].includes(norm(n.textContent)));
  if(contact){event.preventDefault();event.stopPropagation();location.href=email;}
 },true);
 document.querySelectorAll('a[href*="contact"],a[href*="#contact"]').forEach(a=>{a.href=email;a.removeAttribute("target")});
 function enhance(){
  const main=document.querySelector("main")||document.body;
  const heading=[...main.querySelectorAll("h1")].find(h=>h.textContent.trim());
  if(heading&&!main.querySelector(".gl-mascot-feature")){
   let stage=heading;
   while(stage.parentElement&&stage.parentElement!==main&&stage.parentElement.tagName!=="SECTION")stage=stage.parentElement;
   stage.classList.add("gl-mascot-stage");
   const img=document.createElement("img");
   img.className="gl-mascot-feature";
   img.src="/media/gorilla-mascot-electric-blue.webp";
   img.alt="GORILLA LABS electric blue gorilla mascot";
   heading.parentNode.insertBefore(img,heading);
  }
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",enhance,{once:true});else enhance();
})();
</script>
<section id="gl-our-story"><div class="gl-wrap"><div><div class="gl-kicker">THE PEOPLE & PURPOSE</div><h2>OUR STORY</h2><p>The thinking, ambition and inspiration behind GORILLA LABS.</p></div><div class="gl-storybox"><div id="gl-story-heading" class="gl-kicker">THE STORY BEHIND THE BRAND</div><p id="gl-story-text">Our story is being written. Add your own introduction to the brand through Store Settings.</p></div></div></section>
<script>fetch('/site-settings.json').then(r=>r.ok?r.json():null).then(s=>{if(!s)return;if(s.story_heading)document.getElementById('gl-story-heading').textContent=s.story_heading;if(s.story_text&&s.story_text.trim())document.getElementById('gl-story-text').textContent=s.story_text}).catch(()=>{});</script>`;
  return new HTMLRewriter()
   .on("head",{element(e){e.append(css,{html:true})}})
   .on("footer",{element(e){e.before(additions,{html:true})}})
   .transform(response);
 }
};
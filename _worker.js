export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const url = new URL(request.url);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html") || (url.pathname !== "/" && url.pathname !== "/index.html")) return response;

    const redesign = `
<style id="gorilla-metallic-refresh">
:root{--gl-blue:#087cff;--gl-cyan:#54c4ff;--gl-navy:#07172d;--gl-silver:#dce8f5;--gl-white:#f8fbff}
html{scroll-behavior:smooth}
body{background:radial-gradient(ellipse at 50% 0%,#17365b 0%,#09182c 42%,#050b16 100%)!important;color:#f5f9ff!important}
header,nav,.site-header,.header{background:linear-gradient(180deg,rgba(4,13,27,.98),rgba(10,27,49,.96))!important;border-color:#8bcaff55!important;box-shadow:0 8px 32px #0007,inset 0 1px #ffffff24!important}
section,main,.section,.panel,.card,.product-card,.contact-card,.story-card{border-color:#8bbce955!important}
section,.panel,.card,.product-card,.contact-card{background:linear-gradient(145deg,rgba(248,252,255,.12),rgba(91,145,201,.07))!important;box-shadow:inset 0 1px #ffffff25,0 16px 42px #0004!important}
h1,h2,h3,.section-title{color:#f7fbff!important;text-shadow:0 2px 18px #5ebaff44}
p,.muted,.description{color:#c6d7e9}
a{transition:color .2s ease,filter .2s ease}
a:hover{color:#70c5ff!important}
button,.button,.btn,[role=button],input[type=submit]{background:linear-gradient(110deg,#075ee0,#159bff 55%,#a7ddff)!important;color:#041326!important;border:1px solid #c6eaff!important;box-shadow:0 7px 24px #087cff44,inset 0 1px #ffffff99!important;font-weight:800!important}
input,textarea,select{background:#f4f8fd!important;color:#10243e!important;border:1px solid #8bbce9!important}
footer{background:linear-gradient(180deg,#0b1d34,#030914)!important;border-top:1px solid #82c8ff66!important;color:#c7d8eb!important}
img{max-width:100%}
#gl-our-story{scroll-margin-top:100px;padding:76px 22px;background:linear-gradient(135deg,#eaf5ff,#cbdcf0 55%,#f9fcff);color:#10233d;border-top:1px solid #fff;border-bottom:1px solid #9ac9f0}
#gl-our-story .gl-wrap{max-width:1100px;margin:auto;display:grid;grid-template-columns:.75fr 1.25fr;gap:38px;align-items:center}
#gl-our-story .gl-kicker{font-size:11px;letter-spacing:.25em;font-weight:900;color:#0875d5}
#gl-our-story h2{font-size:clamp(34px,5vw,56px);line-height:1;margin:12px 0;color:#10233d!important;text-shadow:none}
#gl-our-story p{font-size:16px;line-height:1.8;color:#334e6b}
#gl-our-story .gl-storybox{padding:30px;background:linear-gradient(145deg,#fff,#e8f2fc);border:1px solid #9bbfe2;box-shadow:0 18px 48px #163c641c;border-left:4px solid #087cff}
@media(max-width:700px){#gl-our-story{padding:56px 18px}#gl-our-story .gl-wrap{grid-template-columns:1fr;gap:18px}header,nav{backdrop-filter:blur(12px)}}
</style>
<section id="gl-our-story">
 <div class="gl-wrap">
  <div><div class="gl-kicker">THE PEOPLE & PURPOSE</div><h2>OUR STORY</h2><p>The thinking, ambition and inspiration behind GORILLA LABS.</p></div>
  <div class="gl-storybox"><div id="gl-story-heading" class="gl-kicker">THE STORY BEHIND THE BRAND</div><p id="gl-story-text">Our story is being written. Check back soon to discover how GORILLA LABS began and the ideas behind the brand.</p></div>
 </div>
</section>
<script>
fetch('/site-settings.json').then(r=>r.ok?r.json():null).then(s=>{
 if(!s)return;
 if(s.story_heading)document.getElementById('gl-story-heading').textContent=s.story_heading;
 if(s.story_text&&s.story_text.trim())document.getElementById('gl-story-text').textContent=s.story_text;
}).catch(()=>{});
</script>`;

    return new HTMLRewriter()
      .on("head", { element(element) { element.append(redesign.slice(0, redesign.indexOf("<section id=\"gl-our-story\">")), { html: true }); } })
      .on("footer", { element(element) { element.before(redesign.slice(redesign.indexOf("<section id=\"gl-our-story\">")), { html: true }); } })
      .on("body", { element(element) { element.append(redesign.slice(redesign.indexOf("<section id=\"gl-our-story\">")), { html: true }); } })
      .transform(response);
  }
};
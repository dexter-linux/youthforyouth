
/* Campaign website settings. Replace the email and social links before publishing. */
const SITE_CONFIG = {
  campaignEmail: "REPLACE-WITH-OFFICIAL-EMAIL@example.com",
  facebookUrl: "",
  tiktokUrl: "",
  instagramUrl: ""
};

const navItems = [
  ["Home","index.html"],["About Gachara","about.html"],["Our Vision","vision.html"],
  ["Achievements","achievements.html"],["Events","events.html"],["Gallery","gallery.html"],["Contact","contact.html"]
];

function renderChrome(){
  const current = location.pathname.split("/").pop() || "index.html";
  const header = document.querySelector("[data-site-header]");
  const footer = document.querySelector("[data-site-footer]");
  if(header){
    header.innerHTML = `<header class="site-header"><div class="container nav-wrap">
      <a class="brand" href="index.html"><span class="brand-mark">GN</span><span class="brand-copy"><b>GACHARA NDIRANGU</b><small>OL MORAN WARD</small></span></a>
      <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button>
      <nav class="nav-links" aria-label="Main navigation">${navItems.map(([label,url])=>`<a href="${url}" class="${current===url?'active':''}">${label}</a>`).join("")}</nav>
      <div class="nav-actions"><a class="nav-cta" href="login.html">Login</a><a class="nav-cta" href="register.html">Register</a></div>
    </div></header>`;
    const toggle = header.querySelector(".menu-toggle");
    const nav = header.querySelector(".nav-links");
    toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.textContent=open?"×":"☰";});
  }
  if(footer){
    footer.innerHTML = `<footer class="site-footer"><div class="container"><div class="footer-grid">
      <div><div class="footer-brand">GACHARA <span>NDIRANGU</span></div><p class="footer-intro">MCA Aspirant · Ol Moran Ward<br>Unity, Knowledge and Wealth.</p></div>
      <div class="footer-col"><h4>EXPLORE</h4><a href="about.html">About Gachara</a><a href="vision.html">Our Vision</a><a href="achievements.html">Achievements</a><a href="events.html">Events</a></div>
      <div class="footer-col"><h4>TAKE PART</h4><a href="gallery.html">Community Gallery</a><a href="register.html">Register / Volunteer</a><a href="contact.html">Contact</a></div>
    </div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Gachara Ndirangu. All rights reserved.</span><span>UNITY · KNOWLEDGE · WEALTH</span></div></div></footer>`;
  }
}

/* The deployment workflow creates images/areas/manifest.json from every image in that folder. */
async function loadAreaImages(){
  let items=[];
  try{
    const response=await fetch("images/areas/manifest.json",{cache:"no-store"});
    if(!response.ok) throw new Error("No image manifest yet");
    items=await response.json();
  }catch(error){items=[];}
  const preview=document.querySelector("[data-area-preview]");
  const gallery=document.querySelector("[data-gallery]");
  const count=document.querySelector("[data-gallery-count]");
  const makeTile=(item,compact=false)=>`<a class="${compact?'area-tile':'gallery-item'}" href="${item.src}" target="_blank" rel="noopener"><img src="${item.src}" alt="${escapeHTML(item.alt||item.title||'Ol Moran community photograph')}" loading="lazy"><${compact?'span':'figcaption'}>${escapeHTML(item.title||item.alt||'Ol Moran Ward')}</${compact?'span':'figcaption'}></a>`;
  if(preview){
    preview.innerHTML=items.length?items.slice(0,3).map(x=>makeTile(x,true)).join(""):'<div class="empty-gallery">Add your community photographs to <code>images/areas/</code> to display them here.</div>';
  }
  if(gallery){
    gallery.innerHTML=items.length?items.map(x=>makeTile(x,false)).join(""):'<div class="empty-gallery">Your gallery is ready. Add photographs to <code>images/areas/</code> and publish the site.</div>';
  }
  if(count) count.textContent=`${items.length} photograph${items.length===1?'':'s'} in the community gallery`;
}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

function setupMailForms(){
  document.querySelectorAll("[data-mail-form]").forEach(form=>{
    form.addEventListener("submit",event=>{
      event.preventDefault();
      const feedback=form.querySelector(".form-feedback");
      if(!SITE_CONFIG.campaignEmail || SITE_CONFIG.campaignEmail.includes("REPLACE-WITH")){
        feedback.textContent="Please configure the official campaign email in assets/js/site.js before using this form.";
        return;
      }
      const data=new FormData(form);
      const subject=encodeURIComponent(form.classList.contains("registration-form")?"Campaign registration interest":"Website message");
      const body=encodeURIComponent([...data.entries()].map(([k,v])=>`${k}: ${v}`).join("\\n"));
      window.location.href=`mailto:${SITE_CONFIG.campaignEmail}?subject=${subject}&body=${body}`;
      feedback.textContent="Your email application should open with your message ready to send.";
    });
  });
}
document.addEventListener("DOMContentLoaded",()=>{renderChrome();loadAreaImages();setupMailForms();});

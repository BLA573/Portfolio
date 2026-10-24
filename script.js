(()=>{
const $=id=>document.getElementById(id);
const mt=$('mt'),mdate=$('mdate'),mdesc=$('mdesc'),mlink=$('mlink'),n=$('n'),em=$('em'),mm=$('mm');
// Code rain background
const cv=document.getElementById('rain'),cx=cv.getContext('2d');
const snip=['nmap -sV -p- 10.0.0.1','SELECT * FROM users WHERE 1=1','sudo tcpdump -i eth0','0xDEADBEEF','chmod 600 id_rsa','import socket','GET /admin HTTP/1.1','iptables -A INPUT -j DROP','sqlmap --batch','ssh root@target','def scan(host):','HTTP 403','MQTT CONNECT','hydra -l admin','whoami && id','alert tcp any any','10110100','/etc/shadow','nc -lvnp 4444','TLS 1.3'];
let cols,drops,fs=15;
function size(){cv.width=innerWidth;cv.height=innerHeight;cols=Math.ceil(cv.width/(fs*1.6));drops=Array.from({length:cols},()=>({y:Math.random()*-50,s:snip[Math.random()*snip.length|0],i:0}))}
function draw(){cx.fillStyle='rgba(4,7,10,.12)';cx.fillRect(0,0,cv.width,cv.height);cx.font=fs+'px JetBrains Mono, monospace';
drops.forEach((d,c)=>{const ch=d.s[d.i%d.s.length];cx.fillStyle=d.i%7?'#00ff9c':'#d8ffe9';cx.fillText(ch,c*fs*1.6,d.y*fs);d.i++;d.y++;
if(d.y*fs>cv.height&&Math.random()>.97){d.y=0;d.i=0;d.s=snip[Math.random()*snip.length|0]}})}
size();addEventListener('resize',size);
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)setInterval(draw,70);else{for(let i=0;i<60;i++)draw()}

// Typing tagline
const lines=['Cybersecurity student.','Practical tools, real results.','Building IDS and scanners.','Learning by breaking things (responsibly).'];
const t=document.getElementById('typed');let l=0,k=0,del=false;
function type(){const s=lines[l];t.textContent=s.slice(0,k);
if(!del&&k===s.length){del=true;return setTimeout(type,1600)}
if(del&&k===0){del=false;l=(l+1)%lines.length}
k+=del?-1:1;setTimeout(type,del?25:55)}
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)type();

document.getElementById('yr').textContent=new Date().getFullYear();

// Certificate modal
const m=document.getElementById('modal');
document.querySelectorAll('.cert').forEach(b=>b.addEventListener('click',()=>{
mt.textContent=b.dataset.t;mdate.textContent=b.dataset.d;mdesc.textContent=b.dataset.x;
mlink.classList.toggle('hidden',!b.dataset.l);if(b.dataset.l)mlink.href=b.dataset.l;
m.classList.add('open');m.querySelector('.x').focus()}));
const close=()=>m.classList.remove('open');
m.addEventListener('click',e=>{if(e.target===m||e.target.closest('.x'))close()});
addEventListener('keydown',e=>{if(e.key==='Escape')close()});

// Contact form -> Formspree
document.getElementById('form').addEventListener('submit',async e=>{e.preventDefault();
const f=e.target,st=document.getElementById('status'),btn=f.querySelector('button');
btn.disabled=true;st.textContent='Sending...';
try{const r=await fetch('https://formspree.io/f/xnppawyj',{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},
body:JSON.stringify({name:n.value,email:em.value,message:mm.value})});
if(r.ok){st.textContent='Message sent. Thanks, I will reply soon.';f.reset()}
else st.textContent='Could not send. Please email me directly at hailemichaelsolomon176@gmail.com.'}
catch(_){st.textContent='Network error. Please email me directly at hailemichaelsolomon176@gmail.com.'}
btn.disabled=false});

document.documentElement.classList.add('js');
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;

// Scroll reveal
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.08});
document.querySelectorAll('section:not(#hero) > .wrap').forEach(e=>{e.classList.add('rv');calm?e.classList.add('in'):io.observe(e)});

// Boot sequence (first visit per session)
if(!calm&&!sessionStorage.getItem('booted')){
const b=document.createElement('div');b.id='boot';b.setAttribute('aria-hidden','true');document.body.appendChild(b);
const L=['HAILE-SEC OS v1.0  (c) '+new Date().getFullYear(),'','[ OK ] Loading kernel modules','[ OK ] Mounting /home/haile','[ OK ] Checking file integrity','[ OK ] Starting firewall (default: deny all)','[ OK ] Scanning ports ... 0 open to the public','[ OK ] Loading threat signatures: 20+ rules','[ OK ] Starting intrusion detection','[ OK ] Establishing secure channel (TLS 1.3)','[ OK ] Verifying credentials','[WARN] Visitor detected: logging IP ... just kidding','[ OK ] Decrypting portfolio','','Access granted. Welcome.','','(click anywhere to skip)'];let i=0;
const s=()=>{if(i<L.length){b.textContent+=L[i++]+'\n';setTimeout(s,i<4?260:300)}else{setTimeout(()=>{b.classList.add('off');setTimeout(()=>b.remove(),500)},900)}};
b.addEventListener('click',()=>{b.remove()});sessionStorage.setItem('booted','1');s()}

// Interactive terminal
const out=document.getElementById('tout'),inp=document.getElementById('tcmd'),hist=[];let hp=0;
const C={
help:'Commands: about, skills, projects, certs, experience, contact, resume, github, whoami, clear',
about:'Cybersecurity student at Hawassa University. Cyber Domain Lead at Peak Craft. INSA Summer Camp graduate. Studying CompTIA Security+.',
whoami:'guest (but I would like to hire this person)',
skills:'Linux, Bash, Python, Nmap, Networking, Wireshark, Burp Suite, Metasploit, Nessus, OSINT, C++, Java, PHP',
projects:'1. SQL Injection Scanner\n2. Port Scanner Suite\n3. IoT-Aware IDS\n4. WealthWise Books\n5. Python Speech Assistant\nScroll to #projects for repos and demos.',
certs:'Security+ (in progress), Threats/Vulnerabilities/Mitigations, TryHackMe Pre Security, Udemy Network Security, SkillUp Intro to Cyber Security',
experience:'Cyber Domain Lead, Peak Craft (Oct 2025 - now)\nCybersecurity Graduate, INSA Summer Camp (Jul - Nov 2025)',
contact:'hailemichaelsolomon176@gmail.com | github.com/BLA573 | linkedin.com/in/hailemichaelsolomon',
resume:()=>{location.href='Hailemichael-Solomon-Resume.pdf';return 'Downloading resume...'},
github:()=>{open('https://github.com/BLA573','_blank','noopener');return 'Opening github.com/BLA573...'}};
const put=(t,c)=>{const d=document.createElement('div');if(c)d.className=c;d.textContent=t;out.appendChild(d);out.scrollTop=out.scrollHeight};
put('Type "help" to see commands.','h');
inp.addEventListener('keydown',e=>{
if(e.key==='ArrowUp'&&hist.length){hp=Math.max(0,hp-1);inp.value=hist[hp];e.preventDefault()}
if(e.key==='ArrowDown'){hp=Math.min(hist.length,hp+1);inp.value=hist[hp]||''}
if(e.key!=='Enter')return;
const v=inp.value.trim().toLowerCase();inp.value='';if(!v)return;hist.push(v);hp=hist.length;
put('guest@haile:~$ '+v,'u');
if(v==='clear'){out.textContent='';return}
if(v.startsWith('sudo'))return put('Nice try. This incident will be reported.','e');
const r=C[v];if(!r)return put('command not found: '+v+'. Try "help".','e');
put(typeof r==='function'?r():r)});

// Portrait tilt
const pt=document.getElementById('portrait');
if(pt&&!calm&&matchMedia('(hover:hover)').matches){
pt.addEventListener('pointermove',e=>{const r=pt.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
pt.style.setProperty('--ry',((x-.5)*18)+'deg');pt.style.setProperty('--rx',((.5-y)*18)+'deg');
pt.style.setProperty('--mx',x*100+'%');pt.style.setProperty('--my',y*100+'%')});
pt.addEventListener('pointerleave',()=>{pt.style.setProperty('--rx','0deg');pt.style.setProperty('--ry','0deg')})}

})();

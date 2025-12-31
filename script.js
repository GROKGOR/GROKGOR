console.log("Grokgor jungle fully alive 🦍🌿");

let connectedAddress = null; // Store connected wallet address

// Scroll reveal
const sections = document.querySelectorAll(".animate");
const revealOnScroll = () => {
    const triggerBottom = window.innerHeight / 1.1;
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < triggerBottom) section.classList.add("show");
    });
};
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-nav");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileNav.classList.toggle("active");
});
// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll("#mobile-nav a");
mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileNav.classList.remove("active");
    });
});

// REAL WALLET CONNECT
const connectWalletBtn = document.getElementById("connect-wallet");
const walletText = document.getElementById("wallet-text");

async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            connectedAddress = accounts[0];
            const shortened = `${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}`;
            walletText.innerText = shortened;
            connectWalletBtn.style.background = "linear-gradient(135deg, #4fff7c, #1eff9b)";
            alert(`Wallet connected! 🦍\nAddress: ${shortened}`);
        } catch (error) {
            alert("Connection rejected or failed. Make sure MetaMask is installed!");
            console.error(error);
        }
    } else {
        alert("MetaMask not detected! Install it from metamask.io 🦊");
        window.open("https://metamask.io/download/", "_blank");
    }
}

connectWalletBtn.addEventListener("click", connectWallet);

// BUY NOW BUTTON (pre-launch version)
const buyNowBtn = document.getElementById("buy-now");
const buyText = document.getElementById("buy-text");

buyNowBtn.addEventListener("click", () => {
    if (!connectedAddress) {
        alert("Please connect your wallet first! 🦍");
        return;
    }
    buyText.innerText = "Launch Pending...";
    setTimeout(() => {
        alert("Token not launched yet! 🚀\n\nFair launch coming soon – no presale, pure community power.\n\nStay tuned on Telegram/X for the exact launch time and DEX link!");
        buyText.innerText = "Buy Now";
    }, 300);
});

// Fog
const fogCanvas = document.getElementById("fogCanvas");
const fogCtx = fogCanvas.getContext("2d");

// Leaves
const leavesCanvas = document.getElementById("leavesCanvas");
const leavesCtx = leavesCanvas.getContext("2d");

// Fireflies
const fireflyCanvas = document.getElementById("fireflyCanvas");
const fireflyCtx = fireflyCanvas.getContext("2d");

// Function to resize all canvases
const resizeCanvases = () => {
    fogCanvas.width = window.innerWidth;
    fogCanvas.height = window.innerHeight;
    leavesCanvas.width = window.innerWidth;
    leavesCanvas.height = window.innerHeight;
    fireflyCanvas.width = window.innerWidth;
    fireflyCanvas.height = window.innerHeight;
};
resizeCanvases();
window.addEventListener("load", resizeCanvases);

let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvases, 150);
});

const fogParticles = Array.from({length:40},() => ({
    x:Math.random()*fogCanvas.width,
    y:Math.random()*fogCanvas.height,
    r:50+Math.random()*70,
    a:0.02+Math.random()*0.05,
    dx:-0.2+Math.random()*0.4,
    dy:-0.1+Math.random()*0.2
}));

function drawFog(){
    fogCtx.clearRect(0,0,fogCanvas.width,fogCanvas.height);
    fogParticles.forEach(p => {
        fogCtx.beginPath();
        fogCtx.fillStyle=`rgba(122,255,79,${p.a})`;
        fogCtx.arc(p.x,p.y,p.r,0,Math.PI*2);
        fogCtx.fill();
        p.x+=p.dx; p.y+=p.dy;
        if(p.x<0)p.x=fogCanvas.width;
        if(p.x>fogCanvas.width)p.x=0;
        if(p.y<0)p.y=fogCanvas.height;
        if(p.y>fogCanvas.height)p.y=0;
    });
    requestAnimationFrame(drawFog);
}
drawFog();

const leaves = Array.from({length:50},() => ({
    x:Math.random()*leavesCanvas.width,
    y:Math.random()*leavesCanvas.height,
    s:20+Math.random()*30,
    dx:-0.5+Math.random(),
    dy:0.5+Math.random(),
    r:Math.random()*360
}));

function drawLeaves(){
    leavesCtx.clearRect(0,0,leavesCanvas.width,leavesCanvas.height);
    leaves.forEach(l => {
        leavesCtx.save();
        leavesCtx.translate(l.x,l.y);
        leavesCtx.rotate(l.r*Math.PI/180);
        leavesCtx.fillStyle="rgba(34,139,34,0.3)"; // Reduced opacity for subtlety
        leavesCtx.beginPath();
        leavesCtx.ellipse(0,0,l.s/3,l.s,0,0,Math.PI*2);
        leavesCtx.fill();
        leavesCtx.restore();
        l.x+=l.dx; l.y+=l.dy;
        l.r += Math.sin(Date.now()*0.002 + l.x)*0.2;
        if(l.y>leavesCanvas.height) l.y=-l.s;
    });
    requestAnimationFrame(drawLeaves);
}
drawLeaves();

const fireflies = Array.from({length:40},() => ({
    x:Math.random()*fireflyCanvas.width,
    y:Math.random()*fireflyCanvas.height,
    r:1.5+Math.random()*2.5,
    a:Math.random(),
    g:0.005+Math.random()*0.01,
    dx:-0.2+Math.random()*0.4,
    dy:-0.2+Math.random()*0.4
}));

function drawFireflies(){
    fireflyCtx.clearRect(0,0,fireflyCanvas.width,fireflyCanvas.height);
    fireflies.forEach(f => {
        fireflyCtx.beginPath();
        fireflyCtx.fillStyle=`rgba(200,255,120,${f.a * 0.5})`; // Reduced overall opacity for subtlety
        fireflyCtx.shadowBlur=12;
        fireflyCtx.shadowColor="rgba(200,255,120,0.4)";
        fireflyCtx.arc(f.x,f.y,f.r,0,Math.PI*2);
        fireflyCtx.fill();
        f.x+=f.dx; f.y+=f.dy; f.a+=f.g;
        if(f.a>0.9||f.a<0.1) f.g*=-1;
    });
    requestAnimationFrame(drawFireflies);
}
drawFireflies();

// Tokenomics counter
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const el = entry.target;
            const target = +el.getAttribute('data-target');
            let count = 0;
            const increment = target / 200;
            const update = () => {
                count += increment;
                if(count < target){
                    el.innerText = Math.floor(count).toLocaleString();
                    requestAnimationFrame(update);
                } else {
                    el.innerText = target.toLocaleString();
                }
            }
            update();
            counterObserver.unobserve(el);
        }
    });
},{ threshold: 0.5 });
counters.forEach(counter => counterObserver.observe(counter));

// Parallax mouse for fireflies & leaves
document.addEventListener("mousemove", e => {
    const moveX = (e.clientX - window.innerWidth/2) * 0.002;
    const moveY = (e.clientY - window.innerHeight/2) * 0.002;
    leaves.forEach(l => { l.x += moveX; l.y += moveY; });
    fireflies.forEach(f => { f.x += moveX; f.y += moveY; });

});

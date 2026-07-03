// ===== CONFIG =====
const VIP_PASSWORD = "1motiveVIP"; // Your VIP password
const BACKGROUND_IMAGE = "https://i.postimg.cc/G212fFz2/anime-8801333-1280.png"; // PNG background

// ===== DOM ELEMENTS =====
const loginScreen = document.getElementById("loginScreen");
const generator = document.getElementById("generator");
const vipPasswordInput = document.getElementById("vipPassword");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");
const bgVideo = document.getElementById("bgVideo");

// ===== SET BACKGROUND =====
if(bgVideo){
  bgVideo.style.display = "none"; // hide video
  document.body.style.backgroundImage = `url('${BACKGROUND_IMAGE}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
}

// ===== PASSWORD CHECK =====
function checkPassword(){
  const input = vipPasswordInput.value.trim();
  if(input === VIP_PASSWORD){
    successMsg.innerText = "✅ You have been granted access!";
    errorMsg.innerText = "";
    setTimeout(()=>{
      loginScreen.style.display = "none";
      generator.style.display = "block";
    },500);
  } else {
    successMsg.innerText = "";
    errorMsg.innerHTML = "❌ Incorrect password.<br>Contact <b>1motive651 via Discord</b> or <b>@1._motive TikTok / @motive2calm Instagram</b> for access.";
  }
}

// ===== OneMotive Sensi Generator =====
function generate() {
  const type = document.getElementById("type").value;
  const playstyle = document.getElementById("playstyle").value;
  const pref = document.getElementById("pref").value;

  const pcSection = document.getElementById("pcSection");
  pcSection.style.display = (type === "pc") ? "block" : "none";

  function safeRand(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

  const xValues = [2.1,2.3,2.5,2.7,2.9,3.1,3.3,3.5,3.7,3.9];
  const yValues = [1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8];
  const rawConfigs = ["88088","21058","400202","80103450","948816458","800021002","80800080","102421058","808016450","148816450","158816450","838816450","807488066","807488082","7488066","58016450"];

  let extra = "";
  if(type==="iphone"){ 
    const styles=["Single","Refined","Precise"];
    extra="Gliding Cursor: 120 ("+styles[Math.floor(Math.random()*3)]+")";
  } else if(type==="pc"){
    const x = xValues[Math.floor(Math.random()*xValues.length)];
    const y = yValues[Math.floor(Math.random()*yValues.length)];
    extra="Emulator → X: "+x+" | Y: "+y;

    let configs = [];
    for(let i=0;i<3;i++){
      configs.push(rawConfigs[Math.floor(Math.random()*rawConfigs.length)]);
    }
    document.getElementById("pcTweaks").innerText = "Configs: "+configs.join(" | ")+"\n\n• Raw Input ON\n• No Mouse Acceleration\n• 60+ FPS Stable";
  } else {
    extra = "DPI: "+(Math.floor(Math.random()*300)+700);
  }

  let min,max;
  if(pref==="low"){min=40; max=112;}
  else if(pref==="mid"){min=90; max=160;}
  else{min=140; max=200;}
  if(playstyle==="freestyle"){min+=10; max+=10;}
  if(playstyle==="sniper"){min-=10; max-=10;}

  const general = (type==="pc")? safeRand(8,15) : safeRand(min,max);
  const redDot = (type==="pc")? safeRand(10,18) : safeRand(min+10,max);
  const twoX = (type==="pc")? safeRand(12,20) : safeRand(min,max);
  const fourX = (type==="pc")? safeRand(10,18) : safeRand(min-20,max-10);
  const fire = (type==="pc")? safeRand(40,60) : safeRand(50,70);

  const results = [
    {id:"extraResult", value:extra},
    {id:"generalResult", value:"General: "+general},
    {id:"redDotResult", value:"Red Dot: "+redDot},
    {id:"twoXResult", value:"2X Scope: "+twoX},
    {id:"fourXResult", value:"4X Scope: "+fourX},
    {id:"fireResult", value:"Fire Button: "+fire}
  ];

  results.forEach((r,i)=>{
    const el = document.getElementById(r.id);
    el.innerText = r.value;
    el.className = `result-${i+1}`;
  });
}

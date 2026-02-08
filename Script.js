function handleGridAction(type) {
    if(type === 'Prescription') {
        document.getElementById('file-input').click();
    } else if(type === 'Appointment') {
        window.open("https://calendar.google.com/", "_blank");
    } else if(type === 'Consultation') {
        window.open("https://meet.google.com/", "_blank");
    }
}

/* AI REMEDY LOGIC */
function runAnalysis() {
    const desc = document.getElementById('txt-area').value.toLowerCase();
    const resultDiv = document.getElementById('analysis-result');
    const resultContent = document.getElementById('res-content');
    
    if(!desc) {
        alert("Please describe your issue first.");
        return;
    }

    resultDiv.style.display = 'block';
    resultContent.innerHTML = "Processing data...";

    setTimeout(() => {
        let remedy = "Based on your input, we suggest keeping the area clean and dry. ";
        if(desc.includes("red") || desc.includes("itch")) {
            remedy += "Possible mild inflammation. Remedy: Apply a cold compress and avoid scratching. Use a fragrance-free moisturizer.";
        } else if (desc.includes("blurry") || desc.includes("eye")) {
            remedy += "Possible eye strain. Remedy: Follow the 20-20-20 rule. Rest your eyes and use lubricating drops. If pain persists, see an ophthalmologist.";
        } else {
            remedy += "General suggestion: Monitor symptoms for 24 hours. If they worsen, use the 'Appointment' button above.";
        }
        resultContent.innerHTML = remedy;
        addChatMsg("bot", "I've analyzed your description. Check the analysis box for suggestions!");
    }, 1500);
}

/* CHATBOT LOGIC */
function addChatMsg(sender, text) {
    const body = document.getElementById('chat-body');
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    div.innerText = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}

function sendChatMsg() {
    const input = document.getElementById('chat-user-input');
    const val = input.value.trim();
    if(!val) return;

    addChatMsg("user", val);
    input.value = "";

    setTimeout(() => {
        let reply = "I'm here to help! You can ask me about skin rashes, eye fatigue, or how to book an appointment.";
        if(val.toLowerCase().includes("doctor") || val.toLowerCase().includes("appointment")) {
            reply = "I can help you book an appointment. Simply click the 'Appointment' button in the menu above.";
        } else if(val.toLowerCase().includes("hello") || val.toLowerCase().includes("hi")) {
            reply = "Hello! I am Skivis AI. How are your skin and eyes feeling today?";
        }
        addChatMsg("bot", reply);
    }, 800);
}

/* SETTINGS & LANGUAGE LOGIC */
const translations = {
    en: {
        heroTitle: "SKIVIS",
        heroDesc: "AI-Powered Skin & Eye Care Platform\nScan • Record • Understand • Care",
        appt: "🏥 Appointment",
        cons: "💻 Online Consultation",
        presc: "📄 Upload Prescription",
        camTitle: "Live AI Camera Scanner",
        tmModel: "Teachable Machine Image Model",
        startBtn: "Start Live Scan",
        recording: "● AI Analysis Active",
        upTitle: "Upload Image for AI Analysis",
        upDesc: "Please upload a clear image and describe the issue for better accuracy.",
        descIssue: "Describe Your Issue",
        selectImg: "Select Image",
        analyzeBtn: "Analyze Image",
        placeholder: "Example: redness, itching, swelling, blurry vision...",
        chatWelcome: "Hello! How can I help you today?",
        themeLbl: "Theme",
        langLbl: "Language",
        darkBtn: "Toggle Dark Mode"
    },
    hi: {
        heroTitle: "स्किविस",
        heroDesc: "एआई-संचालित त्वचा और आंखों की देखभाल मंच\nस्कैन • रिकॉर्ड • समझें • देखभाल",
        appt: "🏥 अपॉइंटमेंट",
        cons: "💻 ऑनलाइन परामर्श",
        presc: "📄 नुस्खा अपलोड करें",
        camTitle: "लाइव एआई कैमरा स्कैनर",
        tmModel: "टीचेबल मशीन इमेज मॉडल",
        startBtn: "लाइव स्कैन शुरू करें",
        recording: "● एआई विश्लेषण सक्रिय",
        upTitle: "एआई विश्लेषण के लिए छवि अपलोड करें",
        upDesc: "बेहतर सटीकता के लिए कृपया एक स्पष्ट छवि अपलोड करें और समस्या का वर्णन करें।",
        descIssue: "अपनी समस्या का वर्णन करें",
        selectImg: "छवि चुनें",
        analyzeBtn: "छवि का विश्लेषण करें",
        placeholder: "उदाहरण: लालिमा, खुजली, सूजन, धुंधली दृष्टि...",
        chatWelcome: "नमस्ते! आज मैं आपकी क्या सहायता कर सकता हूँ?",
        themeLbl: "थीम",
        langLbl: "भाषा",
        darkBtn: "डार्क मोड बदलें"
    }
};

function changeLanguage(lang) {
    const t = translations[lang];
    document.getElementById('hero-title').innerText = t.heroTitle;
    document.getElementById('hero-desc').innerText = t.heroDesc;
    document.getElementById('btn-appt').innerText = t.appt;
    document.getElementById('btn-cons').innerText = t.cons;
    document.getElementById('btn-presc').innerText = t.presc;
    document.getElementById('card-cam-title').innerText = t.camTitle;
    document.getElementById('lbl-tm').innerText = t.tmModel;
    document.getElementById('btn-start-scan').innerText = t.startBtn;
    document.getElementById('lbl-recording').innerText = t.recording;
    document.getElementById('card-up-title').innerText = t.upTitle;
    document.getElementById('card-up-desc').innerText = t.upDesc;
    document.getElementById('lbl-desc').innerText = t.descIssue;
    document.getElementById('lbl-select').innerText = t.selectImg;
    document.getElementById('btn-analyze').innerText = t.analyzeBtn;
    document.getElementById('txt-area').placeholder = t.placeholder;
    document.getElementById('chat-welcome').innerText = t.chatWelcome;
    document.getElementById('lbl-mode').innerText = t.themeLbl;
    document.getElementById('lbl-lang').innerText = t.langLbl;
    document.getElementById('btn-darkmode').innerText = t.darkBtn;
}

function toggleSettings() {
    let m = document.getElementById('settings-menu');
    m.style.display = m.style.display === 'block' ? 'none' : 'block';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

/* BACKGROUND SLIDESHOW */
let bg=document.querySelectorAll('.bg-slide'),b=0;
setInterval(()=>{
    if(bg.length > 0) {
        bg[b].classList.remove('active');
        b=(b+1)%bg.length;
        bg[b].classList.add('active');
    }
},5000);

/* CHAT TOGGLE */
function toggleChat(){
    let c=document.getElementById('chat-box');
    c.style.display= (c.style.display==='none' || c.style.display === '') ? 'flex' : 'none';
}

/* TEACHABLE MACHINE LOGIC - FIX: Using your provided model URL */
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/aWH6C_51u/"; 

let model, webcam, labelContainer, maxPredictions;

 async function init() {
        // FIX: Changed 'URL' to 'MODEL_URL' to match the variable above
        const modelURL = MODEL_URL + "model.json";
        const metadataURL = MODEL_URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true; 
        webcam = new tmImage.Webcam(200, 200, flip); 
        await webcam.setup(); 
        await webcam.play();
        window.requestAnimationFrame(loop);

        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { 
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); 
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }

// ====== SEND DATA TO BACKEND ======
async function sendScanToBackend(scanResult) {
  try {
    const response = await fetch("http://localhost:3000/api/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(scanResult)
    });

    const result = await response.json();
    console.log("Backend response:", result);
  } catch (error) {
    console.error("Backend error:", error);
  }
}

/* ================= CAMERA AUTO-WIRE FIX ================= */

(function ensureTMReady() {
    if (typeof tmImage === "undefined") {
        const tfScript = document.createElement("script");
        tfScript.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest";
        tfScript.onload = () => {
            const tmScript = document.createElement("script");
            tmScript.src = "https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest";
            document.head.appendChild(tmScript);
        };
        document.head.appendChild(tfScript);
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("btn-start-scan");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            init(); 
        });
    }
});

/* ================= HARD CAMERA FALLBACK FIX ================= */

async function forceCameraOnly() {
    try {
        const cam = new tmImage.Webcam(400, 400, true);
        await cam.setup();
        await cam.play();

        document.getElementById("webcam-container").innerHTML = "";
        document.getElementById("webcam-container").appendChild(cam.canvas);

        document.getElementById("lbl-recording").style.display = "block";
        document.getElementById("lbl-recording").innerText = "● Camera Active (AI Offline)";
    } catch (err) {
        alert("Camera permission denied or unavailable.");
        console.error(err);
    }
}

const originalInit = init;
init = async function () {
    try {
        await originalInit(); 
    } catch (e) {
        console.warn("AI model failed. Starting camera only.");
        forceCameraOnly();
    }
};

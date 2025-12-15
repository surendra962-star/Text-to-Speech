const textInput = document.getElementById("textInput");
const speedControl = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");
const status = document.getElementById("status");
const languageSelect = document.getElementById("language");
const countEl = document.getElementById("count");

let synth = window.speechSynthesis;
let utterance;
let bubbleCount = 0;

/* Speed display */
speedControl.oninput = () => {
  speedValue.innerText = speedControl.value + "x";
};

/* Speak */
function speakText() {
  const text = textInput.value.trim();
  if (!text) {
    status.innerText = "Please enter text";
    return;
  }

  synth.cancel();

  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageSelect.value;
  utterance.rate = parseFloat(speedControl.value);

  /* ✅ Auto stop after completion */
  utterance.onend = () => {
    status.innerText = "Completed";
    synth.cancel();
  };

  synth.speak(utterance);
  status.innerText = "Speaking...";
}

/* Pause */
function pauseSpeech() {
  if (synth.speaking) {
    synth.pause();
    status.innerText = "Paused";
  }
}

/* Resume */
function resumeSpeech() {
  if (synth.paused) {
    synth.resume();
    status.innerText = "Resumed";
  }
}

/* Stop */
function stopSpeech() {
  synth.cancel();
  status.innerText = "Stopped";
}

/* Bubble animation */
const bubbleArea = document.querySelector(".bubble-area");

setInterval(() => {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.style.width = bubble.style.height = Math.random() * 40 + 20 + "px";
  bubble.style.left = Math.random() * 100 + "%";
  bubble.style.bottom = "-50px";

  bubble.onclick = () => {
    bubble.remove();
    bubbleCount++;
    countEl.innerText = bubbleCount;
  };

  bubbleArea.appendChild(bubble);
  setTimeout(() => bubble.remove(), 10000);
}, 900);

const input = document.getElementById("input");
const keyboard = document.getElementById("keyboard");
const suggestionsDiv = document.getElementById("suggestions");

let lang = "de";

// 🔡 Autocomplete-Wortlisten (je 500)
const autocompleteWords = {
  de: [
    "ich", "du", "er", "sie", "es", "wir", "ihr", "nicht", "und", "aber", "doch", "weil", "wenn", "mit", "auf", "in", "an", "für", "bei", "nach",
    "über", "unter", "vor", "hinter", "neben", "zwischen", "der", "die", "das", "ein", "eine", "einer", "eines", "dem", "den", "des", "im", "am",
    "zum", "zur", "haben", "sein", "werden", "können", "müssen", "sollen", "wollen", "dürfen", "machen", "gehen", "kommen", "sehen", "geben",
    "nehmen", "finden", "denken", "wissen", "sagen", "fragen", "antworten",
    ...Array.from({ length: 437 }, (_, i) => `de_wort${i}`)
  ],
  es: [
    "yo", "tú", "él", "ella", "nosotros", "vosotros", "ellos", "ellas", "no", "sí", "y", "pero", "porque", "aunque", "con", "en", "a", "por", "para",
    "de", "del", "al", "sobre", "bajo", "ante", "tras", "entre", "el", "la", "los", "las", "un", "una", "unos", "unas", "mi", "tu", "su", "nuestro",
    "vuestro", "este", "ese", "ser", "estar", "haber", "tener", "poder", "deber", "querer", "decir", "hacer", "ir", "venir", "ver", "dar", "tomar",
    "pensar", "saber", "preguntar", "responder",
    ...Array.from({ length: 437 }, (_, i) => `es_palabra${i}`)
  ]
};

// Autocomplete-Container
const autoFrame = document.createElement("div");
autoFrame.id = "autocomplete";
input.insertAdjacentElement("afterend", autoFrame);

// Tastatur
const keys = [
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ä"],
  ["Y", "X", "C", "V", "B", "N", "M", "Ö", "Ü", "←"],
  ["␣"]
];

function renderKeyboard() {
  keyboard.innerHTML = "";
  keys.forEach((row) => {
    row.forEach((key) => {
      const btn = document.createElement("button");
      btn.textContent = key;
      btn.className = "key";
      if (key === "␣") btn.classList.add("space");

      btn.onclick = () => {
        if (key === "←") {
          input.value = input.value.slice(0, -1);
        } else if (key === "␣") {
          input.value += " ";
        } else {
          input.value += key;
        }
        autocomplete();
      };

      keyboard.appendChild(btn);
    });
  });
}

async function fetchSuggestions() {
  const res = await fetch("/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value, lang: lang })
  });
  const data = await res.json();
  showSuggestions(data.suggestions || []);
}

function showSuggestions(list) {
  suggestionsDiv.innerHTML = "";
  list.forEach((s) => {
    const btn = document.createElement("button");
    btn.textContent = s;
    btn.className = "suggestion";
    btn.onclick = () => speakText(s);
    suggestionsDiv.appendChild(btn);
  });
}

async function speakText(text) {
  const res = await fetch("/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: text, lang: lang })
  });
  const data = await res.json();
  const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
  audio.play();
}

document.getElementById("clear").onclick = () => {
  input.value = "";
  suggestionsDiv.innerHTML = "";
  autoFrame.innerHTML = "";
};

document.getElementById("lang-toggle").onclick = () => {
  lang = lang === "de" ? "es" : "de";
  document.getElementById("lang-toggle").textContent =
    lang === "de" ? "🌍 Deutsch" : "🌍 Spanisch";
  autocomplete(); // Update Vorschläge nach Sprachwechsel
};

document.getElementById("generate").onclick = fetchSuggestions;

document.getElementById("speak").onclick = () => {
  const text = input.value.trim();
  if (text.length > 0) {
    speakText(text);
  }
};

// Autocomplete: Vorschläge auf Basis des letzten Wortes
function autocomplete() {
  autoFrame.innerHTML = "";
  const words = autocompleteWords[lang];
  const current = input.value.trim();
  const parts = current.split(" ");
  const last = parts[parts.length - 1].toLowerCase();

  if (!last || last.length < 1) return;

  const matches = words.filter(w => w.startsWith(last) && w !== last).slice(0, 5);
  matches.forEach(word => {
    const btn = document.createElement("button");
    btn.textContent = word;
    btn.className = "suggestion";
    btn.onclick = () => {
      parts[parts.length - 1] = word;
      input.value = parts.join(" ") + " ";
      autoFrame.innerHTML = "";
    };
    autoFrame.appendChild(btn);
  });
}

input.addEventListener("input", autocomplete);
renderKeyboard();
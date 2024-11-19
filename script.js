const title = document.getElementById("title");
const text = document.getElementById("text");
const switchLang = document.getElementById("switchLang");
const playStopBtn = document.getElementById("playStopBtn");
const playStopIcon = document.getElementById("playStopIcon");
const increaseFont = document.getElementById("increaseFont");
const decreaseFont = document.getElementById("decreaseFont");
const speechRecognitionBtn = document.getElementById("speechRecognition");

let lang = 'en';  // Idioma inicial
let isReading = false;  // Estado da leitura 
let utterance = new SpeechSynthesisUtterance();  // Objeto para síntese de fala
let fontSizeText = 18;
let fontSizeTitle = 24;


const textContent = {
    en: {
        title: "LIVING WITH FATIGUE AND PAIN",
        text: "Lea was on track to become the editor of the magazine she worked for when she started having numbness in her hands and feeling completely fatigued by the middle of the afternoon. She tried medications and exercise and getting enough sleep, but finally she had to make change in her life. She found a job where she could work from home, on her own schedule. When she has good days, it's like nothing is wrong. But on bad days, she measures every action so she can make it through the day. Sometime that important editorial meeting is all she can manage. She had to adjust her computer: a new keyboard and trackBall make it easier to type, and a good chair helps her avoid tender muscles. The biggest change was learning to write and edit using speech recognition software, Dragon Naturally Speaking. She's lucky: the company understands that it's a real disability. With an invisible disability like fibromyalgia, some people just don't get it.",
        increaseFont: "Increase Font",
        decreaseFont: "Decrease Font",
        switchLang: "See in Portuguese",
        playText: "Read Text", 
        stopText: "Stop",
        speechRecognitionBtn: "Speech recognition"  
    },
    pt: {
        title: "VIVER COM FADIGA E DOR",
        text: "Lea estava a caminho de se tornar editora da revista para a qual trabalhava quando começou a ter dormência nas mãos e a sentir-se completamente cansada a meio da tarde. Tentou tomar medicamentos, fazer exercício físico e dormir o suficiente, mas finalmente teve de fazer uma mudança na sua vida. Encontrou um emprego onde podia trabalhar a partir de casa, de acordo com o seu próprio horário. Quando tem dias bons, é como se nada estivesse errado. Mas nos dias maus, mede todas as ações para conseguir passar o dia. Por vezes, aquela importante reunião editorial é tudo o que consegue fazer. Teve de adaptar o seu computador: um novo teclado e uma TrackBall facilitam a escrita e uma boa cadeira ajuda-a a evitar músculos doridos. A maior mudança foi aprender a escrever e editar utilizando o software de reconhecimento de voz, Dragon Naturally Speaking. Ela tem sorte: a empresa compreende que se trata de uma deficiência real. Com uma deficiência invisível como a fibromialgia, algumas pessoas simplesmente não percebem.",
        increaseFont: "Aumentar Fonte",
        decreaseFont: "Diminuir Fonte",
        switchLang: "See in English",
        playText: "Ler Texto",
        stopText: "Parar", 
        speechRecognitionBtn: "Reconhecimento de voz"
    }
};

// Atualizar o conteúdo com base no idioma selecionado
function updateContent() {
    title.textContent = textContent[lang].title;
    text.textContent = textContent[lang].text;
    increaseFont.childNodes[0].nodeValue = textContent[lang].increaseFont + " ";
    decreaseFont.childNodes[0].nodeValue = textContent[lang].decreaseFont + " ";
    switchLang.childNodes[0].nodeValue = textContent[lang].switchLang + " ";
    speechRecognitionBtn.childNodes[0].nodeValue = textContent[lang].speechRecognitionBtn + " ";

    utterance.lang = lang === 'en' ? 'en-US' : 'pt-PT'; // Definindo o idioma da fala

    updatePlayStopButton();  // Atualizar o botão "Play/Stop"
}

//Atualizar o texto do botão "Play/Stop"
function updatePlayStopButton() {
    const playStopText = isReading ? textContent[lang].stopText : textContent[lang].playText;
    playStopBtn.childNodes[0].nodeValue = playStopText + " ";
}

// Alternar o estado de leitura
function toggleReading() {
    if (isReading) {
        speechSynthesis.cancel();  // Parar leitura
        isReading = false;
        playStopIcon.src = 'data/Play.png'; 
    } else {
        utterance.text = text.textContent;
        speechSynthesis.speak(utterance);  // Iniciar leitura
        isReading = true;
        playStopIcon.src = 'data/Stop.png';
    }

    updatePlayStopButton(); 
}

// Alternar o idioma
switchLang.addEventListener('click', () => {
    lang = lang === 'en' ? 'pt' : 'en';
    updateContent();
});


playStopBtn.addEventListener('click', toggleReading);


increaseFont.addEventListener("click", () => {
    if (fontSizeText < 34 && fontSizeTitle < 40) {
        fontSizeText += 2;
        fontSizeTitle += 2;
        text.style.fontSize = `${fontSizeText}px`;
        title.style.fontSize = `${fontSizeTitle}px`;
    }
});

decreaseFont.addEventListener("click", () => {
    if (fontSizeText > 16 && fontSizeTitle > 22) {
        fontSizeText -= 2;
        fontSizeTitle -= 2;
        text.style.fontSize = `${fontSizeText}px`;
        title.style.fontSize = `${fontSizeTitle}px`;
    }
});

updateContent();

// SPEECH RECOGNITION

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'en' ? 'en-US' : 'pt-PT';  // Definir o idioma do reconhecimento
    recognition.interimResults = false;  // Não mostrar resultados intermediários
    recognition.maxAlternatives = 1;  // Limitar a 1 alternativa

    // Função que irá ser chamada quando o reconhecimento de voz identificar algo
    recognition.onresult = function(event) {
        const command = event.results[0][0].transcript.toLowerCase();  // Comando reconhecido

        if (command.includes("read text") || command.includes("ler texto")) {
            toggleReading();
        } else if (command.includes("stop") || command.includes("parar")) {
            toggleReading();
        } else if (command.includes("increase font") || command.includes("aumentar fonte")) {
            increaseFont.click();
        } else if (command.includes("decrease font") || command.includes("diminuir fonte")) {
            decreaseFont.click();
        } else if (command.includes("see in portuguese") || command.includes("ver em inglês")) {
            switchLang.click();
        }
    };

    // Evento de clique no botão de reconhecimento de voz
    speechRecognitionBtn.addEventListener("click", () => {
        alert(lang === 'en' ? "Listening for commands..." : "A ouvir comandos...");
        recognition.start();  // Iniciar o reconhecimento de voz
    });

    // Caso haja algum erro durante o reconhecimento
    recognition.onerror = function(event) {
        console.error("Erro no reconhecimento de voz: ", event.error);
    };
}
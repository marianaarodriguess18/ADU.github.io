// Conteúdo de texto para os 2 idiomas
const textContent = {
    en: {
        title: "LIVING WITH FATIGUE AND PAIN",
        text: "Lea was on track to become the editor of the magazine she worked for when she started having numbness in her hands and feeling completely fatigued by the middle of the afternoon. She tried medications and exercise and getting enough sleep, but finally she had to make change in her life. She found a job where she could work from home, on her own schedule. When she has good days, it's like nothing is wrong. But on bad days, she measures every action so she can make it through the day. Sometime that important editorial meeting is all she can manage. She had to adjust her computer: a new keyboard and trackBall make it easier to type, and a good chair helps her avoid tender muscles. The biggest change was learning to write and edit using speech recognition software, Dragon Naturally Speaking. She's lucky: the company understands that it's a real disability. With an invisible disability like fibromyalgia, some people just don't get it.",
        increaseFont: "Increase Font",
        decreaseFont: "Decrease Font",
        //switchLang: "Ver em Português",
        playStopBtn: "Read"
    },
    pt: {
        title: "VIVER COM FADIGA E DOR",
        text: "Lea estava a caminho de se tornar editora da revista para a qual trabalhava quando começou a ter dormência nas mãos e a sentir-se completamente cansada a meio da tarde. Tentou tomar medicamentos, fazer exercício físico e dormir o suficiente, mas finalmente teve de fazer uma mudança na sua vida. Encontrou um emprego onde podia trabalhar a partir de casa, de acordo com o seu próprio horário. Quando tem dias bons, é como se nada estivesse errado. Mas nos dias maus, mede todas as ações para conseguir passar o dia. Por vezes, aquela importante reunião editorial é tudo o que consegue fazer. Teve de adaptar o seu computador: um novo teclado e uma TrackBall facilitam a escrita e uma boa cadeira ajuda-a a evitar músculos doridos. A maior mudança foi aprender a escrever e editar utilizando o software de reconhecimento de voz, Dragon Naturally Speaking. Ela tem sorte: a empresa compreende que se trata de uma deficiência real. Com uma deficiência invisível como a fibromialgia, algumas pessoas simplesmente não percebem.",
        increaseFont: "Aumentar Fonte",
        decreaseFont: "Diminuir Fonte",
        //switchLang: "See in English",
        playStopBtn: "Ler"
    }
};

// Elements
const title = document.getElementById("title");
const text = document.getElementById("text");
const switchLang = document.getElementById("switchLang");
const playStopBtn = document.getElementById("playStopBtn");
const playStopIcon = document.getElementById("playStopIcon");
const increaseFont = document.getElementById("increaseFont");
const decreaseFont = document.getElementById("decreaseFont");

let lang = 'en';
let speechSynthesis = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();
let isReading = false;
let fontSize = 18;

// Função para atualizar conteúdos com base no idioma
function updateContent() {
    title.textContent = textContent[lang].title;
    text.textContent = textContent[lang].text;
    increaseFont.textContent = textContent[lang].increaseFont;
    decreaseFont.textContent = textContent[lang].decreaseFont;
    //switchLang.textContent = textContent[lang].switchLang;
    playStopBtn.textContent = textContent[lang].playStopBtn;
    utterance.lang = lang === 'en' ? 'en-US' : 'pt-PT';
}

// Alternar idioma
switchLang.addEventListener('click', () => {
    lang = lang === 'en' ? 'pt' : 'en';
    updateContent();
});

// Ler texto em voz alta
function toggleReading() {
    if (isReading) {
        speechSynthesis.cancel();
        isReading = false;
        playStopIcon.src = 'path/to/play-icon.png';
    } else {
        utterance.text = text.textContent;
        speechSynthesis.speak(utterance);
        isReading = true;
        playStopIcon.src = 'path/to/stop-icon.png';
    }
}

// Event Listener para o botão play/stop
playStopBtn.addEventListener('click', toggleReading);

utterance.onend = () => {
    isReading = false;
    playStopIcon.src = 'path/to/play-icon.png';
};

// Ajustar tamanho da fonte
increaseFont.addEventListener("click", () => {
    if (fontSize < 36) {
        fontSize += 2;
        text.style.fontSize = `${fontSize}px`;
    }
});

decreaseFont.addEventListener("click", () => {
    if (fontSize > 16) {
        fontSize -= 2;
        text.style.fontSize = `${fontSize}px`;
    }
});

// Iniciar Load
updateContent();

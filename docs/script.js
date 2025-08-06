// Array of available images
const imageFiles = [
    'thumb1.jpg',
    'thumb2.jpg',
    'thumb3.jpg',
    'thumb4.jpg',
    'thumb5.jpg',
    'thumb6.jpg',
    'thumb7.jpg',
    'thumb8.jpg',
    'thumb9.jpg',
    'thumb10.jpg',
    'thumb11.jpg',
    'thumb12.jpg',
    'thumb13.jpg',
    'thumb14.jpg',
    'thumb15.jpg',
    'thumb16.jpg',
    'thumb17.jpg'
];

// Array of avatar images
const avatarFiles = [
    'avatar1.jpg',
    'avatar2.jpg',
    'avatar3.jpg',
    'avatar4.jpg',
    'avatar5.jpg',
    'avatar6.jpg',
    'avatar7.jpg',
    'avatar8.jpg',
    'avatar9.jpg',
    'avatar10.jpg',
    'avatar11.jpg',
    'avatar12.jpg',
    'avatar13.jpg',
    'avatar14.jpg',
    'avatar15.jpg',
    'avatar16.jpg',
    'avatar17.jpg',
    'avatar18.jpg',
];

// Array of sample video titles
const videoTitles = [
    "Epic Mountain Biking Adventure in the Alps",
    "Behind the Scenes: Making of a Blockbuster",
    "Master Chef's Secret Recipe Revealed",
    "Ultimate Gaming Setup Tour 2025",
    "World's Most Amazing Street Food Journey",
    "Pro Tips for Better Photography",
    "Hidden Gems of Southeast Asia",
    "Tech Review: Latest Gadgets of 2025",
    "DIY Home Improvement Hacks",
    "Exploring Ancient Ruins in South America",
    "De Mysterieuze Wereld van Onderwatergrotten",
    "10 Minuten Yoga om Stress te Verminderen",
    "De Snelste Manieren om Je Huis Te Organiseren",
    "Reisverslag: Mijn Avontuur in de Amazone Regenwoud",
    "De Kunst van het Maken van Handgemaakte Sieraden",
    "De Top 5 Fouten die Beginners Maken in de Keuken",
    "Fitness voor Beginners: Een Volledige Gids",
    "De Magie van Nachtfotografie: Tips en Trucs",
    "Hoe Je Je Eigen Tuin Moestuin Kunt Maken",
    "De Geheimen van Succesvolle Fotobewerking",
    "Hoe Blockchain Technologie Exact Werkt",
    "De Basisprincipes van Kwantumfysica Uitgelegd",
    "Inleiding tot Machine Learning: Een Beginnersgids",
    "De Werking van het Menselijk Brein: Een Uitleg",
    "Cryptografie: Hoe Je Gegevens Beveiligd Kunnen Worden",
    "De Geschiedenis van de Kunstmatige Intelligentie",
    "Hoe Je Een Website Kunt Bouwen met HTML en CSS",
    "De Theorie van de Relativiteit: Een Eenvoudige Uitleg",
    "Inzicht in de Werking van Neurale Netwerken",
    "De Toekomst van Energie: Een Uitleg over Duurzame Energiebronnen",
    "De Geopolitieke Impact van de Oorlog in Oekraïne",
    "De Rol van China in de Wereldpolitiek: Een Analyse",
    "De Toekomst van de Europese Unie: Uitdagingen en Kansen",
    "De Betekenis van de BRICS-landen voor de Wereldorde",
    "De Geopolitieke Dimensie van de Israëlisch-Palestijnse Conflict",
    "De Relatie tussen Rusland en de NAVO: Een Spanningsveld",
    "De Gevolgen van de Handelsoorlog tussen de VS en China",
    "De Rol van India in de Geopolitiek van Zuid-Azië",
    "De Impact van Klimaatverandering op de Wereldpolitiek",
    "De Toekomst van de Internationale Betrekkingen: Trends en Voorspellingen"
];

// Array of channel names
const channelNames = [
    "BOOS",
    "NOS Stories",
    "3voor12",
    "NPO Radio 1",
    "VPRO",
    "Enzo Knol",
    "Mr Beast",
    "NOS Jeugdjournaal",
    "Nieuwsuur",
    "Johnny Harris",
    "Corridor Crew",
    "Awnsers in Progress",
    "MKBHD",
    "Nintendo",
    "Howtown",
    "Lubach",
    "PewDiePie",
    "Markiplier",
    "Tyler1",
    "Shane Dawson",
    "Jeffrey Dahmer",
    "KSI",
    "Pokimane",
    "Ninja",
    "Dr. Disrespect",
    "TimTheTatman",
    "Jacksepticeye",
    "VanossGaming",
    "GameGrumps",
    "The King of Random",
    "Unbox Therapy",
    "Vsauce",
    "CGP Grey",
    "Crash Course",
    "AsapSCIENCE",
    "Kurzgesagt - In a Nutshell"
];

// Array of view counts
function generateViewCount() {
    const counts = ["K", "M"];
    const number = Math.floor(Math.random() * 990) + 10; // Random number between 10 and 999
    const suffix = counts[Math.floor(Math.random() * counts.length)];
    return `${number}K weergaven`;
}

// Function to shuffle array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize thumbnails with random images and titles
function initializeThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail:not(#userThumb)');
    const shuffledImages = shuffleArray([...imageFiles]);
    const shuffledTitles = shuffleArray([...videoTitles]);
    const shuffledAvatars = shuffleArray([...avatarFiles]);
    const shuffledChannels = shuffleArray([...channelNames]);
    
    thumbnails.forEach((thumbnail, index) => {
        if (index < shuffledImages.length) {
            // Set thumbnail image
            thumbnail.src = 'img/placeholder-thumbs/' + shuffledImages[index];
            
            // Set profile avatar and title
            const videoInfo = thumbnail.closest('div').nextElementSibling;
            if (videoInfo && videoInfo.classList.contains('video-info')) {
                const avatar = videoInfo.querySelector('.profile-avatar');
                const title = videoInfo.querySelector('.video-title');
                const channelInfo = videoInfo.querySelector('h4') || document.createElement('h4');
                
                if (avatar) {
                    avatar.src = 'img/placeholder-avatars/' + shuffledAvatars[index];
                }
                if (title) {
                    title.textContent = shuffledTitles[index];
                }
                
                // Set channel name and view count
                channelInfo.innerHTML = `${shuffledChannels[index]}<br>${generateViewCount()}`;
                if (!channelInfo.parentElement) {
                    videoInfo.appendChild(channelInfo);
                }
            }
        }
    });
}

// Call initialization when page loads
document.addEventListener('DOMContentLoaded', initializeThumbnails);

const dropZone = document.getElementById('dropZone');
const preview = document.getElementById('preview');
const userThumb = document.getElementById('userThumb');

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

// Function to handle file selection
function handleFileSelect(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = 'block';
            userThumb.src = e.target.result;
            // Enable the Show in Grid button
            document.getElementById('showGridButton').disabled = false;

            // Set a default title for the user's thumbnail
            const userThumbContainer = document.getElementById('userThumbContainer');
            const userTitle = userThumbContainer.querySelector('.video-title');
            userTitle.textContent = 'My Video';
            
            // Set nosop3.jpg as the profile avatar
            const userAvatar = userThumbContainer.querySelector('.profile-avatar');
            userAvatar.src = 'img/nosop3.jpg';
        };
        reader.readAsDataURL(file);
    }
}

// Handle file input change
document.getElementById('fileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
});

// Handle file drop
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
});

function showInGrid() {
    if (preview.src) {
        const userThumbContainer = document.getElementById('userThumbContainer');
        const dropZone = document.getElementById('dropZone');
        const mainContent = document.getElementById('mainContent');
        const titleInput = document.getElementById('thumbnailTitle');
        
        // Show user thumbnail
        userThumbContainer.style.display = 'block';
        
        // Set the title if provided
        if (titleInput.value.trim()) {
            const userThumbTitle = userThumbContainer.querySelector('.video-title');
            userThumbTitle.textContent = titleInput.value.trim();
        }
        
        // Hide splash screen
        dropZone.style.display = 'none';
        
        // Show main content
        mainContent.classList.add('visible');
        
        // Scroll to grid content
        mainContent.scrollIntoView({ behavior: 'smooth' });
    }
}
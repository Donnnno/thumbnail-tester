// Fallback arrays in case YAML loading fails
const defaultVideoTitles = [
    "Video title"
];

const defaultChannelNames = [
 "Channel"
];

// Initialize arrays
let imageFiles = Array.from({length: 9}, (_, i) => `thumb${i + 1}.jpg`);
let avatarFiles = Array.from({length: 9}, (_, i) => `avatar${i + 1}.jpg`);
let videoTitles = [...defaultVideoTitles];
let channelNames = [...defaultChannelNames];

// Function to fetch and parse YAML
async function fetchYAML(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        
        // Split the text into lines and process each line
        const lines = text.split('\n');
        const items = lines
            .map(line => {
                // Match either "- item" or "  - item" format
                const match = line.match(/^\s*-\s*["']?([^"'\n]+)["']?\s*$/);
                return match ? match[1].trim() : null;
            })
            .filter(item => item !== null); // Remove any non-matches

        return items.length > 0 ? items : null;
    } catch (error) {
        console.warn('Error fetching YAML:', error);
        return null;
    }
}

// Load YAML data when the script starts
(async function loadData() {
    try {
        console.log('Loading YAML files...');
        const [titles, channels] = await Promise.all([
            fetchYAML('data/titles.yml'),
            fetchYAML('data/channels.yml')
        ]);

        // Only update if YAML files were successfully loaded
        if (titles) {
            console.log('Loaded', titles.length, 'titles');
            videoTitles = titles;
        } else {
            console.warn('Failed to load titles.yml, using defaults');
        }
        
        if (channels) {
            console.log('Loaded', channels.length, 'channels');
            channelNames = channels;
        } else {
            console.warn('Failed to load channels.yml, using defaults');
        }

        // Reinitialize thumbnails with new data
        if (titles || channels) {
            initializeThumbnails();
        }
    } catch (error) {
        console.warn('Error loading YAML files:', error);
    }
})();

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
document.addEventListener('DOMContentLoaded', () => {
    initializeThumbnails();
});

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
            userTitle.textContent = 'My Video title';
            
            // Set avatar.jpg as the profile avatar
            const userAvatar = userThumbContainer.querySelector('.profile-avatar');
            userAvatar.src = 'img/avatar.jpg';
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
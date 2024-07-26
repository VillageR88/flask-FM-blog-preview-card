interface JSONData {
    categories: string[];
    content: string;
    createdAt: string;
    description: string;
    heroImage: string;
    id: string;
    meta: {
        description: string | null;
        title: string | null;
    };
    platform: string[];
    publishedAt: string;
    slug: string;
    title: string;
    updatedAt: string;
    user: string;
}

const publisher: { [key: string]: { name: string; avatar: string } } = {
    '653bc9d69ea5c2929e076100': {
        name: 'The Frontend Mentor team',
        avatar: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1698417110/Avatars/rbz8idemlgsmocy5kpnu.jpg',
    },
    '6597ca02eef2bc83ad8e2d23': {
        name: 'Nefe Emadamerho-Atori',
        avatar: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1704446466/Avatars/ir7w0sbntajvbfolqngw.png',
    },
}



function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return `Published ${date.toLocaleDateString('en-GB', options)}`;
}

const platform = document.getElementById('platform') as HTMLElement;
const publishedAt = document.getElementById('publishedAt') as HTMLElement;
if (publishedAt.textContent) publishedAt.textContent = formatDate(publishedAt.textContent);
const title = document.getElementById('title') as HTMLElement;
const description = document.getElementById('description') as HTMLElement;
const heroImage = document.getElementById('heroImage') as HTMLImageElement;
const publisherAvatar = document.getElementById('publisherAvatar') as HTMLImageElement;
publisherAvatar.src = publisher['653bc9d69ea5c2929e076100'].avatar;
const publisherName = document.getElementById('publisherName') as HTMLElement;
publisherName.textContent = publisher['653bc9d69ea5c2929e076100'].name;


declare const data: JSONData[];
const dropdown = document.getElementById('titleDropdown') as HTMLSelectElement;
for (const item of data) {
    const option = document.createElement('option');
    option.value = item.title;
    option.textContent = item.title;
    dropdown.appendChild(option);
}


console.log(data);
function handleChange() {
    const selected = dropdown.value;
    const selectedData = data.find((item) => item.title === selected);
    if (!selectedData) {
        return;
    }
    heroImage.src = selectedData.heroImage;
    platform.textContent = selectedData.platform.join(', ');
    publishedAt.textContent = formatDate(selectedData.publishedAt);
    title.textContent = selectedData.title;
    description.textContent = selectedData.description;
    publisherAvatar.src = publisher[selectedData.user].avatar;
    publisherName.textContent = publisher[selectedData.user].name;
}

document.addEventListener('DOMContentLoaded', () => {
    handleColorChange();
});

function handleColorChange() {
    const img = document.getElementById('heroImage') as HTMLImageElement;
    const bodyBackground = document.querySelector('body');
    const platform = document.getElementById('platform'); // Assuming 'platform' is an element in your DOM
    if (!img) return;

    // Set crossOrigin attribute to handle CORS
    img.crossOrigin = 'Anonymous';

    img.addEventListener('load', () => {
        const color = getAverageColor(img);
        if (!bodyBackground || !platform) return;
        bodyBackground.style.backgroundColor = color;
        platform.style.backgroundColor = color;
        const textColor = getContrastColor(color);
        bodyBackground.style.color = color;
        platform.style.color = textColor;
    });

    if (img.complete) {
        img.dispatchEvent(new Event('load'));
    }

    function getAverageColor(imgElement: HTMLImageElement) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        if (!context) return 'rgb(255, 255, 255)';
        try {
            context.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            let r = 0;
            let g = 0;
            let b = 0;

            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
            }

            r = Math.floor(r / (data.length / 4));
            g = Math.floor(g / (data.length / 4));
            b = Math.floor(b / (data.length / 4));

            return `rgb(${r}, ${g}, ${b})`;
        } catch (e) {
            console.error('Error getting image data:', e);
            return 'rgb(255, 255, 255)'; // Fallback color
        }
    }

    function getContrastColor(rgb: string) {
        const rgbValues = rgb.match(/\d+/g);
        if (!rgbValues) return '#000000';
        const r = Number.parseInt(rgbValues[0]);
        const g = Number.parseInt(rgbValues[1]);
        const b = Number.parseInt(rgbValues[2]);

        // Convert RGB to sRGB
        const srgb = [r, g, b].map(value => {
            value /= 255;
            return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
        });

        // Calculate relative luminance
        const luminance = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];

        // Return black for light backgrounds and white for dark backgrounds
        return luminance > 0.4 ? '#000000' : '#FFFFFF';
    }
}
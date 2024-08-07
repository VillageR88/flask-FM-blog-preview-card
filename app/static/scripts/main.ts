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
    '662b913c2f40450f919a85d8': {
        name: 'Queendoline Akpan',
        avatar: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1714131260/Avatars/haqqbzebwzkcgnxzz0w6.jpg',
    },
    '65ae82e57845fa70c27b4409': {
        name: 'Sarah Okolo',
        avatar: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1705935589/Avatars/rzfezxdun82r8r3604yv.jpg',
    },
    '6603ec452f40450f918e96d0': {
        name: 'Vanza Setia',
        avatar: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1711533125/Avatars/fphkqqamcd0zlp8s1hpw.jpg',
    },
    '6617e3e72f40450f9121b883': {
        name: 'Olasunkanmi Balogun',
        avatar: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1712841703/Avatars/iyiw7jadfp6ejhzgx2gh.jpg',
    },
    '659e69becb160de764d427ee': {
        name: 'Hikmah Yousuph',
        avatar: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1704880575/Avatars/zbdonw6fqb9ocfxmbr9u.jpg',
    },
    '65b8ffbcd17f542024e305f1': {
        name: 'Benjamin Semah',
        avatar: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1706622908/Avatars/uj0anyy5e5vzbmcbmvxt.jpg',
    },
    '65bcbe9bb3322ce22f28e748': {
        name: 'Jessica Joseph',
        avatar: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1706868379/Avatars/cgindov3zcgcgzohwyq0.png',
    },
    '65a64a31dbdbf2e7b0fcd25c': {
        name: 'Candice Zakariya',
        avatar: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1705396786/Avatars/mbuuwcuqccita6orsmos.png',
    },
    '65cb4aa5bb73c14984d2e7ec': {
        name: 'Andrew Ezeani',
        avatar: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1707821733/Avatars/hmddymwk668feuvw7lxt.jpg',
    },
    '6531050389d8f2a7368b624a': {
        name: 'Matt Studdert',
        avatar: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1698417018/Avatars/cptlmvtp6ghcljto2eq7.jpg',
    },
    '6639f81520fb35b1b603eb2f': {
        name: 'Henry Agu',
        avatar: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1715075094/Avatars/kmmibkhx9vl3thg2h0ai.jpg',
    },
};

function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return `Published ${date.toLocaleDateString('en-GB', options)}`;
}

const platform = document.getElementById('platform') as HTMLElement;
const publishedAt = document.getElementById('publishedAt') as HTMLElement;
const title = document.getElementById('title') as HTMLAnchorElement;
const description = document.getElementById('description') as HTMLElement;
const heroImage = document.getElementById('heroImage') as HTMLImageElement;
const publisherAvatar = document.getElementById('publisherAvatar') as HTMLImageElement;
const publisherName = document.getElementById('publisherName') as HTMLElement;
const dropdown = document.getElementById('titleDropdown') as HTMLSelectElement;

if (publishedAt?.textContent) {
    publishedAt.textContent = formatDate(publishedAt.textContent);
}

if (publisherAvatar) {
    publisherAvatar.src = publisher['653bc9d69ea5c2929e076100'].avatar;
}

if (publisherName) {
    publisherName.textContent = publisher['653bc9d69ea5c2929e076100'].name;
}

declare const data: JSONData[];

if (dropdown) {
    for (const item of data) {
        const option = document.createElement('option');
        option.value = item.slug;
        option.textContent = item.title;
        dropdown.appendChild(option);
    }
}

function handleChange() {
    const selected = dropdown.value;
    const selectedData = data.find((item) => item.slug === selected);
    if (!selectedData) {
        return;
    }
    if (heroImage) heroImage.src = selectedData.heroImage;
    if (platform) platform.textContent = selectedData.platform.join(', ');
    if (publishedAt) publishedAt.textContent = formatDate(selectedData.publishedAt);
    if (title) {
        title.textContent = selectedData.title;
        title.href = `https://www.frontendmentor.io/articles/${selectedData.slug}`;
    }
    if (description) description.textContent = selectedData.description;
    if (publisherAvatar) publisherAvatar.src = publisher[selectedData.user].avatar;
    if (publisherName) publisherName.textContent = publisher[selectedData.user].name;
}


function handleColorChange() {
    const img = document.getElementById('heroImage') as HTMLImageElement;
    const bodyBackground = document.querySelector('body');
    const platform = document.getElementById('platform');
    if (!img) return;

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
            return 'rgb(255, 255, 255)';
        }
    }

    function getContrastColor(rgb: string) {
        const rgbValues = rgb.match(/\d+/g);
        if (!rgbValues) return '#000000';
        const r = Number.parseInt(rgbValues[0]);
        const g = Number.parseInt(rgbValues[1]);
        const b = Number.parseInt(rgbValues[2]);

        const srgb = [r, g, b].map(value => {
            value /= 255;
            return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
        });

        const luminance = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];

        return luminance > 0.4 ? '#000000' : '#FFFFFF';
    }
}

handleColorChange();
handleChange();
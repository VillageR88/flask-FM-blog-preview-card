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
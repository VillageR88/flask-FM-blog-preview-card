"use strict";
var publisher = {
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
};
function formatDate(dateString) {
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    var date = new Date(dateString);
    return "Published ".concat(date.toLocaleDateString('en-GB', options));
}
var platform = document.getElementById('platform');
var publishedAt = document.getElementById('publishedAt');
var title = document.getElementById('title');
var description = document.getElementById('description');
var heroImage = document.getElementById('heroImage');
var publisherAvatar = document.getElementById('publisherAvatar');
var publisherName = document.getElementById('publisherName');
var dropdown = document.getElementById('titleDropdown');
if (publishedAt === null || publishedAt === void 0 ? void 0 : publishedAt.textContent) {
    publishedAt.textContent = formatDate(publishedAt.textContent);
}
if (publisherAvatar) {
    publisherAvatar.src = publisher['653bc9d69ea5c2929e076100'].avatar;
}
if (publisherName) {
    publisherName.textContent = publisher['653bc9d69ea5c2929e076100'].name;
}
if (dropdown) {
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var item = data_1[_i];
        var option = document.createElement('option');
        option.value = item.slug;
        option.textContent = item.title;
        dropdown.appendChild(option);
    }
}
console.log(data);
function handleChange() {
    var selected = dropdown.value;
    var selectedData = data.find(function (item) { return item.slug === selected; });
    if (!selectedData) {
        return;
    }
    if (heroImage)
        heroImage.src = selectedData.heroImage;
    if (platform)
        platform.textContent = selectedData.platform.join(', ');
    if (publishedAt)
        publishedAt.textContent = formatDate(selectedData.publishedAt);
    if (title) {
        title.textContent = selectedData.title;
        title.href = "https://www.frontendmentor.io/articles/".concat(selectedData.slug);
    }
    if (description)
        description.textContent = selectedData.description;
    if (publisherAvatar)
        publisherAvatar.src = publisher[selectedData.user].avatar;
    if (publisherName)
        publisherName.textContent = publisher[selectedData.user].name;
}
document.addEventListener('DOMContentLoaded', function () {
    handleColorChange();
    dropdown.addEventListener('change', handleChange);
});
function handleColorChange() {
    var img = document.getElementById('heroImage');
    var bodyBackground = document.querySelector('body');
    var platform = document.getElementById('platform');
    if (!img)
        return;
    img.crossOrigin = 'Anonymous';
    img.addEventListener('load', function () {
        var color = getAverageColor(img);
        if (!bodyBackground || !platform)
            return;
        bodyBackground.style.backgroundColor = color;
        platform.style.backgroundColor = color;
        var textColor = getContrastColor(color);
        bodyBackground.style.color = color;
        platform.style.color = textColor;
    });
    if (img.complete) {
        img.dispatchEvent(new Event('load'));
    }
    function getAverageColor(imgElement) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        if (!context)
            return 'rgb(255, 255, 255)';
        try {
            context.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            var data_2 = imageData.data;
            var r = 0;
            var g = 0;
            var b = 0;
            for (var i = 0; i < data_2.length; i += 4) {
                r += data_2[i];
                g += data_2[i + 1];
                b += data_2[i + 2];
            }
            r = Math.floor(r / (data_2.length / 4));
            g = Math.floor(g / (data_2.length / 4));
            b = Math.floor(b / (data_2.length / 4));
            return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
        }
        catch (e) {
            console.error('Error getting image data:', e);
            return 'rgb(255, 255, 255)';
        }
    }
    function getContrastColor(rgb) {
        var rgbValues = rgb.match(/\d+/g);
        if (!rgbValues)
            return '#000000';
        var r = Number.parseInt(rgbValues[0]);
        var g = Number.parseInt(rgbValues[1]);
        var b = Number.parseInt(rgbValues[2]);
        var srgb = [r, g, b].map(function (value) {
            value /= 255;
            return value <= 0.03928 ? value / 12.92 : Math.pow(((value + 0.055) / 1.055), 2.4);
        });
        var luminance = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
        return luminance > 0.4 ? '#000000' : '#FFFFFF';
    }
}

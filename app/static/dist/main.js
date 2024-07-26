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
};
function formatDate(dateString) {
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    var date = new Date(dateString);
    return "Published ".concat(date.toLocaleDateString('en-GB', options));
}
var platform = document.getElementById('platform');
var publishedAt = document.getElementById('publishedAt');
if (publishedAt.textContent)
    publishedAt.textContent = formatDate(publishedAt.textContent);
var title = document.getElementById('title');
var description = document.getElementById('description');
var heroImage = document.getElementById('heroImage');
var publisherAvatar = document.getElementById('publisherAvatar');
publisherAvatar.src = publisher['653bc9d69ea5c2929e076100'].avatar;
var publisherName = document.getElementById('publisherName');
publisherName.textContent = publisher['653bc9d69ea5c2929e076100'].name;
var dropdown = document.getElementById('titleDropdown');
for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    var item = data_1[_i];
    var option = document.createElement('option');
    option.value = item.title;
    option.textContent = item.title;
    dropdown.appendChild(option);
}
console.log(data);
function handleChange() {
    var selected = dropdown.value;
    var selectedData = data.find(function (item) { return item.title === selected; });
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
document.addEventListener('DOMContentLoaded', function () {
    handleColorChange();
});
function handleColorChange() {
    var img = document.getElementById('heroImage');
    var bodyBackground = document.querySelector('body');
    var platform = document.getElementById('platform'); // Assuming 'platform' is an element in your DOM
    if (!img)
        return;
    // Set crossOrigin attribute to handle CORS
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
            return 'rgb(255, 255, 255)'; // Fallback color
        }
    }
    function getContrastColor(rgb) {
        var rgbValues = rgb.match(/\d+/g);
        if (!rgbValues)
            return '#000000';
        var r = Number.parseInt(rgbValues[0]);
        var g = Number.parseInt(rgbValues[1]);
        var b = Number.parseInt(rgbValues[2]);
        // Convert RGB to sRGB
        var srgb = [r, g, b].map(function (value) {
            value /= 255;
            return value <= 0.03928 ? value / 12.92 : Math.pow(((value + 0.055) / 1.055), 2.4);
        });
        // Calculate relative luminance
        var luminance = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
        // Return black for light backgrounds and white for dark backgrounds
        return luminance > 0.4 ? '#000000' : '#FFFFFF';
    }
}

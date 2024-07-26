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

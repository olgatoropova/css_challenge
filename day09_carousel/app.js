const thumbnailsHrefElements = document.querySelectorAll('.thumbnails a');
let selectedThumbnailHrefIndex = 0;
let thumbnailsHrefElementsMap = new Map();

const previewImageElement = document.querySelector('.preview img');
const captionElement = document.querySelector('.preview .caption');

const nextElement = document.querySelector('.next');
const previousElement = document.querySelector('.previous');

const capitalize = (word) => {
    if (!word) {
        return word;
    }
    if (word.length === 1) {
        return word.toUpperCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const clearSelection = () => {
    thumbnailsHrefElements.forEach(thumbnailHrefElement => {
        thumbnailHrefElement.parentElement.classList.remove('selected');
    });
}

const selectNewImage = (i) => {
    
    clearSelection();

    const thumbnailHrefElement = thumbnailsHrefElementsMap.get(i);
    thumbnailHrefElement.parentElement.classList.add('selected');
    selectedThumbnailHrefIndex = i;

    // update preview image
    const imageUrl = thumbnailHrefElement.childNodes[1].src;
    previewImageElement.src = imageUrl;

    // update caption
    const imageName = imageUrl.match(/[^/]*$/)[0];
    
    let authorName = '';
    const imageNameParts = imageName.split('-');
    const n = imageNameParts.length;
    for (i = 0; i < n - 2; i++) {
        authorName += capitalize(imageNameParts[i]) + ' ';
    }

    const from = capitalize(imageNameParts[n - 1].split('.')[0]);

    captionElement.innerHTML = `Photo by ${authorName}on ${from}`;
} 

thumbnailsHrefElements.forEach((thumbnailHrefElement, i) => {
    
    thumbnailsHrefElementsMap.set(i, thumbnailHrefElement);

    thumbnailHrefElement.addEventListener('click', () => {
        selectNewImage(i);
    });
});

nextElement.addEventListener('click', () => {
    if (selectedThumbnailHrefIndex < thumbnailsHrefElements.length - 1) {
        selectNewImage(selectedThumbnailHrefIndex + 1);
    }
});

previousElement.addEventListener('click', () => { // todo
    if (selectedThumbnailHrefIndex > 0) {
        selectNewImage(selectedThumbnailHrefIndex - 1);
    }
});

selectNewImage(0);

// TODO: 1. Update scroll position https://stackoverflow.com/questions/17574628/scroll-to-element-in-horizontal-div
// 2. Leaf through on keyboard arrow
// 3. Loop scroll (from beginning to end)
// 4. Get images from json


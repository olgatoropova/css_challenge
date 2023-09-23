const youtubeAPIKey = 'AIzaSyAsxV6ZPbE_TXLkqGcKYYjgBzeUmFKt06Q';
const channelId = 'UC-T8W79DN6PBnzomelvqJYw';
const youtubeAPIUrl = `https://www.googleapis.com/youtube/v3/search?key=${youtubeAPIKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`;

const videosElement = document.querySelector('aside ul');
const iframeElement = document.querySelector('.feature > .embed > iframe');
const featureTitleText = document.querySelector('.feature > h1');
const featureDescriptionText = document.querySelector('.feature > p');

let videosMap = {};

const loadVideos = async () => {
    try {
        const res = await fetch(youtubeAPIUrl);
        const {items} = await res.json();
        videosMap = items.reduce(function (acc, obj, i) {
            acc[i] = obj;
            return acc
          }, {});

        console.log(videosMap);
        return items;
    } catch (err) {
        console.error(err);
    }
}

const displayFeatureVideo = (index) => {
    const video = videosMap[index];
    console.log(video);
    iframeElement.src = `https://www.youtube.com/embed/${video.id.videoId}`;
    featureTitleText.innerText = video.snippet.title;
    featureDescriptionText.innerText = video.snippet.description;
}

const displayVideos = async () => {
    videos = await loadVideos();
    console.log(videos);

    displayFeatureVideo(0);

    videosElement.innerHTML = videos.map((item, i) => {
        if (i == 0) {
            return '';
        }
        return `<li>
            <a href="#" class="video" onclick="displayFeatureVideo('${i}');">
                <img src="${item.snippet.thumbnails.default.url}" alt="YouTube Thumbnail" />
                <h3>${item.snippet.title}</h3>
            </a>
        </li>`;
    }).join('');
}

displayVideos();

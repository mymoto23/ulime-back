import axios from 'axios';
import config from '../config';

export const getChannelBannerAndTN = async (channelId) => {
    const API_KEY = config.youtubeAPIKey;
    try {
        // 'https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=UCwx6n_4OcLgzAGdty0RWCoA&key=AIzaSyBGstWEDuI5tkz7zR9g5izAlNNtqXL2kRU'
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings,snippet,statistics&id=${channelId}&key=${API_KEY}`);
        const item = response.data.items[0];
        // console.log('item', response, API_KEY);
        const result = {
            title: item.brandingSettings.channel.title,
            bannerURL: item.brandingSettings.image.bannerTabletHdImageUrl,
            thumbnail: item.snippet.thumbnails.high,
            channelURL: `https://youtube.com/${item.snippet.customUrl}`,
            subNum: item.statistics.subscriberCount, // 3 signifiant figs
            youtubeChannelID: item.id
        };
        return result;
    } catch(e) {
        throw e;
    }
}
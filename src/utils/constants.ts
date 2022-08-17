export const TOKENS_REDDIT_API ={
    TIKTOK_CRINGE: 'TikTokCringe'
}

export const TOKENS_REDDIT_JSON = {
    TOP: 'top',
    HOT: 'hot'
}

export const REDDIT_API = {
    URL: `https://reddit.com/r/${TOKENS_REDDIT_API.TIKTOK_CRINGE}/${TOKENS_REDDIT_JSON.TOP}.json`,
    LIMIT_PARAMETER: '?limit='
}
export const ROOT_DIR = __dirname.split('/').slice(0, 7).join('/');
export const PATH = {
    VIDEO_DOWNLOADED: `${ROOT_DIR}/temp/videos`,
    RESULT_VIDEO: `${ROOT_DIR}/temp/result`,
    TEMP_FILES: `${ROOT_DIR}/temp`,
}
export const FILE_NAME = {
    RAW_VIDEOS_TXT: 'list.txt'
}
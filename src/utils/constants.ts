export const TOKENS_REDDIT_API ={
    TIKTOK_CRINGE: 'TikTokCringe'
}

export const TOKENS_REDDIT_JSON = {
    TOP: 'top',
    HOT: 'hot'
}

export const REDDIT_API = {
    URL: `https://reddit.com/r/${TOKENS_REDDIT_API.TIKTOK_CRINGE}/${TOKENS_REDDIT_JSON.HOT}.json`,
    LIMIT_PARAMETER: '?limit='
}
export const ROOT_DIR = __dirname.split('/').slice(0, 7).join('/');
export const PATH = {
    VIDEO_DOWNLOADED: `${ROOT_DIR}/temp/videos`,
    VIDEO_CUT: `${ROOT_DIR}/temp/cut`,
    RESULT_VIDEO: `${ROOT_DIR}/temp/result`,
    TEMP_FILES: `${ROOT_DIR}/temp`,
    SCRIPT_YOUTUBE_UPLOAD_VIDEO: `${ROOT_DIR}/src/scripts`
}
export const FILE_NAME = {
    RAW_VIDEOS_TXT: 'list.txt',
    SCRIPT_PY_YOUTUBE: 'upload_video.py'
}   
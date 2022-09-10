import fs from 'fs';
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    "301144642014-9lsneefh9dv4dsj32dpvo0ofmp5ocgu0.apps.googleusercontent.com",
    "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",
    "http://localhost"
);
oauth2Client.setCredentials({
    access_token:"",
    refresh_token:""
})
class YoutubeAPI {
    async uploadVideo(pathVideotToUpload: string) {
        return new Promise(async (resolve, reject) => {

            google.options({ auth: oauth2Client }, function (err: any, res: any) {
                console.log("🚀 ~ file: upload_video.ts ~ line 14 ~ YoutubeAPI ~ err", err)
                if (err) throw err;
                console.log("🚀 ~ file: upload_video.ts ~ line 14 ~ YoutubeAPI ~ res", res)

            })
            var youtube = google.youtube('v3');

            var options = {
                resource: {
                    snippet: {
                        title: 'Video test',
                        description: 'Descriptio ntest'
                    },
                    status: {
                        privacyStatus: 'public'
                    },
                },
                part: 'snippet,status',
                media: {
                    body: fs.createReadStream(pathVideotToUpload)
                }


            }
            youtube.videos.insert(options, function (err: any, data: any) {
                console.log("🚀 ~ file: upload_video.ts ~ line 37 ~ YoutubeAPI ~ err", err)
                if (err) {
                    resolve(false);
                    throw err;
                }
                console.log("🚀 ~ file: upload_video.ts ~ line 37 ~ YoutubeAPI ~ data", data)
                resolve(true);
            })
        })
    }
}
export default new YoutubeAPI;
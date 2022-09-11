import { AutoScaling } from "aws-sdk";
import { PATH } from "../utils/constants";
const fs = require('fs')
const restify = require('restify')
const google = require('googleapis').google
const OAuth2 = google.auth.OAuth2;
const open = require('open')
const youtube = google.youtube({version:'v3'})

async function Youtube(content:any){
  await authenticateWithOAuth()
  const videoInformation = await uploadVideo(content);
  //await uploadThumb(videoInformation);
  var videoFileSize: number = 0;
  async function authenticateWithOAuth() {
    const webServer = await startWebServer();
    const OAuthClient = await createOAuthClient();
    await requestUserConsent(OAuthClient);
    const authCode = await waitForGoogleCallback(webServer);
    await requestGoogleForAccessToken(OAuthClient,authCode);
    await setGlobalGoogleAuth(OAuthClient);
    await stopWebServer(webServer);
    async function startWebServer() {
      return new Promise((resolve: any,reject:any)=>{
        const port = 5002
        const app = restify.createServer();
        app.use(restify.plugins.acceptParser(app.acceptable));
        app.use(restify.plugins.queryParser());
        app.use(restify.plugins.bodyParser());

        const server = app.listen(port ,()=>{
          console.log("Listenming " + port)
          resolve({
            app,
            server
          })
        })
      })
    }
    async function createOAuthClient(){
      const credentials = require(PATH.TOKENS + '/client_secrets.json')
      const OAuthClient = new OAuth2(
        credentials.installed.client_id,
        credentials.installed.client_secret,
        credentials.installed.redirect_uris[0],
      )
      return OAuthClient;
    }
    async function requestUserConsent(OAuthClient:any) {
      const consentURL = OAuthClient.generateAuthUrl({
        access_type: 'offline',
        scope:['https://www.googleapis.com/auth/youtube.upload']
      })
      console.log('Give consent', consentURL);
      open(consentURL);
    }
    async function waitForGoogleCallback(webserver: any){
      return new Promise((resolve:any, reject:any)=>{
        webserver.app.get('/oauth2callback', (req:any,res:any)=>{
          
          const authCode =req.query.code;
          console.log("🚀 ~ file: upload_video copy.ts ~ line 59 ~ webserver.app.get ~ authCode", authCode)
          res.send("<h1>Puede cerrar la ventana</h1>");
          resolve(authCode)
        })
      })
    }
    async function requestGoogleForAccessToken(OAuthClient:any,authCode:any){
      return new Promise((resolve: any, reject: any)=>{
        OAuthClient.getToken(authCode, (error: any, tokens: any)=>{
          if(error)
            return reject(error)

          OAuthClient.setCredentials(tokens);
          resolve();
        })
      })
    }
    async function setGlobalGoogleAuth(OAuthClient:any){
      google.options({
        auth: OAuthClient
      })
    }
    async function stopWebServer(webServer:any){
      return new Promise((resolve : any, reject: any)=>{
        webServer.server.close(()=>{
          resolve()
        })
      })
    }
  }
  async function uploadVideo(content: any) {
    const videoFilePath = PATH.RESULT_VIDEO + "/result.mp4";
    videoFileSize =  fs.statSync(videoFilePath).size;
    const videoTitle = content.title
    const videoTags = content.tags
    const videoDescription = content.description
    const requestParameters = {
      part: 'snippet,status',
      requestBody:{
        snippet:{
          title: videoTitle,
          description: videoDescription,
          tags: videoTags
        },
        status:{
          privacyStatus: 'public'
        }
      },
      media:{
        body: fs.createReadStream(videoFilePath)
      }
    }
    const youtubeResponse = await youtube.videos.insert(requestParameters,{
      onUploadProgress: onUploadProgress
    })
    console.log("Upload Completed!" + youtubeResponse)
    return youtubeResponse.data;
  }
  async function onUploadProgress(event: any){
    const progress = Math.round((event.bytesRead/videoFileSize) * 100)
    console.clear()
    console.log("Progress! "+ progress + "%")
  }
  async function uploadThumb(videoInformation: any){
    const videoId = videoInformation.id;
    const videoThumbFilePath = PATH.THUMB_VIDEO+ "/thumb.png";
    const requestParameters = {
      videoId: videoId,
      media:{
        mimeType:'image/jpeg',
        body: fs.createReadStream(videoThumbFilePath)
      }
    }
    const youtubeResponse = await youtube.thumbnails.set(requestParameters);
    console.log("Thum uploaded");
  }
}
module.exports = Youtube;



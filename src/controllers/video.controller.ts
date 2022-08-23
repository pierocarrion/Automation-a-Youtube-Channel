import uuid4 from "uuid4";
import fs from "fs";
import RedditVideoModel from "../datalayers/models/reddit.model";
import { FILE_NAME, PATH } from "../utils/constants";
import { ChildProcess } from "../utils/child_process";
import { randomIntegerFromInterval } from "../utils/functions";

class VideoController {
  constructor() {}
  async execute() {
    try {
      await this.deleteVideosFromFolder(PATH.VIDEO_DOWNLOADED + "/");
      await this.deleteVideosFromFolder(PATH.VIDEO_CUT + "/");
      const redditVideo = await this.getVideos();
      console.log(
        "🚀 ~ file: video.controller.ts ~ line 22 ~ VideoController ~ execute ~ urlVideos",
        redditVideo,
        typeof redditVideo
      );
      await this.downloadVideos(redditVideo);
    } catch (error) {
      console.log(
        "🚀 ~ file: video.controller.ts ~ line 23 ~ VideoController ~ execute ~ error",
        error
      );
      throw error;
    }
  }

  async downloadVideos(redditVideos: any[]) {
    try {
      //youtube-dl https://v.redd.it/e9gp5ll6jbh91 -o "krowdy/%(title)s-%(id)s.%(ext)s"
      redditVideos.map(async (redditVideo) => {
        console.log(
          "🚀 ~ file: video.controller.ts ~ line 78 ~ VideoController ~ urlVideos.map ~ url",
          redditVideo
        );

        let args = [
          `${redditVideo[1]}`,
          `-o "${PATH.VIDEO_DOWNLOADED}/${uuid4()}.%(ext)s"`,
        ];

        await this.updateVideoInDatabase(redditVideo[0]);
        await ChildProcess("youtube-dl", args);
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: video.controller.ts ~ line 20 ~ VideoController ~ downloadVideos ~ error",
        error
      );
      throw error;
    }
  }
  async cutVideos() {
    try {
      const pathDirectory = PATH.VIDEO_DOWNLOADED + "/";
      const files = await fs.promises.readdir(pathDirectory);
      files.map(async (file) => {
        await this.cutVideo(PATH.VIDEO_CUT,pathDirectory + file, file);
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: video.controller.ts ~ line 53 ~ VideoController ~ cutVideos ~ error",
        error
      );
      throw error;
    }
  }
  async cutVideo(pathDirectoryOutput: string, videoSrc: any, nameVideo: string) {
    try {
      var startTime = "00:00:00";
      var endTime = `00:00:${randomIntegerFromInterval(10,20)}`;
      let args = [
        "-y",
        "-i",
        videoSrc,
        `-threads 6`,
        `-ss ${startTime}`,
        `-to ${endTime}`,
        "-async 1",
        `${pathDirectoryOutput}/cut-${nameVideo}`,
      ];
      await ChildProcess("ffmpeg", args);
    } catch (error) {
      console.log(
        "🚀 ~ file: video.controller.ts ~ line 65 ~ VideoController ~ cutVideo ~ error",
        error
      );
      throw error;
    }
  }
  async deleteVideosFromFolder(pathVideos: string) {
    try {
        console.log(pathVideos)
      await fs.promises
        .readdir(pathVideos)
        .then((f) =>
          Promise.all(
            f.map((file) => fs.promises.unlink(`${pathVideos}${file}`))
          )
        );
    } catch (error) {
      console.log(
        "🚀 ~ file: video.controller.ts ~ line 108 ~ VideoController ~ deleteVideos ~ error",
        error
      );
      throw error;
    }
  }
  async concatVideos() {
    try {
        const files = await fs.promises.readdir(PATH.VIDEO_DOWNLOADED + "/");
        console.log("Tiempo de espera: " + files.length * 10 * 1000)
        await this.cutVideos();
        setTimeout(async()=>{
            console.log("SET TIMEOUT")
            const files = await fs.promises.readdir(PATH.VIDEO_CUT + "/");
            await this.createFileWithVideos(files);
            let args = [
                "-f",
                "concat",
                "-safe 0",
                "-i",
                `"${PATH.TEMP_FILES}/${FILE_NAME.RAW_VIDEOS_TXT}"`,
                `${PATH.RESULT_VIDEO}/result.mp4`,
                "-y",
            ];
            await ChildProcess('ffmpeg',args)
        }, files.length * 8 * 1000)
    } catch (error) {
      throw error;
    }
  }
  async createFileWithVideos(files: string[]) {
    try {
      var stream = fs.createWriteStream(
        PATH.TEMP_FILES + "/" + FILE_NAME.RAW_VIDEOS_TXT
      );
      stream.once("open", function (fd) {
        files.map((file) => {
            stream.write(`file '${PATH.VIDEO_CUT}/${file}'` + "\n");
        });
        stream.end();
      });
      console.log("Created File: .txt");
    } catch (error) {
      console.log(
        "🚀 ~ file: video.controller.ts ~ line 133 ~ VideoController ~ createFileWithVideos ~ error",
        error
      );
      throw error;
    }
  }
  async getVideos() {
    try {
      const redditVideoFiltered = RedditVideoModel.find({
        processed: false,
      });

      return (await redditVideoFiltered).map((redditVideo) => {
        return [redditVideo._id, redditVideo.videoUrl];
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: video.controller.ts ~ line 99 ~ VideoController ~ getVideos ~ error",
        error
      );
      throw error;
    }
  }
  async updateVideoInDatabase(urlId: string) {
    try {
      const result = RedditVideoModel.findOneAndUpdate(
        {
          _id: urlId,
        },
        {
          $set: {
            processed: true,
          },
        },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }

          console.log(doc);
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
export default new VideoController();

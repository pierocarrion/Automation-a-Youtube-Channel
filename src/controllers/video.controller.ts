import uuid4 from "uuid4";
import fs from "fs";
import RedditVideoModel from "../datalayers/models/reddit.model";
import { FILE_NAME, PATH } from "../utils/constants";
import { ChildProcess } from "../utils/child_process";
import { randomIntegerFromInterval } from "../utils/functions";

class VideoController {
  constructor() { }

  async downloadVideos(redditVideos: string[]) {
    try {
      //youtube-dl https://v.redd.it/e9gp5ll6jbh91 -o "krowdy/%(title)s-%(id)s.%(ext)s"

      this.deleteVideosFromFolder(PATH.VIDEO_DOWNLOADED + "/");
      this.deleteVideosFromFolder(PATH.VIDEO_CUT + "/");
      return Promise.all(

        redditVideos.map((redditVideo) => {
          console.log(
            "🚀 ~ file: video.controller.ts ~ line 78 ~ VideoController ~ urlVideos.map ~ url",
            redditVideo
          );

          let args = [
            `${redditVideo}`,
            `-o "${PATH.VIDEO_DOWNLOADED}/${uuid4()}.%(ext)s"`,
          ];
          return ChildProcess("youtube-dl", args);
        })

      );

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

      return Promise.all(files.map((file) => {
        return this.cutVideo(PATH.VIDEO_CUT, pathDirectory + file, file);
      }));
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
      return new Promise((resolve, reject) => {
        var startTime = "00:00:00";
        var endTime = `00:00:${randomIntegerFromInterval(10, 20)}`;
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
        resolve(ChildProcess("ffmpeg", args));
      });
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
      const files = await fs.promises.readdir(PATH.VIDEO_CUT + "/");
      const result = await this.createFileWithVideos(files)
      if(result){
        return new Promise((resolve, reject) => {
          let args = [
            "-f",
            "concat",
            "-safe 0",
            "-i",
            `"${PATH.TEMP_FILES}/${FILE_NAME.RAW_VIDEOS_TXT}"`,
            `${PATH.RESULT_VIDEO}/result.mp4`,
            "-y",
          ];
          resolve(ChildProcess('ffmpeg', args))
        })
      }
    } catch (error) {
      throw error;
    }
  }
  async createFileWithVideos(files: string[]) {
    try {
      return new Promise(async (resolve, reject) => {
        var stream = fs.createWriteStream(
          PATH.TEMP_FILES + "/" + FILE_NAME.RAW_VIDEOS_TXT
        );
        stream.once("open", function (fd) {
          files.map((file) => {
            stream.write(`file '${PATH.VIDEO_CUT}/${file}'` + "\n");
          });
          stream.end();
        });
        resolve(true);
      })

    } catch (error) {
      console.log(
        "🚀 ~ file: video.controller.ts ~ line 133 ~ VideoController ~ createFileWithVideos ~ error",
        error
      );
      throw error;
    }
  }



  async getVideosFromDatabase() {
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

/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

"use strict";

// Configure S3
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Set ffpmeg
const ffmpegPath = process.env.localTest
  ? require("@ffmpeg-installer/ffmpeg").path
  : "/opt/bin/ffmpeg";
const ffTmp = process.env.localTest ? "./tmp" : "/tmp";

const { exec } = require("child_process");
const { tmpCleanup } = require("./tmpCleanup.js");

const fs = require("fs");
const path = require("path");

// Promisified wrapper for child_process.exec
const execPromise = async (command) => {
  return new Promise((resolve, reject) => {
    const ls = exec(command, function (error, stdout, stderr) {
      if (error) {
        console.log("Error: ", error);
        reject(error);
      }
      if (stdout) console.log("stdout: ", stdout);
      if (stderr) console.log("stderr: ", stderr);
    });

    ls.on("exit", (code) => {
      if (code != 0) console.log("execPromise finished with code ", code);
      resolve();
    });
  });
};

const resizeVideo = async (record) => {
  // Get signed URL for source object
  console.log("UPLOADING to ", process.env.SnippetsBucketNam);
  const Key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

  const data = await s3
    .getObject({
      Bucket: record.s3.bucket.name,
      Key,
    })
    .promise();
  // Save original to tmp directory
  const tempFile = `${ffTmp}/${Key}`;
  console.log("Saving downloaded file to ", tempFile);
  fs.writeFileSync(tempFile, data.Body);

  // Save resized video to /tmp
  const outputFilename = `${Key.split(".")[0]}_frame_0001`;
  console.log(`Resizing and saving to ${ffTmp}`);
  await execPromise(`${ffmpegPath} -i ${tempFile} ${ffTmp}/frame_%04d.png`);

  console.log("Read tmp file into tmpData");
  const files = fs.readdirSync(ffTmp);
  const fetched = await fetch("https://bogeybot.com/api/s3-frames?count=" files.length);
  for (const file of files) {
    if (file.startsWith("frame_") && file.endsWith(".png")) {
      let filePath = path.join(ffTmp, file);
      let fileContent = fs.readFileSync(filePath);

      const params = {
        Bucket: process.env.OutputBucketName, // resized
        Key: `${Key}/${file}`,
        Body: fileContent,
        ContentType: "image/png",
      };

      await s3.putObject(params).promise();
      console.log(`Object written to ${Key}/${file}`);
    }
  }

  // Upload to S3

  // Clean up temp files
  console.log("Cleaning up temporary files");
  await tmpCleanup();
};

module.exports = { resizeVideo };

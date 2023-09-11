import aws from "aws-sdk";

// TODO need another config clientside

// TODO need to not expose this key
const init = () => {
  aws.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
    region: "us-west-1", // e.g., 'us-west-1'
  });
  const s3 = new aws.S3();
  return s3;
  // hello stsao
};

export default init;

// export const extractCloudinaryPublicId = (url) => {
//   // example url: https://res.cloudinary.com/your-cloud-name/image/upload/v1633072800/filename.jpg

//   try {
//     const parts = url.split("/");
//     const filename = parts.pop();
//     const [publicId] = filename.split(".");
//     return publicId;
//   } catch {
//     return null;
//   }
// };
export const extractCloudinaryPublicId = (url) => {
  // example url: https://res.cloudinary.com/your-cloud-name/image/upload/v1633072800/posts/filename.jpg

  try {
    // Find the upload part of the URL
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex === -1) return null;

    // Get everything after the version number
    const afterUpload = url.substring(uploadIndex + 8); // +8 to skip '/upload/'

    // Find the version part (v1234567890/)
    const versionMatch = afterUpload.match(/^v\d+\//);

    // If there's a version number, skip it
    let pathWithoutVersion = afterUpload;
    if (versionMatch && versionMatch[0]) {
      pathWithoutVersion = afterUpload.substring(versionMatch[0].length);
    }

    // Remove file extension
    const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, "");

    return publicId;
  } catch (error) {
    console.error("Error extracting Cloudinary public ID:", error);
    return null;
  }
};

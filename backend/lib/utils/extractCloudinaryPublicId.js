export const extractCloudinaryPublicId = (url) => {
  // example url: https://res.cloudinary.com/your-cloud-name/image/upload/v1633072800/filename.jpg

  try {
    const parts = url.split("/");
    const filename = parts.pop();
    const [publicId] = filename.split(".");
    return publicId;
  } catch {
    return null;
  }
};

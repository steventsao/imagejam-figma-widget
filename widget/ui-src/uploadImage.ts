const CLOUDINARY = {
  CLOUD_ID_URL: "https://api.cloudinary.com/v1_1/dhr6dzeov/upload",
  UPLOAD_PRESET: "yk3fugai",
};
export async function uploadImage(bytes: Uint8Array): Promise<string> {
  const base64 = (await uint8ArrayToBase64(bytes)) as string;
  // Create a Cloudinary instance and set your cloud name.
  const form = new FormData();
  form.append("file", base64);
  form.append("upload_preset", CLOUDINARY.UPLOAD_PRESET);
  const res = await fetch(CLOUDINARY.CLOUD_ID_URL, {
    method: "POST",
    body: form,
  });
  const data = await res.json();

  return data.secure_url;
}

async function uint8ArrayToBase64(uint8Array: Uint8Array) {
  const blob = new Blob([uint8Array], { type: "application/octet-binary" });
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;

      resolve(dataUrl); // Split off the data URL prefix to get just the Base64 content
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(blob);
  });
}

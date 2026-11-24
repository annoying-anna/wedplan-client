/**
 * ImgBB Image Upload Utility
 * Handles uploading files to ImgBB API with automatic fallbacks for local/mock environments.
 */
export async function uploadImageToImgBB(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  // If a real key is present, upload to ImgBB
  if (apiKey && apiKey !== "mock_imgbb_key" && !apiKey.startsWith("mock")) {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success && data.data?.url) {
        return data.data.url;
      }
      console.warn("ImgBB upload failed, falling back to FileReader:", data.error);
    } catch (err) {
      console.warn("ImgBB network error, falling back to FileReader:", err);
    }
  }

  // Graceful fallback for local/demo environments: resize & compress before Data URL encoding
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Failed to read image file."));
        return;
      }
      const img = new Image();
      img.onload = () => {
        const maxDim = 600;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = () => resolve(reader.result as string);
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error("File reading error."));
    reader.readAsDataURL(file);
  });
}

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h, s, l];
};

const rgbToHex = (r, g, b) => {
  return (
    '#' +
    [r, g, b]
      .map((c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
};

const getDominantColour = async (imageUrl) => {
  try {
    const palette = await getPalette(imageUrl);
    return palette[0][0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getPalette = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageUrl;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixelData = imageData.data;

      const colorCounts = {};
      for (let i = 0; i < pixelData.length; i += 4) {
        const r = pixelData[i];
        const g = pixelData[i + 1];
        const b = pixelData[i + 2];
        const a = pixelData[i + 3];
        if (a === 0) {
          continue;
        }

        const hsl = rgbToHsl(r, g, b);

        // Check if lightness value is between 0.2 and 0.8
        if (hsl[2] >= 0.5 && hsl[2] < 0.85) {
          const hex = rgbToHex(r, g, b);
          colorCounts[hex] = colorCounts[hex] ? colorCounts[hex] + 1 : 1;
        }
      }

      const colorCountsArray = Object.entries(colorCounts);
      colorCountsArray.sort((a, b) => b[1] - a[1]);

      const palette = colorCountsArray.slice(0, 5);
      resolve(palette);
    };

    image.onerror = () => {
      reject('Failed to load image');
    };
  });
};

export default {
  getPalette,
  getDominantColour,
};

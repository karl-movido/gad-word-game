function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  })
}

function loadAudio(url) {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.addEventListener('canplaythrough', () => resolve(audio), { once: true });
    audio.addEventListener('error', () => reject(new Error(`Failed to load audio: ${url}`)));
    audio.src = url;
  })
}

export function loadAllAssets(manifest, onProgress) {
  const promises = [];
  const cache = { images: {}, audio: {} };

  manifest.images.forEach(url => {
    const p = loadImage(url).then(img => { cache.images[url] = img; });
    promises.push(p);
  });

  manifest.audio.forEach(url => {
    const p = loadAudio(url).then(audio => { cache.audio[url] = audio; });
    promises.push(p);
  })

  return Promise.all(promises).then(() => cache);
}

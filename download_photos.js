const https = require('https');
const fs = require('fs');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    // Ensure parent directory exists
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: Status Code ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

(async () => {
  const photos = [
    {
      name: 'Family Suite Photo',
      url: 'https://lh3.googleusercontent.com/pw/AP1GczMbBN7vAq_WXlTLpaesltwejXEcIIDrjHnJlHzP6FLFkg1QhEDw3c_67bmRyZL0rL_aBgiJweLY7G_GoKWV8YONKHNp4YDhlgLRKjWEWWhJMRlfD-K0SWRKmwtwjGyUXkOffYIjC2u2dbgLq0wVPCsNuw=w651-h869-s-no-gm?authuser=0',
      dest: 'public/family-suite.jpg'
    },
    {
      name: 'Deluxe Room Photo',
      url: 'https://lh3.googleusercontent.com/pw/AP1GczMs8ZaydyWXSJycg5dn7LxhSA_OJDD0sbfgFMXF0GyVxm3N1HBJdKe7k50xrQZwGKW2ljNwfruIPsUEU822IhkSgripJTpKA707WBF8mrI89mWUWH7bRtTAeYTBHtrm1Ej1ZfFVnb1E6WvYjv_STzwQXA=w651-h869-s-no-gm?authuser=0',
      dest: 'public/deluxe-room.jpg'
    },
    {
      name: 'Gallery Plantation Photo',
      url: 'https://lh3.googleusercontent.com/pw/AP1GczMDIyIp5s0O1-cH4kh12Aa6-jAuIR8yXjA6hjp6mqbX2jXerjfAeTN7Oq3mlpZmjyBRWeJt5sdlJ7gUEgSuIZbuL38p2GvLxBk68q0rUMl_J83s6ExcFrdNJi-Z5EA83mlV6IOtJJZUhE-F1PgcxrR9XA=w651-h869-s-no-gm?authuser=0',
      dest: 'public/gallery-plantation.jpg'
    },
    {
      name: 'Gallery Bedding Photo',
      url: 'https://lh3.googleusercontent.com/pw/AP1GczNLpOa948ajzD6PiULpl1iiPtTYWkJhuivsrIA3-evymkKo_oHdK788D5_muEVR33ROAZPNubmRt7uUhTXv5xX3lEjsjIQOCK3oRBheNDlvsMDtUjVd2baVyKvUiAd05G6syzTRR9MiMOc_aNLN5GB8oQ=w651-h869-s-no-gm?authuser=0',
      dest: 'public/gallery-bedding.jpg'
    },
    {
      name: 'Gallery Nature Photo',
      url: 'https://lh3.googleusercontent.com/pw/AP1GczP4r1tGWOpP7Up_7WaVSZYuBoxhyTBJgNYjAdO79J_esQlwcD4bRbTv_uJYnpxOrm_j85yph9NXGmUUgR0exvloUHCtkb9XVjbqbEMBa7QWrAD-SGD5grVYUJxA1S7Dde7exMv-4t6ctzeEHjnQo0VkVw=w651-h869-s-no-gm?authuser=0',
      dest: 'public/gallery-nature.jpg'
    }
  ];

  console.log('🚀 Starting room and gallery photos download...');

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    try {
      console.log(`📥 Downloading ${photo.name} to ${photo.dest}...`);
      await download(photo.url, photo.dest);
      const stats = fs.statSync(photo.dest);
      console.log(`✅ ${photo.name} downloaded successfully! Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    } catch (err) {
      console.error(`❌ Error downloading ${photo.name}:`, err.message);
    }
  }

  console.log('🎉 Done! All photos downloaded locally.');
})();


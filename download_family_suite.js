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
      url: 'https://lh3.googleusercontent.com/pw/AP1GczP0dDfDVh7j9sMEP-L2YHDcUlU-oTRlowCnABXN7OZXQJBRtjynWDCn4UIfgxAhTwmt1ehW0p5sQR1sA_zmfUdEaTc1TF0ljDVrbnU4PgC3eHwNMxmGFiE7hbuX8_fOsEPdQYpyanOaq4j4OhNlSr_q8g=s0',
      dest: 'public/family-suite-1.jpg'
    },
    {
      url: 'https://lh3.googleusercontent.com/pw/AP1GczPLF68O-EKRlt19w4Zj3bKaZc3AbifZpMzx96GW1oyFf5PC4h0Hje-xMSV4E5Coy7mmiWeG2O-CQFLYc9D-hII69OeuZBDzQ-puxUL8VwXsQf21G0bKAuLcCTwKSvnapQxg-5lTc8ZTPLlh9qG5bwTYiQ=s0',
      dest: 'public/family-suite-2.jpg'
    }
  ];

  console.log('🚀 Starting Family Suite photos download...');

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    try {
      console.log(`📥 Downloading Photo ${i + 1} to ${photo.dest}...`);
      await download(photo.url, photo.dest);
      const stats = fs.statSync(photo.dest);
      console.log(`✅ Photo ${i + 1} downloaded successfully! Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    } catch (err) {
      console.error(`❌ Error downloading Photo ${i + 1}:`, err.message);
    }
  }

  console.log('🎉 Done!');
})();

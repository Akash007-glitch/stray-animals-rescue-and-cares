const fs = require('fs');
const path = require('path');

function getJpgSize(buffer) {
  let i = 2;
  while (i < buffer.length) {
    const marker = buffer.readUInt16BE(i);
    i += 2;
    if (marker === 0xFFC0 || marker === 0xFFC2) {
      // SOF0 or SOF2
      i += 3; // skip length & precision
      const height = buffer.readUInt16BE(i);
      const width = buffer.readUInt16BE(i + 2);
      return { width, height };
    } else {
      const length = buffer.readUInt16BE(i);
      i += length;
    }
  }
  return null;
}

function getPngSize(buffer) {
  if (buffer.readUInt32BE(12) === 0x49484452) { // IHDR
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  }
  return null;
}

const dir = 'public/images';
const files = fs.readdirSync(dir);
for (const file of files) {
  const filePath = path.join(dir, file);
  const buffer = fs.readFileSync(filePath);
  let size = null;
  if (file.endsWith('.png')) {
    size = getPngSize(buffer);
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    size = getJpgSize(buffer);
  }
  console.log(`${file}: size=${buffer.length} bytes, dimensions=${size ? `${size.width}x${size.height}` : 'unknown'}`);
}

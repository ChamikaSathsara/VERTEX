// Generate valid minimal PNG icons with sharp black background and white square monogram
const fs = require('fs');
const zlib = require('zlib');

function createPng(size, text) {
  const width = size;
  const height = size;

  // Uncompressed raw image data: height lines, each line starts with 0 (no filter), then RGBA
  const rowLength = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowLength);

  const borderWidth = Math.max(2, Math.floor(size * 0.04));
  const innerMargin = Math.floor(size * 0.22);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLength;
    rawData[rowOffset] = 0; // Filter type 0: None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Draw sharp geometric motif
      const isOuterBorder = (x < borderWidth || x >= width - borderWidth || y < borderWidth || y >= height - borderWidth);
      const isCenterSquare = (x >= innerMargin && x < width - innerMargin && y >= innerMargin && y < height - innerMargin);

      if (isOuterBorder || isCenterSquare) {
        rawData[pxOffset] = 255;     // R
        rawData[pxOffset + 1] = 255; // G
        rawData[pxOffset + 2] = 255; // B
        rawData[pxOffset + 3] = 255; // A
      } else {
        rawData[pxOffset] = 10;     // R (Dark onyx #0a0a0c)
        rawData[pxOffset + 1] = 10; // G
        rawData[pxOffset + 2] = 12; // B
        rawData[pxOffset + 3] = 255; // A
      }
    }
  }

  const deflated = zlib.deflateSync(rawData);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8-bit depth
  ihdrData[9] = 6; // Color type 6 (RGBA)
  ihdrData[10] = 0; // Compression 0
  ihdrData[11] = 0; // Filter 0
  ihdrData[12] = 0; // Interlace 0

  const ihdrChunk = createChunk('IHDR', ihdrData);
  const idatChunk = createChunk('IDAT', deflated);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(8 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);

  const crcVal = crc32(chunk.slice(4, 8 + len));
  chunk.writeUInt32BE(crcVal, 8 + len);
  return chunk;
}

fs.writeFileSync('icon-192.png', createPng(192));
fs.writeFileSync('icon-512.png', createPng(512));
console.log('Created valid PWA PNG icons: icon-192.png, icon-512.png');

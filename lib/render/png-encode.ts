import { deflateSync } from "node:zlib";

/**
 * Minimal RGB PNG encoder (no external deps).
 * Fallback when Chromium/Remotion is unavailable in the environment.
 */
function crcTable(): Uint32Array {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
}

const CRC_TABLE = crcTable();

function crc32(buf: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]!) & 0xff]! ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Uint8Array): Buffer {
  const typeBytes = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.concat([typeBytes, Buffer.from(data)]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcBuf), 0);
  return Buffer.concat([len, typeBytes, Buffer.from(data), crc]);
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h.slice(0, 6);
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

export type SolidPngOptions = {
  width: number;
  height: number;
  background: string;
  blocks?: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  }>;
};

export function encodeSolidPng(opts: SolidPngOptions): Buffer {
  const { width, height, background, blocks = [] } = opts;
  const [br, bg, bb] = hexToRgb(background);
  const pixels = Buffer.alloc(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    pixels[i * 3] = br;
    pixels[i * 3 + 1] = bg;
    pixels[i * 3 + 2] = bb;
  }

  for (const block of blocks) {
    const [r, g, b] = hexToRgb(block.color);
    const x0 = Math.max(0, Math.floor(block.x));
    const y0 = Math.max(0, Math.floor(block.y));
    const x1 = Math.min(width, Math.ceil(block.x + block.width));
    const y1 = Math.min(height, Math.ceil(block.y + block.height));
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const idx = (y * width + x) * 3;
        pixels[idx] = r;
        pixels[idx + 1] = g;
        pixels[idx + 2] = b;
      }
    }
  }

  const raw = Buffer.alloc((width * 3 + 1) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (width * 3 + 1);
    raw[rowStart] = 0;
    pixels.copy(raw, rowStart + 1, y * width * 3, (y + 1) * width * 3);
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 6 })),
    chunk("IEND", new Uint8Array(0)),
  ]);
}

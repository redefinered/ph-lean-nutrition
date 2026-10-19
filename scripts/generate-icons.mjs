// Renders the app mark (a rice bowl) into the PNG sizes the manifest and iOS
// need. Run with `npm run icons` after editing the artwork below.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const INK = "#18181b";
const BOWL = "#fafafa";
const RICE = "#f59e0b";

// Artwork is centred on a 512 grid; the 1.2 scale keeps it inside the 80%
// circle that Android reserves as the maskable safe zone.
const mark = `
  <g transform="translate(256 256) scale(1.2) translate(-256 -256)">
    <path d="M164 209 Q256 115 348 209 Z" fill="${RICE}" />
    <path d="M142 235 A114 114 0 0 0 370 235 Z" fill="${BOWL}" />
    <rect x="118" y="207" width="276" height="30" rx="15" fill="${BOWL}" />
  </g>
`;

function svg({ rounded }) {
  const backdrop = rounded
    ? `<rect width="512" height="512" rx="112" fill="${INK}" />`
    : `<rect width="512" height="512" fill="${INK}" />`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">${backdrop}${mark}</svg>`;
}

const targets = [
  { file: "public/icons/icon-192.png", size: 192, rounded: true },
  { file: "public/icons/icon-512.png", size: 512, rounded: true },
  { file: "public/icons/icon-maskable-192.png", size: 192, rounded: false },
  { file: "public/icons/icon-maskable-512.png", size: 512, rounded: false },
  // iOS draws its own rounded mask over the home screen icon, so ship it square.
  { file: "src/app/apple-icon.png", size: 180, rounded: false },
  { file: "src/app/icon.png", size: 96, rounded: true },
];

for (const { file, size, rounded } of targets) {
  const out = path.join(root, file);
  await mkdir(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg({ rounded })))
    .resize(size, size)
    .png()
    .toFile(out);
  console.log(`wrote ${file} (${size}x${size})`);
}

const svgOut = path.join(root, "src/app/icon.svg");
await writeFile(svgOut, `${svg({ rounded: true })}\n`);
console.log("wrote src/app/icon.svg");

// Minimal PNG-in-ICO container: a 6-byte directory header, one 16-byte entry
// per image, then the PNG payloads.
const icoSizes = [16, 32, 48];
const icoFrames = await Promise.all(
  icoSizes.map((size) =>
    sharp(Buffer.from(svg({ rounded: true })))
      .resize(size, size)
      .png()
      .toBuffer(),
  ),
);

const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoFrames.length, 4);

let offset = header.length + icoFrames.length * 16;
const entries = icoFrames.map((frame, index) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(icoSizes[index] % 256, 0);
  entry.writeUInt8(icoSizes[index] % 256, 1);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(frame.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += frame.length;
  return entry;
});

await writeFile(
  path.join(root, "src/app/favicon.ico"),
  Buffer.concat([header, ...entries, ...icoFrames]),
);
console.log("wrote src/app/favicon.ico");

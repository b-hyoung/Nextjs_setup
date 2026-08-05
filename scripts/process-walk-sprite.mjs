/**
 * 걷기 스프라이트 시트 처리기
 * 사용: node scripts/process-walk-sprite.mjs <원본.png>
 *
 * 1) 주황 배경 크로마키 → 투명
 * 2) 4x2 = 8프레임으로 절단
 * 3) public/images/character/walk-0..7.webp 출력
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const src = process.argv[2];
if (!src) {
  console.error("사용법: node scripts/process-walk-sprite.mjs <스프라이트.png>");
  process.exit(1);
}

const OUT_DIR = path.join(import.meta.dirname, "..", "public", "images", "character");
mkdirSync(OUT_DIR, { recursive: true });

const COLS = 4;
const ROWS = 2;

// 주황 배경 크로마키 (RGB 거리 기준)
const chromaKey = async (input) => {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // 배경색 샘플: 좌상단 픽셀
  const bg = [data[0], data[1], data[2]];
  const THRESHOLD = 90; // 색 거리 임계값
  const SOFT = 40; // 부드러운 가장자리 구간

  for (let i = 0; i < data.length; i += 4) {
    const dr = data[i] - bg[0];
    const dg = data[i + 1] - bg[1];
    const db = data[i + 2] - bg[2];
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    if (dist < THRESHOLD) {
      data[i + 3] = 0;
    } else if (dist < THRESHOLD + SOFT) {
      data[i + 3] = Math.round(((dist - THRESHOLD) / SOFT) * 255);
    }
  }
  return sharp(data, { raw: info }).png().toBuffer();
};

const main = async () => {
  const keyed = await chromaKey(src);
  const meta = await sharp(keyed).metadata();
  const fw = Math.floor(meta.width / COLS);
  const fh = Math.floor(meta.height / ROWS);
  console.log(`시트 ${meta.width}x${meta.height} → 프레임 ${fw}x${fh} x ${COLS * ROWS}`);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const idx = row * COLS + col;
      // 트림하지 않는다 — 프레임 박스를 동일하게 유지해야 위치가 안 흔들린다
      const info = await sharp(keyed)
        .extract({ left: col * fw, top: row * fh, width: fw, height: fh })
        .resize({ height: 480, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 88 })
        .toFile(path.join(OUT_DIR, `walk-${idx}.webp`));
      console.log(`walk-${idx}.webp ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB`);
    }
  }
  console.log("완료 → public/images/character/");
};

main();

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
const prefix = process.argv[3] ?? "walk";
const COLS = Number(process.argv[4] ?? 4);
const ROWS = Number(process.argv[5] ?? 2);
if (!src) {
  console.error("사용법: node scripts/process-walk-sprite.mjs <스프라이트.png>");
  process.exit(1);
}

const OUT_DIR = path.join(import.meta.dirname, "..", "public", "images", "character");
mkdirSync(OUT_DIR, { recursive: true });




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

// 알파 바운딩박스 계산 (실루엣 위치)
const alphaBBox = async (buf) => {
  const { data, info } = await sharp(buf)
    .raw()
    .toBuffer({ resolveWithObject: true });
  let minX = info.width, maxX = -1, minY = info.height, maxY = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 16) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { minX, maxX, minY, maxY };
};

const main = async () => {
  const keyed = await chromaKey(src);
  const meta = await sharp(keyed).metadata();
  const fw = Math.floor(meta.width / COLS);
  const fh = Math.floor(meta.height / ROWS);
  console.log(`시트 ${meta.width}x${meta.height} → 프레임 ${fw}x${fh} x ${COLS * ROWS}`);

  // 1패스: 프레임 추출 + 실루엣 바운딩박스
  const frames = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const buf = await sharp(keyed)
        .extract({ left: col * fw, top: row * fh, width: fw, height: fh })
        .png()
        .toBuffer();
      frames.push({ buf, bbox: await alphaBBox(buf) });
    }
  }

  // 2패스: 제자리 걷기 정렬 — 실루엣 가로중앙을 캔버스 중앙에, 발바닥을 공통 기준선에
  const BASELINE = fh - 8; // 캔버스 하단에서 8px 위가 발바닥
  for (let idx = 0; idx < frames.length; idx++) {
    const { buf, bbox } = frames[idx];
    const cx = (bbox.minX + bbox.maxX) / 2;
    const shiftX = Math.round(fw / 2 - cx);
    const shiftY = Math.round(BASELINE - bbox.maxY);
    // 음수 시프트는 소스를 그만큼 잘라서 0 위치에 배치 (composite는 음수 오프셋 불가)
    const srcLeft = Math.max(0, -shiftX);
    const srcTop = Math.max(0, -shiftY);
    const destLeft = Math.max(0, shiftX);
    const destTop = Math.max(0, shiftY);
    const cropped = await sharp(buf)
      .extract({
        left: srcLeft,
        top: srcTop,
        width: fw - Math.abs(shiftX),
        height: fh - Math.abs(shiftY),
      })
      .png()
      .toBuffer();
    // composite와 resize는 별도 패스로 (sharp는 resize를 composite보다 먼저 적용)
    const aligned = await sharp({
      create: { width: fw, height: fh, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    })
      .composite([{ input: cropped, left: destLeft, top: destTop }])
      .png()
      .toBuffer();
    const info = await sharp(aligned)
      .resize({ height: 480, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 88 })
      .toFile(path.join(OUT_DIR, `${prefix}-${idx}.webp`));
    console.log(
      `${prefix}-${idx}.webp ${info.width}x${info.height} shift(${shiftX},${shiftY}) ${Math.round(info.size / 1024)}KB`,
    );
  }
  console.log("완료 → public/images/character/");
};

main();

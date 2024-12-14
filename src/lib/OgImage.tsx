import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

type GetOpImageOptions = {
  baseUrl: string;
  title: string;
  emoji: string;
};

/**
 * OGP画像を生成
 * @param opts オプション
 * @returns PNG画像
 */
export async function getOgImage({ baseUrl, title, emoji }: GetOpImageOptions) {
  const notoSansJP = await fetchFont(title, "Noto Sans JP");

  if (!notoSansJP) {
    return null;
  }

  const svg = await satori(
    <div
      lang="ja-JP"
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "64px",
        backgroundImage: `url('${new URL("/og-base.svg", baseUrl).toString()}')`
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "50%"
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "96px"
          }}
        >
          {emoji}
        </div>
        <div
          style={{
            fontSize: "48px",
            fontWeight: "bold"
          }}
        >
          {title}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Noto Sans JP",
          data: notoSansJP
        }
      ],
      loadAdditionalAsset: async (code, segment) => {
        const svg = await loadEmoji(code, segment);
        return `data:image/svg+xml;base64,${btoa(svg)}`;
      }
    }
  );

  const resvg = new Resvg(svg);

  return resvg.render().asPng();
}

/**
 * Google Fonts からポエムの表示に必要なフォントを取得する
 * 参考: https://github.com/vercel/satori/blob/29fe2e4a9676a1ba41c361ec1a547d6de329b039/playground/pages/api/font.ts#L86
 * @param text テキスト
 * @param family フォントファミリー
 * @returns フォントデータ
 */
async function fetchFont(text: string, family: string): Promise<ArrayBuffer | null> {
  const endpoint = new URL("https://fonts.googleapis.com/css2");
  endpoint.searchParams.append("family", family);
  endpoint.searchParams.append("text", text);

  const css = await (
    await fetch(endpoint.toString(), {
      headers: {
        // Make sure it returns TTF.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
      }
    })
  ).text();

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (!resource) {
    return null;
  }

  const res = await fetch(resource[1]);
  if (!res.ok) {
    return null;
  }

  return res.arrayBuffer();
}

/**
 * 絵文字を取得
 * @param code 種類
 * @param segment セグメント
 * @returns SVG画像
 */
async function loadEmoji(code: string, segment: string) {
  if (code !== "emoji") {
    return "";
  }

  const endpoint = "https://cdn.jsdelivr.net/gh/svgmoji/svgmoji/packages/svgmoji__noto/svg/";
  const emojiCode = segment.codePointAt(0)?.toString(16).toUpperCase();

  if (!emojiCode) {
    return "";
  }

  const res = await fetch(`${endpoint}${emojiCode}.svg`);

  if (!res.ok) {
    return "";
  }

  return res.text();
}

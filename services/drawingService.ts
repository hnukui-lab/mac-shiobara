import { GoogleGenAI, Type } from "@google/genai";
import { DrawingAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Gemini にインラインで渡せるサイズの目安（リクエスト全体で約20MB）
export const MAX_DRAWING_BYTES = 15 * 1024 * 1024;
export const ACCEPTED_DRAWING_TYPES = ["image/png", "image/jpeg", "image/webp", "application/pdf"];

const stringArray = { type: Type.ARRAY, items: { type: Type.STRING } };

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "図面名・品名（読み取れなければ推定名）" },
    drawingType: { type: Type.STRING, description: "図面の種類（例: 平面図, 立面図, 断面図, 詳細図, 部品図）" },
    scale: { type: Type.STRING, description: "縮尺。記載がなければ「記載なし」" },
    summary: { type: Type.STRING, description: "図面の内容を2〜3文で要約" },
    dimensions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING, description: "寸法の対象（例: 全幅, 高さ, 手摺ピッチ）" },
          value: { type: Type.STRING, description: "寸法値と単位（例: 1200mm）" },
        },
        required: ["label", "value"],
      },
    },
    materials: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "材質（例: SUS304）" },
          spec: { type: Type.STRING, description: "規格・板厚・断面（例: t=2.0, φ34.0）" },
          finish: { type: Type.STRING, description: "仕上げ（例: HL, 鏡面, 焼付塗装）。不明なら空文字" },
        },
        required: ["name", "spec", "finish"],
      },
    },
    parts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          quantity: { type: Type.STRING, description: "数量。不明なら空文字" },
          size: { type: Type.STRING },
          material: { type: Type.STRING },
          note: { type: Type.STRING },
        },
        required: ["name", "quantity", "size", "material", "note"],
      },
    },
    notes: { ...stringArray, description: "図面に書かれた注記・特記事項" },
    checkpoints: { ...stringArray, description: "読み取れなかった箇所、寸法の矛盾、製作・施工前に確認すべき点" },
  },
  required: ["title", "drawingType", "scale", "summary", "dimensions", "materials", "parts", "notes", "checkpoints"],
};

const SYSTEM_INSTRUCTION = `あなたは株式会社マックシオバラ（建築金物: 手摺・パネル・ルーバー等の製作施工）の図面読み取り担当者です。
アップロードされた図面（平面図・立面図・断面図・詳細図・部品図など、比較的シンプルなもの）を読み取り、内容を日本語で整理してください。

ルール:
- 図面に書かれている情報を優先し、推測した値には「(推定)」と付ける。
- 読み取れない・判読が怪しい箇所は値をでっち上げず、checkpoints に書く。
- 寸法は単位付きで記載する（図面に単位がなければ mm とみなし「(mm想定)」と付ける）。
- 材質記号（SUS304, SS400, A5052 等）や仕上げ記号（HL, #400, BA 等）はそのまま転記し、必要なら括弧で意味を補足する。
- 該当する情報がない項目は空配列にする。`;

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

export const analyzeDrawing = async (file: File, question?: string): Promise<DrawingAnalysis> => {
  const data = await fileToBase64(file);
  const prompt = question?.trim()
    ? `この図面を解析してください。あわせて次の点にも注目し、結果を summary か checkpoints に反映してください: ${question.trim()}`
    : "この図面を解析してください。";

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ inlineData: { mimeType: file.type, data } }, { text: prompt }],
      },
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema,
    },
  });

  if (!response.text) {
    throw new Error("解析結果が空でした。");
  }
  return JSON.parse(response.text) as DrawingAnalysis;
};

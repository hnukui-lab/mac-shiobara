import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Loader2, Ruler, Layers, ListChecks, StickyNote, AlertTriangle, Download, X } from 'lucide-react';
import { analyzeDrawing, ACCEPTED_DRAWING_TYPES, MAX_DRAWING_BYTES } from '../services/drawingService';
import { DrawingAnalysis, DrawingPart } from '../types';

const toCsv = (parts: DrawingPart[]): string => {
  const escape = (v: string) => `"${(v ?? '').replace(/"/g, '""')}"`;
  const header = ['部品名', '数量', 'サイズ', '材質', '備考'];
  const rows = parts.map(p => [p.name, p.quantity, p.size, p.material, p.note].map(escape).join(','));
  return [header.map(escape).join(','), ...rows].join('\r\n');
};

const downloadCsv = (analysis: DrawingAnalysis) => {
  // Excel で文字化けしないよう BOM を付ける
  const blob = new Blob(['﻿' + toCsv(analysis.parts)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${analysis.title || '図面'}_部品表.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const ResultCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
    <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4">
      <span className="text-green-600">{icon}</span>
      {title}
    </h3>
    {children}
  </div>
);

const Empty = () => <p className="text-sm text-slate-400">読み取れる情報はありませんでした。</p>;

export const DrawingAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DrawingAnalysis | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const selectFile = (f: File | undefined) => {
    if (!f) return;
    setError(null);
    setResult(null);
    if (!ACCEPTED_DRAWING_TYPES.includes(f.type)) {
      setError('PNG / JPEG / WebP / PDF のファイルを選択してください。');
      return;
    }
    if (f.size > MAX_DRAWING_BYTES) {
      setError('ファイルサイズが大きすぎます（15MBまで）。');
      return;
    }
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  };

  const clearFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!file || isLoading) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(await analyzeDrawing(file, question));
    } catch (e) {
      console.error('Drawing analysis error:', e);
      setError('解析に失敗しました。画像が鮮明か確認のうえ、再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="図面解析" className="py-16 md:py-24 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">AI図面解析</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            図面をアップロードすると、寸法・材質・仕上げ・部品構成・注記をAIが読み取って整理します。
            手摺やパネルの詳細図など、比較的シンプルな図面を想定しています。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col gap-4">
            {!file ? (
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); selectFile(e.dataTransfer.files[0]); }}
                className={`flex-1 min-h-[320px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
                  isDragging ? 'border-green-600 bg-green-50' : 'border-slate-300 hover:border-green-600'
                }`}
              >
                <Upload className="w-10 h-10 text-slate-400" />
                <p className="font-bold text-slate-700">図面をドラッグ＆ドロップ</p>
                <p className="text-sm text-slate-500">またはクリックして選択（PNG / JPEG / WebP / PDF・15MBまで）</p>
              </div>
            ) : (
              <div className="relative flex-1 min-h-[320px] border border-slate-200 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                {file.type === 'application/pdf' ? (
                  <div className="flex flex-col items-center gap-2 text-slate-600">
                    <FileText className="w-12 h-12" />
                    <p className="text-sm font-medium">{file.name}</p>
                  </div>
                ) : (
                  previewUrl && <img src={previewUrl} alt="アップロードした図面" className="max-h-[480px] w-full object-contain" />
                )}
                <button
                  onClick={clearFile}
                  className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white p-1.5 rounded-full"
                  aria-label="ファイルを取り消す"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED_DRAWING_TYPES.join(',')}
              className="hidden"
              onChange={(e) => selectFile(e.target.files?.[0])}
            />

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={2}
              placeholder="補足・確認したいこと（任意） 例: 手摺の支柱本数と材質を知りたい"
              className="w-full bg-slate-100 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none resize-none"
            />

            <button
              onClick={handleAnalyze}
              disabled={!file || isLoading}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" />解析中...</> : '図面を解析する'}
            </button>

            {error && <p className="text-sm text-red-600">{error}</p>}
            <p className="text-xs text-slate-400">
              ※ AIによる読み取り結果です。製作・見積りの前に必ず原図と照合してください。
            </p>
          </div>

          {/* Result */}
          <div className="flex flex-col gap-6">
            {!result && !isLoading && (
              <div className="flex-1 min-h-[320px] border border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-sm">
                解析結果がここに表示されます
              </div>
            )}
            {isLoading && (
              <div className="flex-1 min-h-[320px] border border-slate-200 bg-white rounded-lg flex flex-col items-center justify-center gap-3 text-slate-500 text-sm">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                図面を読み取っています...
              </div>
            )}

            {result && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className="bg-slate-900 text-white rounded-lg p-6">
                  <p className="text-xs text-green-500 font-bold tracking-wider">{result.drawingType}・縮尺 {result.scale}</p>
                  <h3 className="text-xl font-bold mt-1">{result.title}</h3>
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed">{result.summary}</p>
                </div>

                <ResultCard icon={<Ruler size={18} />} title="主要寸法">
                  {result.dimensions.length ? (
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      {result.dimensions.map((d, i) => (
                        <React.Fragment key={i}>
                          <dt className="text-slate-500">{d.label}</dt>
                          <dd className="font-medium text-slate-900">{d.value}</dd>
                        </React.Fragment>
                      ))}
                    </dl>
                  ) : <Empty />}
                </ResultCard>

                <ResultCard icon={<Layers size={18} />} title="材質・仕上げ">
                  {result.materials.length ? (
                    <ul className="space-y-2 text-sm">
                      {result.materials.map((m, i) => (
                        <li key={i} className="flex flex-wrap gap-x-3">
                          <span className="font-bold text-slate-900">{m.name}</span>
                          {m.spec && <span className="text-slate-600">{m.spec}</span>}
                          {m.finish && <span className="text-green-700">{m.finish}</span>}
                        </li>
                      ))}
                    </ul>
                  ) : <Empty />}
                </ResultCard>

                <ResultCard icon={<ListChecks size={18} />} title="部品表">
                  {result.parts.length ? (
                    <>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                          <thead className="text-slate-500 border-b border-slate-200">
                            <tr>
                              <th className="py-2 pr-3 font-medium">部品名</th>
                              <th className="py-2 pr-3 font-medium">数量</th>
                              <th className="py-2 pr-3 font-medium">サイズ</th>
                              <th className="py-2 pr-3 font-medium">材質</th>
                              <th className="py-2 font-medium">備考</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.parts.map((p, i) => (
                              <tr key={i} className="border-b border-slate-100 last:border-none">
                                <td className="py-2 pr-3 font-medium text-slate-900">{p.name}</td>
                                <td className="py-2 pr-3">{p.quantity}</td>
                                <td className="py-2 pr-3">{p.size}</td>
                                <td className="py-2 pr-3">{p.material}</td>
                                <td className="py-2 text-slate-500">{p.note}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <button
                        onClick={() => downloadCsv(result)}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800"
                      >
                        <Download size={16} />CSVでダウンロード
                      </button>
                    </>
                  ) : <Empty />}
                </ResultCard>

                <ResultCard icon={<StickyNote size={18} />} title="注記・特記事項">
                  {result.notes.length ? (
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      {result.notes.map((n, i) => <li key={i}>{n}</li>)}
                    </ul>
                  ) : <Empty />}
                </ResultCard>

                {result.checkpoints.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <h3 className="flex items-center gap-2 font-bold text-amber-800 mb-3">
                      <AlertTriangle size={18} />要確認事項
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-amber-900">
                      {result.checkpoints.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

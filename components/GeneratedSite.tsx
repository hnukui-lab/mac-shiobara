import React from 'react';
import { Project, JobPost } from '../types';
import { ArrowRight, CheckCircle2, MapPin, Phone, Mail, DraftingCompass, Hammer, HardHat } from 'lucide-react';

export const HeroSection = ({ onContactClick }: { onContactClick: () => void }) => (
  <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
        alt="Modern Architecture" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-900/70" />
    </div>
    <div className="relative z-10 text-center px-6 max-w-6xl mx-auto text-white animate-fade-in">
      <p className="text-green-400 tracking-[0.2em] font-medium mb-6 uppercase">Architectural Hardware Professionals</p>
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-10 tracking-wide leading-relaxed max-w-5xl mx-auto">
        わが社は常に創意工夫を重ね、<br className="hidden md:block" />創造に挑戦する。<br />
        感謝の心を持ち、信頼を得るよう努力し、<br className="hidden md:block" />社会と調和し続ける。
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
        建築金物の設計・製作・施工まで一貫対応。<br/>
        確かな技術と創造力で、建築家のビジョンを現実にします。
      </p>
      <button 
        onClick={onContactClick}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-none font-bold text-lg transition-all flex items-center gap-2 mx-auto hover:px-10"
      >
        お問い合わせ <ArrowRight size={20} />
      </button>
    </div>
  </section>
);

export const ServicesSection = () => (
  <section id="業務内容" className="py-24 bg-white text-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">事業内容</h2>
        <p className="text-slate-500">Services</p>
        <div className="w-12 h-1 bg-green-600 mx-auto mt-4"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {[
          { 
            icon: <DraftingCompass className="w-12 h-12 text-green-600" />,
            title: "設計・デザイン", 
            jp: "Design",
            desc: "意匠図から製作図への展開、詳細納まりの検討まで。3D CADを用いた精密な設計で、施工時のトラブルを未然に防ぎます。" 
          },
          { 
            icon: <Hammer className="w-12 h-12 text-green-600" />,
            title: "自社工場製作", 
            jp: "Manufacturing",
            desc: "熟練の職人によるステンレス、スチール、アルミの加工。特注手摺、パネル、ルーバーなど、オーダーメイドの一点物に対応します。" 
          },
          { 
            icon: <HardHat className="w-12 h-12 text-green-600" />,
            title: "現場施工", 
            jp: "Installation",
            desc: "安全管理を徹底した施工体制。新築工事から改修工事まで、現場の状況に合わせた柔軟かつ正確な取り付けを行います。" 
          }
        ].map((service, idx) => (
          <div key={idx} className="p-8 bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
            <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
            <h3 className="text-xl font-bold mb-1">{service.title}</h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">{service.jp}</span>
            <p className="text-slate-600 leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const PortfolioSection = () => {
  const projects: Project[] = [
    { id: 1, title: "青山 Sビル様", category: "外装ルーバー / SUS304 HL", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, title: "港区 K邸様", category: "螺旋階段 / スチール・木", image: "https://images.unsplash.com/photo-1522050212171-61b01dd24579?q=80&w=2080&auto=format&fit=crop" },
    { id: 3, title: "渋谷 Tオフィス様", category: "エントランスサッシ / スチール FB", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" },
    { id: 4, title: "新宿 Mホテル様", category: "装飾手摺 / 真鍮古美色", image: "https://images.unsplash.com/photo-1633504460578-12a7b7d5da96?q=80&w=1935&auto=format&fit=crop" },
    { id: 5, title: "横浜 公共施設", category: "カーテンウォール / アルミ", image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2074&auto=format&fit=crop" },
    { id: 6, title: "銀座 店舗内装", category: "ディスプレイ什器 / SUS鏡面", image: "https://images.unsplash.com/photo-1555601568-c9e6130f0633?q=80&w=2000&auto=format&fit=crop" },
  ];

  return (
    <section id="施工実績" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">施工事例</h2>
          <p className="text-slate-500">Project Portfolio</p>
          <div className="w-12 h-1 bg-green-600 mx-auto mt-4"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden aspect-[4/3] bg-slate-200 cursor-pointer">
              <img 
                src={project.image} 
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold">{project.title}</h3>
                <p className="text-green-400 text-sm mt-1">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CompanySection = () => (
  <section id="会社概要" className="py-16 md:py-24 bg-slate-900 text-white">
    <div className="max-w-5xl mx-auto px-6">
      
      {/* 企業理念 Section */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">企業理念</h2>
          <div className="w-12 h-1 bg-green-600 mx-auto"></div>
        </div>
        
        <div className="bg-slate-800/50 p-8 md:p-12 border border-slate-700 rounded-sm text-center">
          <h3 className="text-2xl md:text-3xl font-bold leading-relaxed font-serif mb-8">
            わが社は常に創意工夫を重ね、創造に挑戦する。<br/>
            感謝の心を持ち、信頼を得るよう努力し、<br/>
            社会と調和し続ける。
          </h3>
        </div>

        <div className="mt-12 text-slate-300 leading-loose space-y-6 text-lg">
          <p>
            建築物において製作金物とは金属製の手摺・パネル、ルーバー、エキスパンション、扉、サイン、オブジェ等多岐に渡ります。
            その材質は、スチール、ステンレス、アルミ、真鍮、コーテン鋼、おおよそ金属と呼ばれる物は材料に成り得ます。
          </p>
          <p>
            設計者のニーズに答え、コスト、効率を考え提案する。低予算でも良い物ができたと、誰にも言ってもらえる物を造る。
          </p>
          <p className="font-bold text-white">
            私たちはそれを目指して日々、自己を磨き研鑽に努めてまいります。
          </p>
        </div>
      </div>

      {/* 会社概要 Section */}
      <div className="mb-24">
        <h3 className="text-2xl font-bold mb-8 border-l-4 border-green-600 pl-4 flex items-center gap-3">
          会社概要
          <span className="text-sm font-normal text-slate-500 tracking-wider">PROFILE</span>
        </h3>
        <dl className="grid md:grid-cols-[180px_1fr] gap-y-8 border-t border-slate-800 pt-8">
          <dt className="text-green-500 font-bold">商号</dt>
          <dd>株式会社マックシオバラ</dd>

          <dt className="text-green-500 font-bold">設立</dt>
          <dd>2008年（平成20年）5月27日</dd>

          <dt className="text-green-500 font-bold">代表者</dt>
          <dd>代表取締役　塩原 義明</dd>

          <dt className="text-green-500 font-bold">本社</dt>
          <dd>
            〒125-0051<br/>
            東京都葛飾区新宿3-11-1<br/>
            TEL：03-5876-9580<br/>
            FAX：03-5876-9581
          </dd>

          <dt className="text-green-500 font-bold">資本金</dt>
          <dd>3,000万円</dd>

          <dt className="text-green-500 font-bold">従業員数</dt>
          <dd>10名 (男性9名、女性1名)</dd>

          <dt className="text-green-500 font-bold">事業内容</dt>
          <dd className="space-y-2">
            <p>建築製作金物の設計・製作・施工</p>
            <ul className="list-disc list-inside text-slate-400 pl-2">
              <li>ステンレス、アルミ手摺、パネル、扉、EXP.J</li>
              <li>耐候性工作物</li>
              <li>各種エクステリア</li>
            </ul>
          </dd>

          <dt className="text-green-500 font-bold">営業登録</dt>
          <dd>東京都知事許可 （般-30）第130695号</dd>

          <dt className="text-green-500 font-bold">主な取引先</dt>
          <dd>東急建設株式会社、スターツCAM株式会社、東急リニューアル株式会社 など</dd>
        </dl>
      </div>

      {/* 沿革 Section */}
      <div>
        <h3 className="text-2xl font-bold mb-8 border-l-4 border-green-600 pl-4 flex items-center gap-3">
          沿革
          <span className="text-sm font-normal text-slate-500 tracking-wider">HISTORY</span>
        </h3>
        <div className="relative border-l border-slate-700 ml-3 space-y-12 py-4">
          {[
            { year: '1949年', content: '港区高輪にて個人企業として発足。主として東急電鉄(株)の工事を請け負う' },
            { year: '1955年 1月', content: '資本金100万円にて塩原鉄工(株)設立' },
            { year: '1990年 4月', content: '資本金3000万円にて(株)マックシオバラに社名変更' },
            { year: '2008年 5月', content: '旧(株)マックシオバラより全ての営業譲渡を受け、資本金3000万円の新会社として(株)マックシオバラを立ち上げ今日に至る' },
          ].map((item, idx) => (
            <div key={idx} className="relative pl-10">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-green-600 ring-4 ring-slate-900"></div>
              <div className="font-bold text-green-400 mb-1 text-lg">{item.year}</div>
              <div className="text-slate-300">{item.content}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </section>
);

export const CareersSection = () => (
  <section id="採用情報" className="py-24 bg-white">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">採用情報</h2>
        <p className="text-slate-500">Careers</p>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          私たちと一緒に、地図に残る仕事をしませんか？経験者はもちろん、未経験でも「ものづくり」への情熱がある方を歓迎します。
        </p>
      </div>

      <div className="space-y-4">
        {[
          { title: "CADオペレーター（設計）", type: "正社員", location: "本社（墨田区）", salary: "月給 25万円 〜" },
          { title: "製造スタッフ（溶接・加工）", type: "正社員", location: "埼玉工場", salary: "月給 24万円 〜" },
          { title: "施工管理（現場監督）", type: "正社員", location: "都内各現場", salary: "月給 28万円 〜" },
        ].map((job, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-center justify-between p-6 border border-slate-200 hover:border-green-600 hover:bg-green-50 transition-colors cursor-pointer group">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-lg text-slate-800 group-hover:text-green-700">{job.title}</h3>
                <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">{job.type}</span>
              </div>
              <div className="flex gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
                <span>{job.salary}</span>
              </div>
            </div>
            <ArrowRight className="text-slate-300 group-hover:text-green-600 transition-colors mt-4 md:mt-0" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ContactSection = () => (
  <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200">
    <div className="max-w-3xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">お問い合わせ</h2>
        <p className="text-slate-500">Contact Us</p>
      </div>

      <form className="space-y-6 bg-white p-8 shadow-sm border border-slate-200">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">お名前</label>
            <input type="text" className="w-full border-slate-300 border p-3 focus:ring-2 focus:ring-green-600 outline-none bg-slate-50" placeholder="山田 太郎" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">メールアドレス</label>
            <input type="email" className="w-full border-slate-300 border p-3 focus:ring-2 focus:ring-green-600 outline-none bg-slate-50" placeholder="info@mac-shiobara.co.jp" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">お問い合わせ内容</label>
          <textarea rows={5} className="w-full border-slate-300 border p-3 focus:ring-2 focus:ring-green-600 outline-none bg-slate-50" placeholder="ご用件をご記入ください"></textarea>
        </div>
        <button type="button" className="w-full bg-slate-900 text-white py-4 font-bold hover:bg-slate-800 transition-colors">
          送信する
        </button>
      </form>
      
      <div className="mt-12 grid md:grid-cols-2 gap-6 text-center">
        <div className="p-6 bg-white border border-slate-200">
          <Phone className="w-8 h-8 mx-auto text-green-600 mb-3" />
          <h4 className="font-bold mb-1">お電話</h4>
          <p className="text-slate-600">03-1234-5678</p>
          <p className="text-xs text-slate-400 mt-1">平日 9:00 - 18:00</p>
        </div>
        <div className="p-6 bg-white border border-slate-200">
          <Mail className="w-8 h-8 mx-auto text-green-600 mb-3" />
          <h4 className="font-bold mb-1">メール</h4>
          <p className="text-slate-600">info@mac-shiobara.co.jp</p>
          <p className="text-xs text-slate-400 mt-1">24時間受付</p>
        </div>
      </div>
    </div>
  </section>
);

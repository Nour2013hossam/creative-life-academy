"use client";

import { useEffect, useMemo, useState } from "react";

type Course = {
  id: number;
  title: string;
  category: string;
  level: string;
  lessons: number;
  duration: string;
  progress: number;
  icon: string;
  description: string;
  instructor: string;
  accent: string;
  enrolled: boolean;
};

const initialCourses: Course[] = [
  { id: 1, title: "أساسيات الذكاء الاصطناعي", category: "الذكاء الاصطناعي", level: "مبتدئ", lessons: 25, duration: "8 ساعات", progress: 68, icon: "✳", description: "افهم كيف تتعلم الآلات، واكتشف تطبيقات الذكاء الاصطناعي في حياتك، وابنِ أول تجربة ذكية.", instructor: "فريق Creative Life", accent: "blue", enrolled: true },
  { id: 2, title: "تطوير الويب من الصفر", category: "البرمجة", level: "مبتدئ", lessons: 19, duration: "12 ساعة", progress: 42, icon: "⌘", description: "ابدأ بـ HTML وCSS ثم أضف التفاعل باستخدام JavaScript، واصنع موقعك الأول.", instructor: "أحمد محمود", accent: "violet", enrolled: true },
  { id: 3, title: "مدخل إلى الأمن السيبراني", category: "الأمن السيبراني", level: "مبتدئ", lessons: 16, duration: "6 ساعات", progress: 25, icon: "⬡", description: "تعرّف على التهديدات الرقمية، والتصيد الاحتيالي، وأساسيات حماية الحسابات والأجهزة.", instructor: "فريق الأمن الرقمي", accent: "cyan", enrolled: true },
  { id: 4, title: "Python للمشروعات العملية", category: "البرمجة", level: "متوسط", lessons: 32, duration: "15 ساعة", progress: 0, icon: "⌘", description: "تعلم كتابة برامج منظمة، والتعامل مع البيانات، وبناء أدوات مفيدة بمشروعات صغيرة.", instructor: "سارة علي", accent: "blue", enrolled: false },
  { id: 5, title: "صناعة المحتوى بالذكاء الاصطناعي", category: "صناعة المحتوى", level: "مبتدئ", lessons: 14, duration: "5 ساعات", progress: 0, icon: "✦", description: "حوّل أفكارك إلى محتوى جذاب باستخدام أدوات الذكاء الاصطناعي بمسؤولية.", instructor: "مريم خالد", accent: "pink", enrolled: false },
  { id: 6, title: "أساسيات UI/UX", category: "التصميم", level: "مبتدئ", lessons: 21, duration: "9 ساعات", progress: 0, icon: "◈", description: "صمّم تجارب رقمية واضحة، وتعلم مبادئ التخطيط والألوان والنماذج الأولية.", instructor: "يوسف سامي", accent: "violet", enrolled: false },
];

const navItems = [
  { label: "الرئيسية", icon: "⌂", group: "مساحة التعلم" },
  { label: "استكشف الكورسات", icon: "▦", group: "مساحة التعلم" },
  { label: "كورساتي", icon: "▤", group: "مساحة التعلم" },
  { label: "مسارات التعلم", icon: "◎", group: "مساحة التعلم" },
  { label: "التحديات", icon: "ϟ", group: "شارك وتقدّم", badge: "2" },
  { label: "مجتمع الطلاب", icon: "♧", group: "شارك وتقدّم" },
  { label: "الشهادات", icon: "♜", group: "إنجازاتك" },
  { label: "لوحة الإنجازات", icon: "✧", group: "إنجازاتك" },
];

const lessons = [
  { title: "ما هو الذكاء الاصطناعي؟", time: "12 دقيقة", done: true },
  { title: "كيف تتعلم الآلات من البيانات؟", time: "18 دقيقة", done: true },
  { title: "تطبيقات الذكاء الاصطناعي حولنا", time: "15 دقيقة", done: false },
  { title: "جرّب بنفسك: صنّف البيانات", time: "20 دقيقة", done: false },
];

function Icon({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.045] text-lg">{children}</span>;
}

function Progress({ value }: { value: number }) {
  return <div className="progress-track"><div className="progress-fill" style={{ width: value + "%" }} /></div>;
}

export default function Home() {
  const [active, setActive] = useState("الرئيسية");
  const [courses, setCourses] = useState(initialCourses);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("الكل");
  const [toast, setToast] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLesson, setShowLesson] = useState(false);
  const [completed, setCompleted] = useState<string[]>(["ما هو الذكاء الاصطناعي؟", "كيف تتعلم الآلات من البيانات؟"]);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cla-progress");
      if (saved) setCompleted(JSON.parse(saved) as string[]);
    } catch {}
  }, []);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  const enrolled = courses.filter((course) => course.enrolled);
  const filtered = useMemo(() => courses.filter((course) => {
    const matchesQuery = (course.title + " " + course.category + " " + course.description).toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "الكل" || course.category === category;
    const matchesEnrollment = active !== "كورساتي" || course.enrolled;
    return matchesQuery && matchesCategory && matchesEnrollment;
  }), [courses, query, category, active]);

  const chooseNav = (label: string) => {
    setActive(label);
    setMobileMenu(false);
    setQuery("");
    setCategory("الكل");
  };

  const enroll = (id: number) => {
    setCourses((old) => old.map((course) => course.id === id ? { ...course, enrolled: true } : course));
    notify("تمت إضافة الكورس إلى مكتبتك التعليمية");
    setActive("كورساتي");
  };

  const finishLesson = (title: string) => {
    const next = completed.includes(title) ? completed : [...completed, title];
    setCompleted(next);
    try { localStorage.setItem("cla-progress", JSON.stringify(next)); } catch {}
    notify("أحسنت! تم حفظ تقدمك على هذا الجهاز");
  };

  const categories = ["الكل", ...Array.from(new Set(courses.map((course) => course.category)))];
  const totalProgress = enrolled.length ? Math.round(enrolled.reduce((sum, course) => sum + course.progress, 0) / enrolled.length) : 0;

  return (
    <main dir="rtl" className="min-h-screen text-white">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <div className="relative z-10 flex min-h-screen">
        <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
          <button className="brand" onClick={() => chooseNav("الرئيسية")} aria-label="العودة للرئيسية">
            <span className="brand-mark">cl<span>.</span></span>
            <span className="brand-copy"><strong>Creative Life</strong><small>ACADEMY</small></span>
          </button>
          <div className="workspace-label"><span className="status-dot" /> مساحة التعلّم</div>
          {["مساحة التعلم", "شارك وتقدّم", "إنجازاتك"].map((group) => (
            <div key={group} className="nav-group">
              <p className="nav-caption">{group}</p>
              {navItems.filter((item) => item.group === group).map((item) => (
                <button key={item.label} onClick={() => chooseNav(item.label)} className={`nav-item ${active === item.label ? "nav-active" : ""}`}>
                  <span className="nav-icon">{item.icon}</span><span>{item.label}</span>{item.badge && <span className="nav-badge">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
          <div className="sidebar-bottom">
            <div className="upgrade-card"><div className="upgrade-orb">✦</div><strong>خطوتك الجاية أقرب</strong><p>كل درس جديد يفتح لك فرصة ومهارة جديدة.</p><button onClick={() => chooseNav("مسارات التعلم")}>اكتشف المسارات <span>←</span></button></div>
            <button className="user-row" onClick={() => setShowProfile(true)}><span className="avatar">ن</span><span className="user-meta"><strong>متعلم الأكاديمية</strong><small>حساب تجريبي</small></span><span className="user-more">•••</span></button>
          </div>
        </aside>

        <section className="main-column">
          <header className="topbar">
            <div className="topbar-start"><button className="mobile-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="القائمة">☰</button><div><p className="eyebrow">مساحتك · Creative Life Academy</p><h1>{active}</h1></div></div>
            <div className="topbar-actions">
              <label className="search-box"><span>⌕</span><input value={query} onChange={(e) => { setQuery(e.target.value); if (active === "الرئيسية") setActive("استكشف الكورسات"); }} placeholder="ابحث عن كورس أو مهارة..." /><kbd>⌘ K</kbd></label>
              <button className="icon-button notification-button" onClick={() => setShowNotifications(!showNotifications)} aria-label="الإشعارات">♧<i /></button>
              <button className="profile-button" onClick={() => setShowProfile(true)}><span className="avatar">ن</span><span className="profile-chevron">⌄</span></button>
              {showNotifications && <div className="popover notifications"><div className="popover-head"><strong>الإشعارات</strong><span className="blue-text">جديد</span></div><p><b className="notification-dot" /> أهلاً بك في مساحة تعلّمك الجديدة.</p><p><b className="notification-dot" /> لا تنسَ إكمال درس اليوم وتحقيق هدفك.</p><button onClick={() => { setShowNotifications(false); notify("تمت مراجعة الإشعارات"); }}>تمت المراجعة</button></div>}
            </div>
          </header>

          <div className="page-content">
            {active === "الرئيسية" && <>
              <section className="hero glass">
                <div className="hero-copy"><span className="pill"><span className="sparkle">✦</span> مساحة مصممة لطموحك</span><h2>مش مجرد كورسات.<br /><span className="gradient-text">دي بداية حكايتك.</span></h2><p>اتعلّم مهارات المستقبل، طبّق بإيدك، وابنِ مشاريع تفتخر بيها. كل خطوة صغيرة بتقربك من هدفك الكبير.</p><div className="hero-actions"><button className="blue-button primary-action" onClick={() => chooseNav("استكشف الكورسات")}>اكتشف الكورسات <span>←</span></button><button className="secondary-button" onClick={() => chooseNav("مسارات التعلم")}>استكشف مسارات التعلّم</button></div><div className="hero-proof"><div className="avatar-stack"><span>ن</span><span>م</span><span>ع</span><span>+</span></div><span>ابدأ رحلتك واصنع فرقك</span></div></div>
                <div className="hero-art" aria-hidden="true"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="hero-core"><span>cl.</span><small>LEARN · BUILD · GROW</small></div><div className="float-card float-card-top"><span className="float-icon blue">✳</span><span><b>AI & Future Tech</b><small>مهارات المستقبل</small></span></div><div className="float-card float-card-bottom"><span className="float-icon white">↗</span><span><b>تقدّم مستمر</b><small>خطوة كل يوم</small></span></div><span className="art-star star-one">✦</span><span className="art-star star-two">✧</span></div>
              </section>
              <div className="section-heading stats-heading"><div><p className="eyebrow">نظرة سريعة</p><h2>رحلتك بالأرقام</h2></div><span className="subtle-label">تتحدث مع تقدّمك التجريبي</span></div>
              <section className="stats-grid">
                {[{label:"الكورسات المسجّل فيها",value:String(enrolled.length).padStart(2,"0"),icon:"▤",note:"مساراتك الحالية",tone:"blue"},{label:"متوسط التقدّم",value:totalProgress+"%",icon:"↗",note:"كمّل درس النهارده",tone:"violet"},{label:"نقاط الخبرة",value:"1,250",icon:"ϟ",note:"كل إنجاز بيحسب",tone:"cyan"},{label:"أيام التعلّم",value:"08",icon:"◷",note:"حافظ على الاستمرارية",tone:"white"}].map((stat) => <article className="stat-card glass glass-hover" key={stat.label}><div className="stat-top"><span>{stat.label}</span><Icon>{stat.icon}</Icon></div><strong className="stat-value">{stat.value}</strong><small className="stat-note"><span className={`tiny-indicator ${stat.tone}`} />{stat.note}</small></article>)}
              </section>
              <div className="content-grid">
                <section className="primary-column"><div className="section-heading"><div><p className="eyebrow">كمّل من حيث وقفت</p><h2>رحلتك مستمرة <span className="heading-spark">✦</span></h2></div><button className="text-link" onClick={() => chooseNav("كورساتي")}>كل كورساتي <span>←</span></button></div>
                  <div className="course-list">{enrolled.slice(0,3).map((course,index)=><article className="course-row glass glass-hover" key={course.id}><div className={`course-art ${course.accent}`}><span>{course.icon}</span><small>0{index+1}</small></div><div className="course-info"><div className="course-title-line"><div><span className="course-category">{course.category}</span><h3>{course.title}</h3></div><strong className="course-percent">{course.progress}%</strong></div><div className="course-progress-line"><Progress value={course.progress}/><span>{Math.round(course.lessons*course.progress/100)} / {course.lessons} درس</span></div><div className="course-foot"><span>◷ {course.duration}</span><button onClick={() => { setShowLesson(true); setActive(course.title); }}>كمّل التعلّم <span>←</span></button></div></div></article>)}</div>
                  <section className="paths-panel glass"><div className="section-heading"><div><p className="eyebrow">اتعلّم بخطة واضحة</p><h2>مسارات تستاهل تبدأها</h2></div><button className="text-link" onClick={() => chooseNav("مسارات التعلم")}>كل المسارات ←</button></div><div className="path-grid"><button className="path-card" onClick={() => { chooseNav("استكشف الكورسات"); setCategory("الذكاء الاصطناعي"); }}><span className="path-icon blue">✳</span><b>الذكاء الاصطناعي</b><small>من الأساسيات للتطبيق</small><span className="path-arrow">↙</span></button><button className="path-card" onClick={() => { chooseNav("استكشف الكورسات"); setCategory("البرمجة"); }}><span className="path-icon violet">⌘</span><b>البرمجة والتطوير</b><small>حوّل أفكارك لمنتجات</small><span className="path-arrow">↙</span></button><button className="path-card" onClick={() => { chooseNav("استكشف الكورسات"); setCategory("الأمن السيبراني"); }}><span className="path-icon cyan">⬡</span><b>الأمن السيبراني</b><small>افهم التهديدات واحمِ نفسك</small><span className="path-arrow">↙</span></button></div></section>
                </section>
                <aside className="right-column"><section className="side-panel glass weekly-goal"><div className="side-panel-title"><div><p className="eyebrow">استمرارية التعلّم</p><h3>هدف الأسبوع</h3></div><Icon>◎</Icon></div><div className="goal-visual"><div className="goal-ring" style={{"--goal": "60%"} as React.CSSProperties}><div><strong>3<span>/5</span></strong><small>جلسات</small></div></div></div><p className="goal-message">فاضلك جلستين وتوصل لهدفك الأسبوعي. أنت قدّها!</p><div className="week-days">{["س","ح","ن","ث","ر","خ","ج"].map((day,i)=><span key={day} className={i<3?"day-done":""}>{day}<i>{i<3?"✓":"·"}</i></span>)}</div></section>
                  <section className="side-panel glass challenge-panel"><div className="side-panel-title"><div><p className="eyebrow">تحدي الأسبوع</p><h3>خلّي التعلّم عملي</h3></div><span className="challenge-flash">ϟ</span></div><div className="challenge-banner"><span>BUILD SOMETHING</span><div className="challenge-symbol">⌘</div></div><h4>ابنِ أول مشروع برمجي</h4><p>استخدم مهارة اتعلمتها وابنِ حاجة بسيطة تقدر تعرضها.</p><div className="challenge-meta"><span>◷ 30–60 دقيقة</span><span>+150 XP</span></div><button className="blue-button full-button" onClick={() => chooseNav("التحديات")}>شوف تفاصيل التحدي <span>←</span></button></section>
                  <section className="streak-card"><div className="streak-icon">✦</div><div><strong>كل يوم بيفرق</strong><p>ارجع بكرة وحافظ على عادة التعلّم.</p></div><span className="streak-number">08<small>أيام</small></span></section>
                </aside>
              </div>
            </>}

            {(active === "استكشف الكورسات" || active === "كورساتي") && <section className="catalog-view"><div className="catalog-intro glass"><div><p className="eyebrow">{active === "كورساتي" ? "مكتبتك التعليمية" : "اختار مهارتك القادمة"}</p><h2>{active === "كورساتي" ? "كل اللي بدأت فيه، في مكان واحد." : "مهارات جديدة. فرص أكتر."}</h2><p>تعلّم على مهلك، طبّق بإيدك، وارجع لتقدّمك في أي وقت.</p></div><span className="catalog-emblem">✳</span></div><div className="catalog-controls"><div className="filter-chips">{categories.map((item)=><button key={item} onClick={()=>setCategory(item)} className={category===item?"filter-active":""}>{item}</button>)}</div><span className="result-count">{filtered.length} كورس</span></div>{filtered.length ? <div className="catalog-grid">{filtered.map((course)=><article className="catalog-card glass glass-hover" key={course.id}><div className={`catalog-art ${course.accent}`}><span>{course.icon}</span><label>{course.level}</label><i>✦</i></div><div className="catalog-card-body"><span className="course-category">{course.category}</span><h3>{course.title}</h3><p>{course.description}</p><div className="catalog-meta"><span>▤ {course.lessons} درس</span><span>◷ {course.duration}</span></div>{course.enrolled ? <><Progress value={course.progress}/><button className="blue-button full-button" onClick={()=>{setShowLesson(true);setActive(course.title);}}>استكمل الكورس <span>←</span></button></> : <button className="secondary-button full-button" onClick={()=>enroll(course.id)}>أضف إلى كورساتي <span>＋</span></button>}</div></article>)}</div> : <div className="empty-state glass"><span>⌕</span><h3>ملقيناش نتيجة مطابقة</h3><p>جرّب تغيّر كلمة البحث أو تختار تصنيف تاني.</p><button className="blue-button" onClick={()=>{setQuery("");setCategory("الكل");}}>امسح الفلاتر</button></div>}</section>}

            {active === "مسارات التعلم" && <section className="feature-view"><div className="feature-hero glass"><p className="eyebrow">LEARNING PATHS</p><h2>مش لازم تعرف كل حاجة.<br/><span className="gradient-text">بس لازم تعرف تبدأ منين.</span></h2><p>مسارات منظمة تجمع الكورسات والمشروعات في رحلة واضحة من أول خطوة لحد بناء ملف أعمالك.</p></div><div className="feature-grid">{[{icon:"✳",title:"مسار الذكاء الاصطناعي",desc:"ابدأ بالمفاهيم الأساسية، افهم البيانات، ثم نفّذ مشروع AI بسيط.",steps:"4 مراحل · 8 كورسات",color:"blue"},{icon:"⌘",title:"مسار مطوّر الويب",desc:"من أول صفحة ويب إلى واجهة تفاعلية ومشروع قابل للعرض.",steps:"5 مراحل · 10 كورسات",color:"violet"},{icon:"⬡",title:"مسار الأمن السيبراني",desc:"تعلم حماية حساباتك، وفهم التصيد، والتفكير الأمني المسؤول.",steps:"4 مراحل · 7 كورسات",color:"cyan"}].map((path)=><article className="feature-card glass glass-hover" key={path.title}><span className={`feature-icon ${path.color}`}>{path.icon}</span><h3>{path.title}</h3><p>{path.desc}</p><span className="feature-steps">{path.steps}</span><button className="secondary-button full-button" onClick={()=>chooseNav("استكشف الكورسات")}>ابدأ المسار ←</button></article>)}</div></section>}

            {active === "التحديات" && <section className="feature-view"><div className="feature-hero challenge-feature glass"><p className="eyebrow">CHALLENGE ZONE</p><h2>المهارة بتثبتها<br/><span className="gradient-text">لما تستخدمها.</span></h2><p>تحديات قصيرة تساعدك تطبق اللي اتعلمته. اختار تحدي، نفّذ مشروع، واحتفل بتقدمك.</p></div><div className="feature-grid">{[{icon:"⌘",title:"ابنِ أول مشروع برمجي",desc:"صمّم صفحة تعريفية بسيطة فيها عنوان ونص وزر تفاعلي.",level:"مبتدئ",xp:"+150 XP"},{icon:"⬡",title:"اكتشف رسالة التصيد",desc:"راجع علامات الخطر في رسالة تجريبية وحدد سبب الاشتباه.",level:"مبتدئ",xp:"+100 XP"},{icon:"✳",title:"اشرح فكرة AI ببساطة",desc:"اكتب شرحًا من 3 جمل يوضح فكرة ذكاء اصطناعي تعرفها.",level:"متوسط",xp:"+120 XP"}].map((challenge)=><article className="feature-card glass glass-hover" key={challenge.title}><div className="challenge-card-top"><span className="feature-icon blue">{challenge.icon}</span><span className="xp-pill">{challenge.xp}</span></div><h3>{challenge.title}</h3><p>{challenge.desc}</p><div className="challenge-meta"><span>{challenge.level}</span><span>تحدي عملي</span></div><button className="blue-button full-button" onClick={()=>notify("التحدي جاهز للبدء — سيتم ربط تسليم المشاريع بحسابك لاحقًا.")}>ابدأ التحدي <span>←</span></button></article>)}</div></section>}

            {active === "مجتمع الطلاب" && <section className="community-view"><div className="feature-hero glass"><p className="eyebrow">COMMUNITY</p><h2>التعلّم أحلى <span className="gradient-text">لما نتشارك.</span></h2><p>مساحة لتبادل الأفكار والأسئلة ومشاركة المشروعات — نموذج تفاعلي للواجهة.</p><button className="blue-button" onClick={()=>notify("نظام المنشورات المتصل بقاعدة البيانات ضمن المرحلة التالية.")}>＋ اكتب منشورًا</button></div><div className="community-layout"><div className="feed-column">{[{letter:"م",name:"مريم أحمد",time:"منذ 20 دقيقة",tag:"إنجاز تعليمي",title:"خلصت أول صفحة ويب ليا! 🎉",body:"بدأت بـ HTML وCSS، ولسه في حاجات كتير هطورها. أهم حاجة إني بدأت ونشرت أول نسخة من مشروعي.",likes:18,comments:6},{letter:"ع",name:"عمر خالد",time:"منذ ساعة",tag:"سؤال",title:"إيه أفضل طريقة أبدأ بيها في Python؟",body:"أنا خلصت الأساسيات وعايز أطبق على مشروعات صغيرة. شاركوني أفكار لمشروعات مناسبة للمبتدئين.",likes:9,comments:12},{letter:"س",name:"سلمى محمد",time:"منذ 3 ساعات",tag:"مشاركة موارد",title:"3 حاجات ساعدتني أفهم الذكاء الاصطناعي",body:"التجربة العملية، كتابة الملاحظات بعد كل درس، وإنّي أشرح الفكرة لشخص تاني. الطريقة دي فرقت معايا جدًا.",likes:24,comments:4}].map((post)=><article className="post-card glass" key={post.title}><div className="post-author"><span className="avatar">{post.letter}</span><div><strong>{post.name}</strong><small>{post.time}</small></div><span className="post-tag">{post.tag}</span></div><h3>{post.title}</h3><p>{post.body}</p><div className="post-actions"><button onClick={()=>notify("تم تسجيل إعجاب تجريبي")}>♡ {post.likes} إعجاب</button><button onClick={()=>notify("التعليقات المتصلة ستتوفر عند ربط قاعدة البيانات")}>▢ {post.comments} تعليق</button><button onClick={()=>notify("تم تجهيز خيار مشاركة المنشور")}>↗ مشاركة</button></div></article>)}</div><aside className="side-panel glass community-guidelines"><h3>مساحتنا الآمنة</h3><p>خلّي المجتمع مكانًا للتعلّم والاحترام.</p><ul><li>🤝 احترم اختلاف الآراء</li><li>💡 شارك ما تعلّمته</li><li>🛡️ لا تنشر بياناتك الخاصة</li><li>✨ شجّع زملاءك</li></ul></aside></div></section>}

            {active === "الشهادات" && <section className="feature-view"><div className="feature-hero glass"><p className="eyebrow">YOUR ACHIEVEMENTS</p><h2>كل خطوة تستاهل <span className="gradient-text">تتسجل.</span></h2><p>هنا هتلاقي شهاداتك وإنجازاتك. إصدار الشهادات الرسمي محتاج ربط نظام التقييم وقوالب الإدارة.</p></div><div className="certificate-grid"><article className="certificate-card glass"><div className="certificate-art"><span className="certificate-seal">✦</span><small>CREATIVE LIFE ACADEMY</small><strong>شهادة إنجاز</strong><span>Certificate of Achievement</span><div className="certificate-line" /><b>متعلم الأكاديمية</b><small>نموذج معاينة — غير صالحة كوثيقة رسمية</small></div><div className="certificate-footer"><span className="status-pill pending">قيد التفعيل</span><button onClick={()=>notify("ستُتاح الشهادة بعد ربط نظام إتمام الكورسات وإصدارها.")}>تفاصيل الشهادة</button></div></article><article className="certificate-empty glass"><span>♜</span><h3>إنجازك الجاي مستنيك</h3><p>أكمل كورسًا، سلّم مشروعًا، وارجع هنا لمتابعة إنجازاتك.</p><button className="blue-button" onClick={()=>chooseNav("كورساتي")}>تابع كورساتك ←</button></article></div></section>}

            {active === "لوحة الإنجازات" && <section className="feature-view"><div className="feature-hero glass"><p className="eyebrow">LEVEL UP</p><h2>تقدّمك يستاهل <span className="gradient-text">الاحتفال.</span></h2><p>نقاط الخبرة والشارات بتخلي رحلتك واضحة وتساعدك تحافظ على الاستمرارية.</p></div><div className="achievement-stats"><article className="stat-card glass"><span>نقاط الخبرة</span><strong className="stat-value">1,250 XP</strong><Progress value={62}/><small>750 XP للمستوى التالي</small></article><article className="stat-card glass"><span>معدل التقدم</span><strong className="stat-value">{totalProgress}%</strong><Progress value={totalProgress}/><small>متوسط تقدم الكورسات المسجل فيها</small></article></div><div className="badge-grid">{[{icon:"🌱",title:"أول خطوة",desc:"بدأت رحلتك التعليمية",earned:true},{icon:"🔥",title:"استمرارية",desc:"حافظ على عادة التعلّم",earned:true},{icon:"✳",title:"مستكشف AI",desc:"أكمل مسار الذكاء الاصطناعي",earned:false},{icon:"⌘",title:"صانع المشاريع",desc:"سلّم أول مشروع عملي",earned:false},{icon:"♜",title:"متعلّم متميز",desc:"حقق أداءً متميزًا في كورس",earned:false},{icon:"⚡",title:"تحدي مكتمل",desc:"أكمل أول تحدٍ",earned:false}].map((badge)=><article className={`badge-card glass ${badge.earned?"badge-earned":""}`} key={badge.title}><span>{badge.icon}</span><h3>{badge.title}</h3><p>{badge.desc}</p><small>{badge.earned?"تم تحقيقها":"لم تُفتح بعد"}</small></article>)}</div></section>}

            {!["الرئيسية","استكشف الكورسات","كورساتي","مسارات التعلم","التحديات","مجتمع الطلاب","الشهادات","لوحة الإنجازات"].includes(active) && <section className="lesson-view"><button className="text-link" onClick={()=>chooseNav("كورساتي")}>→ العودة إلى كورساتي</button><div className="lesson-layout"><div className="lesson-main glass"><div className="lesson-video"><div className="video-orb">▶</div><span>معاينة الدرس التعليمية</span><small>سيتم تضمين مشغل الفيديو عند إضافة محتوى الكورس</small></div><p className="eyebrow">الوحدة الأولى · البداية</p><h2>{active}</h2><p>ابدأ بمشاهدة الدروس، سجّل إكمالك، وارجع في أي وقت لمتابعة تقدّمك. هذه شاشة تجريبية قابلة للتطوير لربط المحتوى الحقيقي.</p><div className="lesson-list">{lessons.map((lesson,index)=><button key={lesson.title} className="lesson-item" onClick={()=>finishLesson(lesson.title)}><span className={completed.includes(lesson.title)?"lesson-check checked":"lesson-check"}>{completed.includes(lesson.title)?"✓":index+1}</span><span className="lesson-text"><b>{lesson.title}</b><small>{lesson.time}</small></span><span className="lesson-status">{completed.includes(lesson.title)?"مكتمل":"ابدأ ←"}</span></button>)}</div></div><aside className="side-panel glass lesson-sidebar"><p className="eyebrow">تقدّمك في الوحدة</p><div className="lesson-big-progress"><strong>{Math.round(completed.length/lessons.length*100)}%</strong><Progress value={completed.length/lessons.length*100}/></div><p>كل ما تخلص درس، علّمه كمكتمل علشان يتسجل تقدمك على الجهاز.</p><button className="blue-button full-button" onClick={()=>{finishLesson(lessons.find(l=>!completed.includes(l.title))?.title || lessons[0].title);}}>علّم الدرس التالي كمكتمل</button></aside></div></section>}

            <footer className="footer"><div className="footer-brand"><span className="brand-mark small-mark">cl<span>.</span></span><span>Creative Life Academy</span></div><span>تعلّم اليوم. ابنِ بكرة. <i>© 2026</i></span><button onClick={()=>notify("شكرًا لاهتمامك — صفحة الدعم ضمن خطة الإطلاق.")}>المساعدة والدعم</button></footer>
          </div>
        </section>
      </div>

      {showProfile && <div className="modal-backdrop" onClick={()=>setShowProfile(false)}><section className="profile-modal glass" onClick={(e)=>e.stopPropagation()}><button className="modal-close" onClick={()=>setShowProfile(false)}>×</button><span className="avatar modal-avatar">ن</span><p className="eyebrow">ملفك الشخصي</p><h2>متعلم الأكاديمية</h2><p className="modal-description">هذا حساب تجريبي للمعاينة. نظام الحسابات وتسجيل الدخول الآمن يحتاج إعداد خدمة مصادقة وقاعدة بيانات.</p><div className="profile-detail"><span>نوع الحساب</span><b>طالب · تجريبي</b></div><div className="profile-detail"><span>نقاط الخبرة</span><b>1,250 XP</b></div><button className="secondary-button full-button" onClick={()=>{setShowProfile(false);notify("تسجيل الدخول وإنشاء الحساب ضمن مرحلة الربط الخلفي.");}}>إعداد الحساب لاحقًا</button></section></div>}
      {showLesson && <div className="modal-backdrop" onClick={()=>setShowLesson(false)}><section className="lesson-modal glass" onClick={(e)=>e.stopPropagation()}><button className="modal-close" onClick={()=>setShowLesson(false)}>×</button><div className="modal-lesson-icon">▶</div><p className="eyebrow">جاهز تكمل؟</p><h2>{active}</h2><p className="modal-description">اختار درسًا من قائمة الوحدة وعلّمه كمكتمل لتجربة متابعة التقدم. حفظ التقدم حاليًا على هذا المتصفح فقط.</p><button className="blue-button full-button" onClick={()=>setShowLesson(false)}>افتح مساحة الكورس ←</button></section></div>}
      {toast && <div className="toast-message"><span>✓</span>{toast}</div>}
    </main>
  );
}

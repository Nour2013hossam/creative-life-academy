"use client";

import { useState } from "react";

const courses = [
  {
    title: "الذكاء الاصطناعي",
    subtitle: "ابدأ رحلتك في عالم AI",
    icon: "🤖",
    progress: 68,
    lessons: "17 / 25 درس",
    color: "from-violet-500/20 to-purple-900/10",
  },
  {
    title: "تطوير الويب",
    subtitle: "اصنع مواقع من الصفر",
    icon: "💻",
    progress: 42,
    lessons: "8 / 19 درس",
    color: "from-sky-500/20 to-blue-900/10",
  },
  {
    title: "الأمن السيبراني",
    subtitle: "تعلّم حماية العالم الرقمي",
    icon: "🛡️",
    progress: 25,
    lessons: "4 / 16 درس",
    color: "from-emerald-500/20 to-green-900/10",
  },
];

const navigation = [
  { label: "الرئيسية", icon: "⌂" },
  { label: "كورساتي", icon: "▤" },
  { label: "مسارات التعلم", icon: "◎" },
  { label: "التحديات", icon: "⚡" },
  { label: "مجتمع الطلاب", icon: "♧" },
  { label: "الشهادات", icon: "♜" },
];

export default function Home() {
  const [active, setActive] = useState("الرئيسية");

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0b0b10] text-white selection:bg-amber-400 selection:text-black"
    >
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-l border-white/[0.07] bg-[#101016] p-6 lg:flex lg:flex-col">
          <a href="#" className="mb-12 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-600 text-xl font-black text-black">
              C
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Creative Life
              </h1>
              <p className="text-xs text-gray-500">ACADEMY</p>
            </div>
          </a>

          <p className="mb-4 px-3 text-xs font-semibold text-gray-500">
            مساحة التعلم
          </p>

          <nav className="space-y-2">
            {navigation.map((item) => (
              <button
                key={item.label}
                onClick={() => setActive(item.label)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-right text-sm transition ${
                  active === item.label
                    ? "bg-amber-400/10 font-semibold text-amber-300 ring-1 ring-amber-400/20"
                    : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
                {item.label === "التحديات" && (
                  <span className="mr-auto rounded-full bg-rose-500/15 px-2 py-0.5 text-xs text-rose-300">
                    2
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-amber-400/15 bg-gradient-to-br from-amber-400/10 to-transparent p-4">
            <div className="mb-3 text-2xl">🚀</div>
            <h3 className="mb-2 font-bold">جاهز للمستوى التالي؟</h3>
            <p className="mb-4 text-xs leading-6 text-gray-400">
              استمر في التعلم واجمع نقاط الخبرة لفتح إنجازات جديدة.
            </p>
            <button
              onClick={() => setActive("مسارات التعلم")}
              className="w-full rounded-xl bg-amber-400 py-2.5 text-sm font-bold text-black transition hover:bg-amber-300"
            >
              اكتشف المسارات
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg">
              👨‍🎓
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold">طالب الأكاديمية</p>
              <p className="text-xs text-gray-500">عضو جديد</p>
            </div>
            <span className="mr-auto text-gray-500">⋯</span>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-white/[0.07] px-5 py-5 sm:px-8 lg:px-10">
            <div>
              <p className="text-xs text-gray-500">Creative Life Academy</p>
              <h2 className="mt-1 text-lg font-bold sm:text-xl">
                {active}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 sm:flex">
                <span>⚡</span>
                <span className="text-sm font-semibold">1,250 XP</span>
              </div>
              <button
                aria-label="الإشعارات"
                className="relative rounded-xl border border-white/10 p-3 text-gray-300 transition hover:bg-white/5"
              >
                ♧
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-400" />
              </button>
              <button
                aria-label="الملف الشخصي"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xl"
              >
                👨‍🎓
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] p-5 sm:p-8 lg:p-10">
            <div className="relative mb-8 overflow-hidden rounded-3xl border border-amber-300/15 bg-gradient-to-l from-[#302311] via-[#19151a] to-[#17141d] p-6 sm:p-9">
              <div className="pointer-events-none absolute -left-16 -top-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-xs font-medium text-amber-200">
                  <span>✦</span>
                  مستقبلك يبدأ بخطوة
                </span>

                <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
                  كل يوم فرصة جديدة
                  <br />
                  <span className="text-amber-300">تتعلم حاجة عظيمة.</span>
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-7 text-gray-300 sm:text-base">
                  طوّر مهاراتك، نفّذ مشاريع حقيقية، وتقدّم نحو أهدافك خطوة
                  بخطوة. رحلتك القادمة تبدأ من هنا.
                </p>

                <button
                  onClick={() => setActive("كورساتي")}
                  className="mt-6 rounded-xl bg-amber-300 px-6 py-3 font-bold text-black transition hover:bg-amber-200"
                >
                  كمّل رحلة التعلم ←
                </button>
              </div>

              <div className="pointer-events-none absolute left-8 top-1/2 hidden -translate-y-1/2 text-8xl opacity-20 xl:block">
                ✦
              </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "الكورسات النشطة", value: "03", icon: "📚" },
                { label: "ساعات التعلم", value: "24.5", icon: "◷" },
                { label: "نقاط الخبرة", value: "1,250", icon: "⚡" },
                { label: "الإنجازات", value: "08", icon: "🏆" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/[0.08] bg-[#111117] p-5 transition hover:border-amber-300/25"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <span className="text-xl">{stat.icon}</span>
                  </div>
                  <p className="mt-4 text-3xl font-black tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    إحصائيات تجريبية للواجهة
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_320px]">
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">كمّل من حيث توقفت</h2>
                    <p className="mt-2 text-sm text-gray-500">
                      كل درس يقربك من هدفك.
                    </p>
                  </div>
                  <button
                    onClick={() => setActive("كورساتي")}
                    className="text-sm text-amber-300 transition hover:text-amber-200"
                  >
                    كل الكورسات ←
                  </button>
                </div>

                <div className="space-y-4">
                  {courses.map((course) => (
                    <article
                      key={course.title}
                      className="rounded-2xl border border-white/[0.08] bg-[#111117] p-5 transition hover:border-white/15 sm:p-6"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div
                          className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${course.color} text-4xl`}
                        >
                          {course.icon}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h3 className="text-lg font-bold">
                                {course.title}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {course.subtitle}
                              </p>
                            </div>
                            <span className="text-sm font-bold text-amber-300">
                              {course.progress}%
                            </span>
                          </div>

                          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.07]">
                            <div
                              className="h-full rounded-full bg-gradient-to-l from-amber-200 to-amber-500 transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <span className="text-xs text-gray-500">
                              {course.lessons}
                            </span>
                            <button
                              onClick={() => setActive(course.title)}
                              className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold transition hover:border-amber-300/40 hover:text-amber-200"
                            >
                              متابعة التعلم ←
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-white/[0.08] bg-[#111117] p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">هدف الأسبوع</h3>
                    <span className="text-xl">🎯</span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    خصص وقتًا للتعلم كل أسبوع وراقب تقدمك.
                  </p>

                  <div className="mt-5 flex items-end justify-between">
                    <span className="text-2xl font-black">3 / 5</span>
                    <span className="text-xs text-gray-500">جلسات تعلم</span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.07]">
                    <div className="h-full w-3/5 rounded-full bg-emerald-400" />
                  </div>

                  <p className="mt-3 text-xs text-emerald-300">
                    باقي جلستين لتحقيق هدفك
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-[#111117] p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">مهمتك القادمة</h3>
                    <span>⚡</span>
                  </div>

                  <div className="mt-5 rounded-xl border border-amber-300/15 bg-amber-300/[0.05] p-4">
                    <span className="text-xs font-semibold text-amber-300">
                      تحدي هذا الأسبوع
                    </span>
                    <h4 className="mt-3 font-bold">
                      ابنِ أول مشروع برمجي
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      طبّق ما تعلمته وابدأ بتحويل أفكارك إلى مشاريع حقيقية.
                    </p>
                    <button
                      onClick={() => setActive("التحديات")}
                      className="mt-4 w-full rounded-xl bg-white/[0.06] py-3 text-sm font-semibold transition hover:bg-white/10"
                    >
                      استكشف التحدي ←
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-[#111117] p-5">
                  <h3 className="font-bold">إنجازاتك الأخيرة</h3>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-300/10 text-2xl">
                      🌱
                    </div>
                    <div>
                      <p className="text-sm font-semibold">بداية الرحلة</p>
                      <p className="mt-1 text-xs text-gray-500">
                        استمر في التعلم لتحقيق المزيد.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="mt-12 border-t border-white/[0.07] py-6 text-center text-xs text-gray-600">
              Creative Life Academy · تعلّم اليوم، واصنع مستقبلك غدًا.
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}

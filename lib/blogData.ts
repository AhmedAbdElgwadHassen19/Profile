export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  category: "Next/React" | "SEO" | "AI" | "Performance";
  categoryAr: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "website-king-of-digital-presence",
    title: "الموقع الإلكتروني: ملك قنوات التواجد الرقمي",
    excerpt: "لماذا يعتبر الموقع الإلكتروني الأداة الأكثر قوة وتخصيصاً في عالم الأعمال الرقمي؟ وكيف تبدأ رحلتك؟",
    category: "SEO",
    categoryAr: "سيو",
    date: "٣٠ أبريل ٢٠٢٦",
    readTime: "٥ دقائق قراءة",
    coverImage: "/blog-assets/website-king.png",
    author: {
      name: "أحمد عبد الجواد",
      role: "مطور ويب متكامل",
      image: "/my.jpg"
    },
    content: "الموقع الإلكترونيّ هو ملك قنوات التواجد الرقمي، لأنه أكثرها قابليّة للتخصيص والأقلمة، فهو تحت سيطرتك بالكامل، ويمكنك تطويره مع الوقت والإضافة عليه وإعادة بنائه حسب الحاجة، بل واستخدامه لأغراض متعددة في الوقت نفسه.\n\n### لماذا الموقع الإلكتروني هو الأهم؟\n1. **السيطرة الكاملة**: على عكس منصات التواصل الاجتماعي، أنت تملك الموقع وبياناته بالكامل.\n2. **التخصيص**: يمكنك بناء تجربة فريدة تعكس هويتك التجارية بدقة.\n3. **تعدد الأغراض**: يمكن أن يكون معرض أعمال، متجر إلكتروني، ومنصة تعليمية في آن واحد.\n\nيمكننا تصنيف أنواع المواقع الإلكترونيّة حسب طريقة إنشاء الموقع، وهي الطريقة الأكثر نفعًا في رحلة البحث عن مطوّر أو مديرٍ للموقع في بداية الطريق."
  },
  {
    slug: "choosing-digital-presence-channels",
    title: "دليل اختيار قناة التواجد الرقمي المناسبة",
    excerpt: "كيف تختار نوع التواجد الرقمي الذي يناسب أهدافك وميزانيتك؟ تعرف على الأساسيات قبل البدء.",
    category: "SEO",
    categoryAr: "سيو",
    date: "٢٥ أبريل ٢٠٢٦",
    readTime: "٤ دقائق قراءة",
    coverImage: "/blog-assets/digital-presence.png",
    author: {
      name: "أحمد عبد الجواد",
      role: "مطور ويب متكامل",
      image: "/my.jpg"
    },
    content: "بالنظر للمستويات المختلفة للتواجد الرقمي، يمكنك أولاً اختيار نوع التواجد الرقمي المناسب لعملك وهدفك وميزانيّتك، ومن ذاك الاختيار يمكنك البدء بالتفكير بقنوات التواجد الرقمية المناسبة لك.\n\nلكن قبل أن تختار، عليك معرفة بعض الأساسيّات حول كلّ قناةٍ من قنوات التواجد الرقمي، تساعدك هذه الأساسيّات في الاختيار بشكل مدروس.\n\n### خطوات الاختيار:\n* **تحديد الهدف**: هل تبحث عن الانتشار أم المبيعات المباشرة؟\n* **الميزانية**: ما هو حجم الاستثمار المتاح للتطوير والتسويق؟\n* **الجمهور**: أين يتواجد عملاؤك المستهدفون؟\n\nالاختيار الصحيح من البداية يوفر عليك الكثير من الوقت والجهد في المستقبل."
  },
  {
    slug: "nextjs-16-future-of-web",
    title: "مستقبل تطوير الويب مع Next.js 16: ما الجديد؟",
    excerpt: "استكشاف أحدث ميزات Next.js 16 من تحسين الكاش إلى سرعة البناء الفائقة وتقنيات الرندرة الجديدة.",
    category: "Next/React",
    categoryAr: "نيكست ورياكت",
    date: "٥ أبريل ٢٠٢٦",
    readTime: "٦ دقائق قراءة",
    coverImage: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2000&auto=format&fit=crop",
    author: {
      name: "أحمد عبد الجواد",
      role: "مطور ويب متكامل",
      image: "/my.jpg"
    },
    content: "وصلت نسخة Next.js 16 رسمياً، محملة بمجموعة مذهلة من الميزات التي ستغير طريقة بنائنا للمواقع. التركيز الأساسي في هذه النسخة كان على الأداء وتجربة المطور.\n\n### أهم المميزات:\n1. **تحسين الكاش (Enhanced Caching)**: أصبح التحكم في البيانات المخزنة أكثر وضوحاً وقوة.\n2. **Server Actions**: أصبحت معالجة البيانات والـ Forms أكثر استقراراً وأماناً.\n3. **PPR (Partial Prerendering)**: تقنية هجينة تجمع بين السرعة الثابتة وديناميكية البيانات.\n\nبناء المواقع باستخدام Next.js 16 يضمن لك الحصول على أداء Lighthouse مثالي وتجربة مستخدم لا تضاهى."
  },
  {
    slug: "seo-mastery-react-nextjs",
    title: "أسرار الـ SEO لمواقع React و Next.js",
    excerpt: "تعلم كيف تجعل موقعك يظهر في النتائج الأولى لمحركات البحث وكيفية تحسين الميتاداتا والأداء التقني.",
    category: "SEO",
    categoryAr: "سيو",
    date: "٢ أبريل ٢٠٢٦",
    readTime: "٨ دقائق قراءة",
    coverImage: "https://plus.unsplash.com/premium_photo-1685283298465-e52e933a3312?q=80&w=2000&auto=format&fit=crop",
    author: {
      name: "أحمد عبد الجواد",
      role: "مطور ويب متكامل",
      image: "/my.jpg"
    },
    content: "غالباً ما يتم إهمال الـ SEO في تطبيقات React. بينما توفر React تجربة مستخدم رائعة، إلا أن محركات البحث قد تجد صعوبة في قراءتها. هنا يأتي دور Next.js لحل هذه المشكلة.\n\n### خطوات النجاح:\n* **Metadata API**: استخدم واجهة الميتاداتا الجديدة في نكست لتحسين ظهور موقعك في منصات التواصل.\n* **Semantic HTML**: لا تستخدم الـ div لكل شيء، استخدم عناصر HTML5 الصحيحة.\n* **Image Optimization**: استخدم دائماً مكون الصورة في نكست لتقليل حجم الصور وزيادة سرعة التحميل."
  },
  {
    slug: "generative-ai-in-saas",
    title: "دمج الذكاء الاصطناعي في تطبيقات الـ SaaS",
    excerpt: "دليلك لاستخدام واجهات OpenAI و Gemini لبناء ميزات ذكية تزيد من إنتاجية المستخدمين.",
    category: "AI",
    categoryAr: "ذكاء اصتناعي",
    date: "٢٨ مارس ٢٠٢٦",
    readTime: "١٠ دقائق قراءة",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
    author: {
      name: "أحمد عبد الجواد",
      role: "مطور ويب متكامل",
      image: "/my.jpg"
    },
    content: "لم يعد الذكاء الاصطناعي مجرد رفاهية، بل أصبح ضرورة في التطبيقات الحديثة. سواء كان توليد محتوى تلقائي أو بحث ذكي، الذكاء الاصطناعي يرفع قيمة منتجك.\n\nباستخدام أدوات مثل Vercel AI SDK، يمكننا ربط نماذج مثل GPT-4 أو Gemini 1.5 Pro مباشرة بالواجهة الأمامية لتقديم تجربة تفاعلية للمستخدمين."
  },
  {
    slug: "design-principles-premium-ui",
    title: "١٠ مبادئ لتصميم واجهات مستخدم فخمة (Premium)",
    excerpt: "لماذا تبدو بعض المواقع 'باهظة' والبعض الآخر بسيط؟ استكشاف المساحات، الخطوط، وتأثير الزجاج.",
    category: "Performance",
    categoryAr: "اداء الموقع",
    date: "٢٥ مارس ٢٠٢٦",
    readTime: "٥ دقائق قراءة",
    coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
    author: {
      name: "أحمد عبد الجواد",
      role: "مصمم واجهات",
      image: "/my.jpg"
    },
    content: "التصميم الفخم لا يتعلق بكثرة الألوان، بل بـ 'المساحات البيضاء' والتفاصيل الصغيرة.\n- **الخطوط**: اختر خطوطاً احترافية مثل Inter أو Tajawal.\n- **Glassmorphism**: استخدم تأثير الزجاج الشفاف بحذر لخلق عمق بصري.\n- **Micro-interactions**: حركات صغيرة مكافئة للمستخدم عند التفاعل مع العناصر."
  },
  {
    slug: "react-19-server-components",
    title: "فهم الـ React 19 Server Components",
    excerpt: "التحول الجذري من الرندرة في المتصفح إلى الرندرة في الخادم (Server-First).",
    category: "Next/React",
    categoryAr: "نيكست ورياكت",
    date: "٢٠ مارس ٢٠٢٦",
    readTime: "٧ دقائق قراءة",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop",
    author: {
      name: "أحمد عبد الجواد",
      role: "مطور رياكت",
      image: "/my.jpg"
    },
    content: "تأتي React 19 بطرق برمجية جديدة تتيح لنا استخدام الـ Server Components بشكل مستقل. هذا يمثل تحولاً كبيراً في كيفية جلب البيانات وتقليل حجم ملفات الجافا سكريبت التي يحملها المتصفح."
  },
  {
    slug: "performance-optimization-guide",
    title: "الدليل الكامل لتحسين أداء المواقع",
    excerpt: "كيف تحصل على نتيجة ١٠٠/١٠٠ في اختبار Lighthouse وتحسن سرعة موقعك.",
    category: "Performance",
    categoryAr: "اداء الموقع",
    date: "١٥ مارس ٢٠٢٦",
    readTime: "١٢ دقيقة قراءة",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    author: {
      name: "أحمد عبد الجواد",
      role: "مطور ويب متكامل",
      image: "/my.jpg"
    },
    content: "السرعة هي ميزة تنافسية. التأخير البالغ ١٠٠ ميلي ثانية قد يكلف الشركات آلاف الدولارات. في هذا المقال نستعرض:\n- **Tree Shaking**: إزالة الأكواد غير المستخدمة.\n- **Font Optimization**: تقليل وقت تحميل الخطوط.\n- **Database Indexing**: تحسين سرعة جلب البيانات من الخادم."
  },
  {
    slug: "tailind-css-advanced-tricks",
    title: "خدع متقدمة لمحترفي Tailwind CSS",
    excerpt: "استكشاف القيم المخصصة، المكونات الإضافية، والواجهات المعقدة.",
    category: "Next/React",
    categoryAr: "نيكست ورياكت",
    date: "١٠ مارس ٢٠٢٦",
    readTime: "٤ دقائق قراءة",
    coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000&auto=format&fit=crop",
    author: {
      name: "أحمد عبد الجواد",
      role: "مطور ويب متكامل",
      image: "/my.jpg"
    },
    content: "تيلويند أكثر من مجرد كلاسات مساعدة. عبر استخدام نظام JIT والإعدادات المخصصة، يمكننا بناء أي تصميم تحلم به بشكل أسرع وأكثر مرونة."
  },
  {
    slug: "building-saas-from-scratch",
    title: "بناء مشروع SaaS من الصفر حتى الإطلاق",
    excerpt: "خارطة الطريق الكاملة: نظام الدخول، قاعدة البيانات، ونظام الدفع.",
    category: "Next/React",
    categoryAr: "نيكست ورياكت",
    date: "٥ مارس ٢٠٢٦",
    readTime: "١٥ دقيقة قراءة",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    author: {
      name: "أحمد عبد الجواد",
      role: "مطور ويب متكامل",
      image: "/my.jpg"
    },
    content: "بناء الـ SaaS هو رحلة تتطلب أساساً تقنياً قوياً.\n1. **Authentication**: لماذا نستخدم Clerk للسرعة والأمان.\n2. **Database**: استخدام Prisma للتعامل المرن مع البيانات.\n3. **Payments**: دمج Stripe لمعالجة الاشتراكات بأمان."
  }
];
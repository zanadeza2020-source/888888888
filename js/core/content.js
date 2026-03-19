// ============================================================
// NURSING CONTENT DATABASE — كل كلمة من الـ PDFs
// Chapter 1: Slides 1-14  | Chapter 2: Slides 15-29
// Chapter 3: Slides 30-54 | Chapter 4: Slides 55-80
// ============================================================

const DB = {

  chapters: [

    // ════════════════════════════════════════════════════════
    // CHAPTER 1 — HAND WASHING  (Slides 1–14)
    // ════════════════════════════════════════════════════════
    {
      id: 1,
      title: "غسل اليدين",
      titleEn: "Hand Washing",
      icon: "🧼",
      accent: "#38bdf8",
      dark:   "#0c2a40",
      slides: [

        {
          id: "1-intro",
          heading: "مقدمة — Introduction",
          body: [
            {
              type: "bilingual",
              en: "Nurses must understand and practice methods to prevent nosocomial infections.",
              ar: "يجب على الممرضين أن يفهموا وأن يمارسوا الطرق التي تمنع عدوى المستشفيات."
            },
            {
              type: "term",
              en: "Nosocomial infections",
              ar: "عدوى المستشفيات",
              phonetic: "ˌnɒsəˈkəʊmɪəl ɪnˈfekʃənz",
              def_en: "Infections acquired while a person is receiving care in a health care agency.",
              def_ar: "هي العدوى التي تُكتسب (تصيب الشخص) بينما الشخص يتلقى الرعاية في المركز الصحي أو المستشفى."
            }
          ]
        },

        {
          id: "1-microorganisms",
          heading: "أنواع الميكروبات — Types of Microorganisms",
          body: [
            {
              type: "bilingual",
              en: "The most common types:",
              ar: "من أكثر أنواع الميكروبات شيوعاً هي:"
            },
            {
              type: "numbered-bilingual",
              items: [
                { en: "Bacteria", ar: "البكتيريا" },
                { en: "Viruses", ar: "الفيروسات" },
                { en: "Fungi",   ar: "الفطريات"  }
              ]
            }
          ]
        },

        {
          id: "1-medical-asepsis",
          heading: "التعقيم الطبي — Medical Asepsis",
          body: [
            {
              type: "term",
              en: "Medical asepsis",
              ar: "التعقيم الطبي",
              phonetic: "ˈmedɪkəl eɪˈsepsɪs",
              def_en: "Means those practices that reduce the numbers of microorganisms.",
              def_ar: "هي الممارسات التي تُقلل أو تَحُد من أعداد الميكروبات."
            },
            {
              type: "bilingual",
              en: "Also called: clean technique",
              ar: "تُسمى أيضاً: التقنيات النظيفة"
            }
          ]
        },

        {
          id: "1-asepsis-examples",
          heading: "أمثلة على التعقيم الطبي — Examples of Medical Aseptic Practices",
          body: [
            {
              type: "bilingual",
              en: "Examples of medical aseptic practices include:",
              ar: "من الأمثلة على التعقيم الطبي:"
            },
            {
              type: "checkmarks",
              items: [
                { en: "Using antimicrobial agents", ar: "استخدام مضادات الميكروبات مثل الكلور والكحول" },
                { en: "Hand hygiene",               ar: "غسل اليدين" },
                { en: "Wearing hospital garments",  ar: "ارتداء ملابس المستشفى" },
                { en: "Keeping the environment as clean as possible.", ar: "المحافظة على البيئة نظيفة قدر الإمكان" }
              ]
            }
          ]
        },

        {
          id: "1-handwashing-def",
          heading: "غسل اليدين — Hand Washing",
          body: [
            {
              type: "term",
              en: "Hand washing",
              ar: "غسل اليدين",
              phonetic: "hænd ˈwɒʃɪŋ",
              def_en: "Scrubbing the hands with soap, water, and friction.",
              def_ar: "فرك (حك) اليدين باستخدام الماء والصابون."
            },
            {
              type: "highlight",
              en: "Hand washing is the single most effective way to prevent infections.",
              ar: "يُعتبر غسل اليدين من أكثر الطرق فعالية لمنع العدوى."
            }
          ]
        },

        {
          id: "1-when1",
          heading: "متى نغسل اليدين؟ (1) — When We Perform Hand Washing?",
          body: [
            {
              type: "bilingual",
              en: "Wash hands after touching blood, body fluids, secretions, excretions, and contaminated items, whether or not gloves are worn.",
              ar: "اغسل يديك بعد ملامسة الدم وسوائل وافرازات الجسم، أو بعد ملامسة الأدوات الملوثة، سواء كنت مرتدي قفازات أم لا."
            }
          ]
        },

        {
          id: "1-when2",
          heading: "متى نغسل اليدين؟ (2) — When We Perform Hand Washing?",
          body: [
            {
              type: "bilingual",
              en: "Wash hands immediately after gloves are removed, between patient contacts and wash between tasks and procedures on the same patient to prevent cross-contamination of different body sites.",
              ar: "اغسل يديك مباشرة بعد خلع القفازات، أو بين ملامسة المرضى، واغسل يديك بين المهام والمهارات التي تُطبق على نفس المريض وذلك لمنع انتقال العدوى من مكان لآخر لنفس الجسم."
            }
          ]
        },

        {
          id: "1-how",
          heading: "خطوات غسل اليدين — Steps of Hand Washing",
          body: [
            {
              type: "numbered-bilingual",
              items: [
                { en: "Wet hands with water",                                                               ar: "بلّل اليدين بالماء" },
                { en: "Apply enough soap to cover all hand surfaces.",                                       ar: "ضع الصابون بكمية كافية لتغطية كل أسطح اليد" },
                { en: "Rub hands palm to palm",                                                              ar: "افرك كف مع كف" },
                { en: "Right palm over left dorsum with interlaced fingers and vice versa",                  ar: "راحة اليد اليمنى على ظهر اليد اليسرى مع تشابك الأصابع والعكس" },
                { en: "Palm to palm with fingers interlaced",                                                ar: "كف مع كف مع تشابك الأصابع" },
                { en: "Backs of fingers to opposing palms with fingers interlocked",                         ar: "ظهور الأصابع على الراحة المقابلة مع تشابك الأصابع" },
                { en: "Rotational rubbing of left thumb clasped in right palm and vice versa",               ar: "افرك الإبهام الأيسر بحركة دورانية مع راحة اليد اليمنى والعكس" },
                { en: "Rotational rubbing, backwards and forwards with clasped fingers of right hand in left palm and vice versa.", ar: "افرك أطراف أصابع اليد اليمنى بحركة دورانية في راحة اليد اليسرى والعكس" },
                { en: "Rinse hands with water",                                                              ar: "اشطف اليدين بالماء" },
                { en: "Dry thoroughly with a single use towel",                                              ar: "جفف جيداً بمنشفة نظيفة لمرة واحدة" },
                { en: "Use towel to turn off faucet",                                                        ar: "استخدم المنشفة لإغلاق الصنبور" },
                { en: "...and your hands are safe.",                                                         ar: "...ويداك الآن آمنتان." }
              ]
            }
          ]
        },

        {
          id: "1-surgical-scrub",
          heading: "تعقيم اليدين الخاص بالعمليات — Surgical Scrub",
          body: [
            {
              type: "term",
              en: "Surgical scrub",
              ar: "تعقيم اليدين للعمليات",
              phonetic: "ˈsɜːdʒɪkəl skrʌb",
              def_en: "A surgical scrub is performed before donning sterile gloves in an operative room.",
              def_ar: "يتم تطبيق تعقيم اليدين قبل ارتداء القفازات المعقمة في غرفة العمليات."
            }
          ]
        },

        {
          id: "1-differences1",
          heading: "الفرق بين غسل اليدين والتعقيم الجراحي (1)",
          body: [
            {
              type: "compare",
              label_a: "Hand Washing — غسل اليدين",
              label_b: "Surgical Scrub — تعقيم العمليات",
              rows: [
                {
                  a_en: "Performed for all procedure",
                  a_ar: "يتم تطبيقه لجميع الإجراءات التمريضية",
                  b_en: "Performed for operative procedure",
                  b_ar: "يتم تطبيقه فقط لإجراء العمليات الجراحية"
                }
              ]
            }
          ]
        },

        {
          id: "1-differences2",
          heading: "الفرق بين غسل اليدين والتعقيم الجراحي (2)",
          body: [
            {
              type: "compare",
              label_a: "Hand Washing",
              label_b: "Surgical Scrub",
              rows: [
                {
                  a_en: "Lasts 10–15 seconds",
                  a_ar: "يستغرق من 10 إلى 15 ثانية",
                  b_en: "Lasts 2–5 minutes",
                  b_ar: "يستغرق من دقيقتين إلى 5 دقائق"
                }
              ]
            }
          ]
        },

        {
          id: "1-differences3",
          heading: "الفرق بين غسل اليدين والتعقيم الجراحي (3)",
          body: [
            {
              type: "compare",
              label_a: "Hand Washing",
              label_b: "Surgical Scrub",
              rows: [
                {
                  a_en: "Soap is used",
                  a_ar: "يتم استعمال الصابون",
                  b_en: "Antimicrobial agents are used",
                  b_ar: "يتم استعمال معقمات خاصة"
                }
              ]
            }
          ]
        },

        {
          id: "1-important-terms",
          heading: "مصطلحات مهمة — Some Important Terms",
          body: [
            {
              type: "term",
              en: "Disinfection",
              ar: "التطهير",
              phonetic: "ˌdɪsɪnˈfekʃən",
              def_en: "Process by which pathogens, but not necessarily spores, are destroyed. (e.g. alcohol, dettol)",
              def_ar: "هي عملية القضاء على معظم الميكروبات، ما عدا الأبواغ. مثل استعمال الكحول أو الديتول والمطهرات الأخرى."
            },
            {
              type: "term",
              en: "Sterilization",
              ar: "التعقيم",
              phonetic: "ˌsterɪlaɪˈzeɪʃən",
              def_en: "Process by which all microorganisms, including spores, are destroyed. (e.g. boiling water or Autoclave)",
              def_ar: "هي عملية القضاء على جميع الميكروبات مع الأبواغ. مثل استعمال الماء المغلي أو جهاز الأوتوكليف."
            },
            {
              type: "bilingual",
              en: "Autoclave: device used to sterilize surgical instruments in hospitals.",
              ar: "الأوتوكليف: جهاز تعقيم الأدوات الجراحية بالمستشفى."
            }
          ]
        }
      ],

      vocab: [
        { en: "Nosocomial infection",    ar: "عدوى المستشفيات",                  ph: "ˌnɒsəˈkəʊmɪəl ɪnˈfekʃən" },
        { en: "Medical asepsis",         ar: "التعقيم الطبي",                    ph: "ˈmedɪkəl eɪˈsepsɪs" },
        { en: "Clean technique",         ar: "التقنيات النظيفة",                 ph: "kliːn tekˈniːk" },
        { en: "Hand washing",            ar: "غسل اليدين",                       ph: "hænd ˈwɒʃɪŋ" },
        { en: "Surgical scrub",          ar: "تعقيم اليدين للعمليات",            ph: "ˈsɜːdʒɪkəl skrʌb" },
        { en: "Microorganisms",          ar: "الميكروبات / الكائنات الدقيقة",    ph: "ˌmaɪkrəʊˈɔːɡənɪzəmz" },
        { en: "Antimicrobial agents",    ar: "مضادات الميكروبات",                ph: "ˌæntɪmaɪˈkrəʊbɪəl ˈeɪdʒənts" },
        { en: "Cross-contamination",     ar: "التلوث المتقاطع",                  ph: "krɒs kənˌtæmɪˈneɪʃən" },
        { en: "Friction",                ar: "الاحتكاك / الفرك",                 ph: "ˈfrɪkʃən" },
        { en: "Disinfection",            ar: "التطهير",                          ph: "ˌdɪsɪnˈfekʃən" },
        { en: "Sterilization",           ar: "التعقيم الكامل",                   ph: "ˌsterɪlaɪˈzeɪʃən" },
        { en: "Autoclave",               ar: "جهاز التعقيم بالبخار",             ph: "ˈɔːtəkleɪv" },
        { en: "Contaminated",            ar: "ملوث",                             ph: "kənˈtæmɪneɪtɪd" },
        { en: "Pathogens",               ar: "مسببات المرض",                     ph: "ˈpæθədʒənz" },
        { en: "Spores",                  ar: "الأبواغ",                          ph: "spɔːrz" }
      ],

      quiz: [
        { q: "ما هي عدوى المستشفيات (Nosocomial infections)؟", o: ["عدوى يأتي بها المريض من البيت", "عدوى تُكتسب أثناء تلقي الرعاية في المستشفى", "عدوى تصيب الممرضين فقط", "عدوى بكتيرية فقط"], c: 1, ex: "Nosocomial infections هي العدوى التي تُكتسب بينما الشخص يتلقى الرعاية في المركز الصحي أو المستشفى." },
        { q: "ما هو الاسم الآخر للتعقيم الطبي (Medical Asepsis)؟", o: ["Surgical technique", "Clean technique", "Sterile technique", "Isolation technique"], c: 1, ex: "يُسمى التعقيم الطبي أيضاً Clean technique — التقنيات النظيفة." },
        { q: "ما تعريف غسل اليدين (Hand Washing)؟", o: ["نقع اليدين في الماء فقط", "فرك اليدين باستخدام الماء والصابون", "استخدام الكحول فقط", "ارتداء القفازات"], c: 1, ex: "Hand Washing = فرك (حك) اليدين باستخدام الماء والصابون." },
        { q: "كم تستغرق مدة غسل اليدين العادي؟", o: ["5 ثواني", "10–15 ثانية", "2–5 دقائق", "10 دقائق"], c: 1, ex: "غسل اليدين يستغرق 10–15 ثانية، بينما التعقيم الجراحي يستغرق 2–5 دقائق." },
        { q: "كم تستغرق مدة Surgical Scrub؟", o: ["10–15 ثانية", "30 ثانية", "2–5 دقائق", "10 دقائق"], c: 2, ex: "Surgical Scrub يستغرق من دقيقتين إلى 5 دقائق." },
        { q: "ما المادة المستخدمة في غسل اليدين العادي؟", o: ["معقمات خاصة", "الكحول فقط", "الصابون والماء", "الديتول"], c: 2, ex: "في غسل اليدين يتم استعمال الصابون العادي والماء والاحتكاك (Friction)." },
        { q: "ما المادة المستخدمة في Surgical Scrub؟", o: ["الصابون العادي", "الماء فقط", "معقمات خاصة (Antimicrobial agents)", "الكريم الطبي"], c: 2, ex: "في تعقيم اليدين الجراحي يتم استعمال معقمات خاصة Antimicrobial agents." },
        { q: "متى يجب غسل اليدين مباشرة؟", o: ["قبل ارتداء القفازات فقط", "مباشرة بعد خلع القفازات", "بعد ساعة من العمل", "عند نهاية الوردية فقط"], c: 1, ex: "يجب غسل اليدين مباشرة بعد خلع القفازات دائماً وبدون استثناء." },
        { q: "ما الفرق الرئيسي بين Disinfection وSterilization؟", o: ["لا فرق بينهما", "التطهير يقضي على معظم الميكروبات ما عدا الأبواغ، التعقيم يقضي على الجميع", "التطهير أشمل وأقوى", "التعقيم يستخدم الكحول فقط"], c: 1, ex: "Disinfection = القضاء على معظم الميكروبات ما عدا الأبواغ. Sterilization = القضاء على جميع الميكروبات مع الأبواغ." },
        { q: "ما هو الأوتوكليف (Autoclave)؟", o: ["جهاز قياس الحرارة", "جهاز تعقيم الأدوات الجراحية بالبخار", "جهاز ضغط الدم", "جهاز التنفس الصناعي"], c: 1, ex: "الأوتوكليف هو جهاز تعقيم الأدوات الجراحية بالمستشفى، يعمل بالبخار تحت ضغط عالٍ." }
      ]
    },

    // ════════════════════════════════════════════════════════
    // CHAPTER 2 — GLOVES (Slides 15–29)
    // ════════════════════════════════════════════════════════
    {
      id: 2,
      title: "القفازات الطبية",
      titleEn: "Donning and Removing Gloves",
      icon: "🧤",
      accent: "#34d399",
      dark:   "#0c2a1e",
      slides: [

        {
          id: "2-ppe",
          heading: "معدات الحماية الشخصية — Personal Protective Equipment (PPE)",
          body: [
            {
              type: "numbered-bilingual",
              items: [
                { en: "Uniforms",                ar: "اللباس الموحد للطواقم الطبية" },
                { en: "Gowns",                   ar: "ثوب أو رداء الحماية" },
                { en: "Masks",                   ar: "الكمامات الطبية" },
                { en: "Gloves",                  ar: "القفازات الطبية" },
                { en: "Protective eyewear",      ar: "النظارات (غطاء العين)" },
                { en: "Hair and Shoe Covers",    ar: "غطاء الشعر والحذاء" }
              ]
            }
          ]
        },

        {
          id: "2-why-gloves",
          heading: "لماذا يجب على الممرضين ارتداء القفازات؟ — Why Nurses Must Wear Gloves?",
          body: [
            {
              type: "bilingual",
              en: "Nurses wear gloves in the following situations:",
              ar: "يتم ارتداء القفازات في الحالات التالية:"
            },
            {
              type: "numbered-bilingual",
              items: [
                {
                  en: "As a barrier to prevent direct hand contact with blood, body fluids, secretions, excretions, mucous membranes.",
                  ar: "تستخدم كحاجز لمنع اتصال اليد بالدم أو سوائل وافرازات وفضلات الجسم."
                },
                {
                  en: "To protect nurses from microorganisms transmitted from clients.",
                  ar: "لحماية الممرض من المريض (منع العدوى)."
                },
                {
                  en: "To protect clients from microorganisms transmitted from nurses.",
                  ar: "لحماية المريض من الممرض (منع العدوى)."
                },
                {
                  en: "To protect clients from microorganisms transmitted from another client.",
                  ar: "لحماية المريض من مريض آخر (منع العدوى)."
                }
              ]
            },
            {
              type: "bilingual",
              en: "Gloves are generally made of latex.",
              ar: "القفازات الطبية مصنوعة بشكل عام من مادة اللاتكس."
            },
            {
              type: "bilingual",
              en: "Unfortunately some nurses and clients are allergic to latex.",
              ar: "لسوء الحظ بعض الممرضين والمرضى لديهم حساسية من مادة اللاتكس."
            }
          ]
        },

        {
          id: "2-types",
          heading: "أنواع القفازات — Types of Gloves",
          body: [
            {
              type: "bilingual",
              en: "1- Clean gloves (القفازات النظيفة)",
              ar: "1- القفازات النظيفة"
            },
            {
              type: "bilingual",
              en: "Also called: Examination gloves / latex gloves / disposable gloves.",
              ar: "تُسمى أيضاً: قفازات الفحص الطبي / قفازات لاتكس / قفازات الاستخدام لمرة واحدة."
            },
            {
              type: "bilingual",
              en: "2- Sterile gloves (القفازات المعقمة)",
              ar: "2- القفازات المعقمة"
            },
            {
              type: "bilingual",
              en: "Also called: Surgical gloves (القفازات الجراحية).",
              ar: "تُسمى أيضاً: بالقفازات الجراحية."
            }
          ]
        },

        {
          id: "2-clean-gloves",
          heading: "القفازات النظيفة — Clean Gloves",
          body: [
            {
              type: "checkmarks",
              items: [
                {
                  en: "Should be worn during Non-sterile procedures.",
                  ar: "يجب ارتداؤها أثناء ممارسة الإجراءات التمريضية الغير معقمة."
                },
                {
                  en: "Should be worn when hand contact with blood or contaminated substances is possible.",
                  ar: "يجب ارتداء القفازات النظيفة عندما يكون هناك احتمالية لمس اليد بالدم أو المواد الملوثة."
                }
              ]
            }
          ]
        },

        {
          id: "2-sterile-gloves",
          heading: "القفازات المعقمة — Sterile Gloves",
          body: [
            {
              type: "bilingual",
              en: "Gloves should be worn during invasive or sterile procedures including surgical procedures and aseptic pharmaceutical preparation.",
              ar: "يجب ارتداء هذه القفازات أثناء ممارسة الإجراءات التمريضية المعقمة، والتي تشمل اجراء العمليات الجراحية وتحضير الأدوية التي تتطلب التعقيم."
            }
          ]
        },

        {
          id: "2-sterile-field",
          heading: "خلق مجال معقم — Creating a Sterile Field",
          body: [
            {
              type: "term",
              en: "Sterile field",
              ar: "المجال المعقم",
              phonetic: "ˈsterɪl fiːld",
              def_en: "A work area free of microorganisms.",
              def_ar: "هو المنطقة أو المكان الخالي من الميكروبات."
            }
          ]
        },

        {
          id: "2-principles1",
          heading: "مبادئ المجال المعقم (1-2) — Principles of Sterile Field",
          body: [
            {
              type: "numbered-bilingual",
              items: [
                {
                  en: "They preserve sterility by touching one sterile item with another that is sterile. ✔ Sterile + Sterile = Sterile",
                  ar: "المادة المعقمة عند ملامستها مادة أخرى معقمة يبقى المجال معقماً. ✔ معقم + معقم = معقم"
                },
                {
                  en: "Once a sterile item touches something that is not sterile, it is considered contaminated. ✖ Sterile + Non-sterile = Contaminated",
                  ar: "المادة المعقمة عند ملامستها مادة أخرى غير معقمة يكون المجال ملوثاً. ✖ معقم + غير معقم = ملوث"
                }
              ]
            }
          ]
        },

        {
          id: "2-principles2",
          heading: "مبادئ المجال المعقم (3-5) — Principles of Sterile Field",
          body: [
            {
              type: "numbered-bilingual",
              start: 3,
              items: [
                {
                  en: "If there is a question about the sterility of an item, it is considered unsterile.",
                  ar: "إذا كان هناك تساؤل (شكوك)، هل المادة معقمة أم لا، في هذه الحالة يجب اعتبارها غير معقمة."
                },
                {
                  en: "Any partially unwrapped sterile package is considered contaminated.",
                  ar: "أي علبة معقمة غير مغلفة يتم اعتبارها ملوثة."
                },
                {
                  en: "Packaged sterile item is not considered sterile past its recommended expiration date.",
                  ar: "أي علبة معقمة منتهية الصلاحية يتم اعتبارها غير معقمة."
                }
              ]
            }
          ]
        },

        {
          id: "2-principles3",
          heading: "مبادئ المجال المعقم (6-7) — Principles of Sterile Field",
          body: [
            {
              type: "numbered-bilingual",
              start: 6,
              items: [
                {
                  en: "The outer 1-inch margin of a sterile area is considered a zone of contamination.",
                  ar: "تعتبر حدود المجال المعقم التي مساحتها 1 انش منطقة ملوثة."
                },
                {
                  en: "Sterile items that are located or lowered below waist level are considered contaminated.",
                  ar: "المواد المعقمة الموجودة تحت مستوى الخصر يتم اعتبارها ملوثة."
                }
              ]
            }
          ]
        }
      ],

      vocab: [
        { en: "Personal Protective Equipment (PPE)", ar: "معدات الحماية الشخصية",          ph: "ˈpɜːrsənəl prəˈtektɪv ɪˈkwɪpmənt" },
        { en: "Gown",                                ar: "رداء الحماية",                    ph: "ɡaʊn" },
        { en: "Clean gloves",                        ar: "القفازات النظيفة",                ph: "kliːn ɡlʌvz" },
        { en: "Sterile gloves",                      ar: "القفازات المعقمة",                ph: "ˈsterɪl ɡlʌvz" },
        { en: "Surgical gloves",                     ar: "القفازات الجراحية",               ph: "ˈsɜːdʒɪkəl ɡlʌvz" },
        { en: "Examination gloves",                  ar: "قفازات الفحص الطبي",              ph: "ɪɡˌzæmɪˈneɪʃən ɡlʌvz" },
        { en: "Disposable gloves",                   ar: "قفازات للاستخدام لمرة واحدة",     ph: "dɪˈspəʊzəbl ɡlʌvz" },
        { en: "Latex",                               ar: "اللاتكس",                         ph: "ˈleɪteks" },
        { en: "Sterile field",                       ar: "المجال المعقم",                   ph: "ˈsterɪl fiːld" },
        { en: "Contaminated",                        ar: "ملوث",                            ph: "kənˈtæmɪneɪtɪd" },
        { en: "Expiration date",                     ar: "تاريخ انتهاء الصلاحية",           ph: "ˌekspɪˈreɪʃən deɪt" },
        { en: "Waist level",                         ar: "مستوى الخصر",                    ph: "weɪst ˈlevəl" },
        { en: "Mucous membranes",                    ar: "الأغشية المخاطية",               ph: "ˈmjuːkəs ˈmembreɪnz" },
        { en: "Invasive procedures",                 ar: "الإجراءات الجراحية التدخلية",     ph: "ɪnˈveɪsɪv prəˈsiːdʒərz" }
      ],

      quiz: [
        { q: "كم عدد مكونات معدات الحماية الشخصية (PPE)؟", o: ["3", "4", "5", "6"], c: 3, ex: "PPE تتكون من 6 مكونات: الزي الموحد، رداء الحماية، الكمامة، القفازات، النظارة الواقية، غطاء الشعر والحذاء." },
        { q: "من ماذا تُصنع القفازات الطبية بشكل عام؟", o: ["البلاستيك", "القماش", "اللاتكس (Latex)", "المطاط الطبيعي"], c: 2, ex: "القفازات الطبية مصنوعة بشكل عام من مادة اللاتكس (Latex)." },
        { q: "ما هو الاسم الآخر للقفازات النظيفة؟", o: ["Sterile gloves", "Examination gloves", "Surgical gloves", "Protective gloves"], c: 1, ex: "القفازات النظيفة تُسمى أيضاً: Examination gloves أو latex gloves أو disposable gloves." },
        { q: "متى يجب ارتداء القفازات المعقمة (Sterile Gloves)؟", o: ["في جميع الإجراءات التمريضية", "أثناء الإجراءات الغير معقمة فقط", "أثناء الإجراءات المعقمة والعمليات الجراحية", "عند ملامسة المريض فقط"], c: 2, ex: "القفازات المعقمة تُرتدى أثناء الإجراءات التمريضية المعقمة والعمليات الجراحية وتحضير الأدوية التي تتطلب التعقيم." },
        { q: "ما هو المجال المعقم (Sterile Field)؟", o: ["غرفة العمليات", "المنطقة أو المكان الخالي من الميكروبات", "الأدوات الطبية المعقمة", "ملابس الطاقم الطبي"], c: 1, ex: "Sterile field = هو المنطقة أو المكان الخالي من الميكروبات." },
        { q: "ماذا يحدث عند ملامسة مادة معقمة لمادة غير معقمة؟", o: ["يبقى المجال معقماً", "يصبح المجال ملوثاً", "لا يتغير شيء", "يجب إعادة التعقيم فوراً"], c: 1, ex: "Sterile + Non-sterile = Contaminated." },
        { q: "ما الذي يحدث للمواد المعقمة الموجودة تحت مستوى الخصر؟", o: ["تبقى معقمة", "تصبح أكثر عقامة", "تعتبر ملوثة", "لا يتغير شيء"], c: 2, ex: "المواد المعقمة الموجودة تحت مستوى الخصر يتم اعتبارها ملوثة." },
        { q: "ماذا نفعل إذا كان هناك شك في عقامة المادة؟", o: ["نعتبرها معقمة ونستخدمها", "نعتبرها غير معقمة", "نسأل الطبيب أولاً", "نعيد تعقيمها"], c: 1, ex: "إذا كان هناك تساؤل (شكوك) هل المادة معقمة أم لا، يجب اعتبارها غير معقمة." },
        { q: "كم يبلغ الهامش الملوث في حدود المجال المعقم؟", o: ["0.5 انش", "1 انش", "2 انش", "5 سم"], c: 1, ex: "حدود المجال المعقم التي مساحتها 1 انش تُعتبر منطقة ملوثة." },
        { q: "ما الذي يحدث لعلبة معقمة منتهية الصلاحية؟", o: ["تبقى معقمة", "تعتبر غير معقمة", "يمكن إعادة تعقيمها", "تصلح لفترة إضافية"], c: 1, ex: "أي علبة معقمة منتهية الصلاحية يتم اعتبارها غير معقمة." }
      ]
    },

    // ════════════════════════════════════════════════════════
    // CHAPTER 3 — BED MAKING (Slides 30–54)
    // ════════════════════════════════════════════════════════
    {
      id: 3,
      title: "تنظيم سرير المريض",
      titleEn: "Bed Making",
      icon: "🛏️",
      accent: "#fb923c",
      dark:   "#2a1500",
      slides: [

        {
          id: "3-client-room",
          heading: "غرفة المريض — Client's Room",
          body: [
            {
              type: "numbered-bilingual",
              items: [
                { en: "Walls",            ar: "الجدران" },
                { en: "Floors",           ar: "الأرضية" },
                { en: "Lighting",         ar: "الإضاءة" },
                { en: "Climate control",  ar: "التحكم بالمناخ" },
                { en: "Room furnishings", ar: "أثاث الغرفة" }
              ]
            }
          ]
        },

        {
          id: "3-room-details",
          heading: "تفاصيل غرفة المريض",
          body: [
            {
              type: "bilingual",
              en: "1- Walls: blue or light green colors that promote relaxation.",
              ar: "1- الجدران: اللون الأزرق أو الأخضر الفاتح يُعززان الشعور بالراحة والاسترخاء للمريض."
            },
            {
              type: "bilingual",
              en: "2- Lighting: Adequate lighting, both natural or artificial is important for the comfort of client and nursing personnel.",
              ar: "2- الإضاءة الجيدة: الإضاءة الكافية سواء كانت طبيعية أو صناعية ضرورية جداً لراحة المريض والطاقم التمريضي."
            },
            {
              type: "bilingual",
              en: "3- Floors (الأرضية)",
              ar: "3- الأرضية: يجب أن تكون نظيفة وآمنة لمنع الانزلاق."
            },
            {
              type: "bilingual",
              en: "4- Climate control: Temperature: 20–23°C | Humidity: 30–60% | Ventilation: amount of air in place.",
              ar: "4- التحكم بالمناخ: الحرارة: 20–23°C | الرطوبة: 30–60% | التهوية الجيدة (كمية الهواء في المكان)."
            }
          ]
        },

        {
          id: "3-furnishings",
          heading: "أثاث غرفة المريض — Room Furnishings",
          body: [
            {
              type: "lettered-bilingual",
              items: [
                { en: "The bed",          ar: "سرير المريض" },
                { en: "Privacy curtain",  ar: "ستائر السرير (ستائر الخصوصية)" },
                { en: "Over bed table",   ar: "طاولة الطعام" },
                { en: "Bedside stand",    ar: "الطاولة التي بجانب السرير (الكوميدينا)" },
                { en: "Chairs",           ar: "الكراسي" }
              ]
            }
          ]
        },

        {
          id: "3-bed-details",
          heading: "السرير — The Bed",
          body: [
            {
              type: "checkmarks",
              items: [
                {
                  en: "Adjusting the bed to promote comfort.",
                  ar: "يجب أن يكون السرير مدعوماً بجميع الوضعيات لتعزيز راحة المريض."
                },
                {
                  en: "Full or half side rails are attached to the bed frame.",
                  ar: "يجب أن يكون السرير مدعوماً بجانب أو جانبين لحماية المريض من السقوط."
                }
              ]
            },
            {
              type: "bilingual",
              en: "The bed is made of: Frame of bed + Mattress + Pillows + Bed linen",
              ar: "السرير يتكون من: إطار السرير + الفرشة + المخدات + شراشف السرير"
            }
          ]
        },

        {
          id: "3-mattress",
          heading: "فرشات السرير — Mattress",
          body: [
            {
              type: "bilingual",
              en: "1- Mattress: The main bed pad. Can be regular foam or air mattress.",
              ar: "1- الفرشة: الوسادة الرئيسية للسرير. يمكن أن تكون فرشة اسفنجية عادية أو فرشة هواء طبية."
            }
          ]
        },

        {
          id: "3-pillows",
          heading: "المخدات — Pillows",
          body: [
            {
              type: "bilingual",
              en: "2- Pillows: Pillows primary are used for comfort, but they also are used to elevate a part of the body, relieve swelling, promote breathing.",
              ar: "2- المخدات: تُستخدم المخدات بشكل أساسي للراحة، ولكن قد تُستخدم أيضاً لرفع أجزاء الجسم وتخفيف التورمات وتعزيز عملية التنفس."
            }
          ]
        },

        {
          id: "3-linen",
          heading: "شراشف السرير — Bed Linen",
          body: [
            {
              type: "bilingual",
              en: "3- Bed linen: The linen used for most hospital beds include the following:",
              ar: "3- شراشف السرير: الشراشف المستخدمة في معظم أسرة المستشفيات تشمل:"
            },
            {
              type: "numbered-bilingual",
              items: [
                { en: "Mattress pad",  ar: "غطاء الفرشة (وجه الفرشة)" },
                {
                  en: "Bottom sheet",
                  ar: "الشرشف الذي يُوضع تحت المريض"
                },
                {
                  en: "Draw sheet: placed beneath the client's hips to help for change position, helping in bed making and facilitate to move or transfer pts from bed to another bed.",
                  ar: "الشرشف الذي يساعد في تغيير وضعيات (تقليب) المريض: يُوضع هذا الشرشف تحت حوض المريض ليساعده على تغيير الوضعية، وتنظيم السرير وتسهيل عملية نقل المريض من سرير إلى آخر."
                },
                { en: "Top sheet",    ar: "الشرشف الذي يُوضع فوق المريض" },
                { en: "Blanket",      ar: "البطانية (الحرام)" }
              ]
            }
          ]
        },

        {
          id: "3-privacy-curtain",
          heading: "ستائر الخصوصية والطاولات",
          body: [
            {
              type: "bilingual",
              en: "B- Privacy curtain: It can be drawn completely around each client's bed.",
              ar: "ب- ستائر الخصوصية: يجب أن تكون محيطة بالمريض بشكل كامل للحفاظ على خصوصيته."
            },
            {
              type: "bilingual",
              en: "C- Over bed table: Helping the client to eat while in bed and to perform personal hygiene.",
              ar: "ج- طاولة الطعام: تساعد هذه الطاولة المريض على تناول الطعام وممارسة النظافة الشخصية بينما المريض في السرير."
            }
          ]
        },

        {
          id: "3-bed-making",
          heading: "تنظيم السرير — Bed Making",
          body: [
            {
              type: "term",
              en: "Bed Making",
              ar: "تنظيم السرير",
              phonetic: "bed ˈmeɪkɪŋ",
              def_en: "The technique of preparing bed and changing linen.",
              def_ar: "هي عملية تحضير السرير وتغيير شراشفه."
            },
            {
              type: "bilingual",
              en: "Types of bed making:",
              ar: "أنواع تحضير السرير:"
            },
            {
              type: "numbered-bilingual",
              items: [
                {
                  en: "Unoccupied bed making: changing linen when the bed is empty.",
                  ar: "1- تغيير الشراشف عندما يكون السرير فارغاً."
                },
                {
                  en: "Occupied bed making: changing linen while the client remains in bed.",
                  ar: "2- تغيير الشراشف بينما المريض موجود على السرير."
                }
              ]
            }
          ]
        },

        {
          id: "3-purpose",
          heading: "أهداف تنظيم السرير — Purpose of Bed Making",
          body: [
            {
              type: "numbered-bilingual",
              items: [
                { en: "To promote clients comfort.",                        ar: "تعزيز راحة المريض." },
                { en: "To provide a clean environment for the clients.",    ar: "توفير بيئة نظيفة للمرضى." },
                { en: "To minimize sources of skin irritation.",            ar: "الحد من المصادر المهيجة للجلد مثل البول والعرق." },
                { en: "To conserve the clients energy.",                   ar: "المحافظة على طاقة المريض." },
                { en: "To prevent or avoid microorganisms to come in contact with the patient.", ar: "منع الميكروبات من الوصول للمريض." }
              ]
            }
          ]
        },

        {
          id: "3-positions-list",
          heading: "الوضعيات الشائعة — Common Positions",
          body: [
            {
              type: "numbered-bilingual",
              items: [
                { en: "Supine position",           ar: "وضعية الاستلقاء على الظهر" },
                { en: "Fowler position",            ar: "الوضعية القريبة من الجلوس" },
                { en: "Semi-fowler position",       ar: "الوضعية القريبة من الاستلقاء" },
                { en: "Sitting position",           ar: "وضعية الجلوس" },
                { en: "Lateral position",           ar: "وضعية النوم على الجانب" },
                { en: "Prone position",             ar: "وضعية النوم على البطن" },
                { en: "Trendelenburg position (shock position)", ar: "وضعية الصدمة" }
              ]
            }
          ]
        },

        {
          id: "3-supine",
          heading: "وضعية الاستلقاء على الظهر — Supine Position",
          body: [
            {
              type: "bilingual",
              en: "Supine position: The patient lies flat on their back.",
              ar: "وضعية الاستلقاء على الظهر: المريض مستلقٍ على ظهره بشكل مسطح."
            }
          ]
        },

        {
          id: "3-fowler",
          heading: "وضعيتا فاولر — Fowler & Semi-Fowler Position",
          body: [
            {
              type: "bilingual",
              en: "In the Fowler position, patient on bed with angle 60–90°.",
              ar: "في وضعية الفولر تكون زاوية السرير من 60 إلى 90 درجة."
            },
            {
              type: "bilingual",
              en: "In the Semi-fowler position, patient on bed with angle 30–45°.",
              ar: "في وضعية السيمي فولر تكون زاوية السرير من 30 إلى 45 درجة."
            }
          ]
        },

        {
          id: "3-trendelenburg",
          heading: "وضعية الصدمة — Trendelenburg Position",
          body: [
            {
              type: "bilingual",
              en: "Patient elevated his legs by bed (legs are raised above heart level).",
              ar: "في هذه الوضعية يتم رفع الأرجل أعلى من مستوى القلب."
            },
            {
              type: "bilingual",
              en: "It is also called shock position (وضعية الصدمة).",
              ar: "تُسمى أيضاً وضعية الصدمة."
            }
          ]
        },

        {
          id: "3-lateral-prone",
          heading: "وضعية الجانب والبطن — Lateral & Prone",
          body: [
            {
              type: "bilingual",
              en: "Lateral position: Patient lies on their side (right or left).",
              ar: "وضعية النوم على الجانب: المريض مستلقٍ على جانبه الأيمن أو الأيسر."
            },
            {
              type: "bilingual",
              en: "Prone position: Patient lies on their abdomen (stomach).",
              ar: "وضعية النوم على البطن: المريض مستلقٍ على بطنه."
            }
          ]
        }
      ],

      vocab: [
        { en: "Bed making",           ar: "تنظيم السرير",                      ph: "bed ˈmeɪkɪŋ" },
        { en: "Unoccupied bed",       ar: "السرير الفارغ",                      ph: "ʌnˈɒkjupaɪd bed" },
        { en: "Occupied bed",         ar: "السرير مع المريض",                   ph: "ˈɒkjupaɪd bed" },
        { en: "Draw sheet",           ar: "شرشف المساعدة على التقليب",          ph: "drɔː ʃiːt" },
        { en: "Mattress",             ar: "فرشة السرير",                        ph: "ˈmætrəs" },
        { en: "Pillow",               ar: "المخدة",                            ph: "ˈpɪləʊ" },
        { en: "Blanket",              ar: "البطانية",                          ph: "ˈblæŋkɪt" },
        { en: "Privacy curtain",      ar: "ستائر الخصوصية",                   ph: "ˈprɪvəsi ˈkɜːtən" },
        { en: "Bedside stand",        ar: "الكوميدينا",                        ph: "ˈbedsaɪd stænd" },
        { en: "Over bed table",       ar: "طاولة الطعام",                      ph: "ˈəʊvər bed ˈteɪbl" },
        { en: "Supine position",      ar: "وضعية الاستلقاء على الظهر",          ph: "ˈsuːpaɪn pəˈzɪʃən" },
        { en: "Fowler position",      ar: "وضعية فاولر (60–90°)",              ph: "ˈfaʊlər pəˈzɪʃən" },
        { en: "Semi-Fowler position", ar: "وضعية سيمي فاولر (30–45°)",        ph: "ˈsemi ˈfaʊlər pəˈzɪʃən" },
        { en: "Lateral position",     ar: "وضعية النوم على الجانب",            ph: "ˈlætərəl pəˈzɪʃən" },
        { en: "Prone position",       ar: "وضعية النوم على البطن",             ph: "prəʊn pəˈzɪʃən" },
        { en: "Trendelenburg position", ar: "وضعية الصدمة",                   ph: "ˈtrendɪlənbɜːɡ pəˈzɪʃən" },
        { en: "Side rails",           ar: "جانب السرير (الحاجز الواقي)",       ph: "saɪd reɪlz" }
      ],

      quiz: [
        { q: "ما هو الشرشف الذي يُوضع تحت حوض المريض لمساعدته على التقليب؟", o: ["Bottom sheet", "Top sheet", "Draw sheet", "Mattress pad"], c: 2, ex: "Draw sheet يُوضع تحت حوض المريض لمساعدته على تغيير الوضعية وتسهيل نقله من سرير لآخر." },
        { q: "ما هي زاوية السرير في وضعية Fowler position؟", o: ["30–45°", "45–60°", "60–90°", "90–120°"], c: 2, ex: "في وضعية الفولر تكون زاوية السرير من 60 إلى 90 درجة." },
        { q: "ما هي زاوية السرير في وضعية Semi-Fowler؟", o: ["10–20°", "30–45°", "60–90°", "90°"], c: 1, ex: "في وضعية السيمي فولر تكون زاوية السرير من 30 إلى 45 درجة." },
        { q: "ما هي وضعية الصدمة (Shock position)؟", o: ["Supine position", "Prone position", "Trendelenburg position", "Lateral position"], c: 2, ex: "Trendelenburg position تُسمى أيضاً وضعية الصدمة — يتم رفع الأرجل أعلى من مستوى القلب." },
        { q: "ما هي درجة الحرارة المثالية لغرفة المريض؟", o: ["15–18°C", "20–23°C", "25–28°C", "30–33°C"], c: 1, ex: "درجة حرارة غرفة المريض يجب أن تكون بين 20–23 درجة مئوية." },
        { q: "ما هي نسبة الرطوبة المثالية في غرفة المريض؟", o: ["10–20%", "30–60%", "70–80%", "80–90%"], c: 1, ex: "كمية الرطوبة في الغرفة يجب أن تكون ما بين 30%–60%." },
        { q: "ما لون الجدران المناسب لغرفة المريض لتعزيز الراحة؟", o: ["الأحمر والبرتقالي", "الأسود والرمادي", "الأزرق أو الأخضر الفاتح", "الأبيض الصارخ"], c: 2, ex: "اللون الأزرق أو الأخضر الفاتح يُعززان الشعور بالراحة والاسترخاء للمريض." },
        { q: "لماذا تُستخدم المخدات (Pillows) في التمريض؟", o: ["للراحة فقط", "لرفع أجزاء الجسم وتخفيف التورمات وتعزيز التنفس والراحة", "لمنع العدوى", "لتغيير وضعية المريض فقط"], c: 1, ex: "المخدات تُستخدم أساساً للراحة، وأيضاً لرفع أجزاء الجسم وتخفيف التورمات وتعزيز التنفس." },
        { q: "ما هو الفرق بين Unoccupied وOccupied Bed Making؟", o: ["لا فرق", "Unoccupied = السرير فارغ | Occupied = المريض على السرير", "Occupied = السرير فارغ", "Unoccupied = المريض موجود"], c: 1, ex: "Unoccupied = تغيير الشراشف والسرير فارغ. Occupied = تغيير الشراشف والمريض موجود على السرير." },
        { q: "ما هي وضعية النوم على البطن؟", o: ["Supine position", "Lateral position", "Fowler position", "Prone position"], c: 3, ex: "Prone position = وضعية النوم على البطن." }
      ]
    },

    // ════════════════════════════════════════════════════════
    // CHAPTER 4 — HYGIENE + VITAL SIGNS (Slides 55–80)
    // ════════════════════════════════════════════════════════
    {
      id: 4,
      title: "النظافة والعلامات الحيوية",
      titleEn: "Hygiene & Vital Signs",
      icon: "💓",
      accent: "#f87171",
      dark:   "#2a0a0a",
      slides: [

        {
          id: "4-hygiene-def",
          heading: "تعريف الهايجين — Hygiene",
          body: [
            {
              type: "term",
              en: "Hygiene",
              ar: "الهايجين / النظافة",
              phonetic: "ˈhaɪdʒiːn",
              def_en: "Practices that promote health through personal cleanliness.",
              def_ar: "هي الممارسات التي تُعزز الصحة من خلال النظافة الشخصية."
            },
            {
              type: "bilingual",
              en: "Activities that foster hygiene:",
              ar: "الأنشطة التي تُعزز النظافة:"
            },
            {
              type: "numbered-bilingual",
              items: [
                { en: "Bathing",     ar: "الاستحمام" },
                { en: "Nails care",  ar: "العناية بالأظافر" },
                { en: "Oral care",   ar: "العناية بنظافة الفم" },
                { en: "Hair care",   ar: "العناية بالشعر" }
              ]
            }
          ]
        },

        {
          id: "4-bathing",
          heading: "الاستحمام — Bathing",
          body: [
            {
              type: "bilingual",
              en: "Uses a cleansing agent such as soap and water to remove sweat, oil, dirt, and microorganisms from the skin.",
              ar: "استخدام مواد التنظيف مثل الصابون والماء لإزالة العرق والزيت والوسخ والميكروبات من الجلد."
            },
            {
              type: "bilingual",
              en: "Advantages of bathing (مميزات الاستحمام):",
              ar: "فوائد (مميزات) الاستحمام:"
            },
            {
              type: "numbered-bilingual",
              items: [
                { en: "Eliminates body odor.",                      ar: "التخلص من رائحة الجسم الكريهة." },
                { en: "Reduce the potential of infection.",          ar: "تقليل احتمالية الإصابة بالعدوى." },
                { en: "Stimulates circulation.",                     ar: "تحفيز الدورة الدموية." },
                { en: "Provides a refreshed and relaxed feeling.",   ar: "يزود الشعور بالانتعاش والاسترخاء." },
                { en: "Improves self-image.",                        ar: "تحسين المظهر الجسمي." }
              ]
            }
          ]
        },

        {
          id: "4-bathing-types",
          heading: "أنواع الاستحمام — Types of Bathing",
          body: [
            {
              type: "numbered-bilingual",
              items: [
                {
                  en: "Tub bath or shower: الاستحمام تحت الدوش أو في البانيو.",
                  ar: "1- الاستحمام تحت الدوش أو في البانيو."
                },
                {
                  en: "Partial bathing: washing only those body areas subject to greatest soiling or that are sources of body odor (e.g. armpits and groin area).",
                  ar: "2- الاستحمام الجزئي: هو غسيل فقط أماكن الجسم المعرضة للتلوث أو التي يصدر منها الروائح الكريهة مثل الإبط ومنطقة العانة."
                },
                {
                  en: "Bed bath (used for dependent/unconscious persons).",
                  ar: "3- الاستحمام على السرير: يستخدم فقط للمرضى العاجزين أو فاقدي الوعي."
                }
              ]
            }
          ]
        },

        {
          id: "4-shaving",
          heading: "الحلاقة — Shaving",
          body: [
            {
              type: "bilingual",
              en: "Shaving: Removes unwanted body hair.",
              ar: "الحلاقة: هي إزالة شعر الجسم الغير مرغوب به."
            },
            {
              type: "bilingual",
              en: "Accomplished with an electric or a safety razor.",
              ar: "تتم عملية الحلاقة باستخدام ماكينة الحلاقة الكهربائية أو باستخدام شفرة الحلاقة."
            }
          ]
        },

        {
          id: "4-oral",
          heading: "نظافة الفم — Oral Hygiene",
          body: [
            {
              type: "checkmarks",
              items: [
                {
                  en: "Brushing and flossing the teeth.",
                  ar: "القيام بتنظيف الأسنان باستخدام الفرشاة."
                },
                {
                  en: "Dentures and bridges require special cleaning and care.",
                  ar: "ضبة الأسنان والجسور تحتاج رعاية خاصة."
                }
              ]
            },
            {
              type: "bilingual",
              en: "Oral hygiene in unconscious clients whom need oral care more frequently than conscious clients.",
              ar: "المرضى فاقدي الوعي يحتاجون نظافة الفم بشكل متكرر أكثر من المرضى الواعيين."
            },
            {
              type: "highlight",
              en: "Prevents aspiration is very important.",
              ar: "منع الاختناق ضروري جداً أثناء نظافة الفم وخاصاً للمرضى فاقدي الوعي."
            }
          ]
        },

        {
          id: "4-hair",
          heading: "العناية بالشعر — Hair Care",
          body: [
            {
              type: "checkmarks",
              items: [
                { en: "Use oil on the hair if it is dry.",                                              ar: "استخدم الزيت إذا كان الشعر جافاً." },
                { en: "Braid the hair to help prevent tangles.",                                        ar: "لمنع تشابك الشعر قم بتجديله." },
                { en: "Brush the hair slowly to increase circulation of sebum.",                        ar: "قم بتمشيط الشعر ببطء لزيادة الدورة الدموية." },
                { en: "Use a wide-toothed comb, combing from end to crown.",                            ar: "استخدم مشطاً ذو أسنان واسعة، التمشيط يكون من نهاية الشعر إلى المنبت." },
                { en: "Use shampoo to clean hair.",                                                     ar: "استخدم الشامبو لتنظيف الشعر." }
              ]
            }
          ]
        },

        {
          id: "4-nails",
          heading: "العناية بالأظافر — Nail Care",
          body: [
            {
              type: "bilingual",
              en: "Keeping the fingernails and toenails clean and trimmed.",
              ar: "المحافظة على أظافر اليد وأظافر القدم نظيفة ومقلمة."
            },
            {
              type: "bilingual",
              en: "Nail care should be provided with extreme caution for the following clients:",
              ar: "العناية بالأظافر تتم بحذر شديد للحالات التالية:"
            },
            {
              type: "checkmarks",
              items: [
                { en: "Clients with diabetes.", ar: "المرضى المصابون بداء السكري." },
                { en: "Client with thick nails.", ar: "المرضى ذوي الأظافر السميكة." }
              ]
            }
          ]
        },

        {
          id: "4-bed-bath-equip",
          heading: "الاستحمام على السرير — Bed Bath Equipment",
          body: [
            {
              type: "bilingual",
              en: "Equipment needed for bed bath:",
              ar: "الأدوات المطلوبة لاستحمام المريض على السرير:"
            },
            {
              type: "numbered-bilingual",
              items: [
                { en: "Wash basin",      ar: "وعاء غسيل" },
                { en: "Soap and dish",   ar: "صابون وطبق" },
                { en: "Wash cloths",     ar: "أقمشة للغسيل (سفنجة)" },
                { en: "Bath blanket",    ar: "بطانية الاستحمام" },
                { en: "Towel (×2)",      ar: "منشفة عدد 2" },
                { en: "Clean gloves",    ar: "قفازات نظيفة" }
              ]
            }
          ]
        },

        {
          id: "4-bed-bath-steps",
          heading: "خطوات الاستحمام على السرير — Bed Bath Steps",
          body: [
            {
              type: "numbered-bilingual",
              items: [
                { en: "Discuss procedure with the client and assess the client ability to assist in the bathing process.", ar: "يجب على الممرض أن يشرح للمريض آلية الاستحمام، وتقييم المريض هل بإستطاعته المساعدة في عملية الاستحمام أم لا." },
                { en: "Review the client chart for any limitation in physical activity.", ar: "مراجعة ملف المريض لمعرفة هل مسموح تحريك المريض أم لا." },
                { en: "Bring necessary equipment to the bed side stand.", ar: "إحضار الأدوات المهمة ووضعها على العربة بجانب السرير." },
                { en: "Close the curtains around the bed and close the door (provide privacy).", ar: "المحافظة على خصوصية المريض من خلال إغلاق الستائر المحيطة بالسرير وإغلاق الباب." },
                { en: "Wash your hand and wear clean gloves.", ar: "اغسل يديك وارتدي القفازات." },
                { en: "Fill the basin with sufficient amount of warm water (between 43–46°C).", ar: "إملاء الوعاء بكمية كافية من الماء الدافئ (43–46 درجة مئوية)." },
                { en: "Folding wash cloth around the hand.", ar: "قم بطي (لف) قطعة قماش الغسيل على اليد، ثم ضعها في الماء." },
                { en: "Bath the client face, neck, ear and eyes — avoiding soap in the wash cloth.", ar: "ابدأ بغسل وجه المريض والرقبة والأذن والعيون مع تجنب الصابون." },
                { en: "Soaking hand in the basin.", ar: "ضع اليد في الوعاء." },
                { en: "Washing the chest area including the axilla.", ar: "قم بغسل منطقة الصدر مع الإبط." },
                { en: "Washing the abdomen and chest area covered.", ar: "قم بغسل البطن، وتغطية منطقة الصدر." },
                { en: "Washing the arms.", ar: "قم بغسل الذراعين." },
                { en: "Washing the legs.", ar: "قم بغسل القدمين." },
                { en: "Assist the client to prone position or side line position.", ar: "مساعدة المريض بوضعه على بطنه أو على جانبه." },
                { en: "Washing the upper back and lower back.", ar: "قم بغسل الظهر من الأعلى ومن الأسفل." },
                { en: "Clean the client perianal area.", ar: "قم بتنظيف منطقة العانة." },
                { en: "Groom the client hair.", ar: "قم بتمشيط شعر المريض." },
                { en: "Change bed linens.", ar: "قم بتغيير شراشف السرير." },
                { en: "Record any significant observation on client chart.", ar: "تسجيل أي ملاحظات هامة في ملف المريض." }
              ]
            },
            {
              type: "highlight",
              en: "Note: Any part of the body that is washed must be dried and covered immediately to preserve the patient's privacy.",
              ar: "ملاحظة: أي جزء من الجسم يتم غسله، يجب تجفيفه وتغطيته مباشرة حفاظاً على خصوصية المريض. مثلاً عند غسل القدم اليمنى لا يتم الانتقال إلى القدم اليسرى إلا بعد تجفيف وتغطية القدم اليمنى."
            }
          ]
        },

        {
          id: "4-vital-signs-intro",
          heading: "العلامات الحيوية — Vital Signs",
          body: [
            {
              type: "bilingual",
              en: "There are FIVE important vital signs:",
              ar: "يوجد خمسة علامات حيوية هامة:"
            },
            {
              type: "numbered-bilingual",
              items: [
                { en: "Body temperature",   ar: "درجة حرارة الجسم" },
                { en: "Pulse",              ar: "معدل النبض" },
                { en: "Respiratory rate",   ar: "معدل التنفس" },
                { en: "Blood pressure",     ar: "ضغط الدم" },
                { en: "Pain",               ar: "الألم" }
              ]
            }
          ]
        },

        {
          id: "4-when-vitals",
          heading: "متى نقيس العلامات الحيوية؟ — When to Measure",
          body: [
            {
              type: "lettered-bilingual",
              items: [
                { en: "On admission of the client.",          ar: "أ. عند دخول المريض المستشفى." },
                { en: "According to written medical orders.", ar: "ب. حسب ما هو مكتوب في ملف المريض." },
                { en: "Once per day when a client is stable.", ar: "ج. مرة واحدة يومياً إذا كانت حالة المريض مستقرة." },
                { en: "At least every 4 hours when one or more vital signs is abnormal.", ar: "د. على الأقل كل أربعة ساعات عندما يكون علامة حيوية واحدة أو أكثر غير طبيعية." },
                { en: "Every 5 to 15 minutes when a client is unstable such as after surgery.", ar: "هـ. كل 5 إلى 15 دقيقة عندما تكون حالة المريض غير مستقرة، مثلاً بعد العملية." },
                { en: "When a client is feeling unusual.", ar: "و. عندما يشعر المريض بأنه غير طبيعي." },
                { en: "Before, during, and after blood transfusion.", ar: "ز. قبل وأثناء وبعد نقل الدم." }
              ]
            }
          ]
        },

        {
          id: "4-temperature",
          heading: "درجة حرارة الجسم — Body Temperature",
          body: [
            {
              type: "bilingual",
              en: "Refers to the warmth of the human body.",
              ar: "هي دفء جسم الإنسان."
            },
            {
              type: "bilingual",
              en: "I. Shell temperature: The warmth at the skin surface.",
              ar: "I. حرارة الجسم السطحية: هو الدفء الذي يكون على سطح الجلد."
            },
            {
              type: "bilingual",
              en: "II. Core temperature: The warmth in deeper sites within the body like the brain and heart.",
              ar: "II. حرارة الجسم الداخلية: هو دفء الأماكن العميقة داخل الجسم مثل الدماغ والقلب."
            },
            {
              type: "bilingual",
              en: "Shell temperature is usually lower than core temperature.",
              ar: "حرارة الجسم السطحية في العادة أقل من حرارة الجسم الداخلية."
            }
          ]
        },

        {
          id: "4-normal-temp",
          heading: "الحرارة الطبيعية — Normal Body Temperature",
          body: [
            {
              type: "highlight",
              en: "Normal shell temperature generally ranges from 35.8°C to 37.4°C.",
              ar: "معدل حرارة الجسم الطبيعي يتراوح من 35.8 إلى 37.4 درجة مئوية. ⭐ يجب حفظ هذا الرقم!"
            },
            {
              type: "term",
              en: "Hypothalamus",
              ar: "تحت المهاد",
              phonetic: "ˌhaɪpəʊˈθæləməs",
              def_en: "A structure within the brain that regulates body temperature.",
              def_ar: "هي غدة موجودة داخل الدماغ، مسؤولة عن تنظيم حرارة الجسم."
            }
          ]
        },

        {
          id: "4-temp-sites",
          heading: "أماكن قياس درجة الحرارة — Assessment Sites",
          body: [
            {
              type: "numbered-bilingual",
              items: [
                {
                  en: "Oral site: Duration 3–5 minutes. Contraindications: uncooperative patients, unconscious, very young, oral surgery, mouth breathers, prone to seizure.",
                  ar: "1. الفم (Oral): المدة 3–5 دقائق. موانع الاستخدام: المرضى الغير متعاونين، فاقد الوعي، الطفل الصغير، عمليات في الفم، يتنفس من الفم، التشنجات."
                },
                {
                  en: "Rectal site: Most accurate site for children. 0.5°C over oral. Duration: 1 minute. Embarrassing for patient.",
                  ar: "2. الشرج (Rectal): من أكثر الأماكن دقة خاصة عند الأطفال. أكبر من الفم بـ 0.5 درجة. المدة: دقيقة واحدة. يسبب إحراجاً للمريض."
                },
                {
                  en: "Axillary site (under arm): 0.5°C lower than oral. Best site for adults, infants and newborns. Accessible, safe, low infection, low embarrassing. Duration: 3–5 minutes.",
                  ar: "3. الإبط (Axillary): أقل من حرارة الفم بـ 0.5 درجة. أفضل مكان للبالغين والرضع والمواليد الجدد. سهل الوصول، آمن، احتمالية نقل العدوى قليل، أقل إحراجاً. المدة: 3–5 دقائق."
                },
                {
                  en: "The Ear (Tympanic Membrane): More reliable than oral and axilla. More fast. Duration: seconds.",
                  ar: "4. الأذن (طبلة الأذن): أكثر دقة (وثوقاً) من الفم والإبط. الأكثر سرعة. المدة: ثواني."
                },
                {
                  en: "Forehead (Temporal artery): Requires electronic equipment. Safe, fast. Non accurate. Duration: seconds.",
                  ar: "5. الجبهة (الشريان التمبوراني): يحتاج جهاز الكتروني. آمن وسريع. غير دقيق. المدة: ثواني."
                }
              ]
            }
          ]
        },

        {
          id: "4-temp-notes",
          heading: "ملاحظات مهمة في توثيق الحرارة — Documentation Notes",
          body: [
            {
              type: "bilingual",
              en: "When measuring temperature from Mouth: document it without changing.",
              ar: "عند قياس درجة الحرارة عن طريق الفم تبقى القراءة كما هي."
            },
            {
              type: "bilingual",
              en: "When measuring temperature from Axilla or Forehead: add 0.5°C (+0.5).",
              ar: "عند قياس درجة الحرارة عن طريق الإبط أو جبهة الرأس يتم إضافة نصف درجة. (+0.5)"
            },
            {
              type: "bilingual",
              en: "When measuring temperature from Rectum or Ear: subtract 0.5°C (−0.5).",
              ar: "عند قياس درجة الحرارة عن طريق فتحة الشرج أو الأذن يتم خصم نصف درجة. (−0.5)"
            },
            {
              type: "bilingual",
              en: "Example 1: When measuring Mohammed's temperature from Axilla and the reading was 36.6, the true temperature is 37.1 (36.6 + 0.5 = 37.1), record it in the patient file as 37.1.",
              ar: "مثال 1: عند قياس درجة حرارة محمد عن طريق الإبط وكانت القراءة 36.6، فإن درجة الحرارة الحقيقية لمحمد هي 37.1 ويتم تسجيلها في ملف المريض 37.1."
            },
            {
              type: "bilingual",
              en: "Example 2: When measuring Omar's temperature from Rectum and the reading was 37.4, the true temperature is 36.9 (37.4 − 0.5 = 36.9), record it in the patient file as 36.9.",
              ar: "مثال 2: عند قياس درجة حرارة عمر عن طريق فتحة الشرج وكانت القراءة 37.4، فإن درجة الحرارة الحقيقية لعمر هي 36.9 ويتم تسجيلها في ملف المريض 36.9."
            }
          ]
        }
      ],

      vocab: [
        { en: "Hygiene",                ar: "الهايجين / النظافة الشخصية",     ph: "ˈhaɪdʒiːn" },
        { en: "Bathing",                ar: "الاستحمام",                        ph: "ˈbeɪðɪŋ" },
        { en: "Partial bathing",        ar: "الاستحمام الجزئي",                ph: "ˈpɑːʃəl ˈbeɪðɪŋ" },
        { en: "Bed bath",               ar: "الاستحمام على السرير",            ph: "bed bæθ" },
        { en: "Shaving",                ar: "الحلاقة",                         ph: "ˈʃeɪvɪŋ" },
        { en: "Oral hygiene",           ar: "نظافة الفم",                      ph: "ˈɔːrəl ˈhaɪdʒiːn" },
        { en: "Dentures",               ar: "طقم الأسنان",                    ph: "ˈdentʃərz" },
        { en: "Aspiration",             ar: "الاختناق / الشهيق",              ph: "ˌæspɪˈreɪʃən" },
        { en: "Sebum",                  ar: "الزيت الطبيعي للجلد",            ph: "ˈsiːbəm" },
        { en: "Vital signs",            ar: "العلامات الحيوية",                ph: "ˈvaɪtəl saɪnz" },
        { en: "Body temperature",       ar: "درجة حرارة الجسم",               ph: "ˈbɒdi ˈtempərətʃər" },
        { en: "Shell temperature",      ar: "حرارة الجسم السطحية",            ph: "ʃel ˈtempərətʃər" },
        { en: "Core temperature",       ar: "حرارة الجسم الداخلية",           ph: "kɔːr ˈtempərətʃər" },
        { en: "Hypothalamus",           ar: "تحت المهاد (منظم الحرارة)",      ph: "ˌhaɪpəʊˈθæləməs" },
        { en: "Oral site",              ar: "قياس الحرارة من الفم",           ph: "ˈɔːrəl saɪt" },
        { en: "Rectal site",            ar: "قياس الحرارة من الشرج",          ph: "ˈrektəl saɪt" },
        { en: "Axillary site",          ar: "قياس الحرارة من الإبط",          ph: "ækˈsɪlərɪ saɪt" },
        { en: "Tympanic membrane",      ar: "طبلة الأذن",                     ph: "tɪmˈpænɪk ˈmembreɪn" },
        { en: "Temporal artery",        ar: "الشريان التمبوراني (الجبهة)",    ph: "ˈtempərəl ˈɑːtərɪ" },
        { en: "Blood pressure",         ar: "ضغط الدم",                       ph: "blʌd ˈpreʃər" },
        { en: "Pulse",                  ar: "النبض",                          ph: "pʌls" },
        { en: "Respiratory rate",       ar: "معدل التنفس",                    ph: "ˈrespərətri reɪt" },
        { en: "Pain",                   ar: "الألم",                          ph: "peɪn" }
      ],

      quiz: [
        { q: "ما تعريف الهايجين (Hygiene)؟", o: ["عملية التعقيم الكامل", "الممارسات التي تُعزز الصحة من خلال النظافة الشخصية", "غسل اليدين فقط", "الاستحمام اليومي"], c: 1, ex: "Hygiene = هي الممارسات التي تُعزز الصحة من خلال النظافة الشخصية." },
        { q: "ما هو الـ Bed Bath ولمن يُستخدم؟", o: ["حمام في البانيو للجميع", "الاستحمام على السرير يستخدم للمرضى العاجزين أو فاقدي الوعي", "الاستحمام الجزئي", "غسل الجسم بالكحول"], c: 1, ex: "Bed bath = الاستحمام على السرير: يستخدم فقط للمرضى العاجزين أو فاقدي الوعي." },
        { q: "كم عدد العلامات الحيوية (Vital Signs)؟", o: ["3", "4", "5", "6"], c: 2, ex: "يوجد خمسة علامات حيوية هامة: درجة الحرارة، النبض، معدل التنفس، ضغط الدم، والألم." },
        { q: "ما هو المعدل الطبيعي لحرارة الجسم؟", o: ["34–35°C", "35.8–37.4°C", "38–39°C", "37–40°C"], c: 1, ex: "معدل حرارة الجسم الطبيعي يتراوح من 35.8 إلى 37.4 درجة مئوية." },
        { q: "ما هي الغدة المسؤولة عن تنظيم حرارة الجسم؟", o: ["الغدة الدرقية", "الغدة الكظرية", "تحت المهاد (Hypothalamus)", "الغدة النخامية"], c: 2, ex: "Hypothalamus (تحت المهاد) = هي غدة موجودة داخل الدماغ، مسؤولة عن تنظيم حرارة الجسم." },
        { q: "أي موضع لقياس الحرارة يُضاف له 0.5 درجة عند التوثيق؟", o: ["الفم", "الشرج", "الإبط والجبهة", "الأذن"], c: 2, ex: "عند قياس الحرارة عن طريق الإبط أو الجبهة يتم إضافة (+0.5°C)." },
        { q: "درجة حرارة محمد من الإبط = 36.6. ما هي الحرارة الحقيقية؟", o: ["36.1", "36.6", "37.1", "37.6"], c: 2, ex: "36.6 + 0.5 = 37.1 هي الحرارة الحقيقية التي تُسجَّل في ملف المريض." },
        { q: "أي موضع لقياس الحرارة يُطرح منه 0.5 درجة؟", o: ["الفم والإبط", "الشرج والأذن", "الجبهة فقط", "الفم فقط"], c: 1, ex: "عند قياس الحرارة عن طريق الشرج أو الأذن يتم خصم (−0.5°C)." },
        { q: "ما أهمية منع الاختناق (Prevents aspiration) أثناء نظافة الفم؟", o: ["لمنع تلوث الأدوات", "مهم جداً خاصاً للمرضى فاقدي الوعي لمنع دخول السوائل للرئتين", "لتسهيل التنظيف", "لا أهمية خاصة"], c: 1, ex: "منع الاختناق ضروري جداً أثناء نظافة الفم وخاصاً للمرضى فاقدي الوعي لأن السوائل قد تدخل للرئتين." },
        { q: "ما هي درجة حرارة الماء المناسبة للـ Bed Bath؟", o: ["20–25°C", "30–35°C", "43–46°C", "50–55°C"], c: 2, ex: "يتم إملاء الوعاء بكمية كافية من الماء الدافئ بين 43–46 درجة مئوية." }
      ]
    },

    // ════════════════════════════════════════════════════════
    // CHAPTER 5 — COMING SOON
    // ════════════════════════════════════════════════════════
    {
      id: 5,
      title: "الفصل الخامس — قريباً",
      titleEn: "Chapter 5 — Coming Soon",
      icon: "📚",
      accent: "#a78bfa",
      dark:   "#150d2a",
      slides: [],
      vocab: [],
      quiz: []
    }
  ]
};

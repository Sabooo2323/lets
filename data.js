/* ============================================================
   QAZAQ DÜNIESI — content data
   All learning content lives here so it is easy to edit.
   ============================================================ */

/* The title ladder. One rung is earned per completed module.
   Index 0 is the starting rank; each gender has its own suffix. */
const TITLES = [
  { m: "bala",            f: "qyz",              gloss: "newcomer" },
  { m: "şәkirt",          f: "şәkirt",           gloss: "student" },
  { m: "batyr",           f: "batyr qyz",        gloss: "brave one" },
  { m: "bi",              f: "bike",             gloss: "sage" },
  { m: "sal-seri",        f: "sal-seri",         gloss: "wandering artist" },
  { m: "jyrau",           f: "jyrau",            gloss: "epic bard" },
  { m: "batyr jyrau",     f: "batyrhanşa jyrau", gloss: "legend" }
];

/* Module 0 — the nine sounds that trip up foreigners. */
const SOUNDCHECK = [
  { cyr:"Ә ә", lat:"Ä",  hack:'Like the "a" in "Cat" or "Map"',           trick:'Open your mouth wide like a flat "ah", but say "eh".',       word:"Әке",       en:"Father",    say:"Әке" },
  { cyr:"Ғ ғ", lat:"Ğ",  hack:'A French / German gargled "R"',            trick:'A deep, throaty "G". Imagine gently gargling water.',        word:"Ғарыш",     en:"Space",     say:"Ғарыш" },
  { cyr:"Қ қ", lat:"Q",  hack:'A deep "K" from the back of the throat',   trick:"Push the very back of your tongue against the soft palate.", word:"Қазақстан", en:"Kazakhstan",say:"Қазақстан" },
  { cyr:"Ң ң", lat:"Ñ",  hack:'Like the "ng" in "Sing" or "Ring"',        trick:'Do not pronounce the "g". Keep it purely nasal.',           word:"Менің",     en:"My",        say:"Менің" },
  { cyr:"Ө ө", lat:"Ö",  hack:'Like the "i" in "Bird" or "u" in "Fur"',   trick:'Purse your lips as if saying "O", but try to say "Eh".',     word:"Өте",       en:"Very",      say:"Өте" },
  { cyr:"Ү ү", lat:"Ü",  hack:'Like the "u" in "Flute", but softer',      trick:"Tighten your lips into a small circle, push the sound out.", word:"Үлкен",     en:"Big",       say:"Үлкен" },
  { cyr:"Ұ ұ", lat:"Ū",  hack:'Like the "oo" in "Book" or "Look"',        trick:'A short, hollow "uh-oo" made deep in the chest.',            word:"Ұл",        en:"Son",       say:"Ұл" },
  { cyr:"І і", lat:"I",  hack:'Like the "i" in "Pin" or "Sit"',           trick:"A very short, crisp, relaxed vowel.",                        word:"Кітап",     en:"Book",      say:"Кітап" },
  { cyr:"Һ һ", lat:"H",  hack:'A soft, exhaled "H" as in "Hello"',        trick:"Pure breath. Rare — mostly in Arabic loan words.",           word:"Гауһар",    en:"Diamond",   say:"Гауһар" }
];

/* The five culture modules. Each card:
   kk = Kazakh (Cyrillic), lat = Latin, pron = pronunciation, en = meaning,
   note = Sulu's cultural commentary. */
const MODULES = [
  {
    id: 1,
    key: "tanysu",
    icon: "🤝",
    titleKk: "Танысу",
    titleLat: "Tanysu",
    titleEn: "Introduction",
    theme: "Nomad hospitality & first steps",
    wisdomKk: "Өнер алды — қызыл тіл",
    wisdomEn: "The head of all arts is an eloquent tongue.",
    cards: [
      { kk:"Сәлеметсіз бе!", lat:"Sälemetsiz be!", pron:"Sah-lem-et-síz beh!", en:"Hello! (polite)", note:"The universal key to any Kazakh heart. Say it with a smile." },
      { kk:"Қош келдіңіз!", lat:"Qoş keldiñiz!", pron:"Khosh kel-díng-iz!", en:"Welcome!", note:"What every guest hears when entering a yurt or a Kazakh home." },
      { kk:"Менің атым…", lat:"Meniñ atym…", pron:"Me-níng ah-tym…", en:"My name is…", note:"I'll remember this to upgrade your title later!" },
      { kk:"Танысқаныма қуаныштымын.", lat:"Tanysqanyma quanyştymyn.", pron:"Ta-nys-kha-ny-ma kua-nysh-ty-myn.", en:"Nice to meet you.", note:'Literally: "I am happy that we got acquainted."' },
      { kk:"Қалайсыз?", lat:"Qalaysyz?", pron:"Kha-lai-syz?", en:"How are you?", note:"Short, polite, and essential for starting small talk." },
      { kk:"Жақсы, рақмет!", lat:"Jaqsy, raqmet!", pron:"Zhakh-sy, rakh-met!", en:"Good, thank you!", note:'"Raqmet" is one of the most beautiful words. Use it often.' }
    ]
  },
  {
    id: 2,
    key: "jol",
    icon: "🚕",
    titleKk: "Жол жүру",
    titleLat: "Jol jürü",
    titleEn: "Taxi & Navigation",
    theme: "Steppe nomads in the modern jungle",
    wisdomKk: "Жол мұраты — жету",
    wisdomEn: "The purpose of a journey is to reach the destination.",
    cards: [
      { kk:"Қайда барасыз?", lat:"Qaida barasyz?", pron:"Khai-da ba-ra-syz?", en:"Where are you going?", note:"What the taxi driver will ask you first." },
      { kk:"Маған … керек.", lat:"Mağan … kerek.", pron:"Ma-ghan … ke-rek.", en:"I need to go to…", note:'Insert "Arbat", "Mega", or "Baiterek" in the blank!' },
      { kk:"Қанша болады?", lat:"Qanşa bolady?", pron:"Khan-sha bo-la-dy?", en:"How much will it be?", note:'The golden phrase for old-school "street" taxis.' },
      { kk:"Сәл арзандау бола ма?", lat:"Säl arzandau bola ma?", pron:"Sal ar-zan-dau bo-la ma?", en:"Can it be a bit cheaper?", note:"Gentle bargaining is an art form. I approve!" },
      { kk:"Осында тоқтаңызшы.", lat:"Osynda toqtañyzşy.", pron:"O-syn-da tokh-tang-yz-shy.", en:"Please stop here.", note:'The "-shy" ending makes the request softer and polite.' },
      { kk:"Жолыңыз болсын!", lat:"Jolyñyz bolsyn!", pron:"Zho-lyng-yz bol-syn!", en:"Have a safe journey!", note:"A classic blessing for travellers. Say it to your driver." }
    ]
  },
  {
    id: 3,
    key: "tamaq",
    icon: "🍵",
    titleKk: "Тамақ ішу",
    titleLat: "Tamaq işu",
    titleEn: "Food & Dastarkhan",
    theme: "The sacred law of hospitality",
    wisdomKk: "Қонақасы — қонақтың ақысы",
    wisdomEn: "Feeding the guest is the guest's rightful due.",
    cards: [
      { kk:"Ас дәмді болсын!", lat:"As dämdi bolsyn!", pron:"As dam-dí bol-syn!", en:"Bon appétit!", note:'Literally: "May the food be delicious!"' },
      { kk:"Шай ішіңіз!", lat:"Şai işiñiz!", pron:"Shai i-shíng-iz!", en:"Drink some tea!", note:'The ultimate Kazakh command. Saying "no" is not an option!' },
      { kk:"Мәзірді әкеліңізші.", lat:"Mäzirdi äkeliñizşi.", pron:"Ma-zir-dí a-ke-líng-iz-shi.", en:"Please bring the menu.", note:"Essential for ordering in modern cafés and restaurants." },
      { kk:"Ет бар ма?", lat:"Et bar ma?", pron:"Et bar ma?", en:"Is there meat?", note:"A crucial question — Kazakh cuisine is a meat lover's paradise." },
      { kk:"Өте дәмді екен!", lat:"Öte dämdi eken!", pron:"Ö-te dam-dí e-ken!", en:"It is very delicious!", note:"Complimenting the host unlocks maximum respect." },
      { kk:"Шотты әкеліңізші.", lat:"Şotty äkeliñizşi.", pron:"Shot-tý a-ke-líng-iz-shi.", en:"Please bring the bill.", note:"Time to pay for that mountain of besbarmaq and baursaqs!" }
    ]
  },
  {
    id: 4,
    key: "densaulyq",
    icon: "🩺",
    titleKk: "Денсаулық",
    titleLat: "Densaulyq",
    titleEn: "Doctor & Well-being",
    theme: "Health is the ultimate wealth",
    wisdomKk: "Бірінші байлық — денсаулық",
    wisdomEn: "The first wealth is health.",
    cards: [
      { kk:"Ауырып тұрмын.", lat:"Auyryp tūrmyn.", pron:"Au-y-ryp tūr-myn.", en:"I feel unwell.", note:"Use this phrase to let others know you need help." },
      { kk:"Басым ауырып тұр.", lat:"Basym auyryp tūr.", pron:"Ba-sym au-y-ryp tūr.", en:"My head hurts.", note:"Perfect for when Almaty's changing weather hits you." },
      { kk:"Дәріхана қайда?", lat:"Därihana qaida?", pron:"Da-ri-kha-na khai-da?", en:"Where is the pharmacy?", note:'"Hana" means place; "däri" means medicine.' },
      { kk:"Жедел жәрдем шақырыңызшы!", lat:"Jedel järdem şaqyryñyzşy!", pron:"Zhe-del zhär-dem sha-khy-ryng-yz-shy!", en:"Please call an ambulance!", note:"An emergency phrase. Hopefully unused — but you must know it." },
      { kk:"Маған дәрі керек.", lat:"Mağan däri kerek.", pron:"Ma-ghan da-rí ke-rek.", en:"I need medicine.", note:"Show this to the pharmacist if you don't know the name." },
      { kk:"Ауырмаңыз!", lat:"Auyrmañyz!", pron:"Au-yr-mang-yz!", en:"Get well soon!", note:"I say this to comfort you if you slip up in the quiz!" }
    ]
  },
  {
    id: 5,
    key: "kundelikti",
    icon: "🛍️",
    titleKk: "Күнделікті өмір",
    titleLat: "Kündelikti ömir",
    titleEn: "Daily Life & Bazaar",
    theme: "The Green Bazaar & making friends",
    wisdomKk: "Жақсы сөз — жарым ырыс",
    wisdomEn: "A kind word is half of wealth.",
    cards: [
      { kk:"Бұл неше тұрады?", lat:"Būl neşe tūrady?", pron:"Būl ne-she tū-ra-dy?", en:"How much does this cost?", note:"The key phrase for the Green Bazaar (Kök Bazar)." },
      { kk:"Көмектесе аласыз ба?", lat:"Kömektese alasyz ba?", pron:"Kö-mek-te-se a-la-syz ba?", en:"Can you help me?", note:"Locals love helping foreigners who try to speak Kazakh!" },
      { kk:"Кешіріңіз!", lat:"Keşiriñiz!", pron:"Ke-shi-ríng-iz!", en:"Excuse me! / Sorry!", note:"Use it to get attention in a crowd, or to apologise." },
      { kk:"Түсінбедім.", lat:"Tüsinbedim.", pron:"Tü-sin-be-dim.", en:"I didn't understand.", note:"It's completely okay not to understand at first." },
      { kk:"Қайталайсыз ба?", lat:"Qaitalaisyz ba?", pron:"Khai-ta-lai-syz ba?", en:"Could you repeat that?", note:"Great for when someone speaks a little too fast." },
      { kk:"Сау болыңыз!", lat:"Sau bolyñyz!", pron:"Sau bo-lyng-yz!", en:"Goodbye!", note:'Literally: "Be healthy!" A warm way to part.' }
    ]
  }
];

/* The Wisdom Mirror — proverbs Sulu shares to soften a mistake. */
const WISDOM_MIRROR = [
  { kk:"Оқу инемен құдық қазғандай.", en:"Learning is like digging a well with a needle — slow, but every word counts." },
  { kk:"Алтау ала болса, ауыздағы кетеді; төртеу түгел болса, төбедегі келеді.", en:"When focus is scattered, it slips away; when it is united, success comes down to you. Let's unite your focus!" },
  { kk:"Сабыр түбі — сары алтын.", en:"At the bottom of patience lies pure gold. Try once more." },
  { kk:"Еңбек етсең ерінбей, тояды қарның тіленбей.", en:"Work without laziness, and reward comes on its own." },
  { kk:"Білім — таусылмайтын кен.", en:"Knowledge is a mine that never runs out. Keep digging!" }
];

/* Suyunshi — the celebratory good-news lines. */
const SUYUNSHI_TIPS = [
  "Did you know? Guests in a Kazakh home are seated at the törmen — the place of honour, far from the door.",
  "A baby's first 40 days are celebrated with shildehana. Community is everything here.",
  "The dombyra you're hearing has just two strings — yet it carries a whole steppe of feeling.",
  "Tūsau keser is the 'cutting of the ties' ceremony, so a child will walk through life freely.",
  "Black tea with milk and a mountain of baursaqs is the true welcome of the steppe."
];

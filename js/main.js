// お問い合わせフォーム（Googleフォーム）のURL。
// URL変更時はここだけ直せばよいが、JS無効環境でもリンクが機能する必要があるため
// HTML側の href にも実URLを書いてある（このJSはあくまで上書き＝一元管理用）。
const CONTACT_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdSFUZ3bPy-wpLt6_KpEXGRpiyg-IPfHSIgzPI_nJzWggIOJw/viewform";

// ペルソナ別コピー・アクセントカラー
// 出典: ../personas_TwoFiveCreate.json
const PERSONAS = {
  bizCompany: {
    label: "事業会社様",
    accentColor: "#2e2e2e"
  },
  partner: {
    label: "制作パートナーをお探しの方",
    accentColor: "#2e2e2e"
  },
  aiOps: {
    label: "AI業務改善をお考えの方",
    accentColor: "#2f6f6f"
  }
};

// ターゲット別FAQ（出典: doc/TwoFiveCreate_FAQ_Branch.md）
const FAQS = {
  bizCompany: [
    { q: "専門的なWebの知識が全くないのですが、依頼しても大丈夫でしょうか？", a: "はい、全く問題ありません。「何に困っているか」「どうなっていきたいか」といったビジネスの課題を分かりやすい言葉でヒアリングし、最適なWebサイトの形をご提案いたします。" },
    { q: "一般的な制作会社や、他のフリーランスと何が違うのですか？", a: "制作会社のような「関わる人数が多いことによる伝達ミスやコスト増」がなく、一般的なフリーランスには少ない「インフラから構築・AI活用までの幅広い堅実な技術力」を併せ持っている点です。小回りが利きつつ、安心してお任せいただける体制が強みです。" },
    { q: "制作費用の目安を教えてください。", a: "独自のAIフローを活用したワークフローにより、無駄な作業コストを削減し、「高品質×適正価格」を実現しております。サイトの規模や機能によって変動するため、まずはお気軽に無料お見積りをご依頼ください。" },
    { q: "サイトが完成するまでの期間はどのくらいですか？", a: "一般的なコーポレートサイトで1〜2ヶ月程度が目安ですが、お急ぎの場合はご相談ください。" },
    { q: "サーバーやドメインの契約など、面倒な手続きもお願いできますか？", a: "はい、丸ごとお任せください。「インフラ・サーバー構築」もサポート範囲に含まれております。取得代行から安全な公開作業まで一貫して引き受けますので、専任のWeb担当者がいらっしゃらない企業様もご安心ください。" },
    { q: "納品後、自分たちでブログや新着情報を更新することは可能ですか？", a: "はい、可能です。WordPressなどのCMS（コンテンツ管理システム）を導入し、専門知識がなくても簡単にお知らせやコンテンツを更新できる環境を構築いたします。" },
    { q: "サイト公開後のサポート（保守・運用）はありますか？", a: "当方では「公開後が本当のスタート」と考えております。定期的なメンテナンスやセキュリティ対策、アクセス状況を踏まえた改善提案など、お客様の「専属Webエンジニア」として長期的に伴走いたします。" },
    { q: "サイト全体のリニューアルか、一部の改修かで迷っています。", a: "現状のサイトを分析させていただき、コストと効果のバランスから最適なプランをご提案します。小規模なカスタマイズや機能追加などのスポット対応も柔軟に承っております。" },
    { q: "遠方（他県）からの依頼でも対応可能でしょうか？", a: "はい、全国どこからでもご依頼可能です。ZoomやGoogle Meetなどのオンライン会議ツールを活用し、対面と変わらないスムーズなコミュニケーションでプロジェクトを進行いたします。" },
    { q: "相談や見積もりにお金はかかりますか？", a: "いいえ、ご相談およびお見積りは完全に無料です。「こんなことができるかな？」といったふんわりとした段階でも構いませんので、まずはお気軽にお問い合わせください。" }
  ],
  partner: [
    { q: "どのようなデザインデータからのコーディングに対応していますか？", a: "Figma、Adobe XD、Photoshop、Illustratorなど、主要なデザインツールのデータに幅広く対応しております。「フロントエンド・コーディング」の確かな技術力で、デザインの意図を正確に再現します。" },
    { q: "デザインの再現性（ピクセルパーフェクト）やレスポンシブ対応はお任せできますか？", a: "はい、お任せください。デザインを崩さない正確なコーディングはもちろん、スマートフォンやタブレットでの閲覧時（レスポンシブ）の「よしなな調整」や、美しい余白・アニメーションの実装を得意としております。" },
    { q: "急な案件や、スケジュールの厳しい短納期の案件でも相談可能ですか？", a: "独自のAIフローを活用した超速な開発体制と、個人事業ならではの柔軟性を活かし、可能な限り対応させていただきます。リソース状況にもよりますので、まずはお急ぎの旨をご連絡ください。" },
    { q: "コーディング済みのHTMLデータから、WordPress化のみをお願いすることはできますか？", a: "はい、喜んで承ります。静的サイトのWordPress組み込みや、既存テーマのカスタマイズ、カスタムフィールド・カスタム投稿タイプを用いた複雑なデータ構造の構築も得意としております。" },
    { q: "複雑なJavaScriptの実装や、動きのあるサイトも対応可能ですか？", a: "対応可能です。最新の技術スタックとAIコーディング支援を組み合わせることで、リッチなアニメーションや動的UIの構築も、スピーディかつ安定した品質でご提供します。" },
    { q: "GitHubやBacklogなど、指定のツールでの進行・管理は可能ですか？", a: "はい、貴社のワークフローや指定ツール（GitHub、Backlog、Chatwork、Slack等）に合わせた柔軟な連携が可能です。Gitを用いたバージョン管理やチーム開発の経験も豊富にございます。" },
    { q: "テストアップや本番サーバーへの公開作業も対応してもらえますか？", a: "ご要望に応じて、当方のテストサーバーでの確認環境の構築から、クライアント様指定の本番サーバーへのデプロイ（公開作業）、SSL設定などのインフラ周りまで一貫して対応可能です。" },
    { q: "ランディングページ（LP）1本や、下層1ページのみの単発依頼でも良いですか？", a: "はい、規模の大小は問いません。LPのコーディングや、既存サイトへのページ追加など、スポットでの制作リソース不足を解消するパートナーとしてご活用ください。" },
    { q: "納品後、クライアントチェック時の修正対応はどのように行われますか？", a: "検収時の修正依頼には、速やかに対応いたします。「作って終わり」ではなく、公開完了まで責任を持ってサポートする体制を整えております。" },
    { q: "案件が発生する前の事前面談や、概算費用の相談は可能ですか？", a: "大歓迎です。今後のパートナーシップに向けた事前のオンライン面談や、要件定義前のフワッとした状態での概算見積もり・技術的な実現性の壁打ちなど、いつでも無料で対応いたします。" }
  ],
  aiOps: [
    { q: "AIを導入したいのですが、何から始めればいいか分かりません。", a: "まずは「日々の業務で面倒だと感じていること」や「時間がかかっている作業」をお聞かせください。15年以上様々なWebの現場を見てきた経験から、貴社の業務課題を紐解き、AIで効率化できるポイントを具体的にご提案します。" },
    { q: "大規模なシステム開発になりそうで費用が心配です。", a: "ご安心ください。当方ではDifyやMakeといったノーコード/ローコードツールとAPIを連携させることで、大規模なシステム開発を介さず「スモールスタート」で効果を検証できる、適正価格のAIソリューションをご提供します。" },
    { q: "具体的にどのような業務をAIで自動化・効率化できますか？", a: "サイトへの問い合わせへの自動応答（AIチャットボット構築）、社内ドキュメントを学習させた社内FAQシステムの構築、定型文の自動生成、データ入力や集計の自動化など、多岐にわたる課題解決が可能です。" },
    { q: "社内にAIに詳しい担当者がいなくても運用できますか？", a: "はい、可能です。「作って終わり」ではなく、専門知識がなくても現場の皆様が直感的に使えるUI（管理画面やチャットツール連携）で構築し、社内定着までしっかりサポートいたします。" },
    { q: "現在使っている社内ツール（SlackやChatworkなど）とAIを連携できますか？", a: "APIが提供されているツールであれば、多くの場合連携が可能です。普段お使いのSlackやLINEからAIに指示を出し、結果を受け取るといった、業務フローに溶け込む形での実装をご提案します。" },
    { q: "機密情報や顧客データをAIに入力する際のセキュリティが不安です。", a: "企業向けのAPI利用（学習データとして利用されない設定）や、セキュアな環境でのプロンプト管理など、情報漏洩リスクを抑えた安全なAI環境の構築を前提として進行いたしますのでご安心ください。" },
    { q: "AI導入の相談だけでなく、既存のWebサイトとの連携も頼めますか？", a: "はい、Webエンジニアとしての知見を活かした「Web×AI」の連携が当方の最大の強みです。既存のWordPressサイトへのAI機能の組み込みや、AIを活用した新しいWebサービスの立ち上げなど、シームレスに対応いたします。" },
    { q: "相談から実際にAIツールが使えるようになるまでの期間は？", a: "課題の内容によりますが、シンプルな自動化フローやチャットボットであれば、数週間〜1ヶ月程度でのPoC（概念実証・テスト導入）が可能です。超速な体制で、いち早く効果を実感していただけます。" },
    { q: "システム開発は不要で、AI活用のアドバイスやコンサルティングだけをお願いできますか？", a: "はい、承っております。現状の業務フローの分析、導入すべきAIツールの選定、プロンプトエンジニアリングの社内向けレクチャーなど、アドバイザーとしてのスポット参画も可能です。" },
    { q: "まずは話だけ聞いてみたいのですが、相談は無料ですか？", a: "はい、ご相談は完全に無料です。業務の現状や抱えているお悩みをお伺いするだけでも、解決の糸口が見つかることが多いです。ぜひお気軽にお問い合わせフォームよりご連絡ください。" }
  ]
};

const DEFAULT_PERSONA = "bizCompany";

// --- 安全なDOM取得ヘルパー ---
// HTML側の要素が将来のマークアップ変更で無くなっても、そこだけ機能をスキップして
// 以降のスクリプト全体が停止しないようにする（黙って握りつぶすのではなく、コンソールに警告を出す）
function byId(id) {
  const el = document.getElementById(id);
  if (!el) console.warn(`[main.js] #${id} が見つかりません。関連機能はスキップされます。`);
  return el;
}
function on(id, type, handler) {
  const el = byId(id);
  if (el) el.addEventListener(type, handler);
  return el;
}

// スクロール連動フェードイン：画面に入ったら .is-visible を付与し、以降は監視解除
// （FAQのようにJSで後から要素を追加するケースもあるため、observeReveal経由で個別に登録できるようにしておく）
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
function observeReveal(el) {
  revealObserver.observe(el);
}

// PC版ヘッダー（常時表示になった.site-nav）に、現在表示中のセクションのマーカーを付けるスクロールスパイ。
// モバイルのドロワー(.drawer)は対象外（今までどおりハンバーガー開閉のみ）。
// rootMarginで画面中央付近だけを判定帯にすることで、常にどこか1つだけがアクティブになるようにしている
const navSpyLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
if (navSpyLinks.length) {
  const navSpyMap = new Map();
  navSpyLinks.forEach((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) navSpyMap.set(target, link);
  });
  const navSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeLink = navSpyMap.get(entry.target);
      if (!activeLink) return;
      navSpyLinks.forEach((l) => l.classList.toggle("is-active", l === activeLink));
    });
  }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
  navSpyMap.forEach((_link, target) => navSpyObserver.observe(target));
}

function applyPersona(id) {
  const p = PERSONAS[id];
  if (!p) return;

  document.documentElement.style.setProperty("--accent", p.accentColor);

  // PERSONASの値は開発者が管理する静的なコピー（外部入力を含まない）なので、
  // <br>などのタグをそのまま反映できるよう innerHTML で差し込む（textContentだとタグが文字として表示されてしまう）
  const personaBadge = byId("personaBadge");
  if (personaBadge) {
    personaBadge.innerHTML = p.label;
    personaBadge.hidden = false;
  }

  // コピー類は全ペルソナ共通の固定文言なのでJSでは書き換えない。
  // ペルソナ差分はバッジ・アクセントカラー・FAQの内容で表現する。

  document.body.dataset.persona = id;
}

// ターゲット別FAQをアコーディオンとして描画する
// animate: true の初回表示時のみscroll-revealを付与し、ペルソナ切替時（false）は即表示にする
function renderFaq(id, { animate = false } = {}) {
  const list = byId("faqList");
  if (!list) return;
  const items = FAQS[id] || [];
  list.innerHTML = "";
  items.forEach((item) => {
    const details = document.createElement("details");
    details.className = animate ? "faq__item reveal" : "faq__item";

    const summary = document.createElement("summary");
    const qRow = document.createElement("span");
    qRow.className = "faq__item-q-row";
    const qBadge = Object.assign(document.createElement("span"), { className: "faq__q-badge", textContent: "Q", ariaHidden: "true" });
    const qText = Object.assign(document.createElement("span"), { className: "faq__item-question", textContent: item.q });
    qRow.append(qBadge, qText);
    summary.append(qRow);

    const answerWrap = document.createElement("div");
    answerWrap.className = "faq__item__answer";
    const aRow = document.createElement("div");
    aRow.className = "faq__item-a-row";
    const aBadge = Object.assign(document.createElement("span"), { className: "faq__a-badge", textContent: "A", ariaHidden: "true" });
    const aText = Object.assign(document.createElement("p"), { textContent: item.a });
    aRow.append(aBadge, aText);
    answerWrap.append(aRow);

    details.append(summary, answerWrap);
    list.appendChild(details);
    if (animate) observeReveal(details);
  });
}

// アコーディオン：<details>標準の瞬間開閉ではなく、中身の高さをアニメーションさせて開閉する
// （coding-notes.md 標準仕様11: このサイトのアコーディオンは必ずこの方式でスムーズ開閉させる）
// FAQとフローの工程詳細で共用するため、開閉する中身は第2引数のセレクタで指定する
function toggleDetails(details, panelSelector) {
  const answer = details.querySelector(panelSelector);
  if (!answer || details.classList.contains("is-animating")) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    details.open = !details.open;
    return;
  }

  const DURATION = 300;
  details.classList.add("is-animating");
  let done = false;
  const cleanup = (close) => {
    if (done) return;
    done = true;
    if (close) details.open = false;
    answer.style.height = "";
    answer.style.overflow = "";
    answer.style.transition = "";
    details.classList.remove("is-animating");
  };
  const finish = (close) => {
    answer.addEventListener("transitionend", function handler(e) {
      if (e.propertyName !== "height") return;
      answer.removeEventListener("transitionend", handler);
      cleanup(close);
    });
    // 保険：transitionendが来なくても必ず後始末する（来ないと is-animating が残り、
    // 以降のクリックが一切効かなくなるため）
    window.setTimeout(() => cleanup(close), DURATION + 120);
  };

  const animate = (from, to, close) => {
    answer.style.overflow = "hidden";
    answer.style.transition = "";
    answer.style.height = `${from}px`;
    // 開始値をここで確定させる。これが無いと開始と終了が1回の再計算にまとめられ、
    // 遷移が始まらず（＝transitionendも発火せず）高さが一瞬で変わってしまう
    void answer.offsetHeight;
    answer.style.transition = `height ${DURATION}ms ease`;
    answer.style.height = `${to}px`;
    finish(close);
  };

  if (details.open) {
    animate(answer.scrollHeight, 0, true);   // 閉じる：高さを0にしてから open属性を外す
  } else {
    details.open = true;                     // 開く：先にopenにして実サイズを測る
    animate(0, answer.scrollHeight, false);
  }
}

on("faqList", "click", (e) => {
  const summary = e.target.closest("summary");
  if (!summary) return;
  const details = summary.closest(".faq__item");
  if (!details) return;
  e.preventDefault();
  toggleDetails(details, ".faq__item__answer");
});

const appRoot = byId("appRoot");
let lastFocusedBeforeModal = null;

function showModal() {
  const modal = byId("personaModal");
  if (!modal) return;
  lastFocusedBeforeModal = document.activeElement;
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  if (appRoot) appRoot.inert = true;
  const firstOption = modal.querySelector(".persona-modal__option");
  if (firstOption) firstOption.focus();
}
function hideModal() {
  const modal = byId("personaModal");
  if (!modal) return;
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  if (appRoot) appRoot.inert = false;
  if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === "function") {
    lastFocusedBeforeModal.focus();
  }
  lastFocusedBeforeModal = null;
}

const FADE_DURATION = 250;
const SCROLL_FALLBACK_TIMEOUT = 800;

function switchPersonaWithTransition(id) {
  const main = document.querySelector("main");
  if (!main) {
    applyPersona(id);
    renderFaq(id);
    hideModal();
    return;
  }
  main.classList.add("persona-transition");

  const finishSwitch = () => {
    applyPersona(id);
    renderFaq(id);
    main.classList.remove("persona-transition");
    hideModal();
  };

  // すでにトップ付近ならスクロール待ちをせずフェードだけで切り替える
  if (window.scrollY < 4) {
    window.setTimeout(finishSwitch, FADE_DURATION);
    return;
  }

  let done = false;
  const onScrollEnd = () => {
    if (done) return;
    done = true;
    window.removeEventListener("scrollend", onScrollEnd);
    finishSwitch();
  };
  // scrollendが使えないブラウザ向けのフォールバック
  window.addEventListener("scrollend", onScrollEnd);
  window.setTimeout(onScrollEnd, SCROLL_FALLBACK_TIMEOUT);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ペルソナ切替機能：いったん無効化（差別化が薄く、早期公開のため）。
// HTML側のボタン・モーダルもコメントアウト済み。再開時は両方のコメントを外すだけでOK
// document.querySelectorAll(".persona-modal__option").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     switchPersonaWithTransition(btn.dataset.persona);
//   });
// });
//
// on("personaSkip", "click", hideModal);
// on("personaModalClose", "click", hideModal);
// on("personaModal", "click", (e) => {
//   if (e.target === e.currentTarget) hideModal();
// });
// on("switchPersona", "click", showModal);
// on("switchPersonaDrawer", "click", () => {
//   closeDrawer();
//   showModal();
// });

// お問い合わせリンクのURLを一元適用する。
// HTML側にも同じ実URLが書いてあるためJS無効でも機能する（ここは変更を1箇所に集約するための上書き）。
// このscriptはbody末尾で読み込まれDOM構築済みのため、DOMContentLoadedの待機は不要。
document.querySelectorAll("[data-contact-link]").forEach((el) => {
  el.href = CONTACT_URL;
});

// 初期表示：常にデフォルト（事業会社様）を適用してから、
// アンカー直接アクセス時はモーダルをスキップ、それ以外は毎回モーダルを表示する
// （Two-Faceの実演も兼ねるため、Lightwaveと異なりセッション内保持は行わない）
applyPersona(DEFAULT_PERSONA);
renderFaq(DEFAULT_PERSONA, { animate: true });
// ペルソナ切替機能：いったん無効化（早期公開のため、事業会社様向け表示に固定）。
// 再開時はコメントを外すだけでOK
// if (!location.hash) {
//   showModal();
// }

// スクロール連動フェードイン：画面に入ったら .is-visible を付与し、以降は監視解除
document.querySelectorAll(".reveal").forEach((el) => observeReveal(el));

// 制作フローのカード列：PCでもマウスドラッグで横スクロールできるようにする
// （タッチ操作はブラウザ標準のスクロールに任せるため、マウスの時だけドラッグを有効にする）
const flowStepsTrack = document.querySelector(".flow__steps-track");
if (flowStepsTrack) {
  let isDragging = false;
  let dragMoved = false;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;

  flowStepsTrack.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    isDragging = true;
    dragMoved = false;
    dragStartX = e.clientX;
    dragStartScrollLeft = flowStepsTrack.scrollLeft;
  });
  flowStepsTrack.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    if (!dragMoved) {
      // 4px以上動いて初めてドラッグとみなす。ここまでポインタを捕捉しないことで、
      // カード内のボタン（工程詳細の開閉）へのクリックを妨げない
      if (Math.abs(dx) <= 4) return;
      dragMoved = true;
      flowStepsTrack.classList.add("is-dragging");
      flowStepsTrack.setPointerCapture(e.pointerId);
    }
    flowStepsTrack.scrollLeft = dragStartScrollLeft - dx;
  });
  const endFlowDrag = () => {
    isDragging = false;
    flowStepsTrack.classList.remove("is-dragging");
  };

  // 工程の詳細テキストの開閉。どれか1つを押すと6枚すべてが同じ状態に揃う。
  // ドラッグでスライドさせた直後は開閉させない
  flowStepsTrack.addEventListener("click", (e) => {
    const summary = e.target.closest(".flow__step-toggle");
    if (!summary) return;
    e.preventDefault();
    if (dragMoved) return;
    const clicked = summary.closest(".flow__step-detail");
    if (!clicked) return;
    // 押されたカードの「次の状態」に、他のカードも合わせる
    const willOpen = !clicked.open;
    flowStepsTrack.querySelectorAll(".flow__step-detail").forEach((details) => {
      if (details.open !== willOpen) toggleDetails(details, ".flow__step-desc-wrap");
    });
  });
  flowStepsTrack.addEventListener("pointerup", endFlowDrag);
  flowStepsTrack.addEventListener("pointercancel", endFlowDrag);
  flowStepsTrack.addEventListener("pointerleave", endFlowDrag);
}

// 背景の図形・塗り要素のパララックス：スクロールに応じて縦方向にわずかにずらす
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const parallaxTargets = document.querySelectorAll("[data-parallax]");
if (parallaxTargets.length && !prefersReducedMotion) {
  const parallaxItems = Array.from(parallaxTargets).map((el) => ({
    el,
    speed: parseFloat(el.dataset.parallax) || 0.1,
    // data-parallax-x：横方向の追加ドリフト。符号で近い画面端への向きを指定
    // （負=左端へ、正=右端へ）。同じ縦方向の駆動値をスケールし直すだけなので
    // スクロール量に対して単調に増え、「少しずつ端へ寄っていく」動きになる
    speedX: parseFloat(el.dataset.parallaxX) || 0,
    // 要素が最初に計算対象になった時点のdrive値。これを基準に差分だけ動かすことで、
    // 表示され始めた瞬間はCSS通りの位置（オフセット0）になり、画面端から離れて
    // 見えるズレを防ぐ
    baseDrive: null,
    // baseDrive確定時点の「その要素の文書内の絶対位置」。あとで本当にレイアウトが
    // ズレた要素だけを検知して基準値を取り直すために使う（スクロール位置だけが
    // 違う状態で基準値を取り直すと、スクロールを戻した時に画面端から離れて見える
    // 原因になるため、単純なタイマーでの全件リセットはしない）
    baseDocTop: null
  }));
  let parallaxTicking = false;
  // 画像・Webフォントの読み込みでレイアウトが後から動くと、その前に取った基準値
  // （baseDrive）が古くなり、三角などが「開始位置で画面端から離れて見える」原因になる。
  // 読み込みが落ち着くまでは基準値を確定させない
  let parallaxReady = false;
  function updateParallax() {
    if (!parallaxReady) return;
    const viewportCenter = window.innerHeight / 2;
    parallaxItems.forEach((item) => {
      const { el, speed, speedX } = item;
      const rect = el.getBoundingClientRect();
      // 画面に入る手前で基準値(baseDrive)を確定させると、実際に見え始めた時点で
      // 既にズレが乗ってしまう。実際に画面内に入ってから初めて計算するよう、
      // 余白を持たせずビューポートと重なった時点だけを対象にする
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const elCenter = rect.top + rect.height / 2;
      const drive = viewportCenter - elCenter;
      if (item.baseDrive === null) {
        item.baseDrive = drive;
        item.baseDocTop = rect.top + window.scrollY;
      }
      const relDrive = drive - item.baseDrive;
      const offsetY = relDrive * speed;
      const offsetX = relDrive * speedX;
      el.style.transform = `translate3d(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px, 0)`;
    });
    parallaxTicking = false;
  }
  window.addEventListener("scroll", () => {
    if (!parallaxTicking) {
      window.requestAnimationFrame(updateParallax);
      parallaxTicking = true;
    }
  }, { passive: true });
  function resetAllBaselines() {
    parallaxItems.forEach((item) => { item.baseDrive = null; item.baseDocTop = null; });
    updateParallax();
  }
  // 「今スクロールしている位置」でうかつに基準値を取り直すと、その位置を新しい
  // オフセット0地点にしてしまい、後でスクロールを戻した時に画面端から離れて見える。
  // 実際に文書内での位置がズレた要素だけを狙って基準値を取り直す
  function reconcileShiftedBaselines() {
    parallaxItems.forEach((item) => {
      if (item.baseDrive === null || item.baseDocTop === null) return;
      const rect = item.el.getBoundingClientRect();
      const docTop = rect.top + window.scrollY;
      if (Math.abs(docTop - item.baseDocTop) > 1) {
        item.baseDrive = null;
        item.baseDocTop = null;
      }
    });
    updateParallax();
  }
  // ウィンドウ幅・高さが変わるとviewportCenterが変わり、既存のbaseDriveが
  // 古い基準のままズレて見えるようになるため、リサイズ時は全件取り直す
  // （リサイズ自体が構造的な変化なので、現在のスクロール位置を新基準にしてよい）
  let resizeDebounce;
  window.addEventListener("resize", () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(resetAllBaselines, 150);
  });
  // 画像読み込み（window load）とWebフォントの反映が両方終わってから基準値を確定する
  Promise.all([
    new Promise((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", resolve, { once: true });
    }),
    (document.fonts && document.fonts.ready) || Promise.resolve()
  ]).then(() => {
    parallaxReady = true;
    resetAllBaselines();
    // これ以降もフォントの遅延スワップや画像デコードでレイアウトが動くことがあるため、
    // 実際にズレた要素だけをResizeObserverで検知して即座に基準値を取り直す。
    // タイマーで一律リセットすると、その時点でユーザーがスクロールしていた場合に
    // 「今の位置」を誤って新しい基準にしてしまうため、検知ベースにしている
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => reconcileShiftedBaselines());
      ro.observe(document.body);
      setTimeout(() => ro.disconnect(), 5000);
    }
  });
}

// TOPに戻るボタン：一定量スクロールしたら表示し、クリックでスムーススクロールで先頭へ
const backToTopBtn = byId("backToTop");
function toggleBackToTop() {
  if (backToTopBtn) backToTopBtn.classList.toggle("is-visible", window.scrollY > 600);
}
window.addEventListener("scroll", toggleBackToTop);
toggleBackToTop();
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// スマホ用ドロワーメニュー
const navToggle = byId("navToggle");
const drawer = byId("mobileDrawer");
const drawerOverlay = byId("drawerOverlay");

function openDrawer() {
  if (!drawer || !drawerOverlay || !navToggle) return;
  drawer.classList.add("is-open");
  drawerOverlay.classList.add("is-open");
  drawer.removeAttribute("inert");
  drawer.setAttribute("aria-hidden", "false");
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "メニューを閉じる");
  document.body.style.overflow = "hidden";
}
function closeDrawer() {
  if (!drawer || !drawerOverlay || !navToggle) return;
  drawer.classList.remove("is-open");
  drawerOverlay.classList.remove("is-open");
  drawer.setAttribute("inert", "");
  drawer.setAttribute("aria-hidden", "true");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "メニューを開く");
  document.body.style.overflow = "";
}
if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });
}
if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);
if (drawer) {
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  closeDrawer();
  const modal = byId("personaModal");
  if (modal && !modal.hidden) hideModal();
});

// ==========================================================================
// FVモニター内のブランドモーション
// STRATEGY → DESIGN → BUILD → GROWTH を約3秒ずつ、無限ループで表示する。
// 図形の出入りはCSS側（.fv-device[data-scene="..."]）が担当し、ここでは
// 「今どのシーンか」「キーワードを何文字目まで打ったか」だけを制御している。
// 調整したい値は下の定数と SCENES 配列に集約してある。
// ==========================================================================
const fvDeviceRoot = byId("fvDeviceRoot");
const fvScreenStage = byId("fvScreenStage");
const fvPhoneStage = byId("fvPhoneStage");
const fvDevice = byId("fvDevice");
const fvKeyWord = byId("fvKeyWord");
const fvKeyInitial = byId("fvKeyInitial");
const fvKeyRest = byId("fvKeyRest");
const fvIndex = byId("fvIndex");
const fvSub = byId("fvSub");
const fvCursor = byId("fvCursor");

if (fvDevice && fvKeyWord && fvKeyInitial && fvKeyRest && fvIndex && fvSub) {
  // 1シーンは3フェーズ構成。ここの3つの数値で全体のテンポが決まる
  const PHASE_TYPE = 2000;    // 文字だけを表示している時間(ms)
  // 図形は1つずつ260msずらして出るので、最多のBUILD(10個)で 9×260 + 1.3s ≒ 3.6秒かかる。
  // 出そろってから少し止まる間を含めて4.2秒を確保している
  const PHASE_SHAPES = 4200;  // 図形がバラバラに出そろって静止するまでの時間(ms)
  const PHASE_OUT = 1200;     // 文字も図形も消えて、次のシーンに移るまでの時間(ms)
  const CHAR_INTERVAL = 90;   // 1文字あたりの表示間隔(ms)
  const TYPE_DELAY = 80;      // シーン開始から打ち始めるまでの間(ms)
  const KEY_X = 92;           // キーワードの左端X（SVG座標。index.html側の text x と揃える）
  const CURSOR_GAP = 10;      // 最後の文字とカーソルの間隔

  // ---- 画面を元画像のモニターに合わせ込む（射影変換） ----
  // hero-device.png（1153×928／元画像の透明余白を切り落としたもの）上で実測した
  // モニター画面の四隅。順に 左上→右上→右下→左下。
  // 単純な回転ではなく、右辺(633px)が左辺(550px)より約15%高い台形パースになっているため、
  // CSSのrotate/skew（アフィン変換）では重ならない。matrix3dによる射影変換で合わせる。
  const FV_PHOTO_W = 1153;
  const FV_SCREEN_QUAD = [[43.1, 95.7], [966.2, 28.6], [950.4, 661.8], [21.2, 645.4]];
  // 変形前の矩形サイズ（四辺の長さの平均。アスペクト比が画面と揃うので歪みが出ない）
  const FV_SCREEN_W = 927.4;
  const FV_SCREEN_H = 591.8;
  // スマホ画面。画面領域を塗りつぶしで抽出してから四辺を直線フィットして求めた実測値
  // （フレーム内側のハイライトを画面の縁と誤検出しないよう、明るい面が続くことを条件にしている）。
  // 中身が黒なので内側に縮めると元画像の白い画面が縁に残る。0.6%だけ外側に広げてある
  const FV_PHONE_QUAD = [[896.1, 360.0], [1135.4, 361.8], [1065.4, 913.4], [826.2, 896.3]];
  const FV_PHONE_W = 239.6;
  const FV_PHONE_H = 548.4;
  const FV_PHONE_RADIUS = 35; // 元画像基準の角丸半径（実測）

  // 単位矩形 → 任意の四角形 への射影変換を求め、CSSのmatrix3d文字列にして返す
  function quadToMatrix3d(quad, w, h) {
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = quad;
    const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
    const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
    let a, b, c, d, e, f, g, i;
    if (Math.abs(dx3) < 1e-9 && Math.abs(dy3) < 1e-9) {
      // 平行四辺形（パースなし）の場合はアフィン変換に退化する
      a = x1 - x0; b = x3 - x0; c = x0;
      d = y1 - y0; e = y3 - y0; f = y0;
      g = 0; i = 0;
    } else {
      const den = dx1 * dy2 - dx2 * dy1;
      g = (dx3 * dy2 - dx2 * dy3) / den;
      i = (dx1 * dy3 - dx3 * dy1) / den;
      a = x1 - x0 + g * x1; b = x3 - x0 + i * x3; c = x0;
      d = y1 - y0 + g * y1; e = y3 - y0 + i * y3; f = y0;
    }
    // 単位矩形基準の行列を、実際の要素サイズ(w×h)基準に直して列優先で並べる
    return "matrix3d(" + [
      a / w, d / w, 0, g / w,
      b / h, e / h, 0, i / h,
      0, 0, 1, 0,
      c, f, 0, 1
    ].join(",") + ")";
  }

  function placeStage(stage, quad, baseW, baseH, scale, radius) {
    if (!stage) return;
    const w = baseW * scale;
    const h = baseH * scale;
    stage.style.width = w + "px";
    stage.style.height = h + "px";
    if (radius) stage.style.borderRadius = radius * scale + "px";
    stage.style.transform = quadToMatrix3d(quad.map(([x, y]) => [x * scale, y * scale]), w, h);
    stage.classList.add("is-ready");
  }

  function updateScreenTransform() {
    if (!fvDeviceRoot) return;
    const scale = fvDeviceRoot.getBoundingClientRect().width / FV_PHOTO_W;
    if (!scale) return;
    placeStage(fvScreenStage, FV_SCREEN_QUAD, FV_SCREEN_W, FV_SCREEN_H, scale, 0);
    placeStage(fvPhoneStage, FV_PHONE_QUAD, FV_PHONE_W, FV_PHONE_H, scale, FV_PHONE_RADIUS);
  }

  updateScreenTransform();
  if (fvDeviceRoot && typeof ResizeObserver !== "undefined") {
    new ResizeObserver(updateScreenTransform).observe(fvDeviceRoot);
  } else {
    window.addEventListener("resize", updateScreenTransform);
  }

  // シーンごとの設定。duration / charInterval を個別に上書きすることもできる
  const SCENES = [
    { id: "strategy", keyword: "STRATEGY", index: "01 / 04", sub: "RESEARCH \u00b7 PLANNING \u00b7 STRUCTURE" },
    { id: "design", keyword: "DESIGN", index: "02 / 04", sub: "VISUAL \u00b7 INTERFACE \u00b7 EXPERIENCE" },
    { id: "build", keyword: "BUILD", index: "03 / 04", sub: "CODE \u00b7 SYSTEM \u00b7 DEVELOPMENT" },
    { id: "growth", keyword: "GROWTH", index: "04 / 04", sub: "IMPROVE \u00b7 EXPAND \u00b7 RESULTS" }
  ];

  let fvTimers = [];
  let fvSceneIndex = 0;
  let fvRunning = false;

  function clearFvTimers() {
    fvTimers.forEach(clearTimeout);
    fvTimers = [];
  }

  // 頭文字だけ色を変えているため、1文字目と2文字目以降を別々の<tspan>に入れる
  function setKeyword(text) {
    fvKeyInitial.textContent = text.slice(0, 1);
    fvKeyRest.textContent = text.slice(1);
  }

  // カーソルは矩形なので、打った文字の実測幅に合わせて自分でx座標を動かす
  function moveCursor() {
    if (!fvCursor) return;
    // 頭文字と残りで<tspan>が分かれているので、幅は親の<text>からまとめて取る
    const width = fvKeyWord.getComputedTextLength ? fvKeyWord.getComputedTextLength() : 0;
    fvCursor.setAttribute("x", String(KEY_X + width + CURSOR_GAP));
  }

  // 1文字ずつ表示する（setTimeoutの連鎖なので、停止時はclearFvTimersで確実に止まる）
  function typeKeyword(word, interval) {
    setKeyword("");
    moveCursor();
    let count = 0;
    const step = () => {
      count += 1;
      setKeyword(word.slice(0, count));
      moveCursor();
      if (count < word.length) fvTimers.push(setTimeout(step, interval));
    };
    fvTimers.push(setTimeout(step, TYPE_DELAY));
  }

  // 文字だけ → 図形がバラバラに出現 → 消える、の順に3フェーズを進める
  function playScene(i) {
    const scene = SCENES[i];
    const type = scene.phaseType || PHASE_TYPE;
    const shapes = scene.phaseShapes || PHASE_SHAPES;
    const out = scene.phaseOut || PHASE_OUT;

    fvDevice.dataset.scene = scene.id;
    fvDevice.dataset.phase = "type";
    fvIndex.textContent = scene.index;
    fvSub.textContent = scene.sub;
    typeKeyword(scene.keyword, scene.charInterval || CHAR_INTERVAL);

    fvTimers.push(setTimeout(() => { fvDevice.dataset.phase = "shapes"; }, type));
    fvTimers.push(setTimeout(() => { fvDevice.dataset.phase = "out"; }, type + shapes));
    fvTimers.push(setTimeout(() => {
      fvSceneIndex = (i + 1) % SCENES.length;
      playScene(fvSceneIndex);
    }, type + shapes + out));
  }

  function startFv() {
    if (fvRunning) return;
    fvRunning = true;
    playScene(fvSceneIndex);
  }

  function stopFv() {
    if (!fvRunning) return;
    fvRunning = false;
    clearFvTimers();
  }

  if (prefersReducedMotion) {
    // 動きを止め、DESIGNシーンの完成形を静止画として見せる（CSS側でtransitionも無効化）
    const still = SCENES[1];
    fvDevice.dataset.scene = still.id;
    fvDevice.dataset.phase = "shapes";
    setKeyword(still.keyword);
    fvIndex.textContent = still.index;
    fvSub.textContent = still.sub;
    moveCursor();
  } else {
    // 画面外・非アクティブタブではタイマーを止めて、無駄に動かし続けない
    let fvInView = false;
    const syncFvPlayback = () => {
      if (fvInView && !document.hidden) startFv();
      else stopFv();
    };
    new IntersectionObserver((entries) => {
      fvInView = entries.some((entry) => entry.isIntersecting);
      syncFvPlayback();
    }, { threshold: 0.15 }).observe(fvDevice);
    document.addEventListener("visibilitychange", syncFvPlayback);
  }
}

// スマホモックのロック画面時計。実時刻を「時:分」で表示する
const fvClock = byId("fvClock");
if (fvClock) {
  const renderClock = () => {
    const now = new Date();
    // iOSの日本語表示に合わせ、24時間表記・時は先頭の0を付けない
    fvClock.textContent = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
  };
  renderClock();
  // 次の「分」の頭に合わせて更新し、以降は1分ごと（毎秒動かす必要はない）
  window.setTimeout(() => {
    renderClock();
    window.setInterval(renderClock, 60000);
  }, (60 - new Date().getSeconds()) * 1000);
}

// ローディング画面：ページの読み込み完了を待ちつつ、最低3秒は表示してからフェードアウトする
const loadingScreen = byId("loadingScreen");
if (loadingScreen) {
  const LOADING_MIN_MS = 3000;
  const loadingStart = performance.now();
  const hideLoadingScreen = () => {
    const remaining = Math.max(0, LOADING_MIN_MS - (performance.now() - loadingStart));
    window.setTimeout(() => {
      loadingScreen.classList.add("is-hidden");
      // フェードアウト完了後にDOM上から隠し、支援技術やタブ移動の対象から外す
      window.setTimeout(() => loadingScreen.setAttribute("hidden", ""), 500);
    }, remaining);
  };
  if (document.readyState === "complete") {
    hideLoadingScreen();
  } else {
    window.addEventListener("load", hideLoadingScreen, { once: true });
  }
}

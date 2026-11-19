import { sayac } from "./sayac.js?v=20261109a";
// Tüm sayfalarda ortak: menü, üst şerit, yıl, çerez onayı, ölçüm olayları ve skor pop-up'ı.

/**
 * Meta Pixel — veri seti "AG Longevity Web" (Alfa Uzun Ömür ve Sağlıklı Yaşam portföyü).
 * Yalnızca ziyaretçi çerez bandında "Kabul et" dediğinde yüklenir (KVKK).
 * Otomatik buton/meta verisi toplama (autoConfig) kapalı; olaylara parametre eklenmez.
 */
const PIXEL_ID = "1874091273973715";
const CEREZ_KEY = "agl-cerez"; // "evet" | "hayir"

function cerezDurumu() {
  try {
    return localStorage.getItem(CEREZ_KEY);
  } catch {
    return null;
  }
}
function cerezKaydet(v) {
  try {
    localStorage.setItem(CEREZ_KEY, v);
  } catch {
    /* yok say */
  }
}

let pixelHazir = false;
function pixelYukle() {
  if (pixelHazir || !PIXEL_ID) return;
  pixelHazir = true;
  /* eslint-disable */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq("set", "autoConfig", false, PIXEL_ID);
  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

function cerezBandi(zorla = false) {
  if (!zorla && cerezDurumu()) return;
  document.getElementById("cerez-bandi")?.remove();
  if (!document.getElementById("cerez-stil")) {
    const st = document.createElement("style");
    st.id = "cerez-stil";
    st.textContent = `
      #cerez-bandi{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin-left:auto;
        background:var(--petrol,#0b2f3a);color:var(--zemin,#f7f9fa);border-radius:var(--kose-yumusak,16px);padding:22px 24px;
        box-shadow:var(--golge-3,0 16px 40px rgba(11,47,58,.18));border-top:3px solid var(--altin,#b8945a);
        font-family:var(--sans,Manrope,sans-serif);font-size:14px;line-height:1.55}
      #cerez-bandi p{margin:0 0 16px;color:var(--k-metin-ince,#d7e3e6)}
      #cerez-bandi a{color:var(--k-turkuaz-metin,#8fdde2);text-decoration:underline}
      #cerez-bandi .cerez-tus{display:flex;gap:10px;flex-wrap:wrap}
      #cerez-bandi button{font:inherit;font-weight:700;border-radius:var(--kose-buton,12px);min-height:44px;padding:11px 22px;cursor:pointer;border:1.5px solid var(--k-turkuaz-metin,#8fdde2);transition:background-color var(--gecis-hizli,.15s ease)}
      #cerez-bandi .kabul{background:var(--turkuaz,#00b9c3);border-color:var(--turkuaz,#00b9c3);color:var(--on-turkuaz,#0b2f3a)}
      #cerez-bandi .kabul:hover{background:var(--turkuaz-hover,#2cc6cf)}
      #cerez-bandi .ret{background:transparent;color:var(--zemin,#f7f9fa)}
      #cerez-bandi .ret:hover{background:var(--k-zemin-sis,#133f4b)}`;
    document.head.appendChild(st);
  }
  const d = document.createElement("div");
  d.id = "cerez-bandi";
  d.setAttribute("role", "dialog");
  d.setAttribute("aria-label", "Çerez tercihi");
  d.innerHTML = `<p>Sitenin çalışması için zorunlu çerezlerin yanında, reklamlarımızın etkisini ölçmek için Meta Pixel'i yalnızca onayınızla kullanıyoruz. Anket yanıtlarınız reklam araçlarına gönderilmez. <a href="/cerez-politikasi.html">Çerez Politikası</a></p>
    <div class="cerez-tus"><button type="button" class="kabul">Kabul et</button><button type="button" class="ret">Reddet</button></div>`;
  document.body.appendChild(d);
  d.querySelector(".kabul").addEventListener("click", () => {
    cerezKaydet("evet");
    d.remove();
    pixelYukle();
  });
  d.querySelector(".ret").addEventListener("click", () => {
    cerezKaydet("hayir");
    d.remove();
  });
}

/**
 * Ölçüm olayı. Meta Pixel (fbq) ve GA4/GTM (dataLayer) kurulduğunda kendiliğinden çalışır.
 * Anket YANITLARI asla gönderilmez — yalnızca olayın adı ve sonuç bandı gibi sağlık verisi
 * içermeyen etiketler. Meta'ya yalnızca olay adı gider; parametre gönderilmez.
 */
export function track(event, data = {}) {
  try {
    (window.dataLayer = window.dataLayer || []).push({ event, ...data });
    if (typeof window.fbq === "function") {
      const standart = { Lead: "Lead", Schedule: "Schedule", ViewContent: "ViewContent", Contact: "Contact" };
      if (standart[event]) window.fbq("track", standart[event]);
      else window.fbq("trackCustom", event);
    }
  } catch {
    /* ölçüm hiçbir zaman sayfayı bozmaz */
  }
}

function menu() {
  const ac = document.querySelector(".menu-ac");
  const m = document.querySelector(".menu");
  if (!ac || !m) return;
  ac.addEventListener("click", () => {
    const acik = ac.getAttribute("aria-expanded") === "true";
    ac.setAttribute("aria-expanded", String(!acik));
    m.classList.toggle("acik", !acik);
  });
  m.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      ac.setAttribute("aria-expanded", "false");
      m.classList.remove("acik");
    }
  });
}

function ustSerit() {
  const ust = document.querySelector(".ust");
  if (!ust) return;
  const f = () => ust.classList.toggle("kaydi", window.scrollY > 8);
  f();
  window.addEventListener("scroll", f, { passive: true });
}

const POPUP_KEY = "agl-skor-popup";
function popupGosterilsinMi() {
  try {
    const t = Number(localStorage.getItem(POPUP_KEY) || 0);
    return Date.now() - t > 7 * 24 * 3600 * 1000;
  } catch {
    return true;
  }
}
function popupKaydet() {
  try {
    localStorage.setItem(POPUP_KEY, String(Date.now()));
  } catch {
    /* yok say */
  }
}

/**
 * Skor pop-up'ı: açılışta değil, ziyaretçi ilgisini gösterdiğinde — 20 sn sonra, sayfanın
 * yarısı kaydırılınca ya da masaüstünde çıkış niyetinde (fare üstten çıkınca). 7 günde bir.
 */
function popup() {
  const arka = document.getElementById("skor-pencere");
  if (!arka || !popupGosterilsinMi()) return;
  let gosterildi = false;
  const kapat = () => {
    arka.classList.remove("acik");
    arka.setAttribute("aria-hidden", "true");
    popupKaydet();
  };
  const goster = (neden) => {
    if (gosterildi) return;
    gosterildi = true;
    arka.classList.add("acik");
    arka.setAttribute("aria-hidden", "false");
    arka.querySelector(".btn")?.focus({ preventScroll: true });
    track("skor_popup_gosterildi", { neden });
  };
  setTimeout(() => goster("sure"), 20000);
  const kaydirma = () => {
    const oran = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (oran > 0.5) {
      goster("kaydirma");
      window.removeEventListener("scroll", kaydirma);
    }
  };
  window.addEventListener("scroll", kaydirma, { passive: true });
  document.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget && e.clientY <= 0 && window.matchMedia("(pointer: fine)").matches) goster("cikis");
  });
  arka.addEventListener("click", (e) => {
    if (e.target === arka || e.target.closest(".kapat")) kapat();
  });
  arka.querySelector(".btn")?.addEventListener("click", () => {
    popupKaydet();
    track("skor_popup_tiklandi");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && arka.classList.contains("acik")) kapat();
  });
}

if (cerezDurumu() === "evet") pixelYukle();
else cerezBandi();
document.querySelectorAll("[data-cerez-ayar]").forEach((el) =>
  el.addEventListener("click", (e) => {
    e.preventDefault();
    cerezBandi(true);
  }),
);

// ---- Huni ölçümü (7 Kasım): WhatsApp tıklamaları, ViewContent, randevu ziyareti ----
const YOL = location.pathname.replace(/^\//, "") || "index.html";
if (YOL === "index.html" || YOL === "protokoller.html") track("ViewContent", { sayfa: YOL });
if (YOL === "randevu.html") sayac("randevu_sayfa");
document.addEventListener("click", (e) => {
  const a = e.target.closest && e.target.closest('a[href*="wa.me/"]');
  if (!a) return;
  let metin = "";
  try { metin = decodeURIComponent(a.href.split("text=")[1] || ""); } catch { /* yok say */ }
  // soru: 1 Keşif · 2 Yıllık Takip · 3 Bütüncül Takip · 4 skor sonucu · 0 genel
  const tur = /Longevity Skorum/.test(metin) ? 4 : /Keşif/.test(metin) ? 1 : /Yıllık Takip/.test(metin) ? 2 : /Bütüncül/.test(metin) ? 3 : 0;
  sayac("whatsapp", tur);
  track("Contact", { kanal: "whatsapp" });
});

menu();
ustSerit();
popup();
document.querySelectorAll("[data-yil]").forEach((el) => (el.textContent = String(new Date().getFullYear())));
document.querySelectorAll("[data-izle]").forEach((el) => el.addEventListener("click", () => track(el.dataset.izle)));
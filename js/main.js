const translations = {
  ru: {
    pageTitle: "QazBooking — Отдых начинается здесь!",

    title1: "ОТДЫХ",
    title2: "НАЧИНАЕТСЯ",
    title3: "ЗДЕСЬ!",

    subtitle1: "Не трать часы в Instagram.",
    subtitleBrand: "QazBooking",
    subtitle2: "— всё в одном",
    subtitle3: "приложении.",

    city1: "АЛАКОЛЬ",
    city2: "АКШИ",
    city3: "КАБАНБАЙ",

    statPrefix: "Более",
    statSuffix: "баз отдыха",

    storeAppleLabel: "Скачать в",
    storeGoogleLabel: "Скачать в",

    languageLabel: "Выбор языка",
    appleAria: "Скачать QazBooking в App Store",
    googleAria: "Скачать QazBooking в Google Play",
  },

  kz: {
    pageTitle: "QazBooking — Демалыс осы жерден басталады!",

    title1: "ДЕМАЛЫС",
    title2: "ОСЫ ЖЕРДЕН",
    title3: "БАСТАЛАДЫ!",

    subtitle1: "Instagram-да уақыт жоғалтпа.",
    subtitleBrand: "QazBooking",
    subtitle2: "— барлығы бір",
    subtitle3: "қосымшада.",

    city1: "АЛАКӨЛ",
    city2: "АҚШИ",
    city3: "ҚАБАНБАЙ",

    statPrefix: "",
    statSuffix: "демалыс базасынан астам",

    storeAppleLabel: "Жүктеп алу",
    storeGoogleLabel: "Жүктеп алу",

    languageLabel: "Тілді таңдау",
    appleAria: "QazBooking қолданбасын App Store-дан жүктеп алу",
    googleAria: "QazBooking қолданбасын Google Play-ден жүктеп алу",
  },
};

const LANG_KEY = "qazbooking-lang";

function setLanguage(lang) {
  const dictionary = translations[lang];

  if (!dictionary) {
    return;
  }

  document.documentElement.lang = lang === "kz" ? "kk" : "ru";
  document.documentElement.dataset.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translation = dictionary[key];

    if (translation === undefined) {
      return;
    }

    element.textContent = translation;

    if (element.classList.contains("hero__stat-prefix")) {
      element.hidden = translation.trim() === "";
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    const translation = dictionary[key];

    if (translation !== undefined) {
      element.setAttribute("aria-label", translation);
    }
  });

  document.title = dictionary.pageTitle;

  document.querySelectorAll(".lang-switch__btn").forEach((button) => {
    const isActive = button.dataset.lang === lang;

    button.classList.toggle(
      "lang-switch__btn--active",
      isActive
    );

    button.setAttribute(
      "aria-pressed",
      String(isActive)
    );
  });

  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (error) {
    console.warn("Не удалось сохранить выбранный язык.", error);
  }
}

function getSavedLanguage() {
  try {
    const savedLanguage = localStorage.getItem(LANG_KEY);

    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage;
    }
  } catch (error) {
    console.warn("Не удалось прочитать сохранённый язык.", error);
  }

  return "ru";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-switch__btn").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
    });
  });

  setLanguage(getSavedLanguage());
});
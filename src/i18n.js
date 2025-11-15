import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  az: {
    translation: {
      common: {
        appName: "SmartLife",
        login: "Daxil ol",
        logout: "Çıxış",
        username: "İstifadəçi adı",
        password: "Şifrə",
      },
      header: {
        search: "Axtarış",
      },
      sidebar: {
        dashboard: "Panel",
        notifications: "Bildirişlər",
        mtk: "MTK",
        complexes: "Komplekslər",
        residents: "Sakinlər",
        buildings: "Binalar",
        properties: "Mənzillər",
        blocks: "Bloklar",
      },
      dashboard: {
        homeTitle1: "Ümumi göstəricilər",
        homeTitle2: "Qrafiklər",
        homeTitle3: "Layihələr və sifarişlər",
      },
      notifications: {
        alertsTitle: "Bildirişlər",
        alertsWithIconTitle: "Ikonlu bildirişlər",
      },
    },
  },
  en: {
    translation: {
      common: {
        appName: "SmartLife",
        login: "Sign In",
        logout: "Logout",
        username: "Username",
        password: "Password",
      },
      header: {
        search: "Search",
      },
      sidebar: {
        dashboard: "Dashboard",
        notifications: "Notifications",
        mtk: "HOA",
        complexes: "Complexes",
        residents: "Residents",
        buildings: "Buildings",
        properties: "Properties",
        blocks: "Blocks",
      },
      dashboard: {
        homeTitle1: "Overview",
        homeTitle2: "Charts",
        homeTitle3: "Projects & Orders",
      },
      notifications: {
        alertsTitle: "Alerts",
        alertsWithIconTitle: "Alerts with Icon",
      },
    },
  },
  ru: {
    translation: {
      common: {
        appName: "SmartLife",
        login: "Войти",
        logout: "Выйти",
        username: "Логин",
        password: "Пароль",
      },
      header: {
        search: "Поиск",
      },
      sidebar: {
        dashboard: "Панель",
        notifications: "Уведомления",
        mtk: "ТСЖ",
        complexes: "Комплексы",
        residents: "Жители",
        buildings: "Здания",
        properties: "Квартиры",
        blocks: "Блоки",
      },
      dashboard: {
        homeTitle1: "Общие показатели",
        homeTitle2: "Графики",
        homeTitle3: "Проекты и заказы",
      },
      notifications: {
        alertsTitle: "Уведомления",
        alertsWithIconTitle: "Уведомления с иконкой",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "az",
    supportedLngs: ["az", "en", "ru"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;

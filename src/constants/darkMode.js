/**
 * Dark Mode Color Constants
 * Bu fayldan dark mode rənglərini mərkəzləşdirilmiş şəkildə idarə edirik
 */

export const darkModeColors = {
  // Əsas background rəngləri
  background: "dark:bg-gray-900", // Qapqara deyil, yumşaq qara
  backgroundSecondary: "dark:bg-gray-800", // İkinci səviyyə background
  backgroundTertiary: "dark:bg-gray-700", // Üçüncü səviyyə background
  
  // Card rəngləri
  card: "dark:bg-gray-800", // Card-lar üçün boz rəng
  cardHeader: "dark:bg-gray-800", // Card header üçün
  cardBody: "dark:bg-gray-800", // Card body üçün
  
  // Border rəngləri
  border: "dark:border-gray-700", // Dark mode-də qırmızı border yox, boz border
  borderLight: "dark:border-gray-600", // Yüngül border
  
  // Text rəngləri
  text: "dark:text-white",
  textSecondary: "dark:text-gray-300",
  textTertiary: "dark:text-gray-400",
  
  // Hover rəngləri
  hover: "dark:hover:bg-gray-700",
  hoverLight: "dark:hover:bg-gray-800/50",
  
  // Table rəngləri
  tableRow: "dark:bg-gray-800",
  tableRowHover: "dark:hover:bg-gray-700",
  tableRowEven: "dark:bg-gray-800/50",
  
  // Dialog/Modal rəngləri
  dialog: "dark:bg-gray-900",
  dialogHeader: "dark:bg-gray-800",
  dialogBody: "dark:bg-gray-800",
  dialogFooter: "dark:bg-gray-800",
  
  // Input rəngləri
  input: "dark:bg-gray-800",
  inputBorder: "dark:border-gray-700",
  inputPlaceholder: "dark:placeholder-gray-400",
  
  // Menu rəngləri
  menu: "dark:bg-gray-800",
  menuItem: "dark:hover:bg-gray-700",
  menuBorder: "dark:border-gray-700",
};

/**
 * Dark mode class-larını birləşdirmək üçün helper funksiya
 * @param {...string} classes - Birləşdiriləcək class-lar
 * @returns {string} Birləşdirilmiş class string
 */
export const combineDarkClasses = (...classes) => {
  return classes.filter(Boolean).join(" ");
};


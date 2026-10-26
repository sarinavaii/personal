/**
 * Applies the saved colour scheme before first paint so the page never flashes
 * the wrong theme. Kept inline (and dependency-free) on purpose.
 */
const THEME_SCRIPT = `(function(){try{var stored=localStorage.getItem("theme");var theme=stored==="light"||stored==="dark"?stored:"dark";document.documentElement.setAttribute("data-theme",theme);document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function ThemeScript() {
    return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}

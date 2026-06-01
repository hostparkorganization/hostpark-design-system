/* Hostpark Mobile UI Kit — app shell: phone frame + screen router + theme */
const { useState: useStateA } = React;

const LOGO = "../../assets/hostpark-logo.png";
const LOGO_WHITE = "../../assets/hostpark-logo-white.png";

function App() {
  const [screen, setScreen] = useStateA("signin"); // signin | home | detail
  const [theme, setTheme] = useStateA("light");
  const logo = theme === "dark" ? LOGO_WHITE : LOGO;

  const screens = [
    { id: "signin", label: "Entrar" },
    { id: "home", label: "Início" },
    { id: "detail", label: "Vaga" },
  ];

  return (
    <div className="studio" data-page-dark={theme === "dark"}>
      <div className="toolbar">
        <div className="seg">
          {screens.map(s => (
            <button key={s.id} className={screen === s.id ? "on" : ""} onClick={() => setScreen(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
        <button className="toggle" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>
          <ion-icon name={theme === "dark" ? "sunny-outline" : "moon-outline"}></ion-icon>
          {theme === "dark" ? "Claro" : "Escuro"}
        </button>
      </div>

      <div className="phone-wrap">
        <div className="phone" data-theme={theme}>
          <div className="phone-screen">
            <StatusBar />
            {screen === "signin" && <SignIn logoSrc={logo} onSignIn={() => setScreen("home")} />}
            {screen === "home" && <DecisionHome logoSrc={logo} onOpenVaga={() => setScreen("detail")} />}
            {screen === "detail" && <VagaDetail onBack={() => setScreen("home")} />}
            <HomeIndicator />
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

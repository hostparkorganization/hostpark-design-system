/* Hostpark Mobile UI Kit — shared primitives */
const { useState } = React;

/* -- Button: variant primary|secondary, size lg|md, loading, block, icon -- */
function Button({ children, variant = "primary", size = "lg", loading, block, disabled, icon, onClick }) {
  const cls = [
    "btn", `btn-${variant}`, `btn-${size}`, block ? "btn-block" : ""
  ].join(" ");
  return (
    <button className={cls} disabled={disabled || loading} onClick={onClick}>
      {loading && <span className="btn-spin" />}
      {!loading && icon && <ion-icon name={icon}></ion-icon>}
      {children}
    </button>
  );
}

/* -- Text field with optional password reveal -- */
function Field({ label, type = "text", placeholder, value, onChange, defaultValue }) {
  const [show, setShow] = useState(false);
  const isPw = type === "password";
  return (
    <div className="field">
      <label>{label}</label>
      <div className="input-wrap">
        <input
          type={isPw && show ? "text" : type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
        />
        {isPw && (
          <button className="eye" onClick={() => setShow(s => !s)} aria-label="Mostrar senha" type="button">
            <ion-icon name={show ? "eye-off-outline" : "eye-outline"}></ion-icon>
          </button>
        )}
      </div>
    </div>
  );
}

/* -- iOS-style status bar -- */
function StatusBar() {
  return (
    <div className="statusbar">
      <span>14:00</span>
      <span className="icons">
        <ion-icon name="cellular"></ion-icon>
        <ion-icon name="wifi"></ion-icon>
        <ion-icon name="battery-full"></ion-icon>
      </span>
    </div>
  );
}

function HomeIndicator() { return <div className="home-indicator" />; }

/* -- Top app bar: logo + bell -- */
function TopBar({ logoSrc, onBell }) {
  return (
    <div className="topbar">
      <img src={logoSrc} alt="Hostpark" />
      <button className="iconbtn" onClick={onBell} aria-label="Notificações">
        <ion-icon name="notifications-outline"></ion-icon>
        <span className="dot" />
      </button>
    </div>
  );
}

/* -- Bottom tab bar. Non-home tabs are locked/subdued until a condo is joined -- */
function BottomTabs({ active = "home", allUnlocked = false }) {
  const tabs = [
    { id: "home", label: "Início", icon: "home", locked: false },
    { id: "mural", label: "Mural", icon: "chatbubbles-outline", locked: !allUnlocked },
    { id: "reservas", label: "Reservas", icon: "calendar-outline", locked: !allUnlocked },
    { id: "perfil", label: "Perfil", icon: "person-outline", locked: false },
  ];
  return (
    <div className="tabbar">
      {tabs.map(t => (
        <button key={t.id} className={`tab ${t.id === active ? "active" : ""} ${t.locked ? "locked" : ""}`}>
          {t.locked && <ion-icon className="lock" name="lock-closed"></ion-icon>}
          <ion-icon name={t.id === active ? t.icon : (t.icon.endsWith("outline") ? t.icon : t.icon + "-outline")}></ion-icon>
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

function Chip({ children, kind = "success", icon }) {
  return (
    <span className={`chip chip-${kind}`}>
      {icon && <ion-icon name={icon}></ion-icon>}
      {children}
    </span>
  );
}

Object.assign(window, { Button, Field, StatusBar, HomeIndicator, TopBar, BottomTabs, Chip });

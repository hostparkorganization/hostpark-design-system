/* Hostpark Mobile UI Kit — anchor screens */
const { useState: useStateS } = React;

/* ============================ 1. SIGN-IN ============================ */
function SignIn({ logoSrc, onSignIn }) {
  const [loading, setLoading] = useStateS(false);
  const go = () => { setLoading(true); setTimeout(() => { setLoading(false); onSignIn(); }, 900); };
  return (
    <div className="signin">
      <div className="brand"><img src={logoSrc} alt="Hostpark" /></div>
      <h2 className="ds-h2">Entrar</h2>
      <p className="sub ds-body" style={{ color: "var(--foreground-muted)" }}>
        Acesse sua conta para gerenciar suas vagas e reservas.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Field label="E-mail" type="email" placeholder="voce@email.com" defaultValue="marina@email.com" />
        <Field label="Senha" type="password" placeholder="Sua senha" defaultValue="senha123" />
        <a className="forgot" href="#">Esqueceu a senha?</a>
        <Button block loading={loading} onClick={go}>Entrar</Button>
      </div>

      <div className="divider-or" style={{ marginTop: 18 }}>ou</div>
      <Button block variant="secondary" icon="logo-google" onClick={go}>Continuar com o Google</Button>

      <div className="foot">
        Não tem conta? <a href="#">Criar conta</a>
      </div>
    </div>
  );
}

/* ====================== 2. DECISION-SCREEN HOME ====================== */
function DecisionHome({ logoSrc, onOpenVaga }) {
  return (
    <React.Fragment>
      <TopBar logoSrc={logoSrc} />
      <div className="screen-body">
        <div style={{ padding: "8px 20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="hero">
            <span className="ds-overline">Bem-vinda, Marina</span>
            <h1 className="ds-h1" style={{ marginTop: 8 }}>O que você<br />gostaria de fazer?</h1>
            <p className="ds-body" style={{ color: "var(--foreground-muted)", marginTop: 8 }}>
              Entre em um condomínio para começar a alugar ou anunciar vagas.
            </p>
          </div>

          <button className="action-card primary" onClick={onOpenVaga}>
            <span className="ac-icon"><ion-icon name="enter-outline"></ion-icon></span>
            <span className="ac-text">
              <b>Entrar em um condomínio</b>
              <small>Tenho um código de convite</small>
            </span>
            <ion-icon className="ac-chev" name="chevron-forward"></ion-icon>
          </button>

          <button className="action-card">
            <span className="ac-icon"><ion-icon name="business-outline"></ion-icon></span>
            <span className="ac-text">
              <b>Cadastrar um condomínio</b>
              <small>Sou síndico ou proprietário</small>
            </span>
            <ion-icon className="ac-chev" name="chevron-forward"></ion-icon>
          </button>

          <div className="reassure">
            <ion-icon name="shield-checkmark"></ion-icon>
            Pagamento protegido · Moradores verificados
          </div>
        </div>
      </div>
      <BottomTabs active="home" />
    </React.Fragment>
  );
}

/* ====================== 3. PARKING-SPACE DETAIL ====================== */
function VagaDetail({ onBack }) {
  const days = [
    { dn: "seg", dd: "02", s: "avail" },
    { dn: "ter", dd: "03", s: "avail" },
    { dn: "qua", dd: "04", s: "off" },
    { dn: "qui", dd: "05", s: "avail" },
    { dn: "sex", dd: "06", s: "avail" },
    { dn: "sáb", dd: "07", s: "off" },
    { dn: "dom", dd: "08", s: "avail" },
  ];
  return (
    <React.Fragment>
      <div className="screen-body" style={{ padding: 0 }}>
        <div className="hero-photo">
          <button className="hero-back" onClick={onBack} aria-label="Voltar">
            <ion-icon name="chevron-back"></ion-icon>
          </button>
          <div className="ph"><ion-icon name="car-sport-outline"></ion-icon>Foto · garagem coberta</div>
          <div className="scrim" />
          <div className="hero-dots"><i className="on" /><i /><i /></div>
        </div>

        <div className="detail-body">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Chip icon="checkmark-circle">Disponível</Chip>
            <span className="meta-row" style={{ fontSize: 13 }}><ion-icon name="star"></ion-icon>4,9 · 23 reservas</span>
          </div>

          <div>
            <h2 className="ds-h2">Vaga coberta · Bloco B</h2>
            <div className="meta-row" style={{ marginTop: 6 }}>
              <ion-icon name="location-outline"></ion-icon>
              Cond. Jardim das Acácias · Subsolo 1
            </div>
          </div>

          <div className="price-big">R$ 12,00 <small>/dia</small></div>

          <div className="divider" />

          <div className="host-row">
            <span className="avatar">MA</span>
            <span className="hr-text">
              <b>Marina Alves</b>
              <span className="verified"><ion-icon name="checkmark-circle"></ion-icon>Morador verificado</span>
            </span>
            <button className="iconbtn" aria-label="Mensagem" style={{ marginLeft: "auto" }}>
              <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
            </button>
          </div>

          <div className="divider" />

          <div>
            <h4 className="ds-h4" style={{ marginBottom: 12 }}>Disponibilidade</h4>
            <div className="cal">
              {days.map(d => (
                <div key={d.dd} className={`day ${d.s}`}>
                  <span className="dn">{d.dn}</span>
                  <span className="dd">{d.dd}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="ds-small" style={{ lineHeight: 1.55 }}>
            Vaga coberta e demarcada, próxima ao elevador do Bloco B. Acesso por
            controle remoto. Ideal para carros de passeio. Cancelamento gratuito
            até 24h antes.
          </p>
        </div>
      </div>

      <div className="sticky-cta">
        <div className="sc-price">
          <b>R$ 12 <span style={{ fontWeight: 500, fontSize: 13 }}>/dia</span></b>
          <small>disponível hoje</small>
        </div>
        <Button>Reservar vaga</Button>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { SignIn, DecisionHome, VagaDetail });

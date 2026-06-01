/* Hostpark Mobile UI Kit — Round 2 screens (4, 5, 6) */
const { useState: useStateS2 } = React;

/* ===================== 4. VERIFY RESIDENCE (UPLOAD) ===================== */
function VerifyResidence({ onBack, onSubmit }) {
  const [loading, setLoading] = useStateS2(false);
  const go = () => { setLoading(true); setTimeout(() => { setLoading(false); onSubmit(); }, 1000); };
  return (
    <React.Fragment>
      <div className="topbar titled">
        <div className="tb-side">
          <button className="iconbtn ghost" onClick={onBack} aria-label="Voltar">
            <ion-icon name="chevron-back"></ion-icon>
          </button>
        </div>
        <span className="step-ind">Passo 3 de 3</span>
        <div className="tb-side right" />
      </div>
      <div className="screen-body">
        <div className="pad">
          <div className="hero" style={{ padding: "4px 0 0" }}>
            <h1 className="ds-h1" style={{ fontSize: 26 }}>Comprovante de residência</h1>
            <p className="ds-body" style={{ color: "var(--foreground-muted)", marginTop: 8 }}>
              Anexe um comprovante recente em seu nome para que o síndico aprove
              sua entrada.
            </p>
          </div>

          <button className="dropzone">
            <ion-icon className="dz-icon" name="cloud-upload-outline"></ion-icon>
            <b>Toque para anexar</b>
            <small>PDF, JPG ou PNG (máx. 10 MB)</small>
          </button>

          <div className="file-row">
            <span className="fr-icon"><ion-icon name="document-text-outline"></ion-icon></span>
            <span className="fr-text">
              <b>Conta de luz — março.pdf</b>
              <small>1,2 MB</small>
            </span>
            <button className="fr-remove">Remover</button>
          </div>

          <div className="trust-row">
            <ion-icon name="lock-closed"></ion-icon>
            Seu documento é visto apenas pelo síndico do seu condomínio. Não é
            compartilhado com outros moradores.
          </div>
        </div>
      </div>
      <div className="sticky-cta">
        <Button block loading={loading} onClick={go}>Enviar para análise</Button>
      </div>
    </React.Fragment>
  );
}

/* ===================== 5. ACTIVE-CONDO HOME ===================== */
function ActiveHome({ logoSrc, onOpenVaga }) {
  const vagas = [
    { n: "Vaga 12", status: "Disponível", kind: "success", price: "R$ 24 /dia" },
    { n: "Vaga 07", status: "Reservada", kind: "info", price: "R$ 18 /dia" },
    { n: "Vaga 21", status: "Pausada", kind: "muted", price: "R$ 20 /dia" },
  ];
  const shortcuts = [
    { label: "Encontrar vaga", icon: "search-outline" },
    { label: "Anunciar vaga", icon: "add-outline" },
    { label: "Mural do condomínio", icon: "chatbubbles-outline" },
  ];
  return (
    <React.Fragment>
      <TopBar logoSrc={logoSrc} />
      <div className="screen-body">
        <div style={{ padding: "8px 20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="home-head">
            <span className="ds-overline">Boa tarde, Marina</span>
            <h1 className="ds-h1">Edifício Aurora</h1>
            <div className="sub">Apto 304 · 2 vagas anunciadas</div>
          </div>

          {/* Próxima reserva */}
          <div>
            <div className="sec-head" style={{ marginBottom: 10 }}><h4 className="ds-h4">Próxima reserva</h4></div>
            <div className="next-card">
              <div className="next-top">
                <div className="cal-tile"><span className="ct-d">14</span><span className="ct-m">abr</span></div>
                <div className="nc-text">
                  <b>Vaga 12 · Subsolo</b>
                  <small>Anfitrião: Carlos M.</small>
                </div>
                <Chip kind="success">Confirmada</Chip>
              </div>
              <div className="next-bot">
                <span className="np">R$ 24 <small>/dia</small></span>
                <button className="text-link" onClick={onOpenVaga}>Ver detalhes <ion-icon name="chevron-forward"></ion-icon></button>
              </div>
            </div>
          </div>

          {/* Suas vagas anunciadas */}
          <div>
            <div className="sec-head" style={{ marginBottom: 10 }}>
              <h4 className="ds-h4">Suas vagas anunciadas</h4>
              <a href="#">Ver todas</a>
            </div>
            <div className="hscroll">
              {vagas.map(v => (
                <div className="mini-vaga" key={v.n} onClick={onOpenVaga}>
                  <div className="mv-photo"><ion-icon name="car-sport-outline"></ion-icon></div>
                  <div className="mv-body">
                    <span className="mv-num">{v.n}</span>
                    <Chip kind={v.kind}>{v.status}</Chip>
                    <span className="mv-price">{v.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Atalhos */}
          <div>
            <div className="sec-head" style={{ marginBottom: 10 }}><h4 className="ds-h4">Atalhos</h4></div>
            <div className="quick-row">
              {shortcuts.map(s => (
                <button className="quick-chip" key={s.label}>
                  <span className="qc-icon"><ion-icon name={s.icon}></ion-icon></span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomTabs active="home" allUnlocked />
    </React.Fragment>
  );
}

/* ===================== 6. MEMBERS LIST (SÍNDICO) ===================== */
function MembersList({ onBack }) {
  const [tab, setTab] = useStateS2("ativos");
  const members = [
    { ini: "MA", name: "Marina Alves", sub: "Apto 304 · Bloco A", role: "Morador", verified: true },
    { ini: "CM", name: "Carlos Mendes", sub: "Apto 112 · Bloco A", role: "Síndico", roleCls: "sindico", verified: true },
    { ini: "JR", name: "João Ribeiro", sub: "Portaria · Bloco A", role: "Porteiro", roleCls: "porteiro" },
    { ini: "BS", name: "Beatriz Souza", sub: "Apto 506 · Bloco B", role: "Morador", selected: true },
    { ini: "LF", name: "Lucas Ferreira", sub: "Apto 208 · Bloco B", role: "Morador" },
    { ini: "PR", name: "Patrícia Rocha", sub: "Apto 401 · Bloco C", role: "Morador" },
  ];
  return (
    <React.Fragment>
      <div className="topbar titled">
        <div className="tb-side">
          <button className="iconbtn ghost" onClick={onBack} aria-label="Voltar"><ion-icon name="chevron-back"></ion-icon></button>
        </div>
        <span className="tb-title">Membros</span>
        <div className="tb-side right">
          <button className="iconbtn ghost" aria-label="Buscar"><ion-icon name="search-outline"></ion-icon></button>
        </div>
      </div>
      <div className="screen-body">
        <div className="statusfilter">
          <button className={tab === "ativos" ? "on" : ""} onClick={() => setTab("ativos")}>Ativos (28)</button>
          <button className={tab === "pendentes" ? "on" : ""} onClick={() => setTab("pendentes")}>Pendentes (3)</button>
          <button className={tab === "removidos" ? "on" : ""} onClick={() => setTab("removidos")}>Removidos (4)</button>
        </div>
        <div className="filterbar">
          <button className="filter-chip">Função: Todos <ion-icon name="chevron-down"></ion-icon></button>
          <button className="filter-chip">Bloco: Todos <ion-icon name="chevron-down"></ion-icon></button>
        </div>
        <div className="member-list">
          {members.map(m => (
            <div className={`member ${m.selected ? "selected" : ""}`} key={m.name}>
              <span className="avatar sm">{m.ini}</span>
              <div className="m-text">
                <div className="m-name">
                  <b>{m.name}</b>
                  {m.verified && <span className="verified sm"><ion-icon name="checkmark-circle"></ion-icon></span>}
                </div>
                <div className="m-sub">{m.sub}</div>
              </div>
              <span className={`role-badge ${m.roleCls || ""}`}>{m.role}</span>
              <button className="ov-btn" aria-label="Mais opções"><ion-icon name="ellipsis-horizontal"></ion-icon></button>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { VerifyResidence, ActiveHome, MembersList });

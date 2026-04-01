import './App.css';

function App() {
  return (
    <div className="app">
      <header className="topbar">
        <span className="topbar-label">Cloud Native Ecosystem</span>
        <span className="topbar-year">2026</span>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">
            <span className="line line-1">Build Anywhere,</span>
            <span className="line line-2">Run Everywhere.</span>
          </h1>
          <ul className="agnostic-list">
            <li className="agnostic-item ag-1">Vendor-Agnostic.</li>
            <li className="agnostic-item ag-2">Platform-Agnostic.</li>
            <li className="agnostic-item ag-3">Model-Agnostic.</li>
          </ul>
          <div className="hero-divider" />
          <p className="hero-desc">
            특정 벤더에 종속되지 않는 클라우드 네이티브 생태계.<br />
            <em>표준 위에서 구축하고, 어디서든 실행한다.</em>
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;

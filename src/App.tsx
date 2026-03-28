import './App.css';

function App() {
  return (
    <div className="app">
      <section className="hero">
        <div className="hero-bg">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="blob blob-4" />
          <div className="blob blob-5" />
        </div>
        <div className="grain" />
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-line line-1">대한민국의</span>
            <span className="hero-line line-2">모든 테크 행사를</span>
            <span className="hero-line line-3">응원합니다.</span>
          </h1>
          <p className="hero-sub">We cheer for every tech event in Korea</p>
        </div>
      </section>
    </div>
  );
}

export default App;

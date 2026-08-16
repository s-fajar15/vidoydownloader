import React, { useState, useRef } from 'react';

function App() {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  
  const downloaderRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

  const scrollToDownloader = () => {
    downloaderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExtract = async (e) => {
    e.preventDefault();
    if (!urlInput) return;

    setLoading(true);
    setVideoData(null);
    setErrorMsg('');

    try {
      const response = await fetch(`${API_BASE_URL}/extract?url=${encodeURIComponent(urlInput)}`);
      const data = await response.json();

      if (response.ok && data.sourceUrl) {
        setVideoData(data);
      } else {
        setErrorMsg(data.error || 'Gagal mengekstrak video');
      }
    } catch (err) {
      setErrorMsg('Kesalahan koneksi ke server.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!videoData || !videoData.sourceUrl) return;
    const downloadUrl = `${API_BASE_URL}/download?url=${encodeURIComponent(videoData.sourceUrl)}&title=${encodeURIComponent(videoData.title || '')}&id=${encodeURIComponent(videoData.id)}`;
    window.location.href = downloadUrl;
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-canvas">
      
      <nav className="navbar navbar-expand-lg bg-canvas py-3 px-4 border-bottom border-light">
        <div className="container-fluid max-w-1280">
          <a className="navbar-brand fw-bold text-ink d-flex align-items-center" href="#">
            Vidoy
          </a>
          <button className="btn btn-secondary-brand px-4 py-2" onClick={scrollToDownloader}>
            Mulai unduh
          </button>
        </div>
      </nav>

      <header className="container text-center section-band mt-4 flex-grow-1 d-flex flex-column justify-content-center">
        <h1 className="hero-title text-ink mb-4">
          Unduh video tanpa batas, lebih cepat dan real-time
        </h1>
        <p className="fs-5 mb-5 mx-auto text-body" style={{ maxWidth: '680px' }}>
          Alirkan video favorit Anda langsung dari sumbernya. Mendukung format HLS (m3u8) tanpa perlu menyimpannya di disk server terlebih dahulu.
        </p>
        <div>
          <button onClick={scrollToDownloader} className="btn btn-primary-brand">
            Coba sekarang
          </button>
        </div>
      </header>

      <section ref={downloaderRef} className="container section-band">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card-feature">
              <h3 className="mb-4 text-center">Tempel tautan Anda</h3>
              
              <form onSubmit={handleExtract}>
                <div className="mb-4">
                  <input
                    type="url"
                    className="form-control form-control-custom w-100"
                    placeholder="https://vdy.to/v/..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary-brand w-100"
                  disabled={loading}
                >
                  {loading ? 'Memproses tautan...' : 'Proses tautan'}
                </button>
              </form>

              {errorMsg && (
                <div className="mt-4 p-3 bg-canvas border border-dark rounded-2 text-ink d-flex align-items-center">
                  <i className="bi bi-exclamation-circle-fill me-2 text-primary-brand"></i>
                  <span>{errorMsg}</span>
                </div>
              )}

              {videoData && (
                <div className="mt-5 pt-4 border-top border-secondary border-opacity-25">
                  <span className="eyebrow d-block mb-3">Video ditemukan</span>
                  <div className="row g-4 align-items-center bg-canvas p-3 rounded-3 border border-dark border-opacity-10">
                    <div className="col-md-5">
                      {videoData.poster ? (
                        <img src={videoData.poster} alt="Thumbnail" className="thumbnail-img" />
                      ) : (
                        <div className="thumbnail-img bg-ink d-flex align-items-center justify-content-center text-canvas-soft">
                          <span>No image</span>
                        </div>
                      )}
                    </div>
                    <div className="col-md-7">
                      <h4 className="mb-2 text-ink" title={videoData.title || 'Tanpa Judul'}>
                        {videoData.title || 'Tanpa judul'}
                      </h4>
                      <p className="text-body-mid small mb-4">
                        ID: {videoData.id}
                      </p>
                      <button
                        onClick={handleDownload}
                        className="btn btn-secondary-brand w-100"
                      >
                        Unduh video
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <section className="container section-band border-top border-secondary border-opacity-25">
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="p-3">
              <h5 className="mb-3">Super cepat</h5>
              <p className="text-body">Video dialirkan langsung tanpa proses penyimpanan ganda di server.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3">
              <h5 className="mb-3">Aman & terenkripsi</h5>
              <p className="text-body">Sistem mengekstrak token secara otomatis dan mengunci proses unduhan.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3">
              <h5 className="mb-3">Dukungan HLS</h5>
              <p className="text-body">Integrasi FFmpeg di balik layar untuk mengonversi stream M3U8 dengan mulus.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-band text-center mt-auto">
        <span>&copy; {new Date().getFullYear()} Vidoy Downloader by s.fajar15. All rights reserved.</span>
      </footer>

    </div>
  );
}

export default App;

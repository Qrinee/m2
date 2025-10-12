import React from 'react';

const TabZdjecia = ({
  files,
  dropRef,
  onDropFiles,
  onDragOver,
  onDragLeave,
  onFileInputChange,
  toggleCover,
  removeFile,
  onNext,
  onBack,
}) => {
  return (
    <div className="tab-content">
      <h3 className="section-title">Zdjęcia i multimedia</h3>

      <div
        ref={dropRef}
        className="dropzone"
        onDrop={onDropFiles}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <p className="muted">
          Przeciągnij i upuść obrazy lub <strong>Prześlij zdjęcia</strong>
        </p>
        <p className="muted small">
          * Do rzeczywistego przesłania wymagane jest co najmniej jedno zdjęcie.
          Minimalny rozmiar: 500 × 500 pikseli.
        </p>
        <input
          type="file"
          multiple
          accept="image/*,.pdf,video/*"
          onChange={onFileInputChange}
        />
      </div>

      <div className="notes">
        <ol>
          <li>Kliknij dwukrotnie na obrazek, aby oznaczyć go jako zdjęcie tytułowe.</li>
          <li>Zmieniaj kolejność zdjęć, przeciągając je.</li>
          <li>Obsługiwane są również pliki PDF i video (podgląd może być ograniczony).</li>
        </ol>
      </div>

      <div className="thumbs">
        {files.length === 0 ? (
          <div className="empty">Nie wybrano pliku</div>
        ) : (
          files.map((f, idx) => (
            <div
              key={f.id}
              className={`thumb ${f.isCover ? "cover" : ""}`}
            >
              <div
                className="thumb-inner"
                onDoubleClick={() => toggleCover(f.id)}
                title="Dwuklik — ustaw jako zdjęcie tytułowe"
              >
                {f.src ? <img src={f.src} alt={f.file.name} /> : <div className="file-icon">{f.file.type || "plik"}</div>}
              </div>

              <div className="thumb-meta">
                <div className="name">{f.file.name}</div>
                <div className="thumb-actions">
                  <button onClick={() => removeFile(f.id)} className="small-btn">
                    Usuń
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="media-links grid-2">
        <label className="field">
          <div className="field-label">Link do wideo (Vimeo/YouTube)</div>
          <input className="input" placeholder="Wklej link do wideo" />
        </label>
        <label className="field">
          <div className="field-label">Wirtualna wycieczka</div>
          <input className="input" placeholder="Wklej link do wirtualnej wycieczki" />
        </label>
      </div>

      <div className="nav-row">
        <div>
          <button className="btn ghost" onClick={onBack}>
            Wstecz
          </button>
        </div>
        <div>
          <button className="btn" onClick={onNext}>
            Dalej
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabZdjecia;
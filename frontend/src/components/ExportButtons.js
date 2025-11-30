function ExportButtons({ params }) {
  const queryString = new URLSearchParams(params).toString();
  const csvUrl = `http://localhost:3500/export/csv?${queryString}`;
  const jsonUrl = `http://localhost:3500/export/json?${queryString}`;
  return (
    <div className="gumbi">
      <a href={csvUrl} download>
        <button>Preuzmi CSV</button>
      </a>
      <a href={jsonUrl} download>
        <button>Preuzmi JSON</button>
      </a>
    </div>
  );
}

export default ExportButtons;

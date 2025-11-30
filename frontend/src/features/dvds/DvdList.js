import axios from "axios";
import { useState, useEffect } from "react";

const DvdList = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get(
          `http://localhost:3500/datatable?selectedField=${selectedField}&searchText=${searchText}&sortField=${sortField}&sortOrder=${sortOrder}`
        )
        .then((res) => setTableData(res.data))
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false));
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedField, searchText, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return <span>&#10606;</span>;
    return sortOrder === "asc" ? <span>&#10595;</span> : <span>&#10597;</span>;
  };

  if (isLoading) return <p>Učitavanje DVD-a...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="operacije">
        <div className="search">
          <input
            type="text"
            placeholder="Pretraži..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
          >
            <option value="all">Sve</option>
            <option value="naziv">Naziv</option>
            <option value="adresa">Adresa</option>
            <option value="gradskaCetvrt">Gradska četvrt</option>
            <option value="godinaOsnutka">Godina osnutka</option>
            <option value="brojClanova">Broj članova</option>
          </select>
        </div>
        <div className="gumbi">
          <a href="http://localhost:3500/export/csv" download>
            <button>Preuzmi CSV</button>
          </a>
          <a href="http://localhost:3500/export/json" download>
            <button>Preuzmi JSON</button>
          </a>
        </div>
      </div>
      <table className="tablica">
        <thead>
          <tr>
            <th onClick={() => handleSort("naziv")}>
              <div className="th-flex">
                <span>Naziv</span>
                {renderSortIcon("naziv")}
              </div>
            </th>
            <th onClick={() => handleSort("adresa.ulica")}>
              <div className="th-flex">
                <span>Adresa</span>
                {renderSortIcon("adresa.ulica")}
              </div>
            </th>
            <th onClick={() => handleSort("gradska_cetvrt")}>
              <div className="th-flex">
                <span>Gradska četvrt</span>
                {renderSortIcon("gradska_cetvrt")}
              </div>
            </th>
            <th>
              <div className="th-flex">
                <span>Email</span>
              </div>
            </th>
            <th>
              <div className="th-flex">
                <span>Telefon</span>
              </div>
            </th>
            <th>
              <div className="th-flex">
                <span>Web stranica</span>
              </div>
            </th>
            <th>
              <div className="th-flex">
                <span>OIB</span>
              </div>
            </th>
            <th onClick={() => handleSort("godina_osnutka")}>
              <div className="th-flex">
                <span>Godina osnutka</span>
                {renderSortIcon("godina_osnutka")}
              </div>
            </th>
            <th onClick={() => handleSort("broj_clanova")}>
              <div className="th-flex">
                <span>Broj članova</span>
                {renderSortIcon("broj_clanova")}
              </div>
            </th>
            <th>
              <div className="th-flex">
                <span>Vodstvo</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((dvd, index) => (
            <tr key={index}>
              <td>{dvd.naziv}</td>
              <td>{`${dvd.adresa.ulica}, ${dvd.adresa.postanski_broj} ${dvd.adresa.grad}`}</td>
              <td>{dvd.gradska_cetvrt}</td>
              <td>{dvd.email}</td>
              <td>{dvd.telefon}</td>
              <td>{dvd.web_stranica}</td>
              <td>{dvd.oib}</td>
              <td>{dvd.godina_osnutka}</td>
              <td>{dvd.broj_clanova}</td>
              <td>
                {dvd.vodstvo
                  .map(
                    (v) => `${v.uloga}: ${v.ime} ${v.prezime} (${v.kontakt})`
                  )
                  .join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="row-count">Broj redaka: {tableData.length}</p>
    </div>
  );
};

export default DvdList;

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
  const filterFields = {
    naziv: "naziv",
    adresa: ["adresa.ulica", "adresa.postanski_broj", "adresa.grad"],
    gradskaCetvrt: "gradska_cetvrt",
    godinaOsnutka: "godina_osnutka",
    brojClanova: "broj_clanova",
  };

  useEffect(() => {
    axios
      .get("http://localhost:3500/datatable")
      .then((res) => setTableData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  function getValue(obj, path) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  }

  const getSortedData = (data) => {
    if (!sortField) return data;
    return data.sort((a, b) => {
      let aValue = getValue(a, sortField);
      let bValue = getValue(b, sortField);
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return <span>&#10606;</span>;
    return sortOrder === "asc" ? <span>&#10595;</span> : <span>&#10597;</span>;
  };

  const matchesSearch = (obj, search) =>
    JSON.stringify(obj).toLowerCase().includes(search.toLowerCase());

  const filteredData = getSortedData(
    tableData.filter((dvd) => {
      if (!searchText) return true;
      if (selectedField === "all") return matchesSearch(dvd, searchText);
      if (selectedField === "adresa") {
        const keys = filterFields[selectedField];
        return keys.some((key) => {
          let current = key.split(".").reduce((o, k) => o[k], dvd);
          return String(current)
            .toLowerCase()
            .includes(searchText.toLowerCase());
        });
      }
      const key = filterFields[selectedField];
      const value = key.split(".").reduce((o, k) => o[k], dvd);
      return String(value).toLowerCase().includes(searchText.toLowerCase());
    })
  );

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(filteredData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dvd.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    const headers = [
      "Naziv",
      "Adresa",
      "Gradska četvrt",
      "Email",
      "Telefon",
      "Web stranica",
      "OIB",
      "Godina osnutka",
      "Broj članova",
      "Vodstvo",
    ];

    const csvRows = [
      headers.join(","),
      filteredData.map((dvd) => {
        const row = [
          dvd.naziv,
          `${dvd.adresa.ulica}, ${dvd.adresa.postanski_broj} ${dvd.adresa.grad}`,
          dvd.gradska_cetvrt,
          dvd.email,
          dvd.telefon,
          dvd.web_stranica,
          dvd.oib,
          dvd.godina_osnutka,
          dvd.broj_clanova,
          dvd.vodstvo
            .map((v) => `${v.uloga}: ${v.ime} ${v.prezime} (${v.kontakt})`)
            .join(", "),
        ];
        return row.map((cell) => `"${String(cell)}"`).join(",");
      }),
    ];

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dvd.csv";
    a.click();
    URL.revokeObjectURL(url);
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
          <button onClick={downloadCSV}>Preuzmi CSV</button>
          <button onClick={downloadJSON}>Preuzmi JSON</button>
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
          {filteredData.map((dvd, index) => (
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
      <p className="row-count">Broj redaka: {filteredData.length}</p>
    </div>
  );
};

export default DvdList;

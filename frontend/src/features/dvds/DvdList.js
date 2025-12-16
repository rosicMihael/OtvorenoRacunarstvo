import { useState, useEffect } from "react";
import ExportButtons from "../../components/ExportButtons";
import { Link } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import api from "../../api/api";

const DvdList = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    setQueryParams({ selectedField, searchText, sortField, sortOrder });
  }, [selectedField, searchText, sortField, sortOrder]);

  useEffect(() => {
    const timer = setTimeout(() => {
      api
        .get("/dvdi", { params: queryParams })
        .then((response) => setTableData(response.data.response))
        .catch((error) => setError(error.response.message))
        .finally(() => setIsLoading(false));
    }, 500);
    return () => clearTimeout(timer);
  }, [queryParams]);

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

  if (isLoading) return <p className="loader">Učitavanje DVD-a...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div>
      <div className="operacije">
        <div className="search">
          <input
            type="text"
            placeholder="Pretraži..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            title="search-input"
            name="search-input"
            id="search-input"
          />
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            title="select-filter"
            name="select-filter"
          >
            <option value="all">Sve</option>
            <option value="naziv">Naziv</option>
            <option value="adresa">Adresa</option>
            <option value="gradskaCetvrt">Gradska četvrt</option>
            <option value="godinaOsnutka">Godina osnutka</option>
            <option value="brojClanova">Broj članova</option>
          </select>
        </div>
        <div className="filterPage">
          <span>Lista gradskih četvrti: </span>
          <Link to="/dvdi/gradska_cetvrt">Pogledaj&rarr;</Link>
        </div>
        <div className="filterPage">
          <span>Lista mailova: </span>
          <Link to="/dvdi/email">Pogledaj&rarr;</Link>
        </div>
        <div className="filterPage">
          <span>Lista web stranica: </span>
          <Link to="/dvdi/web_stranica">Pogledaj&rarr;</Link>
        </div>
        <ExportButtons params={queryParams} />
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
            <th onClick={() => handleSort("adresa")}>
              <div className="th-flex">
                <span>Adresa</span>
                {renderSortIcon("adresa")}
              </div>
            </th>
            <th onClick={() => handleSort("gradskaCetvrt")}>
              <div className="th-flex">
                <span>Gradska četvrt</span>
                {renderSortIcon("gradskaCetvrt")}
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
            <th onClick={() => handleSort("godinaOsnutka")}>
              <div className="th-flex">
                <span>Godina osnutka</span>
                {renderSortIcon("godinaOsnutka")}
              </div>
            </th>
            <th onClick={() => handleSort("brojClanova")}>
              <div className="th-flex">
                <span>Broj članova</span>
                {renderSortIcon("brojClanova")}
              </div>
            </th>
            <th>
              <div className="th-flex">
                <span>Vodstvo</span>
              </div>
            </th>
            <th>
              <div className="th-flex">
                <span>Detalji</span>
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
              <td className="tablica-detalji">
                <Link to={`/dvdi/id/${dvd.dvd_id}`}>
                  <FaArrowUpRightFromSquare />
                </Link>
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

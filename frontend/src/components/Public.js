const Public = () => {
  return (
    <div className="public">
      <div className="or">
        <h1>Otvoreno računarstvo</h1>
        <hr />
        <p>
          Ovaj repozitorij sadrži skup podataka korišten u laboratorijskim
          vježbama iz kolegija Otvoreno računarstvo. Svi podaci su{" "}
          <b>javno dostupni </b> i <b>pravilno licencirani</b>.
        </p>
        <p>
          <b>Izvori:</b>{" "}
          <a href="https://www.vzgz.hr/">Vatrogasna zajednica grada Zagreba</a>,{" "}
          <a href="https://data.gov.hr/ckan/dataset/geoportal-vatrogasci">
            Portal otvorenih podataka
          </a>{" "}
          <br />
          <b>Autor:</b> Mihael Rošić <br />
          <b>Verzija skupa podataka:</b> 2.0 (2. laboratorijska vježba) <br />
          <b>Jezik podataka:</b> hrvatski <br />
          <b>Licencija:</b>{" "}
          <a href="https://creativecommons.org/publicdomain/zero/1.0/legalcode.hr">
            Creative Commons Zero (CC0 1.0)
          </a>
        </p>
        <p>
          CC0 je javna licencija kojom se autor u potpunosti odriče svih
          autorskih i srodnih prava na svoje djelo, čineći ga dostupnim svima za
          slobodno korištenje u bilo koju svrhu.
          <br />
          Ne traži se navođenje autora niti postoje ograničenja u preradi,
          dijeljenju ili komercijalnoj upotrebi. CC0 se često koristi za
          znanstvene podatke, baze podataka i javne informacije.
        </p>
      </div>
      <div className="napomena">
        <h1>Napomena o izvoru</h1>
        <hr />
        <p>
          Informacije se temelje na javno dostupnim podacima objavljenim na
          mrežnim stranicama <b>Vatrogasna zajednica grada Zagreba (VZGZ)</b> i{" "}
          <b>Portal otvorenih podataka.</b>
          <br />
          Podaci su ručno obrađeni i prilagođeni kako bi bili strukturirani i
          otvoreno dostupni.
        </p>
      </div>
    </div>
  );
};

export default Public;

import React from "react";

const func = (pvd) => {
  if (pvd === "" || pvd === "?") return <span> - </span>;
  return pvd;
};

const PageViewer = ({ pageViewerData, onButtonPress }) => {
  const pvd = pageViewerData[0];

  return (
    <div className="container shadow-lg p-5 mb-5 mt-3 bg-white rounded text-center">
      <h1
        style={{
          color: "#696969",
          border: "1px solid #ced4da",
          borderRadius: "0.25rem",
          background: "#e9ecef",
          fontSize: "1.7rem",
          padding: "0rem .75rem",
          fontWeight: "400",
          lineHeight: "1.5",
          marginBottom: "1.2rem",
        }}
      >
        ΕΠΙΣΚΟΠΗΣΗ ΦΟΥΡΝΙΑΣ
      </h1>
      <div>
        {[
          { data: "date", text: "Ημερομηνία" },
          { data: "machine", text: "Μηχανή" },
          { data: "fournia", text: "Φουρνιά" },
          { data: "operator", text: "Χειριστής" },
          { data: "coating", text: "Επίστρωση" },
          { data: "fakoi", text: "Σύνολο Φακών" },
          { data: "fakoiApothikis", text: "Φακοί Αποθήκης (4άρια)" },
          { data: "samples", text: "Δείγματα" },
          { data: "startTime", text: "Έναρξη" },
          { data: "endTime", text: "Λήξη" },
          { data: "delay", text: "Καθυστέρηση" },
          { data: "test", text: "Test" },
          { data: "note", text: "Παρατήρηση" },
          { data: "ksevama", text: "Ξέβαμα" },
          { data: "damages", text: "Ζημιές" },
        ].map((i) => (
          <div key={i.text}>
            {" "}
            <h4>{i.text}</h4>
            <p style={{ fontSize: "1.2rem" }}>
              {i.data === "date"
                ? func(pvd[i.data].split("-").reverse().join("/"))
                : i.data === "coating"
                ? func(pvd[i.data].toUpperCase())
                : func(pvd[i.data])}
            </p>
          </div>
        ))}
        <br />
        <button
          id="pvEdit"
          className="btn btn-info float-left"
          onClick={onButtonPress}
        >
          Επεξεργασία
        </button>
        <button
          id="back"
          className="btn btn-secondary float-right"
          onClick={onButtonPress}
        >
          Επιστροφή
        </button>
      </div>
    </div>
  );
};

export default PageViewer;

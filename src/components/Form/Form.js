import React from "react";
import {
  Container,
  ButtonGroup,
  ToggleButton,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
} from "react-bootstrap";

const formFields = [
  {
    name: "fakoi",
    text: "ΣΥΝΟΛΟ ΦΑΚΩΝ*",
    min: "1",
    type: "number",
  },
  {
    name: "fakoiApothikis",
    text: "ΦΑΚΟΙ ΑΠΟΘΗΚΗΣ (4άρια)",
    min: "0",
    type: "number",
  },
  {
    name: "samples",
    text: "ΔΕΙΓΜΑΤΑ",
    min: "0",
    type: "number",
  },
  {
    name: "startTime",
    text: "ΕΝΑΡΞΗ*",
    min: "0",
    type: "time",
  },
  {
    name: "endTime",
    text: "ΛΗΞΗ*",
    min: "0",
    type: "time",
  },
  {
    name: "delay",
    text: "ΚΑΘΥΣΤΕΡΗΣΗ (λεπτά)",
    min: "0",
    type: "number",
  },
  {
    name: "note",
    text: "ΠΑΡΑΤΗΡΗΣΗ",
    min: null,
    type: "text",
  },
  {
    name: "ksevama",
    text: "ΞΕΒΑΜΑ (τεμ)",
    min: "0",
    type: "number",
  },
  {
    name: "damages",
    text: "ΖΗΜΙΕΣ",
    min: "0",
    type: "number",
  },
];

class Form extends React.Component {
  render() {
    return (
      <Container>
        <form
          onSubmit={this.props.onSubmit}
          className="container shadow-lg p-3 mb-5 mt-3 bg-white rounded"
        >
          <h1
            style={{
              color: "#696969",

              border: "1px solid #ced4da",
              display: "inline-block",
              borderRadius: "0.25rem",
              background: "#e9ecef",
              fontSize: "1.7rem",
              padding: "0rem .75rem",
              fontWeight: "400",
              lineHeight: "1.5",
            }}
          >
            {this.props.edit
              ? `ΕΠΕΞΕΡΓΑΣΙΑ ΦΟΥΡΝΙΑΣ ${this.props.data.id}`
              : "ΚΑΤΑΧΩΡΗΣΗ ΦΟΥΡΝΙΑΣ"}
          </h1>
          <div className="row">
            <div className="col">
              <label className="input-group-text">ΗΜΕΡΟΜΗΝΙΑ*</label>
              <br />
              <input
                type="date"
                name="date"
                value={this.props.data.date}
                onChange={this.props.handleChange}
                className="form-control"
                required
              />
              <hr />
              <label id="machines" className="input-group-text text-center">
                ΜΗΧΑΝΗ*
              </label>
              {this.props.data.par1}
              <div className="d-flex flex-column overflow-auto">
                <ButtonGroup toggle className="mt-0 ml-4">
                  {["S-360", "S-380", "BAK", "OAK", "SUPRA"].map((machine) => (
                    <ToggleButton
                      key={machine}
                      type="radio"
                      name="machine"
                      value={machine}
                      checked={this.props.data.machine === machine}
                      onChange={this.props.handleChange}
                      className="form-check-input border shadow-sm rounded"
                      required
                    >
                      {" "}
                      {machine}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
              {this.props.data.machine && (
                <div>
                  <hr />
                  <label className="input-group-text text-center">
                    ΦΟΥΡΝΙΑ*{" "}
                  </label>
                  {this.props.data.par2}
                  <div className="d-flex flex-column overflow-auto">
                    <ButtonGroup toggle className="mt-0 ml-4">
                      {[...Array(15).keys()].map((num) => (
                        <ToggleButton
                          key={num}
                          type="radio"
                          name="fournia"
                          value={num + 1}
                          checked={this.props.data.fournia === String(num + 1)}
                          onChange={this.props.handleChange}
                          className="form-check-input border shadow-sm rounded"
                          style={{ padding: ".375rem 0.55rem" }}
                          required
                        >
                          {" "}
                          {num + 1}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                  </div>
                </div>
              )}
              {this.props.data.fournia !== "?" &&
              this.props.data.machine !== "SUPRA" ? (
                <div>
                  <hr />
                  <label className="input-group-text text-center">
                    ΕΠΙΣΤΡΩΣΗ*{" "}
                  </label>
                  {this.props.data.par3}
                  <div className="d-flex flex-column">
                    <ButtonGroup toggle className="mt-0 ml-4">
                      {["alize", "trio", "sun"].map((coating) => (
                        <ToggleButton
                          key={coating}
                          type="radio"
                          name="coating"
                          value={coating}
                          checked={this.props.data.coating === coating}
                          onChange={this.props.handleChange}
                          className="form-check-input border shadow-sm rounded"
                          required
                        >
                          {" "}
                          {coating.toUpperCase()}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                  </div>
                </div>
              ) : null}
              <hr />
              <FormGroup>
                <FormLabel className="input-group-text">ΧΕΙΡΙΣΤΗΣ*</FormLabel>
                <FormControl
                  as="select"
                  name="operator"
                  value={this.props.data.operator}
                  onChange={this.props.handleChange}
                  required
                >
                  {[
                    "",
                    "Άννα",
                    "Αντώνης",
                    "Γιάννης",
                    "Γιώργος",
                    "Ηλίας 1",
                    "Ηλίας 2",
                    "Κώστας",
                    "Μάριος",
                    "Χρήστος",
                  ].map((operator) => (
                    <option key={operator} value={operator}>
                      {operator === "" ? "Επιλέξτε χειριστή" : operator}
                    </option>
                  ))}
                </FormControl>
              </FormGroup>
              <hr />

              {formFields.map((form) => (
                <div key={form.name}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>{form.text}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      type={form.type}
                      min={form.min}
                      name={form.name}
                      value={this.props.data[form.name]}
                      onChange={this.props.handleChange}
                      required={
                        form.name === "fakoi" ||
                        form.name === "startTime" ||
                        form.name === "endTime"
                          ? true
                          : false
                      }
                    />
                  </InputGroup>
                  <hr />
                </div>
              ))}
              <div className="d-flex flex-column">
                <label className="input-group-text">TEST* </label>
                {!this.props.test && this.props.data.testpar}
                <ButtonGroup toggle className="mt-0 ml-4">
                  {["Ναι", "Όχι"].map((t) => (
                    <ToggleButton
                      key={t}
                      type="radio"
                      name="test"
                      value={t}
                      checked={this.props.data.test === t}
                      onChange={this.props.handleChange}
                      className="form-check-input border shadow-sm rounded"
                      required
                    >
                      {" "}
                      {t}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
              <br />
              <br />
            </div>
          </div>
          <button className="btn btn-info">Αποθήκευση</button>{" "}
          {this.props.data.dbSuccess && (
            <i className="fas fa-check text-success" />
          )}{" "}
          <button
            id="cancel"
            className="btn btn-secondary float-right"
            onClick={this.props.onButtonPress}
          >
            Επιστροφή
          </button>
        </form>
      </Container>
    );
  }
}

export default Form;

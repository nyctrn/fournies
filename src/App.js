import React from "react";

import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import Form from "./components/Form/Form";
import TableComp from "./components/TableComp/TableComp";
import Filter from "./components/Filter";
import PageViewer from "./components/PageViewer";
import Buttons from "./components/Buttons";
import Container from "react-bootstrap/Container";
import firebase from "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      id: 0,
      homePage: true,
      time: "",
      date: "",
      machine: "",
      fournia: "?",
      operator: "",
      coating: "",
      fakoi: "",
      fakoiApothikis: "",
      samples: "",
      startTime: "",
      endTime: "",
      delay: "",
      test: "",
      note: "",
      ksevama: "",
      damages: "",
      testClick: true,
      par1: "",
      par2: "",
      par3: "",
      testpar: "",
      edit: false,
      editData: "",
      dbSuccess: false,
      delId: "",
      delPressed: false,
      filter: false,
      filterData: [],
      pageViewer: true,
      pageViewerData: [],
      table: true,
      form: false,
      spinner: false,
      emptyArrayMsg: false,
      sideDrawerOpen: false,
    };
  }
  writeData = () => {
    let database = firebase.database();
    database.ref().set(this.state.data);
  };

  componentDidMount() {
    console.log(process.env.REACT_APP_API_KEY);
    this.setState({ spinner: true });

    firebase
      .database()
      .ref()
      .on("value", (snapshot) => {
        snapshot.val() === null &&
          this.setState({ spinner: false, emptyArrayMsg: true });
        if (snapshot && snapshot.exists()) {
          let dbItems = [...snapshot.val()];
          let lastDbItem = dbItems.pop();
          this.setState({
            data: snapshot.val(),
            id: lastDbItem.id + 1,
            spinner: false,
          });
        }
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      this.writeData();
      this.state.emptyArrayMsg && this.setState({ emptyArrayMsg: false });
    }
  }

  handleData = (fournies) => {
    const dataState = [...this.state.data];

    const fourniesData = { ...fournies };

    const {
      data,
      delId,
      delPressed,
      editData,
      homePage,
      dbSuccess,
      testClick,
      pageViewer,
      pageViewerData,
      spinner,
      table,
      form,
      filter,
      filterData,
      sideDrawerOpen,
      emptyArrayMsg,
      par1,
      par2,
      par3,
      testpar,

      ...rest
    } = fourniesData;

    dataState.push({ ...rest });

    this.setState({ data: dataState });

    this.setState({
      time: "",
      date: "",
      machine: "",
      fournia: "?",
      operator: "",
      coating: "",
      fakoi: "",
      fakoiApothikis: "",
      samples: "",
      startTime: "",
      endTime: "",
      delay: "",
      test: "",
      note: "",
      ksevama: "",
      damages: "",
      testClick: true,
      par1: "",
      par2: "",
      par3: "",
      testpar: "",
      edit: false,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleEditChange = (event) => {
    this.setState({
      editData: {
        ...this.state.editData,
        ...{ [event.target.name]: event.target.value },
      },
    });
  };

  editHandler = (e, id) => {
    e.preventDefault();
    this.state.edit === false
      ? this.setState({
          edit: true,
          homePage: false,
          pageViewer: false,
          table: false,
          form: false,
        })
      : this.setState({ edit: false, homePage: true });
    this.state.data.map((el) =>
      el.id === id ? this.setState({ editData: { ...el } }) : el
    );
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (event.target.id === "cancel") {
      return this.setState({
        homePage: true,
        edit: false,
        table: true,
        form: false,
        pageViewer: false,
      });
    }

    if (this.state.machine === "") {
      this.setState({
        par1: (
          <p className="input-group-text text-center bg-danger d-block text-white text-center">
            Παρακαλώ επιλέξτε μηχανή, φουρνιά & επίστρωση
          </p>
        ),
      });
    } else if (this.state.fournia === "?") {
      this.setState({
        par1: "",
        par2: (
          <p className="input-group-text text-center bg-danger d-block text-white text-center">
            Παρακαλώ επιλέξτε φουρνιά
          </p>
        ),
      });
    } else if (this.state.coating === "") {
      this.setState({
        par1: "",
        par2: "",
        par3: (
          <p className="input-group-text text-center bg-danger d-block text-white text-center">
            Παρακαλώ επιλέξτε επίστρωση
          </p>
        ),
      });
    } else {
      this.setState({ par1: "", par2: "", par3: "" });
    }
    if (this.state.test === "") {
      this.setState({
        testpar: (
          <p className="input-group-text text-center bg-danger d-block text-white text-center">
            Παρακαλώ επιλέξτε εάν η φουρνία είχε test ή όχι
          </p>
        ),
      });
    } else if (
      this.state.test !== "" &&
      this.state.fournia !== "?" &&
      this.state.coating !== ""
    ) {
      this.handleData(this.state);
      this.dbSuccess();
    }
  };

  onDelPressed = (event, id) => {
    event.preventDefault();
    this.setState({ delId: id, delPressed: true });
    if (event.target.id === "cancelDel") {
      this.setState({ delPressed: false });
    } else if (event.target.id === "confirmDel") {
      this.onEditSubmit(event, id);
    }
  };

  onEditSubmit = (event, id) => {
    event.preventDefault();

    if (event.target.id === "confirmDel") {
      let foundIndex = this.state.data.findIndex((el) => el.id === id);
      let newArr = [...this.state.data];
      newArr.splice(foundIndex, 1);
      this.setState({ data: newArr });

      if (this.state.filter) {
        const filtered = this.state.filterData.filter(
          (fournia) => fournia.id !== id
        );
        this.setState({ filterData: filtered });
      }
    } else if (event.target.id === "editCancel") {
      this.setState({
        homePage: true,
        edit: false,
        table: true,
        form: false,
        pageViewer: false,
      });
    } else {
      let foundIndex = this.state.data.findIndex((el) => el.id === id);
      let newArr = [...this.state.data];
      let editData = { ...this.state.editData };
      newArr.splice(foundIndex, 1, editData);

      this.setState({
        data: newArr,
        homePage: true,
        edit: false,
        table: true,
        form: false,
        pageViewer: false,
      });
    }

    this.setState({ edit: false });
  };

  dbSuccess = () => {
    this.setState({ dbSuccess: true });
    setTimeout(() => {
      this.setState({ dbSuccess: false });
    }, 2200);
  };

  onFilter = (e) => {
    if (e.target.id === "noFilter") {
      this.setState({ filter: false });
    } else if (e.target.id === "s360") {
      const s360 = this.state.data.filter((item) => item.machine === "s-360");
      this.setState({ filter: true, filterData: s360 });
    } else if (e.target.id === "s380") {
      const s380 = this.state.data.filter((item) => item.machine === "s-380");
      this.setState({ filter: true, filterData: s380 });
    } else if (e.target.id === "bak") {
      const bak = this.state.data.filter((item) => item.machine === "BAK");
      this.setState({ filter: true, filterData: bak });
    } else if (e.target.id === "oak") {
      const oak = this.state.data.filter((item) => item.machine === "OAK");
      this.setState({ filter: true, filterData: oak });
    } else if (e.target.id === "supra") {
      const supra = this.state.data.filter((item) => item.machine === "SUPRA");
      this.setState({ filter: true, filterData: supra });
    }
  };

  onPageViewer = (id) => {
    this.setState({ table: false, pageViewer: true });
    const fournia = this.state.data.filter((fournia) => fournia.id === id);
    this.setState({ pageViewerData: fournia });
  };

  onButtonPress = (event) => {
    event.preventDefault();
    if (event.target.id === "new") {
      this.setState({
        homePage: false,
        edit: false,
        table: false,
        form: true,
        pageViewer: false,
      });
    } else if (event.target.id === "cancel" || event.target.id === "back") {
      this.setState({
        homePage: true,
        edit: false,
        table: true,
        form: false,
        pageViewer: false,
      });
    } else if (event.target.id === "pvEdit") {
      this.setState({
        editData: this.state.pageViewerData[0],
        homePage: false,
        edit: true,
        table: false,
        form: false,
        pageViewer: false,
      });
    }
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <Container
        fluid
        style={{ paddingRight: "0px", paddingLeft: "0px", height: "100vh" }}
      >
        <Toolbar
          drawerToggleClickHandler={this.drawerToggleClickHandler}
          onLogoClick={this.onButtonPress}
        />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}

        <main style={{ marginTop: "25px" }}></main>

        {this.state.form || this.state.edit ? (
          <Form
            edit={this.state.edit}
            handleData={this.handleData}
            handleChange={
              this.state.edit ? this.handleEditChange : this.handleChange
            }
            data={this.state.edit ? this.state.editData : this.state}
            editHandler={this.editHandler}
            onSubmit={this.state.edit ? this.onEditSubmit : this.onSubmit}
            dbSuccess={this.dbSuccess}
            onButtonPress={this.onButtonPress}
            test={this.state.test}
          />
        ) : (
          this.state.homePage && <div></div>
        )}

        {this.state.table && (
          <div>
            <Buttons
              onButtonPress={this.onButtonPress}
              homePage={this.state.homePage}
              edit={this.state.edit}
              table={this.state.table}
              pageViewer={this.state.pageViewer}
              form={this.state.form}
            />
            <Filter onFilter={this.onFilter} />

            <TableComp
              data={this.state.filter ? this.state.filterData : this.state.data}
              editHandler={this.editHandler}
              isEditable={this.state.edit}
              onEditSubmit={this.onEditSubmit}
              delId={this.state.delId}
              onDelPressed={this.onDelPressed}
              delPressed={this.state.delPressed}
              onPageViewer={this.onPageViewer}
              filter={this.state.filter}
              spinner={this.state.spinner}
              emptyArrayMsg={this.state.emptyArrayMsg}
            />
          </div>
        )}

        {this.state.pageViewer && !this.state.table && (
          <div>
            <PageViewer
              pageViewerData={this.state.pageViewerData}
              onButtonPress={this.onButtonPress}
            />
          </div>
        )}
      </Container>
    );
  }
}

export default App;

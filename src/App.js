import React from "react";
import "./App.css";
import "./components/Navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import Job from "./components/Job";

class App extends React.Component {
  state = {
    searchString: "",
    jobs: [],
    totalJobs: 0,
    count: 0,
    size: 20
  };

  updateSearchString = string => {
    this.setState({ searchString: string });
  };

  updateJobs = newJobs => {
    this.setState({ jobs: newJobs, totalJobs: newJobs.length });
  };

  showJobs = () => {
    return this.state.jobs.map((job, key) =>
      key >= this.state.count * this.state.size &&
      key < this.state.count * this.state.size + 20 ? (
        <div key={key} id={"job" + key}>
          <Job
            applyLink={job.applylink}
            title={job.title}
            companyName={job.companyname}
            experience={job.experience}
            skills={job.skills}
            endDate={job.enddate}
            location={job.location}
          ></Job>
        </div>
      ) : (
        ""
      )
    );
  };

  increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decreaseCount = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    return (
      <div className="mb-5 pb-5">
        <Navbar updateJobs={this.updateJobs.bind(this)}></Navbar>
        <div className="container mt-5">
          <h2 className="text-center mt-5 pt-5">Jobs Found</h2>

          <div className="col bg-white p-4 shadow-sm">
            <div className="text-muted my-2 d-flex justify-content-between">
              <div>Total Jobs Found : {this.state.jobs.length}</div>
              <div>
                Showing Jobs : {this.state.count * this.state.size + 1} -
                {this.state.count * this.state.size + 20 < this.state.totalJobs
                  ? this.state.count * this.state.size + 20
                  : this.state.totalJobs}
              </div>
            </div>
            {this.state.jobs.length === 0 ? (
              <div className="p-3 border">No Jobs Found</div>
            ) : (
              this.showJobs()
            )}
            {this.state.count * this.state.size <= this.state.totalJobs ? (
              <div className="ml-auto text-right">
                {this.state.count > 0 ? (
                  <button
                    className="btn btn-light btn-sm ml-auto border m-3"
                    onClick={this.decreaseCount}
                  >
                    Prev
                  </button>
                ) : (
                  ""
                )}
                {this.state.count * this.state.size + 20 <
                this.state.totalJobs ? (
                  <button
                    className="btn btn-light btn-sm ml-auto border m-3"
                    onClick={this.increaseCount}
                  >
                    Next
                  </button>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div>
                <div className="ml auto text-danger mt-3 border">
                  No More Jobs to load
                </div>

                {this.state.count > 0 ? (
                  <button
                    className="btn btn-light btn-sm ml-auto border m-3"
                    onClick={this.decreaseCount}
                  >
                    Prev
                  </button>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

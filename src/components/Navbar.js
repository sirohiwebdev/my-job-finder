import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  state = {
    searchString: "",
    jobs: [],
    url: "https://nut-case.s3.amazonaws.com/jobs.json"
  };
  onChange = event => {
    this.setState({ searchString: [event.target.value] });
  };

  // Send Job variable to Parent Component
  addJobs = jobs => {
    this.props.updateJobs(jobs);
  };

  //Search Jobs and Store in state varible jobs
  findJobs = () => {
    fetch("https://nut-case.s3.amazonaws.com/jobs.json", {
      mode: "cors",
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        const jobs = res.data;

        // console.log(jobs[0]);

        const filteredJobs = this.filterJobsBasedOnSearch(jobs);

        console.log(filteredJobs);
        console.log(
          new RegExp(this.state.searchString, "i").test("Hello World")
        );

        //jobs.filter(job => job.n);

        this.setState(
          {
            jobs: filteredJobs
          },
          () => {
            this.addJobs(this.state.jobs);
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  filterJobsBasedOnSearch = jobsArray => {
    const searchExp = new RegExp(this.state.searchString, "i");

    return jobsArray.filter(
      job =>
        searchExp.test(job.title) ||
        searchExp.test(job.skills) ||
        searchExp.test(job.location) ||
        searchExp.test(job.companyname)
    );
  };

  componentDidMount() {
    this.findJobs();
  }

  onSubmit = e => {
    e.preventDefault();
    this.findJobs();
  };

  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-md green-background fixed-top shadow-sm">
        <a href="#" className="navbar-brand">
          Job Finder
        </a>
        <form className="form-inline ml-auto" onSubmit={this.onSubmit}>
          <div className="form-group col-9">
            <input
              type="text"
              className="form-control shadow-none search-area"
              placeholder="Search for expirence or location or skill"
              onChange={this.onChange}
              value={this.state.searchString}
            />
          </div>
          <div className="form-group col-3">
            <button
              type="button"
              className="btn btn-sm btn-light bg-white w-100"
              onClick={this.findJobs}
            >
              Search
            </button>
          </div>
        </form>

        {this.props.searchString}
      </nav>
    );
  }
}

export default Navbar;

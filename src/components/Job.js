import React, { Component } from "react";

class Job extends Component {
  render() {
    return (
      <a href={this.props.applyLink}>
        <div className="p-3 job-box border mx-auto mb-3">
          <h4>{this.props.title}</h4>
          <h6>{this.props.companyName}</h6>
          <p>
            <strong>Experience</strong> : {this.props.experience}
          </p>
          <p>
            <strong>Skills</strong> : {this.props.skills}
          </p>
          <p>
            <strong>Location</strong> : {this.props.location}
          </p>
          <p>
            <strong>Last Date</strong> : {this.props.endDate}
          </p>
        </div>
      </a>
    );
  }
}

export default Job;

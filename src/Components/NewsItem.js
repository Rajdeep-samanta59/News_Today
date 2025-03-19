import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, ImageUrl, NewsUrl, author, date, source } =
      this.props;
    return (
      <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%" , zIndex:"1"}}>
          {source}
        </span>
        <img
          src={
            ImageUrl
              ? ImageUrl
              : "https://images.hindustantimes.com/tech/img/2022/04/07/1600x900/dinosaur-g14da611f5_1920_1649312518434_1649312529934.jpg"
          }
          className="card-img-top"
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {description ? description.slice(0, 100) : title}...
          </p>
          <p className="card-text">
            <small className="text-muted">
              Published by {author ? author : "Unknown"} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={NewsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;

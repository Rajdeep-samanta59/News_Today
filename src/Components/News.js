import React, { Component } from "react";
import Loading from "./Loading";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'

export class News extends Component {
  
  static defaultProps = {
    pageSize: 9 ,
    country: "in" ,
    category: "general"
  }

  static propTypes = {
    pageSize: PropTypes.number ,
    country: PropTypes.string ,
    category: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }

  async componentDidMount(){
    let url = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2821867c08df416094d0127cf9b63b29&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let details = await fetch(url);
    let parsedData = await details.json();
    this.setState({articles: parsedData.articles , totalResults: parsedData.totalResults , loading: false})
  }

  handlePrevClick = async ()=>{
    let url = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2821867c08df416094d0127cf9b63b29&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let details = await fetch(url);
    let parsedData = await details.json();
    this.setState({articles: parsedData.articles , page: this.state.page - 1 , loading: false})
  }

  handleNextClick = async ()=>{
    let url = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2821867c08df416094d0127cf9b63b29&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let details = await fetch(url);
    let parsedData = await details.json();
    this.setState({articles: parsedData.articles , page: this.state.page + 1 , loading: false})
  }

  capitalize = (string)=>{
    let myStr = string.charAt(0);
    myStr = myStr.toUpperCase();
    return myStr.concat(string.slice(1));
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: "31px 0px" , marginTop: '90px'}}>NewsToday - Top {this.capitalize(this.props.category)} Headlines</h1>
        {this.state.loading && <Loading/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element) => {
          return (
              <div className="col-md-4 my-2" key={element.url}>
                <NewsItem title={element.title} description={element.description} ImageUrl={element.urlToImage} NewsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
          );
        })}
        </div>
        <div className="container my-3 d-flex justify-content-between">
        <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} type="button" className="btn btn-info"> &#8592; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} type="button" className="btn btn-info">Next &#8594;</button>
      </div>
      </div>
    );
  }
}

export default News;

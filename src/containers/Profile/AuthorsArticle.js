import React, { Component } from 'react';
import './AuthorsArticle.scss';



class AuthorsArticle extends Component {


  render() {
    return (
      <div className="authors-article">
        <div className="heading">
          My Recent Articles
        </div>
        <ul className="articles-wrapper">
          <Article />
          <Article />
          <Article />
          <Article />
        </ul>
      </div>
    )
  }
}


export default AuthorsArticle;


function Article (props){
  return (
    <li className="article">
      <a href="#">
        <div className="photo">
          <img 
            src="https://images.pexels.com/photos/1036371/pexels-photo-1036371.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
            alt="article-photo" 
          />
          <div className="title">This is a title</div>
        </div>
        <div className="preview">
          Adipisicing voluptatem itaque laborum doloremque 
          vitae Amet molestias placeat reprehenderit hic labore.
        </div>
        <div className="footer">
          <span className="share">
            <a href="#">SHARE</a>
          </span>
          <span className="view">
            <a href="#">VIEW ARTICLE
            </a>
          </span>
          <span className="edit">
            <a href="#">
              <i className="fas fa-edit"></i>
            </a>
          </span>
          <span className="delete">
            <i className="fas fa-trash-alt"></i>
          </span>
        </div>
      </a> 
    </li>
  )
}

import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Card, CardTitle, Carousel
} from 'react-materialize';
import './CarouselSlider.scss';

export const CarouselSlider = props => (
  <div>
    <Carousel options={{ fullWidth: true, indicators: true }}>
      { props.articles.map((article, index) => {// eslint-disable-line
        return (<div key={ index + 2 }>
          <Row>
            <Col s={12} m={5} l={5} xl={6} className="img-container">
              <img className="img-responsive z-depth-2" src={article.pic}/>
            </Col>
            <Col s={12} m={7} l={7} xl={6}>
              <div className="content">
                <h5 className="secondary-color editor-title">{article.title}</h5>
                <p>
                  {article.body}
                </p>
              </div>
            </Col>
          </Row>
        </div>);
      }) }
    </Carousel>
  </div>
);

CarouselSlider.propTypes = {
  articles: PropTypes.array,
  pic: PropTypes.string
};

export default CarouselSlider;

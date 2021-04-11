import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  connectRange
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';
import PrimarySearchAppBar from './components/search.js'
import { Slider } from '@material-ui/core'

const searchClient = algoliasearch(
  'TC0BSVPYAM',
  '576b32de26d6bf4bbc98d4b81f9369de'
);
const PriceSlider = connectRange(RangeSlider);
const YearSlider = connectRange(RangeSlider);
const QualitySlider = connectRange(RangeSlider);

class App extends Component {

  render() {
    return (
      <React.Fragment>
        {/* <PrimarySearchAppBar /> */}
        <div className="ais-InstantSearch">
          <InstantSearch indexName="dev_cw" searchClient={searchClient}>
            <div id="header">
            </div>
            <div id="content-body">
              <div id="content-body-left">
                <ClearRefinements />
                <h3>Types</h3>
                <RefinementList attribute="type" />
                <h3>Price range</h3>
                <PriceSlider attribute="price" />
                <h3>Year range</h3>
                <YearSlider attribute="year" />
                <h3>Quality range</h3>
                <QualitySlider attribute="quality" />
                <Configure hitsPerPage={8} />
              </div>
              <div id="content-body-right">
                <h1>Bordeaux Wine</h1>
                <SearchBox id="search-box"/>
                <Hits hitComponent={Hit} />
                <div id="pagination">
                  <Pagination />
                </div>
              </div>
              <div id="content-body-filler">
              </div>
            </div>
            <div id="footer">
            </div>
          </InstantSearch>
        </div>
      </React.Fragment>
    );
  }
}

function Hit(props) {
  return (
    <div className="hit">
      <div className="quality-tag">{props.hit.quality}</div>
      <img src={props.hit.image} align="left" alt={props.hit.name} />
      <div className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
      </div>
      <div className="hit-year">
        <Highlight attribute="year" hit={props.hit} />
      </div>
      <div className="hit-price">${props.hit.price}</div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

function RangeSlider({ currentRefinement, min, max, refine }) {

  const handleChange = (event, values) => {
    refine({ min: values[0], max: values[1] });
  };

  return (
    <div>
      <Slider
        value={[currentRefinement.min, currentRefinement.max]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={min}
        max={max}
      />
      <div className="range-slider-label">
        <p>{min}</p>
        <p>{max}</p>
      </div>
    </div>
  );
}

export default App;

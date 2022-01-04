import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const Paginate = props => {
  const { page, size, totalRegions } = props;
  console.log(page);
  const pageTabs = _.range(totalRegions / size);
  console.log(pageTabs);
  return (
    <div className='ui right floated pagination menu'>
      <Link className='item' to='/regions'>
        <i className='step backward icon'></i>
      </Link>
      { 
        pageTabs.map(num => {
          return (
            <Link className='item' to={`/regions?page=${num + 1}&size=${size}`} key={num}>
              {num + 1}
            </Link>
          );
        })
      }
      <Link className='item' to={`/regions?page=${pageTabs[pageTabs.length]}&size=${size}`}>
        <i className='step forward icon'></i>
      </Link>
    </div>
  );
};

export default Paginate;
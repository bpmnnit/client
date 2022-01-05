import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const Paginate = props => {
  const size = props.size;
  const totalRegions = props.totalRegions;
  const pageTabs = _.range(totalRegions / size);
  const [activeItem, setActiveItem] = useState(1);
  const [pageSizeActiveItem, setPageSizeActiveItem] = useState(2);
  const pageSizes = [1, 2, 3];

  const handleClick = (e) => {
    props.getPage(+e.target.innerHTML, pageSizeActiveItem);
    setActiveItem(+e.currentTarget.getAttribute('name'));
  };

  const handleLastPageClick = (e) => {
    props.getPage(totalRegions / size, pageSizeActiveItem);
    setActiveItem(+e.currentTarget.getAttribute('name'));
  };

  const handleFirstPageClick = (e) => {
    props.getPage(1, pageSizeActiveItem);
    setActiveItem(+e.currentTarget.getAttribute('name'));
  };

  const handlePageSizeClick = (e) => {
    const activePage = activeItem === 0 ? 1 : activeItem === -1 ? (totalRegions / size) : activeItem;
    e.preventDefault();
    props.setPageSize(activePage, +e.target.innerHTML);
    setPageSizeActiveItem(+e.currentTarget.getAttribute('name'));
  };

  return (
    <>
      <div className='ui left floated menu'>
        { 
          pageSizes.map(num => {
            return (
              <Link className={pageSizeActiveItem === num ? 'active item' : 'item'} to='/regions' key={num} onClick={handlePageSizeClick} name={num}>
                {num}
              </Link>
            );
          })
        }
      </div>
      <div className='ui right floated pagination menu'>
        <Link className={activeItem === 0 ? 'active item' : 'item'} to='/regions' onClick={handleFirstPageClick} name='0'>
          <i className='step backward icon'></i>
        </Link>
        { 
          pageTabs.map(num => {
            return (
              <Link className={activeItem === (num + 1) ? 'active item' : 'item'} to={'/regions'} key={num} onClick={handleClick} name={num + 1}>
                {num + 1}
              </Link>
            );
          })
        }
        <Link className={activeItem === -1 ? 'active item' : 'item'} to={'/regions'} onClick={handleLastPageClick} name='-1'>
          <i className='step forward icon'></i>
        </Link>
      </div>
    </>
  );
};

export default Paginate;
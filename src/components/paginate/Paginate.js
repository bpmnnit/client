import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const Paginate = props => {
  const size = props.size;
  const total = props.total;
  const pageTabs = _.range(total / size);
  const [activeItem, setActiveItem] = useState(1);
  const [start, setStart] = useState(0);
  const pageSize = 30;
  const parent = '/' + props.parent;

  const handleClick = (e) => {
    props.getPage(+e.target.innerHTML, pageSize);
    setActiveItem(+e.currentTarget.getAttribute('name'));
  };

  const handleLastPageClick = (e) => {
    props.getPage(Math.ceil(total / size), pageSize);
    setActiveItem(+e.currentTarget.getAttribute('name'));
  };

  const handleFirstPageClick = (e) => {
    props.getPage(1, pageSize);
    setActiveItem(+e.currentTarget.getAttribute('name'));
  };

  const handleNextClick = (e) => { 
    const pageNum = +e.currentTarget.getAttribute('name') + 10;
    if(pageNum <= (parseInt(pageTabs.length / 10) * 10)) {
      props.getPage(pageNum + 1, pageSize);
      setStart(pageNum => pageNum + 10);
    }
    setActiveItem(start + 11);
  }

  const handlePreviousClick = (e) => { 
    const pageNum = +e.currentTarget.getAttribute('name') - 10;
    if(pageNum >= 0) {
      props.getPage(pageNum + 1, pageSize);
      setStart(pageNum => pageNum - 10);  
    }
    setActiveItem(start - 9);
  }

  return (
    <div className='ui right floated pagination menu'>
      <Link className={activeItem === -1 ? 'active item' : 'item'} to={parent} onClick={handleFirstPageClick} name='-1'>
        <i className='step backward icon'></i>
      </Link>
      {
        start >= 10 ? 
        <Link className={activeItem === start ? 'active item' : 'item'} to={parent} onClick={handlePreviousClick} name={start}>
          <i className='angle left icon'></i>
        </Link> : ''
      }
      {
        pageTabs.slice(start, start + 10).map(num => {
          return (
            <Link className={activeItem === (num + 1) ? 'active item' : 'item'} to={parent} key={num} onClick={handleClick} name={num + 1}>
              {num + 1}
            </Link>
          );
        })
      }
      {
        start < (parseInt(pageTabs.length / 10) * 10) ?
        <Link className={activeItem === start ? 'active item' : 'item'} to={parent} onClick={handleNextClick} name={start}>
          <i className='angle right icon'></i>
        </Link> : ''
      }
      <Link className={activeItem === -2 ? 'active item' : 'item'} to={parent} onClick={handleLastPageClick} name='-2'>
        <i className='step forward icon'></i>
      </Link>
    </div>
  );
};

export default Paginate;
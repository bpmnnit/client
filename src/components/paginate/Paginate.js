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
  // const [pageSizeActiveItem, setPageSizeActiveItem] = useState(2);
  // const pageSizes = [1, 2, 3];

  const handleClick = (e) => {
    props.getPage(+e.target.innerHTML, pageSize);
    setActiveItem(+e.currentTarget.getAttribute('name'));
  };

  const handleLastPageClick = (e) => {
    props.getPage(total / size, pageSize);
    setActiveItem(+e.currentTarget.getAttribute('name'));
  };

  const handleFirstPageClick = (e) => {
    props.getPage(1, pageSize);
    setActiveItem(+e.currentTarget.getAttribute('name'));
  };

  const handleNextClick = (e) => { 
    const pageNum = +e.currentTarget.getAttribute('name');
    console.log('Next: ', pageNum);
    if(pageNum < (parseInt(pageTabs.length / 10) * 10)) {
      props.getPage(pageNum + 1, pageSize);
      setStart(pageNum => pageNum + 10);
    }
    setActiveItem(pageNum + 11);
  }

  const handlePreviousClick = (e) => { 
    const pageNum = +e.currentTarget.getAttribute('name');
    console.log('Previous: ', pageNum);
    if(pageNum > 0) {
      props.getPage(pageNum + 1, pageSize);
      setStart(pageNum => pageNum - 10);  
    }
    setActiveItem(pageNum - 11);
  }

  return (
    <div className='ui right floated pagination menu'>
      <Link className={activeItem === 0 ? 'active item' : 'item'} to={parent} onClick={handleFirstPageClick} name='0'>
        <i className='step backward icon'></i>
      </Link>
      {
        <Link className={activeItem === -1 ? 'active item' : 'item'} to={parent} onClick={handlePreviousClick} name={start}>
          <i className='angle left icon'></i>
        </Link>
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
      <Link className={activeItem === -1 ? 'active item' : 'item'} to={parent} onClick={handleNextClick} name={start}>
        <i className='angle right icon'></i>
      </Link>
      <Link className={activeItem === -1 ? 'active item' : 'item'} to={parent} onClick={handleLastPageClick} name='-1'>
        <i className='step forward icon'></i>
      </Link>
    </div>
  );
};

export default Paginate;
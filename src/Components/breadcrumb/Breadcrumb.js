

import './style.css';

function Breadcrumb() {  
  return (
    <>
      <nav className="breadcrumbs">
        <ol>
          <li><a href='/'>Home</a></li>
          <li><svg className='icon' viewBox="0 0 24 24" width='20' height='20' aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg></li>
          <li><a href='/'>Administration</a></li>
          <li><svg className='icon' viewBox="0 0 24 24" width='20' height='20' aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg></li>
          <li>Logger search</li>
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;

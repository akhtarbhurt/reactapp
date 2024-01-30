import React from 'react';

export default function Footer() {
    const date = new Date().getFullYear()
  return (
    <div className='container pb-3'>
      <div className='row'>
        <div className='col-md-12 text-center'>
          &copy; {date} Akhtar Hameed. All rights reserved.
        </div>
      </div>
    </div>
  );
}

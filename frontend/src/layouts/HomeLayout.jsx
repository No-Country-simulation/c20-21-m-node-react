import React from 'react';
import { Outlet } from 'react-router-dom';

function HomeLayout() {
  return (
    <div className='home-layout'>
      {/*Acá podría ir la Navbar */}
      <Outlet />
      {/*Acá podría ir el footer */}
    </div>
  );
}

export default HomeLayout;
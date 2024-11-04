import React from 'react'
import Image from 'next/image'
import Logo from "../../../public/assets/logo-prevalentware.png";

const HeaderSideBar = () => {
  return (
    <div className='absolute top-1'>
        <Image
          src={Logo}
          alt="PrevalentWare"
          width={200}
          className="flex items-center justify-center ml-4 my-4 cursor-pointer"
        />
    </div>
  )
}

export default HeaderSideBar
import React from 'react'
import Image from 'next/image'
import Logo from "../../../public/assets/logo-prevalentware.png";

const LeftSection = () => {
  return (
    <div className='flex columns-1 h-full items-center justify-center'>
        <Image
          src={Logo}
          alt="PrevalentWare"
          width={320}
          className=""
        />
        
    </div>
  )
}

export default LeftSection
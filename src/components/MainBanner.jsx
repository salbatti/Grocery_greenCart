import React from 'react'
import { assets } from '../assets/assets'

const MainBanner = () => {
    return (
        <div>
            <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block' />
            <img src={assets.main_banner_bg} alt="banner" className='w-full  md:hidden' />

        </div>
    )
}

export default MainBanner
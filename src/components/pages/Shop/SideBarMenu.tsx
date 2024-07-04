import React from 'react';

const SideBarMenu = () => {
    return (
        <div className='w-[250px] '>
            <ul className='flex flex-col gap-10 font-roboto text-lg'>
                <li className='sideBar-navLink'>Flowers category</li>
                <li className='sideBar-navLink'>Add something to your bouqet</li>
                <li className='sideBar-navLink'>Bouqet size</li>
                <li className='sideBar-navLink'>Customize</li>
            </ul>
        </div>
    );
}

export default SideBarMenu;

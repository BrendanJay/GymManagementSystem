import React from 'react'
import Background from '../admin_page/AdminImages/BackgroundWhite.png';
import AdminBackground from '../admin_page/AdminImages/AdminBoard.png';


function Adminpage() {
    return (

        <div>

        {/*  AdminWhiteBackground   */}
        <img
        loading="lazy"
        src={Background}
        className="background"
        alt="background"
        />

        {/*  AdminBackground    */}
        <img
        loading="lazy"
        src={AdminBackground}
        className="adminboard"
        alt="adminbackground"
        />

        </div>
    );


}

export default Adminpage
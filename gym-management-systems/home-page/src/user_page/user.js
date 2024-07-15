import React from 'react'
import UserBackground from '../user_page/UserImages/UserBackgroundWhite.png';
import UserBoard from '../user_page/UserImages/UserBoard.png';


function Userpage() {
    return (

        <div>

        {/*  AdminWhiteBackground   */}
        <img
        loading="lazy"
        src={UserBackground}
        className="background"
        alt="background"
        />

        {/*  AdminBackground    */}
        <img
        loading="lazy"
        src={UserBackground}
        className="Userboard"
        alt="Userbackground"
        />

        </div>
    );


}

export default Userpage
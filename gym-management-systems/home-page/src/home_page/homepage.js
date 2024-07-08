import React from 'react';
import { NavLink } from 'react-router-dom';
import rectangleImage from '../Images/Rectangle46.png';
import LogoSta from '../Images/LogoStamina.png';
import MusclesImage from '../Images/Muscles.png';
import PillsImage from '../Images/Rectangle71.png';
import whiteBox from '../Images/Group 31.png';
import Trainer from '../Images/OfferIcon2.png';
import Chat from '../Images/OfferIcon1.png';
import Member from '../Images/Group73.png';
import Gym from '../Images/gymblackbox.png';
import Customer from '../Images/customerbox.png';
import CustomerPictures from '../Images/customerPIcs.png';

import './homepage.css'; // Import the CSS file

function Homepage() {
  return (
    <div className="relative bg-white min-h-[73px]">
      <img
        loading="lazy"
        src={rectangleImage}
        className="image"
        alt="Rectangle"
      />
      <div className="text-container">
        <span className="font-bold text-white">Start a better shape of you!</span>
        <span className="yellow-text">Come Join Us!</span>
      </div>

      <div className="logo-client flex items-center gap-3 px-5 text-2xl text-violet-950">
        <img
          loading="lazy"
          src={LogoSta} // Make sure to replace with the correct srcSet for your image
          className="logo-image"
        />

        <div className="mt-3 bold-text">
          Gym Management
          <br />
          System
          <br />
        </div>
      </div>
      <div className="rectangle67"></div> {/* Added div */}

      <div className="register">
        <NavLink to="login">Join Now!</NavLink> {/* Updated div to include Link */}
      </div>

      <div className="about-container">
        <a href="#about-section" className="text-base font-bold max-w-[111px] text-violet-950">
          ABOUT
        </a>
      </div>

      <div id="about-section" className="bg-violet-950 min-h-[729px] rectangle68"></div> {/* New div with ID */}

    
      <div className="membership-container">
        <a href="#membership-section" className="text-base font-bold max-w-[111px] text-violet-950">
          MEMBERSHIP
        </a>
      </div> 
      
      <div id="membership-section" className="bg-violet-950 min-h-[729px] membership"></div> {/* New div with ID */}

        
      <div className="button-container">
        <a href="#coaches-section" className="text-base font-bold max-w-[109px] text-violet-950">
          COACH/TRAINERS
        </a>
      </div>

        {/* Section where it should scroll to */}
      <div id="coaches-section" className="coach">
      COACHES
      </div> 



       {/* Visit button */}
      <div className="visit-container">
        <a href="#visit-section" className="text-base font-bold max-w-[109px] text-violet-950">
          VISIT
        </a>
      </div>

        {/* Section where it should scroll to */}
      <div id="visit-section" className="visitgym">
        VISIT OUR GYM
      </div> 

      {/* Customer button */}
      <div className="customer-container">
        <a href="#customer-section" className="text-base font-bold max-w-[109px] text-violet-950">
          Progress
        </a>
      </div>

        {/* Section where it should scroll to */}
      <div id="customer-section" className="customertxt">
        Customer's Progress
      </div> 

      <div className="about-text text-2xl text-center text-white max-w-[734px] tracking-[2.4px]">
        <span className="font-semibold text-white">About </span>
        <br />
        <span className="text-4xl text-white tracking-[4px]">
          STAMINA GYM FOR MAN & WOMAN
        </span>
      </div>

      

      <div className="text-xl font-bold tracking-wider text-yellow-200 max-w-[628px] fitness-text">
        Stamina Gym Fitness Center provides proper training and conditioning for
        members who want to improve and transform their body with Program depend
        on the body composition.
      </div>

      <div className="text-4xl text-white max-w-[227px] offer">
       What we offer: 
       </div>
      




      {/*  Muscle Picture    */}
      <img
        loading="lazy"
        src={MusclesImage}
        className="muscles-image"
        alt="Muscles"
      />

      {/* Pill image below the text */}
      <div className="rectangle71"></div>

      {/* Pill image gradient blue */}
      <div className="max-w-[381px] min-h-[577px] rectangle72"></div>

      {/* New div for Group 31 */}
      <div className="flex flex-col justify-center items-center px-2.5 text-base bg-gray-200 border border-solid shadow-sm aspect-square border-stone-400 rounded-[35px] text-violet-950 group-31">
        <div className="flex flex-col px-5 pt-5 pb-11 w-full bg-gray-200 rounded-3xl border-4 border-solid border-violet-950 h-[190px]">
          <img
            loading="lazy"
            src={whiteBox}
            className="self-end rounded-full aspect-[0.99] bg-violet-950 h-[93px] w-[93px]"
            alt="Nutrition Plan Guide"
          />
          
        </div>
      </div>

      {/*  Muscle Picture    */}
      <img
        loading="lazy"
        src={Trainer}
        className="rectangle57"
        alt="Trainer"
      />

      {/*  Muscle Picture    */}
      <img
        loading="lazy"
        src={Chat}
        className="rectangle571"
        alt="Chat"
      />

      {/* New div for Trainer */}
      <div className="rectangle79"></div>

      {/*  Members    */}
      <img
        loading="lazy"
        src={Member}
        className="rectangle79"
        alt="member"
      />

      {/* JOIN OUR MEMBERSHIP section */}
      <div className="text-4xl text-center max-w-[492px] text-neutral-900 tracking-[4px] membership">
        <span className="text-zinc-800">JOIN</span> OUR MEMBERSHIP
      </div>

      {/* Add your COACHES section here */}
      <div className="text-4xl text-center text-white underline max-w-[198px] tracking-[4px] coach">
        COACHES
      </div>

      {/* Lastbackground Image */}
      <div className="rectangle52"></div>

      {/* Visit Our gym */}
      <div className="text-4xl text-center max-w-[600px] text-neutral-900 tracking-[4px] visitgym">
        VISIT OUR GYM
      </div>

      {/*  Gymblackbox    */}
      <img
        loading="lazy"
        src={Gym}
        className="gymbox"
        alt="gym"
      />


      {/* Address, Email, Contact Number */}
      <div className="flex flex-col px-5 text-xl font-medium address-container">
        <div className="w-full font-bold tracking-wider text-stone-50 max-md:max-w-full">
          <span className="font-medium text-yellow-200">Address:</span>{" "}
          <span className="text-stone-50">
            SampleAddress street- bisan 3.0 lang sir, hehehe
          </span>{" "}
        </div>
        <div className="mt-6 w-full max-md:max-w-full">
          <span className="text-yellow-200">Email:</span> <span className="font-bold text-white">sample@yahoo.com</span>
        </div>
        <div className="mt-5 w-full max-md:max-w-full">
          <span className="text-yellow-200">Contact Number:</span> <span className="font-bold text-white">00000000</span>
        </div>
      </div>


      {/*  GYMlOGO    */}
      <img
        loading="lazy"
        src={LogoSta}
        className="gymlogo"
        alt="gymlogo"
      />

      {/*  customerbox    */}
      <img
        loading="lazy"
        src={Customer}
        className="customerbox"
        alt="customer"
      />

      {/* Customer progress */}
      <div className="text-4xl text-center max-w-[600px] text-neutral-900 tracking-[4px] customertxt">
        Customer's Progress
      </div>

      {/*  customerPictures    */}
      <img
        loading="lazy"
        src={CustomerPictures}
        className="customerPics"
        alt="customerPictures"
      />




    
    </div>

  );
}


export default Homepage
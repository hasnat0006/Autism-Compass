import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Dashboard.css';
import Doctor from "./img/Doctor.svg"
import Therapy from "./img/Therapy.svg"
import FindDisorder from "./img/FindDisorder.svg"
import DashDelivery from './img/DashDelivery.svg';
import DoctorConsultationList from './DoctorComponent/DoctorConsultationList';
import RevealRightToLeft from './RevealRightToLeft';
import RevealLeftToRight from './RevealLeftToRight';
import RevealUp from './RevealUp';
import { motion } from 'framer-motion';
import Reveal from './RevealRightToLeft';


const Dashboard = () => {
   const [bookedDocData, setBookedDocData] = useState([]);
   const [availableDocData, setAvailableDocData] = useState([]);
   const [availableTherapyData, setAvailableTherapyData] = useState([]);
   const [orderList, setorderList] = useState([]);
   const [bookedTherapyData, setBookedTherapyData] = useState([]);
   const [disorderData, setDisorderData] = useState({
      TYPE: 'Unknown Disorder',
      DESCRIPTION: 'No description available',
   });
   const navigate = useNavigate();
   const localData = JSON.parse(localStorage.getItem('USER'));

   useEffect(() => {
      const fetchBookedDocData = async () => {
         try {
            const response = await fetch(`http://localhost:5000/dash/booked-doc?id=${localData.ID}&type=${localData.TYPE}`);
            const data = await response.json();
            setBookedDocData(data);
         } catch (error) {
            console.error('Error fetching consultations:', error);
            setBookedDocData([]);
         }
      };

      const fetchAvailableDocData = async () => {
         try {
            const response = await fetch(`http://localhost:5000/dash/available-doc`);
            const data = await response.json();
            setAvailableDocData(data);
         } catch (error) {
            console.error('Error fetching consultations:', error);
            setAvailableDocData([]);
         }
      };

      const fetchAvailableTherapyData = async () => {
         try {
            const response = await fetch(`http://localhost:5000/dash/available-therapy`);
            const data = await response.json();
            setAvailableTherapyData(data);
         } catch (error) {
            console.error('Error fetching consultations:', error);
            setAvailableTherapyData([]);
         }
      };

      const fetchBookedTherapy = async () => {
         try {
            const response = await fetch(`http://localhost:5000/booking/data?id=${localData.ID}&type=${localData.TYPE}`);
            const data = await response.json();
            setBookedTherapyData(data);

         } catch (error) {
            console.error('Error fetching consultations:', error);
            setBookedTherapyData([]);
         }
      };
      const fetchDisorderData = async () => {
         try {
            const response = await fetch(`http://localhost:5000/dash/disorder-info?id=${localData.ID}`);
            const data = await response.json();
            if (data.TYPE && data.DESCRIPTION) {
               setDisorderData(data);
            }
         } catch (error) {
            console.error('Error fetching consultations:', error);
         }
      };
      const fetchOrderList = async () => {
         try {
            const response = await fetch(
               `http://localhost:5000/delivery/get/orders?userID=${localData.ID}`
            );
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Fetched data:", data);
            setorderList(data);
         } catch (err) {
            console.error(err);
         }
      };


      if (localData.TYPE === 'CHILD' || localData.TYPE === 'PARENT') {
         fetchBookedDocData();
         fetchAvailableDocData();
         fetchAvailableTherapyData();
         fetchBookedTherapy();
         if (localData.TYPE === 'CHILD')
            fetchDisorderData();
         else if (localData.TYPE === 'PARENT')
            fetchOrderList();
      }
   }, []);

   let displayedBookedDocData, displayedBookedTherapyData, displayedAvailableDocData, displayedAvailableTherapyData, displayedDeliveryData;

   if (localData.TYPE === 'CHILD' || localData.TYPE === 'PARENT') {
      displayedBookedDocData = bookedDocData.slice(0, 2);
      displayedBookedTherapyData = bookedTherapyData.slice(0, 2);
      displayedAvailableDocData = availableDocData.slice(0, 2 + (bookedDocData.length >= 2 ? 0 : 2 - bookedDocData.length));
      displayedAvailableTherapyData = availableTherapyData.slice(0, 2 + (bookedTherapyData.length >= 2 ? 0 : 2 - bookedTherapyData.length));
   }
   if (localData.TYPE === 'PARENT') {
      displayedDeliveryData = orderList.slice(0, 4);
   }
   const handleBookedDoctor = () => {
      navigate('/doctor/booked');
   }

   const handleAvailableDoctor = () => {
      navigate('/HealthProfessionals');
   }

   const handleBookedTherapy = () => {
      navigate('/therapy/booked');
   }

   const handleAvailableTherapy = () => {
      navigate('/therapy');
   }

   const handleDisorder = () => {
      navigate('/disorder');
   }
   const handleDeliveryDetails = () => {
      navigate('/products/orders');
   }

   return (
      <div>
         <Navbar />
         <div className="dashboard">
            {localData.TYPE === 'HEALTH_PROFESSIONAL' && (
               <DoctorConsultationList />
            )}
            {(localData.TYPE === 'PARENT' || localData.TYPE === 'CHILD') && (
               <>
                  <div className='doctor-consultation'>
                     <div className='doctor-consultation-info'>
                        <RevealLeftToRight>
                           <div className='dash-booking-doc'>
                              <h2 className='dashboard-heading'>Available Doctors</h2>
                              <div className='booking-doctor'>
                                 {displayedAvailableDocData.map((item) => (
                                    <div className="card-item-doc" key={item.H_ID}>
                                       <h2>Dr. {item.DOCTOR_NAME}</h2>
                                       <p>{item.FIELD_OF_SPEC}</p>
                                       <p className="label-square">{item.NAME_OF_HOSPITAL}</p>
                                       <p className="label-square">Contact No: {item.CONTACT_NO}</p>
                                    </div>
                                 ))}
                              </div>
                              <button className='view-more-button' onClick={handleAvailableDoctor}>View more details</button>
                           </div>
                        </RevealLeftToRight>
                        <RevealUp>
                           <div className="doctor-img">
                              <img src={Doctor} alt="Doctor" />
                           </div>
                        </RevealUp>
                        {displayedBookedDocData.length > 0 && (
                           <RevealRightToLeft>

                              <div className='dash-booking-doc'>
                                 <h2 className='dashboard-heading'>Booked Consultation</h2>
                                 <div className='booking-doctor'>
                                    {displayedBookedDocData.map((item) => (
                                       <div className="card-item-doc" key={item.H_ID}>
                                          <h2>Dr. {item.DOCTOR_NAME}</h2>
                                          <p>{item.NAME_OF_HOSPITAL}</p>
                                          <p className="label-square">Date: {item.SELECTED_DATE}</p>
                                          <p className="label-square">Child's Name: {item.CHILD_NAME}</p>
                                       </div>
                                    ))}
                                 </div>
                                 <button className='view-more-button' onClick={handleBookedDoctor}>View more details</button>
                              </div>
                           </RevealRightToLeft>
                        )}
                     </div>
                  </div>
                  <div className='doctor-consultation'>
                     <div className='doctor-consultation-info'>
                        {displayedBookedTherapyData.length > 0 && (
                           <RevealLeftToRight>

                              <div className='dash-booking-doc'>
                                 <h2 className='dashboard-heading'>Booked Therapy</h2>
                                 <div className='booking-doctor'>
                                    {displayedBookedTherapyData.map((item) => (
                                       <div className="card-item-doc" key={item.TH_ID}>
                                          <h2>{item.THERAPY_TYPE}</h2>
                                          <p>{item.ORG_NAME}</p>
                                          <p className="label-square">Date: {item.BOOKING_DATE}</p>
                                          <p className="label-square">Child's Name: {item.CHILD_NAME}</p>
                                       </div>
                                    ))}
                                 </div>
                                 <button className='view-more-button' onClick={handleBookedTherapy}>View more details</button>
                              </div>
                           </RevealLeftToRight>
                        )}
                        <RevealUp>
                           <div className="doctor-img">
                              <img src={Therapy} alt="Doctor" />
                           </div>
                        </RevealUp>
                        <RevealRightToLeft>
                           <div className='dash-booking-doc'>
                              <h2 className='dashboard-heading'>Available Therapy</h2>
                              <div className='booking-doctor'>
                                 {displayedAvailableTherapyData.map((item) => (
                                    <div className="card-item-doc" key={item.TH_ID}>
                                       <h2>{item.THERAPY_TYPE}</h2>
                                    </div>
                                 ))}
                              </div>
                              <button className='view-more-button' onClick={handleAvailableTherapy}>View more details</button>
                           </div>
                        </RevealRightToLeft>
                     </div>
                  </div>
               </>
            )}
            {localData.TYPE === 'CHILD' && (
               <RevealLeftToRight>
                  <div div className='disorder-info-dashboard'>
                     <div className='dash-disorder-info'>
                        <div className='disorder-details'>
                           <div className='disorder-typography'>
                              <h2 className='dashboard-heading'>
                                 {disorderData.TYPE}
                              </h2>
                              <p>Discription: <span></span>
                                 <Typewriter
                                    words={[disorderData.DESCRIPTION]}
                                    loop
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={50}
                                    deleteSpeed={40}
                                    delaySpeed={1000}
                                 />
                              </p>
                           </div>
                           <button className='view-more-button' onClick={handleDisorder}>View more info about your disorder</button>
                        </div>
                           <img src={FindDisorder} alt="Find Disorder" className="doctor-img" />
                        </div>
                  </div>
               </RevealLeftToRight>
            )}
            {(localData.TYPE === 'PARENT' && displayedDeliveryData.length) && (
               <div className='delivery-info-dash'>
                  <RevealLeftToRight>
                     <div className='dash-booking-doc'>
                        <h2 className='dashboard-heading'>Delivery Information</h2>
                        <div className='booking-doctor'>
                           {displayedDeliveryData.map((item) => (
                              <div className="card-item-doc">
                                 <p className="label-square">Delivered By: {item.NAME}</p>
                                 <p className="label-square">Date: {item.DELIVERY_DATE.slice(0, 10)}</p>
                                 <h2>Price: {item.AMOUNT}$</h2>
                              </div>
                           ))}
                        </div>
                        <button className='view-more-button' onClick={handleDeliveryDetails}>View more details</button>
                     </div>
                  </RevealLeftToRight>
                  <RevealRightToLeft>
                     <div className='dash-delivery-img'>
                        <img src={DashDelivery} alt="Therapy" />
                     </div>
                  </RevealRightToLeft>
               </div>
            )}
         </div>
      </div >
   );
};

export default Dashboard;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {useReactToPrint} from "react-to-print"

const DisplayBookings = () => {
  const [bookings, setBookings] = useState([]);
  const email=localStorage.getItem("email")
  useEffect(() => {
    axios
      .get("http://localhost:8070/booking/")
      .then(  
        (res) => setBookings(res.data))
      .catch((error) => console.log(error));


  });

  const cancelBooking = (id) => {
    axios
      .delete(`http://localhost:8070/booking/delete/${id}`)
      .then((res) => alert("Booking Cancelled"));

    setBookings(bookings.filter((elem) => elem.id !== id));
  };

  const componentRef= useRef();
  const handlePrint=useReactToPrint({

content:() =>componentRef.current,

  });

  return (
    <div>
      <br></br>
      <div className="row">
        <h1 className="text-center">My Bookings</h1>
      </div>
      <br></br>
      <div className="row">
        <div className="col-md-1"></div>

        <div ref={componentRef} className="col-md-10">
          <table className="table text-center">
            <thead class="thead-light">
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Resource Name</th>
              <th>Resource Price</th>
              <th>Booking Date</th>
              <th></th>
              
            </thead>

            {bookings.filter((elem) => elem.cusEmail == email).map((setBookings, key) => (
              <tbody>
                <tr>
                  <td>{setBookings.cusName}</td>
                  <td>{setBookings.cusEmail}</td>
                  <td>{setBookings.resName}</td>
                  <td>{setBookings.resPrice}</td>
                  <td>{setBookings.bDate}</td>
                  <td>
                    <Link
                      to={`/genrep/${setBookings._id}`}
                      className="btn btn-warning">
                      Get E-Receipt
                    </Link>
                  </td>
                  
                </tr>
              </tbody>
            ))}
          </table>
         
        </div>

        <div className="col-md-1"></div>
      </div>
    </div>
  );
};

export default DisplayBookings;

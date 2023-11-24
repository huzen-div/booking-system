import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { VENUE_IMAGE1, VENUE_IMAGE2, VENUE_IMAGE3 } from '../../utils/constants';
export default function HomePage() {
    return (
        <>
            <div className="container-fluid" style={{ width: 950, marginTop: "3rem" }}>
                <div className="row">
                    <div
                        className="col-sm-12"
                        style={{
                            background: "white",
                            padding: "1.5rem"
                        }}
                    >
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="card" style={{ width: "18rem", border: "none", background: "#e9e9e9" }}>
                                    <img src={VENUE_IMAGE1} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">ห้อง A101</h5>
                                        <Link to="/bookings?roomId=A101" className="btn btn-primary">เลือกห้อง</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-4">
                                <div className="card" style={{ width: "18rem", border: "none", background: "#e9e9e9" }}>
                                    <img src={VENUE_IMAGE2} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">ห้อง A102</h5>
                                        <Link to="/bookings?roomId=A102" className="btn btn-primary">เลือกห้อง</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="card" style={{ width: "18rem", border: "none", background: "#e9e9e9" }}>
                                    <img src={VENUE_IMAGE3} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">ห้อง Auditorium</h5>
                                        <Link to="/bookings?roomId=Auditorium" className="btn btn-primary">เลือกห้อง</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
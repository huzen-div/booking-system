import * as React from 'react';
import moment from 'moment';
import { Link } from "react-router-dom";

const UpcomingCard = ({ currentBookings, roomIdNoB }) => {
    let upcommingDetail = {};
    let currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
    let upcomingDateList = [];
    if (currentBookings.length > 0) {
        for (let item of currentBookings) {
            if (item.roomId == roomIdNoB && item.startTime >= currentDate) {
                upcomingDateList.push(item);
            }
        }
    }

    if (upcomingDateList.length > 0) {
        let mnUpcomingDate = upcomingDateList.reduce((a, b) => {
            return a.startTime < b.startTime ? a : b;
        });

        if (mnUpcomingDate) {
            let nextUpcomingDateList = [];
            for (let item of upcomingDateList) {
                const mnStartTime = moment(mnUpcomingDate.startTime, "YYYY-MM-DD").format("YYYY-MM-DD");
                const startTime = moment(item.startTime, "YYYY-MM-DD").format("YYYY-MM-DD");
                if (mnStartTime == startTime) {
                    let tmpItem = {
                        ...item,
                        timeRange: `${moment(item.startTime, "YYYY-MM-DD HH:mm:ss").format("HH:mm")} - ${moment(item.endTime, "YYYY-MM-DD HH:mm:ss").format("HH:mm")}`
                    }
                    nextUpcomingDateList.push(tmpItem);
                }
            }
            const fullDay = moment(mnUpcomingDate.startTime, "YYYY-MM-DD").format("dddd");
            const dateMonth = moment(mnUpcomingDate.startTime, "YYYY-MM-DD").format("DD MMM");
            upcommingDetail = {
                fullDay,
                dateMonth,
                nextUpcomingDateList,
            }
        }
    }

    let TaskItem;
    if (upcommingDetail.nextUpcomingDateList?.length > 0) {
        TaskItem = upcommingDetail.nextUpcomingDateList.map((item) => {
            return (
                <div style={{ marginBottom: "1rem" }} key={item.startTime}>
                    <p style={{ marginBottom: 0, color: "#bdbdbd" }}>{item.timeRange}</p>
                    <p>{item.title}</p>
                </div>
            )
        });
    }
    else {
        TaskItem = (
            <div style={{ marginBottom: "1rem" }}>
                <p>ไม่พบข้อมูลการจอง</p>
            </div>
        )
    }

    return (
        <>
            <p style={{ fontSize: 15 }}>Upcoming</p>
            <h3>{upcommingDetail.fullDay}</h3>
            <h3>{upcommingDetail.dateMonth}</h3>
            <div style={{ marginTop: "4rem" }}>
                {TaskItem}
            </div>
            <Link to="/" className="btn btn-dark">กลับหน้าหลัก</Link>
        </>
    )
};
export default UpcomingCard;

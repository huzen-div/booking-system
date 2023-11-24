import React, { useState } from 'react';
import moment from 'moment';
export default function QuizNo2BPage() {
    const currentBookings = [
        {
            "id": 1,
            "roomId": "A101",
            "startTime": "2019-09-28 13:00:00",
            "endTime": "2019-09-28 14:00:00",
            "title": "Lunch with Petr"
        },
        {
            "id": 2,
            "roomId": "A101",
            "startTime": "2019-09-28 14:00:00",
            "endTime": "2019-09-28 15:00:00",
            "title": "Sales Weekly Meeting"
        },
        {
            "id": 3,
            "roomId": "A101",
            "startTime": "2019-09-28 16:00:00",
            "endTime": "2019-09-28 18:00:00",
            "title": "Anastasia Website Warroom"
        },
        {
            "id": 4,
            "roomId": "A101",
            "startTime": "2019-09-29 13:00:00",
            "endTime": "2019-09-29 14:00:00",
            "title": "One-on-One Session"
        },
        {
            "id": 5,
            "roomId": "A101",
            "startTime": "2019-09-29 16:00:00",
            "endTime": "2019-09-29 18:00:00",
            "title": "UGC Sprint Planning"
        },
        {
            "id": 6,
            "roomId": "A102",
            "startTime": "2019-09-30 09:00:00",
            "endTime": "2019-10-04 18:00:00",
            "title": "5-Day Design Sprint Workshop"
        },
        {
            "id": 7,
            "roomId": "Auditorium",
            "startTime": "2019-09-19 09:00:00",
            "endTime": "2019-09-23 19:00:00",
            "title": "Thai Tech Innovation 2019"
        },
        {
            "id": 8,
            "roomId": "A101",
            "startTime": "2019-09-28 10:00:00",
            "endTime": "2019-09-28 13:00:00",
            "title": "Raimonland project"
        },
        {
            "id": 9,
            "roomId": "A102",
            "startTime": "2019-09-30 18:00:00",
            "endTime": "2019-09-30 20:00:00",
            "title": "Management Meetinng"
        },
        {
            "id": 10,
            "roomId": "A101",
            "startTime": "2019-10-04 14:00:00",
            "endTime": "2019-10-06 11:00:00",
            "title": "3-day workshop Corgi costume"
        },
    ];
    
    const getBookingsForWeek = (roomIdNoB, dateInput) => {
        const dateOfWeekToday = {
            beginDateOfWeek: dateInput,
            endDateOfWeek: dateInput,
        }
        const today = filterDateOfWeek(dateOfWeekToday, roomIdNoB);
    
        const dateSelect = moment(dateInput, "YYYY-MM-DD");
        const weekNo = dateSelect.week();
        const dateOfWeek = getDateFromWeek(weekNo, dateSelect);
        const currentWeek = filterDateOfWeek(dateOfWeek, roomIdNoB);
    
        const weekNoAddOne = dateSelect.add("1", "weeks").week();
        const dateOfWeekAdd = getDateFromWeek(weekNoAddOne, dateSelect);
        const nextWeek = filterDateOfWeek(dateOfWeekAdd, roomIdNoB);
    
        return {
            today: today,
            currentWeek: currentWeek,
            nextWeek: nextWeek,
        }
    }
    
    const getDateFromWeek = (weekNo, dateSelect) => {
        const beginDateOfWeek = moment(dateSelect.day("Sunday").week(weekNo).toDate()).format("YYYY-MM-DD");
        const endDateOfWeek = moment(dateSelect.day("Saturday").week(weekNo).toDate()).format("YYYY-MM-DD");
        return { beginDateOfWeek, endDateOfWeek };
    };
    
    const filterDateOfWeek = (dateOfWeek, roomIdNoB) => {
        const currentWeek = currentBookings.filter(item => {
            const itemStartTime = moment(item.startTime).format("YYYY-MM-DD");
            const itemEndTime = moment(item.endTime).format("YYYY-MM-DD");
            return item.roomId == roomIdNoB && (itemEndTime >= dateOfWeek.beginDateOfWeek
                && itemStartTime <= dateOfWeek.endDateOfWeek);
        });
        return currentWeek;
    };
    
    const roomIdNoB = "A101";
    const dateInput = "2019-10-04";//ระบบจะคำนวณ weekNo โดยวันที่เลือก หากเป็นวันที่ปัจจุบันให้ใช้ moment().format("YYYY-MM-DD");
    const bookingsWeekList = getBookingsForWeek(roomIdNoB, dateInput);
    console.log("ข้อ 02 b.", bookingsWeekList);

    return (
        <>
            
        </>
    );
}
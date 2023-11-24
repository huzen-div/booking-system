import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import UpcomingCard from './components/UpcomingCard';
import currentBookings from '../../data/currentBookings.json';

export default function BookingPage() {
    const [checkedTab, setCheckedTab] = useState(true);
    const [currentWeek, setCurrentWeek] = useState([]);
    const [weekNo, setWeekNo] = useState([]);
    const [tabType, setTabType] = useState("week");

    const queryRoomId = (new URLSearchParams(window.location.search)).get("roomId");

    const roomIdNoB = queryRoomId;
    const dateInput = moment().format("YYYY-MM-DD");//"2023-11-23" ระบบจะคำนวณ weekNo โดยวันที่เลือก
    useEffect(() => {
        let dateSelect = moment(dateInput, "YYYY-MM-DD");
        setWeekNo(dateSelect.week());

        const bookingsWeekList = getBookingsForWeek(roomIdNoB, dateInput, weekNo);
        setCurrentWeek(bookingsWeekList.dayWeekListMapItem);
    }, []);

    useEffect(() => {
        const bookingsWeekList = getBookingsForWeek(roomIdNoB, dateInput, weekNo);
        setCurrentWeek(bookingsWeekList.dayWeekListMapItem);
    }, [weekNo, tabType]);

    const handleChangeWeek = (type) => {
        let weekNo;
        if (type == "add") {
            let dateSelect = moment(dateInput, "YYYY-MM-DD");
            weekNo = dateSelect.add("1", "weeks").week();
        }
        else {
            let dateSelect = moment(dateInput, "YYYY-MM-DD");
            weekNo = dateSelect.week();
        }
        setWeekNo(weekNo);
        setTabType("week");
    }

    const handleSelectMonthTab = () => {
        setTabType("month");
    }

    const getBookingsForWeek = (roomIdNoB, dateInput, weekNo) => {
        const dateOfWeekToday = {
            beginDateOfWeek: dateInput,
            endDateOfWeek: dateInput,
        }
        const today = filterDateOfWeek(dateOfWeekToday, roomIdNoB);

        const dateSelect = moment(dateInput, "YYYY-MM-DD");


        let dateOfWeek;
        if (tabType == "week") {
            dateOfWeek = getDateFromWeek(weekNo, dateSelect);
        }
        else if (tabType == "month") {
            dateOfWeek = getDateFromMonth(dateSelect);
        }

        const currentWeekDetail = filterDateOfWeek(dateOfWeek, roomIdNoB);

        let dayWeekListMapItem = [];
        for (let dayWeekItem of dateOfWeek.dayWeekList) {
            let hourItemList = [];
            for (let hourItem of dayWeekItem.hourList) {
                let dateStartHour = `${dayWeekItem.dayWeek} ${hourItem.startHour}`;
                let dateEndHour = `${dayWeekItem.dayWeek} ${hourItem.endHour}`;

                const dayWeekList = currentWeekDetail.find(item => {
                    const itemStartTime = item.startTime;
                    const itemEndTime = item.endTime;
                    return (itemEndTime > dateStartHour && itemStartTime < dateEndHour);
                });

                hourItemList.push({
                    hourItem,
                    dayWeekList: (dayWeekList) ? dayWeekList : null,
                });
            }
            dayWeekListMapItem.push({
                dayWeek: dayWeekItem.dayWeek,
                hourItemList: hourItemList,
                dayWeekText: moment(dayWeekItem.dayWeek, "YYYY-MM-DD").format("ddd[,] DD MMM YYYY"),
            });
        }

        return {
            today: today,
            currentWeekDetail: currentWeekDetail,
            dayWeekListMapItem: dayWeekListMapItem,
        }
    }

    const getHourList = () => {
        let hourList = [];
        for (let j = 0; j <= 23; j++) {
            let startHour = j;
            const endHour = startHour + 1;

            let startHourText = startHour + "";
            if (startHour < 10) {
                startHourText = "0" + startHour;
            }

            let endHourText = endHour + "";
            if (endHour < 10) {
                endHourText = "0" + endHour;
            }

            const hourDetail = {
                hourRange: `${startHourText}:00:00 - ${endHourText}:00:00`,
                startHour: startHourText + ":00:00",
                endHour: endHourText + ":00:00",
            };

            hourList.push(hourDetail);
        }
        return hourList;
    }

    const getDateFromWeek = (weekNo, dateSelect) => {
        const beginDateOfWeek = moment(dateSelect.day("Sunday").week(weekNo).toDate()).format("YYYY-MM-DD");
        const endDateOfWeek = moment(dateSelect.day("Saturday").week(weekNo).toDate()).format("YYYY-MM-DD");

        let dayWeekList = [];
        for (let i = 0; i <= 6; i++) {
            let dayWeek = moment(dateSelect.day(i).week(weekNo).toDate()).format("YYYY-MM-DD");

            const hourList = getHourList();

            dayWeekList.push({ dayWeek: dayWeek, hourList: hourList });
        }

        return { beginDateOfWeek, endDateOfWeek, dayWeekList };
    }

    const getDateFromMonth = (dateSelect) => {
        let dateSelectYearMonth = moment(dateSelect).format("YYYY-MM");

        const beginDateOfMonth = `${dateSelectYearMonth}-01`;
        const endDateOfMonth = `${dateSelectYearMonth}-${dateSelect.daysInMonth()}`;

        let dateSelectYearMonthList = [];
        for (let i = 1; i <= dateSelect.daysInMonth(); i++) {
            let dateTmp = i;
            if (i < 10) {
                dateTmp = `0${dateTmp}`
            }
            let dayMonth = `${dateSelectYearMonth}-${dateTmp}`;
            const hourList = getHourList();
            dateSelectYearMonthList.push({ dayWeek: dayMonth, hourList: hourList });
        }

        return { beginDateOfWeek: beginDateOfMonth, endDateOfWeek: endDateOfMonth, dayWeekList: dateSelectYearMonthList };
    }

    const filterDateOfWeek = (dateOfWeek, roomIdNoB) => {
        const currentWeek = currentBookings.filter(item => {
            const itemStartTime = moment(item.startTime).format("YYYY-MM-DD");
            const itemEndTime = moment(item.endTime).format("YYYY-MM-DD");
            return item.roomId == roomIdNoB && (itemEndTime >= dateOfWeek.beginDateOfWeek
                && itemStartTime <= dateOfWeek.endDateOfWeek);
        });
        return currentWeek;
    }

    const WeekItem = currentWeek.map((item) => {
        return (
            <div className="timeline p-3 block mb-1" key={item.dayWeek}>
                <p
                    style={{
                        background: "#f1f1f1",
                        padding: "4px 15px",
                        color: "#5c5c5c"
                    }}
                >
                    {item.dayWeekText}
                </p>

                {item.hourItemList.map((itemHour) => {
                    return (
                        <div className="tl-item" key={itemHour.hourItem.hourRange}>
                            <div className={`tl-dot ${itemHour.dayWeekList?.title ? 'b-danger' : 'b-primary'}`} />
                            <div className="tl-content">
                                <div className="tl-date text-muted">
                                    {itemHour.hourItem.startHour.slice(0, 5)} - {itemHour.hourItem.endHour.slice(0, 5)}
                                </div>
                                {itemHour.dayWeekList?.title &&
                                    <div className="" style={{ fontSize: "14px", fontWeight: "500", color: "#f54394" }}>{itemHour.dayWeekList.title}</div>
                                }
                                {!itemHour.dayWeekList?.title &&
                                    <div className="" style={{ fontSize: "14px" }}>ว่าง</div>
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    });

    return (
        <>
            <div className="container-fluid" style={{ width: 950, marginTop: "3rem" }}>
                <div className="row">
                    <div
                        className="col-sm-4"
                        style={{
                            background: "#2158a1",
                            color: "white",
                            paddingRight: 0,
                            paddingLeft: 25
                        }}
                    >
                        <h3 style={{ background: "#00d7ff", padding: "15px 9px 9px 15px" }}>
                            {queryRoomId}
                        </h3>
                        <div className="mt-5 pb-3">
                            <UpcomingCard currentBookings={currentBookings} roomIdNoB={roomIdNoB} />
                        </div>
                    </div>
                    <div className="col-sm-8" style={{ padding: 0, background: "#ffffff" }}>
                        <div style={{ background: "#ebebeb" }}>
                            <div className="tabs">
                                <input type="radio" id="tab1" name="tab-control" defaultChecked={checkedTab} />
                                <input type="radio" id="tab2" name="tab-control" />
                                <input type="radio" id="tab3" name="tab-control" />
                                <ul>
                                    <li title="This Week" onClick={() => handleChangeWeek("cur")}>
                                        <label htmlFor="tab1" role="button">
                                            <span style={{ fontSize: "14px" }}>THIS WEEK</span>
                                        </label>
                                    </li>
                                    <li title="Next Week" onClick={() => handleChangeWeek("add")}>
                                        <label htmlFor="tab2" role="button">
                                            <span style={{ fontSize: "14px" }}>NEXT WEEK</span>
                                        </label>
                                    </li>
                                    <li title="Whole Month" onClick={() => handleSelectMonthTab()}>
                                        <label htmlFor="tab3" role="button">
                                            <span style={{ fontSize: "14px" }}>WHOLE MONTH</span>
                                        </label>
                                    </li>
                                </ul>
                                <div className="slider">
                                    <div className="indicator" />
                                </div>
                                <div className="content" style={{ background: "white" }}>
                                    <section>

                                        <div className="page-content page-container" id="page-content">
                                            <div className="padding">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        {WeekItem}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </section>
                                    <section>

                                        <div className="page-content page-container" id="page-content">
                                            <div className="padding">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        {WeekItem}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </section>
                                    <section>

                                        <div className="page-content page-container" id="page-content">
                                            <div className="padding">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        {WeekItem}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
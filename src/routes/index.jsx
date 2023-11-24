import { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages/homePage"
import BookingPage from "../pages/bookingPage"

import QuizNo1Page from "../pages/quizNo1"
import QuizNo2APage from "../pages/quizNo2A"
import QuizNo2BPage from "../pages/quizNo2B"

import ErrorPage from "../pages/error-page"

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/bookings",
        element: <BookingPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/quizno1",
        element: <QuizNo1Page />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/quizno2a",
        element: <QuizNo2APage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/quizno2b",
        element: <QuizNo2BPage />,
        errorElement: <ErrorPage />,
    },
])

export default router;
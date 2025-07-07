import { useEffect, useState } from 'react'
import React from 'react'
import { apiConnector } from "../services/apiConnector"
import { useParams } from 'react-router-dom'
import { questionEndpoints, quizEndpoints } from '../services/APIs'
import { useSelector } from 'react-redux'
import { formatDistanceToNow } from 'date-fns'
import QuizQuestions from '../components/core/attemptQuiz/QuizQuestions'

const AttemptQuiz = () => {

    const [quizDetails, setQuizDetails] = useState(null);
    const [quizQuestions, setQuisQuestions] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(true);
    const [questionsLoading, setQuestionsLoading] = useState(true);

    const { token } = useSelector(state => state.auth)

    const { id: quizId } = useParams();

    const fetchQuizQuestions = async () => {
        setQuestionsLoading(true);
        try {
            const response = await apiConnector("GET", `${questionEndpoints.GET_QUIZ_QUESTIONS}/${quizId}`, null, {
                Authorization: `Bearer ${token}`
            })

            // console.log("QUIZ QUESTIONS RESPONSE : ", response)

            setQuisQuestions(response?.data?.data);
        } catch (error) {
            console.log('Error fetching quiz details:', error);
        } finally {
            setQuestionsLoading(false);
        }
    };

    const fetchQuizDetails = async () => {
        try {
            setDetailsLoading(true);
            const response = await apiConnector("GET", `${quizEndpoints.GET_QUIZ_DETAILS}/${quizId}`, null, {
                Authorization: `Bearer ${token}`
            })

            // console.log("QUIZ DETAILS RESPONSE : ", response)

            setQuizDetails(response?.data?.data);
        } catch (error) {
            console.log('Error fetching quiz details:', error);
        } finally {
            setDetailsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizDetails();
        fetchQuizQuestions();
    }, [quizId]);

    return (
        <section className=' min-h-screen py-10'>
            <div className='border p-3 rounded-lg bg-slate-900 border-slate-600'>
                {
                    questionsLoading || detailsLoading ? <h1>Loading...</h1> :
                        <span>
                            <span className='flex gap-3 items-center font-thin'>
                                <h3 className='text-2xl font-semibold'>{quizDetails?.title}</h3>
                                |
                                <p>{quizDetails?.timer} minutes</p>
                            </span>
                            <p className='font-thin mt-1'>{quizDetails?.description}</p>
                            <span className='flex gap-3 font-thin'>
                                <p>crated By - {quizDetails?.createdBy?.username}</p>
                                |
                                <p>{formatDistanceToNow(new Date(quizDetails.createdAt), { addSuffix: true })}</p>
                            </span>
                        </span>
                }
            </div>
            <div>
                <QuizQuestions quizDetails={quizDetails} quizQuestions={quizQuestions} />
            </div>
        </section>
    )
}

export default AttemptQuiz
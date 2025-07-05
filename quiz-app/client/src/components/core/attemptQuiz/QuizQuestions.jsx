import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../Button';
import QuestionCard from './QuestionCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../../../services/apiConnector';
import { quizEndpoints } from "../../../services/APIs";

const QuizQuestions = ({ quizDetails, quizQuestions }) => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const { token } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (quizDetails?.timer) {
            setRemainingTime(quizDetails.timer * 60);
        }
    }, [quizDetails]);

    useEffect(() => {
        let timer;
        if (quizStarted && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (quizStarted && remainingTime === 0) {
            alert('Time is up!');
            submitQuiz();
        }
        return () => clearInterval(timer);
    }, [quizStarted, remainingTime]);

    const handleAnswerChange = useCallback((questionId, selectedOption) => {
        setUserAnswers((prevAnswers) => {
            const existingAnswerIndex = prevAnswers.findIndex(
                (answer) => answer.questionId === questionId
            );
            if (existingAnswerIndex >= 0) {
                prevAnswers[existingAnswerIndex].selectedOption = selectedOption;
            } else {
                prevAnswers.push({ questionId, selectedOption });
            }
            return [...prevAnswers];
        });
    }, []);

    const startQuiz = () => {
        setQuizStarted(true);
    };

    const submitQuiz = async () => {

        console.log("quizQuestions : ", quizQuestions)

        try {
            const response = await apiConnector(
                'POST',
                `${quizEndpoints.ATTEMMP_QUIZ}/${quizDetails._id}/attempt`,
                {
                    quizId: quizDetails._id,
                    answers: userAnswers
                },
                {
                    Authorization: `Bearer ${token}`,
                }
            );
            console.log('Quiz submission response:', response);
            navigate('/quiz-results', { state: { score: response.data.score, total: quizQuestions?.length } });
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className='flex py-5 border min-h-[60vh] px-5 justify-center items-start mt-5 rounded-lg bg-slate-900 border-slate-600'>
            {!quizStarted ? (
                <Button className='w-max self-center' onClick={startQuiz}>Start Quiz</Button>
            ) : (
                <div className='w-full'>
                    <h2>Time Remaining: {formatTime(remainingTime)}</h2>
                    <div>
                        {quizQuestions && quizQuestions.map((ques) => (
                            <QuestionCard
                                key={ques._id}
                                question={ques}
                                onAnswerChange={handleAnswerChange}
                            />
                        ))}
                    </div>
                    <Button className='w-max self-center' onClick={submitQuiz}>Submit Quiz</Button>
                </div>
            )}
        </div>
    );
};

export default QuizQuestions;
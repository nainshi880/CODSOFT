import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';

const QuizCard = ({ quiz }) => {
    const { user } = useSelector(state => state.auth)

    return (
        <Link to={`/quiz/${quiz._id}`} className='border border-slate-600 bg-slate-900 p-3 rounded-lg relative'>
            <h2 className='text-xl line-clamp-2 border-b border-slate-600 pb-3 mb-2'>{quiz.title}</h2>
            <span className='font-thin'>
                <p className='line-clamp-2'>{quiz.description}</p>
                <span className='flex gap-3'>
                    <p>{quiz.createdBy.username}</p>
                    |
                    <p>{formatDistanceToNow(new Date(quiz.createdAt), { addSuffix: true })}</p>
                </span>
            </span>

            <span className='absolute top-[5%] right-[-5%] rotate-[30deg]'>
                {
                    user.attemptedQuizzes?.includes(quiz._id) && (
                        <span className='bg-green-600 text-white px-2 py-1 rounded-lg text-sm'>Completed</span>
                    )
                }
            </span>
        </Link>
    )
}

export default QuizCard
import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom"

const QuizCard = ({ quiz }) => {
    
    return (
        <Link to={`/quiz/${quiz._id}`} className='border border-slate-600 bg-slate-900 p-3 rounded-lg'>
            <h2 className='text-xl line-clamp-2 border-b border-slate-600 pb-3 mb-2'>{quiz.title}</h2>
            <span className='font-thin'>
                <p className='line-clamp-2'>{quiz.description}</p>
                <span className='flex gap-3'>
                    <p>{quiz.createdBy.username}</p>
                    |
                    <p>{formatDistanceToNow(new Date(quiz.createdAt), { addSuffix: true })}</p>
                </span>
            </span>
        </Link>
    )
}

export default QuizCard
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const QuizResults = () => {
    const location = useLocation();
    const { score, total } = location.state || { score: 0 };
    const navigate = useNavigate();

    return (
        <div className='min-h-screen flex flex-col gap-5 justify-center items-center'>
            <div className='text-center'>
                <h1 className='text-4xl'>Quiz Results</h1>
                <p className='text-2xl mt-4'>Your Score: {score} / {total}</p>
            </div>
            <Button className='w-max' onClick={() => navigate("/")}>Back to Home</Button>
        </div>
    );
};

export default QuizResults;
import React from 'react'
import Button from '../../Button';

const QuestionCard = ({ question, deleteQuestionHandler }) => {

  console.log("question : ", question);

  return (
    <div>
      <div className='space-y-3 border-b border-slate-600 pb-5'>
        <span className='flex justify-between gap-5'>
          <h4 className='text-xl font-semibold'>{question.questionText}</h4>
          <Button
            onClick={() => deleteQuestionHandler(question)}
            className='w-max h-max'
            active={false}
          >delete</Button>
        </span>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3' >
          {
            question.options.map((option, index) => (
              <div key={option._id} className={`${option.isCorrect ? "border-green-900" : "border-red-900"} border-2 rounded-lg py-1 px-3`}>
                {option?.text}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
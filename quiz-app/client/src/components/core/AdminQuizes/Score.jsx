import React, { useEffect, useState } from 'react'
import { quizEndpoints } from '../../../services/APIs'
import { apiConnector } from '../../../services/apiConnector'
import { useSelector } from 'react-redux'

const Score = ({ quiz }) => {

    const [scores, setScores] = useState([])
    const [loading, setLoading] = useState(true)
    const { token } = useSelector(state => state.auth)

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await apiConnector("GET", `${quizEndpoints.GET_SCORES}/${quiz._id}`, null, {
                    Authorization: `Bearer ${token}`
                })
                console.log("res : ", response)
                setScores(response?.data?.data)
            } catch (error) {
                console.log("error : ", error)
            } finally {
                setLoading(false)
            }
        }

        fetchScores()
    }, [])

    return (
        <div className='bg-slate-900 z-[2] w-full rounded-lg py-5 flex flex-col gap-1 text-xl'>
            {
                loading ? (
                    <div className='text-center'>Loading...</div>
                ) : !loading && scores.length > 0 ? (
                    <div className=''>
                        <div className='flex justify-between p-3'>
                            <p className='text-green-600'>Name</p>
                            <p className='text-green-600'>Score</p>
                        </div>
                        {
                            scores.map((score, index) => (
                                <div className='flex justify-between py-2 border-t border-slate-600 px-3' key={index}>
                                    <p> {score?.userId?.username}</p>
                                    <p> <span className='text-green-500'>{score?.score}</span> / {score.answers.length}</p>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <p className='text-center'>No scores found</p>
                )
            }
        </div>
    )
}

export default Score
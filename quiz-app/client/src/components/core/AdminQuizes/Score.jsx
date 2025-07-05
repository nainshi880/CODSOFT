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
        <div>
            {
                loading ? (
                    <div>Loading...</div>
                ) : !loading && scores.length > 0 ? (
                    scores.map((score, index) => (
                        <div key={index}>
                            <p>{score.user.name} - {score.score}</p>
                        </div>
                    ))
                ) : (
                    <p>No scores found</p>
                )
            }
        </div>
    )
}

export default Score
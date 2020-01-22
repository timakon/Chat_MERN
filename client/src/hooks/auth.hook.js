import {useState, useCallback, useEffect} from 'react'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUseId] = useState(null)
        //   const [email, setEmail] = useState(null)

    const login = useCallback((jwtToken, id,email) => { //TODO delete all fields with email
        setToken(jwtToken)
        setUseId(id)
       // setEmail(email)

        localStorage.setItem('userData', JSON.stringify({
            userId:id,
            token:jwtToken,
            email: email
        }))
    }, [])
    const logout = useCallback(() => {
        setToken(null)
        setUseId(null)
        localStorage.removeItem('userData')
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))

        if(data && data.token){
            login(data.token, data.userId)
        }
    },[login])

    return {login, logout, token, userId}
}

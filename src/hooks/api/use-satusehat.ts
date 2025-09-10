import { useToast } from "@/context/ToastContext"
import axios from "axios"
import { useCallback, useState } from "react"

const apiUrl = import.meta.env.VITE_API_URL

export const useSatusehat = () => {
    const { showToast } = useToast()
    const [organizationId, setOrganizationId] = useState("")
    const [clientId, setClientId] = useState("")
    const [clientSecret, setClientSecret] = useState("")
    
    const getDataSatuSehat = useCallback( async() => {
        try {
            const response = await axios.get(`${apiUrl}/api/satusehat`, {
                withCredentials: true
            })
            if (response.status === 200) {
                setOrganizationId(response.data.data.organization_id)
                setClientId(response.data.data.client_id)
                setClientSecret(response.data.data.client_secret)
            }
        } catch (error) {
            console.log(error)
        }
    },[])

    const updateDataSatuSehat = useCallback( async(data: {organization_id: string, client_id: string, client_secret: string}) => {
        try {
            const response = await axios.patch(`${apiUrl}/api/satusehat`, data, {
                withCredentials: true
            })
            if (response.status === 200) {
                setOrganizationId(response.data.data.organization_id)
                setClientId(response.data.data.client_id)
                setClientSecret(response.data.data.client_secret)
                showToast(null, "Data Satu Sehat updated successfully", "success")
            }
        } catch (error) {
            showToast(null, "Failed to update Data Satu Sehat", "error")
            console.log(error)
        } 
    }, [])

    return {
        organizationId,
        clientId,
        clientSecret,
        getDataSatuSehat,
        updateDataSatuSehat
    }
}
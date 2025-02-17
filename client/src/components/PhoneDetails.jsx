import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {Buffer} from 'buffer'
import Spinner from './Spinner'
export default function PhoneDetails() {
  const {id} = useParams()
  const [phoneDetails, setPhoneDetails] = useState(null)
  const [phoneImg, setPhoneImg] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5005/phones/'+id)
    .then(phone => setPhoneDetails(phone.data))
    .catch(err => console.log(err))

    async function fetchPhone() {
      try {
        const imageResponse = await axios.get('http://localhost:5005/phones/'+id+'/image', {
          responseType:'arraybuffer'
        })
        const phoneResponse = await axios.get('http://localhost:5005/phones/'+id)
        setPhoneDetails(phoneResponse.data)
        setPhoneImg(Buffer.from(imageResponse.data, 'binary').toString('base64'))
      } catch (error) {
      }
    }
    fetchPhone()
  }, [id])
  
  if (phoneDetails === null) return <Spinner />
  if (phoneImg === null) return <Spinner />

  return(
    <div className="phone-details">
      <h2>{phoneDetails.name}</h2>
      <h3>Maker: {phoneDetails.manufacturer}</h3>
      <p>{phoneDetails.description}</p>
      <p>Color: {phoneDetails.color}</p>
      <p>Screen: {phoneDetails.screen}</p>
      <p>Processor: {phoneDetails.processor}</p>
      <p>Ram: {phoneDetails.ram} GB</p>
      <img src={`data:image/*;base64,${phoneImg}`} alt="phone" />
    </div>
  )
}
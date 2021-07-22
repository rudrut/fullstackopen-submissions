import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  
  const update = (id, changedObject) => {
    const request = axios.put(`${baseUrl}/${id}`, changedObject)
    return request.then(response => response.data)
  }

  const remove = (id, personObject) => {
	const request = axios.delete(`${baseUrl}/${id}`, personObject)
    return request.then(response => response.data)
}

export default { getAll, create, update, remove }
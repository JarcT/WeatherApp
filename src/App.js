import { useState } from "react";
import axios from 'axios'
function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=2a710e287b5d815f8b73282d691cde45`

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url).then((resp) => {
        setData(resp.data)
        console.log(resp.data)
      })
      setLocation('')
    }
  }
  return (
    <div className="App">
      <div className="search">
        <input value={location} onChange={event => setLocation(event.target.value)} onKeyDown={searchLocation} type="text" placeholder="Enter location"/>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{parseInt(data.main.temp) - 273}&deg;C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            <p></p>
          </div>
        </div>
        {data.name != undefined &&
        <div className='bottom'>
          <div className='feels'>
            {data.main ? <p className="number">{parseInt(data.main.feels_like) - 273}&deg;C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className="number">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            <p className="number">{data.wind.speed}km/h</p>
            <p>Wind</p>
          </div>

        </div>
        }
      </div>
    </div>
  );
}

export default App;

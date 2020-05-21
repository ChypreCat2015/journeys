import axios from 'axios';

const key = 'W2f4l7Y4E2vgZYpyHJ8Dc1PIfsw3Xy9X';

const getCity = async(city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/searc';
    const query = `?apikey=${key}&q=${city}`;

    axios
    .get(base + query)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}


getCity('madison');

// export { getCity };
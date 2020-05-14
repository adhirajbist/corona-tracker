import React from 'react';

import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';

import styles from './App.module.css';

import coronaImage from './images/covidImg.png';

import { fetchData } from './api';                  //curly braces because it is a 'named export', you dont have to specify index file in dir

class App extends React.Component {
    state = {                                       //so that data is accessible to cards
        data: {},
        country: '',
    }

    async componentDidMount() {
       const fetchedData = await fetchData(); 
       
       this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country });
        console.log(fetchedData)
    }

    render() {
        const { data, country } = this.state

        return(
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19" />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country}/>
            </div>
        ) 
    }
}

export default App;
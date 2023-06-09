import { Routes, Route } from 'react-router-dom'
import { useState } from "react"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Rules from './pages/Rules'
import Settings from './pages/Settings'
import Game from './pages/Game'
// import { store } from './store/films'
import { places } from './store/places'

const App = () => {
  const [location, setLocation] = useState(places);
  const [randomLocation, setRandomLocation] = useState(location.list[Math.floor(Math.random()*location.list.length)]);
  const [parameters, setParameters] = useState({
    locationName: `${location.name}`,
    locationSource: `${location.source}`,
    time: 6,
    spy: 1,
    players: [
      {
        id: 1, 
        playerLocation: randomLocation,
        spy: false,
      },
      {
        id: 2, 
        location: randomLocation,
        spy: false,
      },
      {
        id: 3, 
        location: randomLocation,
        spy: false,
      },
      {
        id: 4, 
        location: randomLocation,
        spy: false,
      },
      {
        id: 5, 
        location: randomLocation,
        spy: false,
      },
    ],
  });

  const changeSpy = () => {
    const currentSpy = Math.floor(Math.random() * parameters.players.length);
  
    setParameters({
      ...parameters,
      players: parameters.players.map((player, idx) => ({
        ...player,
        spy: idx === currentSpy,
      })),
    });
  };

  const changeParameters = (img, counter) => {
    if (img === 'players') {
      const newPlayers = [];

      for (let i = 1; i <= counter; i++) {
        newPlayers.push({
          id: i, 
          location: randomLocation,
          spy: false,
        });
      }

      const newParameters = {
        ...parameters,
        players: newPlayers
      };
      setParameters(newParameters);
    }

    if (img === 'spy') {
      const newParameters = {
        ...parameters,
        spy: counter
      };
      setParameters(newParameters);
    }

    if (img === 'time') {
      const newParameters = {
        ...parameters,
        time: counter
      };
      setParameters(newParameters);
    }
  }

  const changeLocation = (a) => {
    // setLocation(location)
    const newParameters = {
      ...parameters,
      locationName: a.title
    };
    setParameters(newParameters)
    console.log(parameters)
  }

  return (
    <div className="App h-full bg-[#18181b]">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home changeSpy={changeSpy}/>}/>
        <Route path='/правила' element={<Rules/>}/>
        <Route path='/настройки' 
          element={
            <Settings
              changeParameters={changeParameters}
              parameters={parameters} 
              setParameters={setParameters}
              changeLocation={changeLocation}
            />
          }
        />
        <Route path='/игра' 
          element={
            <Game
              randomLocation={randomLocation}
              parameters={parameters}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App

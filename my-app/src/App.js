//import React, { useState, useEffect } from 'react';
import React, { useEffect, useState } from 'react';
import api from './services/api';

import './Sidebar.css';
import './global.css';
import './App.css';
import './Main.css';

import DevItem from './components/DevItem';

function App() {

  const [devs, setDevs] = useState([]);

  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

 // const [latitude, setLatitude] = useState('');
 // const [longitude, setLongitude] = useState('');

  const latitude = -27.5588003;
  const longitude = -48.4905261;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
      //const { latitude, longitude } = position.coords;

      //setLatitude(latitude);
      //setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 40000,
      }
    )
  }, []);

  useEffect(() =>  {
      async function loadDevs() {
        const res = await api.get('./devs');

        setDevs(res.data);
      }
      loadDevs();
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();

    const res = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude,
    });

    setGithubUsername('');
    setTechs('');

    setDevs([...devs, res.data]);
  }

  return (
    <div id="app">
      <aside> 
          <strong>Cadastra Usuário</strong>
          <form onSubmit={handleAddDev}>
            <div className="input-block">
              <label htmlFor="github_username">Usuário do Github</label>
              <input 
                name="github_username" 
                id="github_username" 
                required 
                value={github_username}
                onChange={e => setGithubUsername(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="techs">Tecnologias</label>
              <input 
                name="techs" 
                id="techs" 
                value={techs}
                required 
                onChange={e => setTechs(e.target.value)}
              />
            </div>

            <div className="input-group">
              <div className="input-block">
                <label htmlFor="latitude">Latidude</label>
                <input 
                  type="number" 
                  id="latitude" 
                  required 
                  value={latitude} 
                  //onChange={e => setLatitude(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input 
                  type="number" 
                  id="longitude" 
                  required  
                  value={longitude} 
                  //onChange={e => setLongitude(e.target.value)}
                />
              </div>
            </div>

            <button type="submit">Salvar</button>
          </form>
      </aside>
      
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} /> 
          ))}  
        </ul>
      </main>
    </div>
  );
}

export default App;

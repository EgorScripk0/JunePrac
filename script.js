
  async function krData() {
    const stationName = document.getElementById('station').value;
    
    try {
      const response = await fetch('https://de1.api.radio-browser.info/json/stations');
      if (!response.ok) {
        throw new Error(`Ошибка сети. Статус: ${response.status}`);
      }
      const data = await response.json();
      const station = data.find(item => item.name === stationName);
    
      if (station) {
        const searchQuery = `${station.name} ${station.country}`;
        const encodedQuery = encodeURIComponent(searchQuery);
        const googleSearchUrl = `https://www.google.com/search?q=${encodedQuery}`;
        window.open(googleSearchUrl).focus();
      } else {
        console.error('Радиостанция не найдена');
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  
  async function loadStations() {
    const strana = document.getElementById('strana').value;
    const genre = document.getElementById('genre').value;
    
    try {
      const response = await fetch(`https://de1.api.radio-browser.info/json/stations/bycountry/${strana}`);
      if (!response.ok) {
        throw new Error(`Ошибка сети. Статус: ${response.status}`);
      }
      const data = await response.json();
      
      const stationSelect = document.getElementById('station');
      stationSelect.innerHTML = ''; // Очищаем список радиостанций
      
      // Добавляем варианты радиостанций в список
      data.forEach(station => {
        if (station.tags.includes(genre)) {
          const option = document.createElement('option');
          option.value = station.name;
          option.textContent = station.name;
          stationSelect.appendChild(option);
        }
      });
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  
import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantCard from "./PlantCard";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({ }) {
  const [plants, setPlants] = useState([]); 
  const [filterPlants, setFilterPlants] = useState(plants)

  function handleSearch(e) {
    const filteredPlants = plants.filter(plant => {
      return plant.name.includes(e.target.value)
    })

    setFilterPlants(filterPlants)
  }

  function addNewPlant(newPlant) {

    const updatedPlants = [...plants, newPlant]
    setPlants(updatedPlants)
  }

  useEffect(() => {
    setFilterPlants(plants)
  }, [plants])

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then(resp => resp.json())
    .then(data => {
      setPlants(data)})
    }, [])


  return (
    <main>
      <NewPlantForm addNewPlant={addNewPlant}/>
      <Search handleSearch={handleSearch}/>
      <PlantList plants={filterPlants}/>
    </main>
  );
}

export default PlantPage;

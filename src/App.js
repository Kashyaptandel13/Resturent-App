import React, { useCallback, useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';


function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [newerror, setError] = useState(null)

  
 const fetchMoviesHandler=useCallback(async()=> {
   setError(null)   
   setIsLoading(true)
   try{
   const response = await fetch('https://swapi.dev/api/films')
   if(!response.ok){
     throw new Error(`Coudn't get movies, somthing went wrong!`)
   }
   const data = await response.json()
   const transforemedMovies = data.results.map(movieData => {
          return {
            title: movieData.title,
            releaseDate: movieData.release_date,
            openingText: movieData.opening_crawl,
            id: movieData.episode_id
          }
        })
        setMovies(transforemedMovies)
      }catch(error){
        setError(error.message)
      }
      setIsLoading(false)
  },[]);
  useEffect(()=>{
    fetchMoviesHandler()
  },[fetchMoviesHandler])

  let result  = <p>Found No Movies</p>;
  
  if(movies.length>0 ){
     result = <MoviesList movies={movies} />
  }
  if(isLoading){
   result = <p>Loading...</p>
 }
  if(newerror){
     result = <p>{newerror}</p>
   }
   

  
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {result}
      </section>
    </React.Fragment>
  );
}

export default App;

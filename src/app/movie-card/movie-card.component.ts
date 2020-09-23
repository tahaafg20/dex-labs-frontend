import { Component, OnInit } from '@angular/core';
import movies from '../../assets/movies.json';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.less']
})
export class MovieCardComponent implements OnInit {
  // Keeps track of the current page for pagination.
  activePage: number = 0;

  // All the movies regardless of the pages.
  public allMovies: Movie[] = [];

  // Array of movies that can fit into one page and displayed.
  public movies: Movie[] = [];

  constructor(private http: HttpClient) { }

  // The function filters all the movies based on their page identifiers (PagerItem) to determine based on the current page which data is valid.
  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber
    const tempArray = []
    if (this.activePage === 1) {

      //  Iterating through all the movies and check if they belong to the first page.
      this.allMovies.map((movie) => {

        if (movie.PagerItem <= 10) {
          tempArray.push(movie);
        } else {
          return;
        }
      })
      this.movies = tempArray;

      //  Iterating through all the movies and check if they belong to the second page.
    } else if (this.activePage === 2) {
      this.allMovies.map((movie) => {
        if (movie.PagerItem >= 10) {
          tempArray.push(movie);
        } else {
          return;
        }
      })
      this.movies = tempArray;
    }
  }
  ngOnInit(): void {
    // First approach: Getting the dataset from the file locally

    // Set a counter to keep track of the number of objects (Helps us do the paginating)
    var counter = 1;

    // iterate through all the objects gotten from the local json file and assign each as a custom model which is created (Movie) to keep things consistant;
    movies.map((movie: {}) => {

      // Create the object with required fields
      let movieObject = { Title: movie["title"], PosterPath: movie["poster_path"], Id: movie["id"], ReleaseDate: movie["release_date"], PagerItem: counter } as Movie

      // Push the objects to an array of movies to use the array on the interface.
      this.allMovies.push(movieObject);

      // Increase the number of counter after every run of the loop.
      counter = counter + 1;

    })

    // Used for pagination
    this.displayActivePage(1);


    // Second approach: Getting the dataset from rails api

    // this.http.get<{}[]>("http://localhost:3000/movies").subscribe(data => {

      // Set a counter to keep track of the number of objects (Helps us do the paginating)
      // var counter = 1;

      // iterate through all the objects gotten from rails Api call and assign each as a custom model which is created (Movie) to keep things consistant;
      // data.map((movie) => {

        // Create the object with required fields
        // let movieObject = { Title: movie["title"], PosterPath: movie["poster_path"], Id: movie["id"], ReleaseDate: movie["release_date"], PagerItem: counter } as Movie

        // Push the objects to the array of movies based on the current page to use and display it on the interface.
        // this.allMovies.push(movieObject);

        // Increase the number of counter after every run of the loop.
        // counter = + 1
      // })
      // this.displayActivePage(1);
    // })
  }

}

interface Movie {
  Id: number;
  PosterPath: string;
  Title: string;
  ReleaseDate: string;
  PagerItem: number;
}



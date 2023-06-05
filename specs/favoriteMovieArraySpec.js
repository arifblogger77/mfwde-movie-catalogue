import { itActsAsFavoriteMovieModel } from './contracts/favoriteMovieContract';

let favoriteMovies = [];

const favoriteMovieArray = {
  getMovie(id) {
    if (!id) {
      return null;
    }

    return favoriteMovies.find((movie) => movie.id === id);
  },

  getAllMovies() {
    return favoriteMovies;
  },

  putMovie(movie) {
    if (!Object.prototype.hasOwnProperty.call(movie, 'id')) {
      return;
    }

    if (this.getMovie(movie.id)) {
      return;
    }

    favoriteMovies.push(movie);
  },

  deleteMovie(id) {
    favoriteMovies = favoriteMovies.filter((movie) => movie.id !== id);
  },

  searchMovies(query) {
    return this.getAllMovies()
      .filter((movie) => {
        const loweredCaseMovieTitle = (movie.title || '-').toLowerCase();
        const jammedMovieTitle = loweredCaseMovieTitle.replace(/\s/g, '');
        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');
        return jammedMovieTitle.indexOf(jammedQuery) !== -1;
      });
  },
};

describe('Favorite Movie Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteMovies = [];
  });

  itActsAsFavoriteMovieModel(favoriteMovieArray);
});

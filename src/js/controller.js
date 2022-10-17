import * as model from './model.js';
import recipeViews from '../js/views/recipeViews.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import searchViews from './views/searchViews.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    // hashchange
    const id = window.location.hash.slice(1);
    if (!id) return;

    // spinner
    recipeViews.recipeSpinner();

    // get recipe
    await model.loadRecipe(id);

    //rendering recipe
    recipeViews.render(model.state.recipe);
  } catch (err) {
    recipeViews.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // resultView.recipeSpinner();
    const query = searchViews.getQuery();

    await model.loadSearchResults(query);

    // resultView.render(model.state.search.results);
    resultView.render(model.getSerchResultPerPage());

    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

const controlPagination = function (goToPage) {
  resultView.render(model.getSerchResultPerPage(goToPage));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);
  //render updated recipe
  recipeViews.render(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }
  recipeViews.render(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    recipeViews.recipeSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    recipeViews.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarkView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const Init = function () {
  bookmarkView.addHandleRender(controlBookmark);
  recipeViews.addHandlerRender(controlRecipe);
  recipeViews.addHandlerUpdatingServings(controlServings);
  recipeViews.addHandlerBookmark(controlAddBookmark);
  searchViews.addhandlerSearch(controlSearchResults);
  paginationView._addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

Init();

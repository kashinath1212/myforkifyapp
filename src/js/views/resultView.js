import icons from 'url:../../img/icons.svg';

import View from './view';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errMessage = 'No recipe found for your query. Please try again!';
  _successMessage = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(data) {
    let id = window.location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${
              data.id === id ? 'preview__link--active' : ''
            }" href="#${data.id}">
            <figure class="preview__fig">
                <img src="${data.image}" alt="Test" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${data.title}</h4>
                <p class="preview__publisher">${data.publisher}</p>
                <div class="preview__user-generated ${
                  data.key ? '' : 'hidden'
                }">
                    <svg>
                        <use href="${icons}#icon-user"></use>
                    </svg>
                </div>
            </div>
            </a>
        </li>
        `;
  }
}

export default new ResultView();

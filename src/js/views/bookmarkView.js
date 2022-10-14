import icons from 'url:../../img/icons.svg';

import View from './view';

class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errMessage = 'No bookmarks yet! Find a nice recipe and bookmark it :)';
  _successMessage = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  addHandleRender(handler) {
    window.addEventListener('load', handler)
  }

  _generateMarkupPreview(data) {
    const id = window.location.hash.slice(1);
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

export default new BookmarkView();

import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Tags = {
  getAll: () => requests.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined })
const Articles = {
  all: page =>
    requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/articles/${slug}`),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/articles/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/articles/${slug}`),
  unfavorite: slug =>
    requests.del(`/articles/${slug}/favorite`),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article =>
    requests.post('/articles', { article })
};

const Topics = {
  allTopics: () => {
    return [
      {title: 'Art', image: 'https://images.fineartamerica.com/images-medium-large-5/abstract-art-color-splash-on-square-ann-powell.jpg'},
      {title: 'Books', image: 'https://lagosbooksclub.files.wordpress.com/2012/07/library00.jpg'},
      {title: 'Film', image: 'https://i.pinimg.com/originals/d1/12/2f/d1122f70c7bd0fee6ad4ff546d62e11d.jpg'},
      {title: 'Technology', image: 'https://arisant.com/wp-content/uploads/2019/02/leverage-the-power-of-cloud-arisant-500x500.jpg'},
      {title: 'Music', image: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/YT_Music.jpg'},
      {title: 'Gaming', image: 'https://cdn.vox-cdn.com/thumbor/mzLxakOdU-zxagxZHNgUiEkpe6M=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19173830/acastro_190904_3643_gaming_gear_package_centered.jpg'},
      {title: 'Humor', image: 'https://cdn.vox-cdn.com/thumbor/VMdinEMpwbiR_Bk2xcL8dZFhgFg=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22169304/robdobi_ringer_trumpcomedy.jpg'},
      {title: 'Photography', image: 'https://creativereview.imgix.net/content/uploads/2016/07/HomeCards_800x800_Subjects_Photography-021.jpg'},
      {title: 'Politics', image: 'https://mk0appinventiv4394ey.kinstacdn.com/wp-content/uploads/sites/1/2020/11/blockchain-in-politics.png'}
    ]
  }
  // allTags: () => requests.get('/tags')
}

const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  Topics,
  setToken: _token => { token = _token; }
};

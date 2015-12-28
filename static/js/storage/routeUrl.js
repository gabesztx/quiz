const baseURL = './static/template';
const routes = {
  urlPath:{
    authentication: '/',
    home: '/home',
    profilesetting: '/profilesetting'
  },
  urlTemplate:{
    authentication: baseURL + '/authentication.html',
    home: baseURL + '/welcome.html',
    profilesetting: baseURL + '/profilesetting.html'
  }


};

export {routes as ROUTES};
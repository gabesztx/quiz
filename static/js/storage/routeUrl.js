const baseURL = './static/template';
const routes = {
  index: '/welcome',
  setting: '/profilesetting'
};

const routesURL = {
  index: baseURL + '/welcome.html',
  setting: baseURL + '/profilesetting.html'
};


export {routes as ROUTES, routesURL as ROUTEURL};
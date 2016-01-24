import WelcomeTemplate from '../../template/welcome.html';
import ProfileSettingTemplate from '../../template/profilesetting.html';
const routes = {

  urlPath: {
    authentication: '/authentication',
    home: '/home',
    profilesetting: '/profilesetting'
  },

  urlTemplate: {
    authentication: '',
    home: WelcomeTemplate,
    profilesetting: ProfileSettingTemplate
  }

};

export {routes as ROUTES};

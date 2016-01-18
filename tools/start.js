import clean from './clean';
import webpackHandler from './webpack.handler';

async function start() {
  await clean();
  await webpackHandler();

}
export default start;

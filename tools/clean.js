import del from 'del';
async function clean() {
  return new Promise((r) => {
    del(['dist']).then(paths => {
      console.log('Dist folder cleaned!');
      r();
    });
  });
}
export default clean;
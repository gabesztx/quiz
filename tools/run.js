const module = process.argv[2];

const format = (time)=> {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
};

async function run(fn) {
  const startTime = new Date();
  console.log('Starting...:', format(startTime));
  await fn();
  console.log('End...:', format(startTime));
}
run(require('./' + module + '.js').default);
export default run;

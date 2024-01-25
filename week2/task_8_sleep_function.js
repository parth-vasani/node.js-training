function sleep(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

async function f1() {
  for (let i = 0; i < 5; i++) {
    await sleep(2000);
    console.log(i);
  }
}
f1();

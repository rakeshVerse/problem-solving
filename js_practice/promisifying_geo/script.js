// const getPosition = function () {
//   navigator.geolocation.getCurrentPosition(
//     pos => console.log(pos),
//     err => console.error(err)
//   );
// };

// getPosition();

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition()
  .then(res => console.log(res))
  .catch(err => console.log(err));

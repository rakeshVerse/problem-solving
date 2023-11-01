/* 
PART I
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.
*/

const imageContainer = document.querySelector('.images');

const wait = function (secs) {
  return new Promise(function (resolve) {
    setTimeout(resolve, secs * 1000);
  });
};

const createImage = imgPath => {
  return new Promise(function (resolve, reject) {
    const newImg = document.createElement('img');
    newImg.src = imgPath;

    newImg.addEventListener('load', function () {
      imageContainer.appendChild(newImg);
      resolve(newImg);
    });

    newImg.addEventListener('error', function () {
      reject(new Error('Failed to load image!'));
    });
  });
};

const loadNPause = async function () {
  try {
    const img = await createImage('img/imgd-1.jpg');
    await wait(2);
    img.style.display = 'none';

    const img1 = await createImage('img/img-2.jpg');
    await wait(2);
    img1.style.display = 'none';
  } catch (err) {
    console.log(err.message);
  }
};

// loadNPause();

/* PART II
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.
*/

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(imgPath => createImage(imgPath));

    // Use promise combinator to get the images
    const images = await Promise.all(imgs);

    images.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err.message);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

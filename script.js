const pictures = document.querySelectorAll('.picture'); 
let pictureOne, pictureTwo;
let disableGameField = false;
let matchedPicture = 0; 


function flipPicture(e){ 
    let clickedPicture = e.target; 

    if(clickedPicture !== pictureOne && !disableGameField){ 
        clickedPicture.classList.add('flip');

        if(!pictureOne){
            return pictureOne = clickedPicture; 
        }
        pictureTwo = clickedPicture;

        disableGameField = true;

        let pictureOneImg = pictureOne.querySelector('img').src, 
        pictureTwoImg = pictureTwo.querySelector('img').src; 
        matchPictures(pictureOneImg, pictureTwoImg);
    }
}

function matchPictures(img1, img2){ 

    if(img1 === img2){ 
        matchedPicture++; 
        if(matchedPicture == 6){ 
                     
            const message = document.createElement('div');
            message.textContent = 'Вы победили!';
            message.classList.add('message');
            document.body.appendChild(message);

            setTimeout(() => {
                message.remove();

            }, 3000);
   
                     
            setTimeout(() => { 
                return shufflePicture();
                
            }, 3000); 
        }

        pictureOne.removeEventListener('click', flipPicture);
        pictureTwo.removeEventListener('click', flipPicture);
        pictureOne = pictureTwo = '';
        return disableGameField = false;
    }
    else{
        setTimeout(() => { 
            pictureOne.classList.add('delay');
            pictureTwo.classList.add('delay');
        }, 400);

        setTimeout(() => { 
            pictureOne.classList.remove('delay', 'flip');
            pictureTwo.classList.remove('delay', 'flip');
            pictureOne = pictureTwo = '';

            disableGameField = false;

        }, 1200);
    }
}

function shufflePicture(){
    matchedPicture = 0;
    pictureOne = pictureTwo = "";

    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6,]; 
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    pictures.forEach((picture, index) => { 
        picture.classList.remove('flip');
        picture.addEventListener('click', flipPicture);

        let imgTag = picture.querySelector('img');
        imgTag.src = `images/img-${arr[index]}.png`;
    });
}
shufflePicture();

pictures.forEach(picture => { 
    picture.addEventListener('click', flipPicture); 
});

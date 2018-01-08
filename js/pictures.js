'use strict';
(function(){
var template = document.querySelector('#picture-template');
var fragment = document.createDocumentFragment();
var blockPictures = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');
var close = document.querySelector('.gallery-overlay-close');

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лицаулюдейнафоткеперекошены,какбудтоихизбивают.',
  'Как можно было поймать такой неудачный момент?!'
 ]
var arrayDescPictures = new Array(25);
for(var i = 0; i < arrayDescPictures.length; i++) {
  arrayDescPictures[i] = pictures(i + 1);
  fragment.appendChild(createElement(i));

}
function getRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
function pictures(indx) {
  return {
    url : "photos/" + indx + ".jpg",
    like : getRandomNumber(15, 200),
    comment : COMMENTS[getRandomNumber(1, 8)]
  }
}

function createElement(i) {
  var element = template.content.cloneNode(true); 

   element.querySelector(".img").src= arrayDescPictures[i].url;
  element.querySelector(".picture-likes").textContent = arrayDescPictures[i].like;
  element.querySelector(".picture-comments").textContent = arrayDescPictures[i].comment;

  return element;
}

blockPictures.appendChild(fragment);


function galleryOpen(event) {
  if(event.keyCode && event.keyCode !== 13) return;
  event.preventDefault();
  galleryOverlay.querySelector('img').src = event.currentTarget.querySelector('img').src;
  galleryOverlay.querySelector('.likes-count').textContent = event.currentTarget.querySelector('.picture-likes').textContent;
  galleryOverlay.querySelector('.comments-count').textContent = event.currentTarget.querySelector('.picture-comments').textContent.length;

  galleryOverlay.classList.remove('hidden');
  close.addEventListener('click', galleryClose);
  window.addEventListener('keydown', galleryClose);

}

function galleryClose(event) {
  if(event.keyCode && event.keyCode !== 27) return;
  galleryOverlay.classList.add('hidden');

}

var picture = document.querySelectorAll('.picture');
picture.forEach(pictur => {
  pictur.addEventListener('click', galleryOpen );
  pictur.addEventListener('keydown', galleryOpen );
})

})

(function(){
var uploadFile = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.upload-overlay');
var btnCancelUpload = uploadOverlay.querySelector('#upload-cancel');
var textarea = document.querySelector('.upload-form-description');
 console.dir(textarea)
textarea.addEventListener('focus', function() {
  document.removeEventListener('keydown', onCloseUpload)
})
textarea.addEventListener('blur', function() {
  document.addEventListener('keydown', onCloseUpload)
})


uploadFile.addEventListener('change', onOpenUpload);
function onOpenUpload() {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onCloseUpload)
}

btnCancelUpload.addEventListener('click', onCloseUpload);

function onCloseUpload(event) {
  if (event.keyCode!==27) return;
  
  uploadOverlay.classList.add('hidden');
}

}())




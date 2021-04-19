'use strict';

function HornGallery(horns){
  this.title = horns.title;
  this.url = horns.image_url;
  this.horns = horns.horns;
  this.description = horns.description;
  this.keyword = horns.keyword;

}

HornGallery.prototype.render = function () {
  let $hornclone = $('#photo-template').clone();
  $('main').append($hornclone);
  $hornclone.removeAttr('id');
  $hornclone.find('h2').text(this.title);
  $hornclone.find('img').attr('src', this.url);
  $hornclone.find('p').text(this.description);
  $hornclone.find('h3').text(this.horns);
  $hornclone.find('h4').text(this.keyword);

};



HornGallery.readJson = () => {
  const ajaxSettings = {
    method : 'get',
    dataType : 'json'

  };
  $.ajax('data/page-1.json',ajaxSettings)
    .then(data => {
      data.forEach(item => {
        let horn = new HornGallery(item);
        horn.render();
      });
    });


};

$(() => HornGallery.readJson());



// let selectElements=[];

// $.ajax('data/page-1.json')
//   .then(data => {
//     data.forEach(obj => {
//       if(!selectElements.includes(obj.keyword)) {selectElements.push(obj.keyword);}
//       let newObj = new HornGallery(obj);
//       newObj.render();

//     });
//     selectElements.forEach((keyword,idx) => {
//       let newOption = ` <option value="${keyword}" id = "${idx}">${keyword}</option>`;
//       $('select').append(newOption);
//     });
//   });

// $('select').on('change', function () {
//   let $newValue = $('select').val();
//   console.log($('this').attr('id'));
//   let len = $('div').length;
//   for(let i = 1; i <= len; i++ ){
//     if ($newValue === 'default') {
//       $('div').removeClass('displays');
//     }
//     else if($(`div h5:eq(${i})`).text() === $newValue){
//       $(`div:eq(${i})`).removeClass('displays');
//     }
//     else if($(`div h5:eq(${i})`).text() !== $newValue){
//     //   console.log($(`div h5:eq(${i})`).text());
//       $(`div:eq(${i})`).addClass('displays');
//     }

//   }
// });

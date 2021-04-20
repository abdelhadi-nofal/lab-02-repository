'use strict';

let selectElements = [];

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
  $hornclone.attr('class', `${this.keyword}`);
  $hornclone.attr('id', 'photo-template');


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

        // if (!selectElements.includes(horn.keyword)) selectElements.push(horn.keyword);
        if(selectElements.includes(horn.keyword)!==true){
          selectElements.push(horn.keyword);
          $('.selectItem').append(`<option value="${horn.keyword}"> ${horn.keyword} </option>`);
        }
      });

      $('#photo-template').hide();
      renderKeywords();
    });


};

$(() => HornGallery.readJson());


function renderKeywords() {
  selectElements.forEach((item) => {

    let optionTag = `<option value='${item}'> ${item}</option>`;
    $('select').append(optionTag);
  });
}


$('select').on('change', filterFunction);
function filterFunction() {
  let select = $(this).val();
  if (select === 'default') {
    $('div').show();
    $('#photo-template').hide();
  } else {
    $('div').hide();
    $(`.${select}`).show();
  }

}



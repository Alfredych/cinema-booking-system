const changePoster = (event, posterInput, posterLabel) => {
  const file = event.target.files[0];

  if (file) {
    const mimeType = file.type;
    const fileSize = file.size;
    const mimeTypeAcceptable = posterInput.accept;

    if (mimeType !== mimeTypeAcceptable) {
      alert('Формат файла должен быть - PNG.');
      posterLabel.classList.remove('upload-poster_label-selected');
    }

    if (fileSize > 3145728) {
      alert('Максимально допустимый размер файла - 3 мб.');
      posterLabel.classList.remove('upload-poster_label-selected');
    }

    posterLabel.classList.add('upload-poster_label-selected');
    posterLabel.textContent = 'Постер добавлен';
  } else {
    posterLabel.classList.remove('upload-poster_label-selected');
    posterLabel.textContent = 'Загрузить постер';
  }
};

export default changePoster;
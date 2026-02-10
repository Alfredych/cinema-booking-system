const showMessageSave = (target) => {
  const btnOk = target?.querySelector('.btn_save');

  if (btnOk) {
    btnOk.classList.add('btn_ok-saved');
    const btnInitialText = btnOk.textContent;
    btnOk.textContent = 'Сохранено';

    const removeMessage = btnInitialText => {
      btnOk.classList.remove('btn_ok-saved');
      btnOk.textContent = btnInitialText;
    };

    setTimeout(removeMessage, 1500, btnInitialText);
  }
};

export default showMessageSave;
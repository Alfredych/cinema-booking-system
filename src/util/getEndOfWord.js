const getEndOfWord = (count, word) => {
    const lastDigit = Number(String(count)[String(count).length - 1]);
    const penultimateDigit = Number(String(count)[String(count).length - 2]);

    if(word === 'минут'){
        if(penultimateDigit !== 1 && lastDigit !== 0 && lastDigit < 5){
            if(lastDigit === 1){
                return 'а';
            } else {
                return 'ы';
            }
        } else {
            return '';
        }
    } else if(word === 'рубл') {
        if(penultimateDigit !== 1 && lastDigit !== 0 && lastDigit < 5){
            if(lastDigit === 1) {
                return 'ь';
            } else {
                return 'я';
            }
        }else {
            return 'ей';
        }
    }
};

export default getEndOfWord;
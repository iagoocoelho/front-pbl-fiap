export const saveStateLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        console.log('error on save state on local storage')
    }
};

export const loadStateLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const slugfy = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

export const replaceOnlyNumber = (text) => {
    return text.match(/\d+/g).pop();
};

export const getWhatsByVendorId = (vendorId) => {

    const contactVendorNumberByCpf = {
        '35085104846': { whats: '5511958727673', },
        '09589182607': { whats: '5531994772978', },
        '93246382620': { whats: '5531996754161', },
        '08186643630': { whats: '5531996487830', },
        '97965286653': { whats: '5531992315644', },
        '09660565828': { whats: '5531991066173', },
        '40591274850': { whats: '5513996148312', },
        '02031584740': { whats: '5528999057544', },
        '38784013885': { whats: '5511984301310', },
        '51242345000192': { whats: '5511964179913', },
        '12344588701': { whats: '5521985533851', },
        '33128502900': { whats: '5569984332023', },
        '70648395120': { whats: '556699229448', },
        '04278875770': { whats: '5581981766864', },
        '': { whats: '5511916235625', },
    };

    return contactVendorNumberByCpf[vendorId]?.whats || contactVendorNumberByCpf[''].whats
};
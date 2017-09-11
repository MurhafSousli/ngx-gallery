export var defaultState = {
    images: undefined,
    prevIndex: 0,
    currIndex: 0,
    hasNext: undefined,
    hasPrev: undefined,
    active: false
};
export var defaultConfig = {
    style: {
        background: '#121519',
        width: '900px',
        height: '500px'
    },
    animation: 'fade',
    loader: {
        width: '50px',
        height: '50px',
        position: 'center',
        icon: 'oval'
    },
    description: {
        position: 'bottom',
        overlay: false,
        text: true,
        counter: true,
        style: {
            color: 'red'
        }
    },
    bullets: false,
    player: {
        autoplay: false,
        speed: 3000
    },
    thumbnails: {
        width: 120,
        height: 90,
        position: 'left',
        space: 30
    }
};
//# sourceMappingURL=gallery.default.js.map
export const throttle = (func, delay = 1000) => {
    let lastCall = 0;

    return (...args) => {
        const now = new Date().getTime();

        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
};

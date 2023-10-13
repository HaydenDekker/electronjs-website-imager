export const _BASE_DIR_IMAGES: string = process.env.BASE_DIR_IMAGES || './images';
export const _IMAGER_PORT: number = new Number(process.env.IMAGER_PORT).valueOf() || 8083;

function logConfig(){
    console.log("_BASE_DIR_IMAGES set to " + _BASE_DIR_IMAGES);
    console.log("_IMAGER_PORT set to " + _IMAGER_PORT);
};

logConfig();
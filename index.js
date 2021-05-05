const slider = document.querySelector('.slider');
const slideSwichHue = document.querySelector('.slider__slide-switch--color');
const slideSwitchSaturation = document.querySelector('.slider__slide-switch--saturation');
const slideSwitchLightness = document.querySelector('.slider__slide-switch--lightness');
const slidersBox = document.querySelector('.slider__sliders-box');

const hslValueBox = document.querySelector('.hsl-value');
const hexValueBox = document.querySelector('.hex-value');
const rgbValueBox = document.querySelector('.rgb-value');

const rootStyles = document.documentElement.style;
const sliderWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--slider-width'));
const hueMaxValue = 360;
const sliderHslRatio = hueMaxValue / sliderWidth;
const minAngle = 40;
const maxAngle = 140;

let hue = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hue'));
let saturation = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--saturation'));
let lightness = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--lightness'));
console.log(saturation);

let currentSaturationValue, currentLightnessValue;

let angleSaturationSwichValue = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--angle-saturation-switch'));
let angleLightnessSwichValue = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--angle-lightness-switch'));

let cursorPositionX = 0;

function setCssVariableValue(variable, value) {
    rootStyles.setProperty(variable, value);
}

function moveSlideSwitch({clientX}) {
    let currentSlideSwitchPosition = clientX - slider.offsetLeft
    if(currentSlideSwitchPosition < 0) {
        currentSlideSwitchPosition = 0;
    } else if(currentSlideSwitchPosition > sliderWidth) {
        currentSlideSwitchPosition = sliderWidth;
    }
    hue = Math.floor(currentSlideSwitchPosition * sliderHslRatio);
    setCssVariableValue('--hue', hue);
    setCssVariableValue('--slide-swich-position-x', currentSlideSwitchPosition);

    hslValueBox.textContent = `hsl(${hue}, ${saturation}%, ${lightness})`;
}
function moveSlideSwitchOnMouseDown() {
    setCssVariableValue('--coursor-slide-swich', 'grabbing');
    slider.addEventListener('mousemove', moveSlideSwitch);
}

slider.addEventListener('mousedown', moveSlideSwitch);
slideSwichHue.addEventListener('mousedown', moveSlideSwitchOnMouseDown);

function setSwitchSaturationAngle(cursorPosition, currentX) {
    saturation = angleSaturationSwichValue - minAngle;
    console.log(saturation);
    if(cursorPosition < currentX && angleSaturationSwichValue < maxAngle) {
        angleSaturationSwichValue += 1;
    } else if(cursorPosition > currentX && angleSaturationSwichValue > minAngle) {
        angleSaturationSwichValue -= 1;
    }
    rootStyles.setProperty('--angle-saturation-switch', `${Math.floor(angleSaturationSwichValue)}deg`);
    setCssVariableValue('--saturation', saturation);

    hslValueBox.textContent = `hsl(${hue}, ${currentSaturationValue}%, ${lightness})`;
}

function moveSlideSwitchSaturation(event) {
    event.stopPropagation();
    const currentX = event.clientX;
    setSwitchSaturationAngle(cursorPositionX, currentX)
}

function slideSwitchSaturationOnMouseDown(event) {
    event.stopPropagation();
    cursorPositionX = event.clientX;
    setCssVariableValue('--coursor-slide-swich', 'grabbing');
    slider.addEventListener('mousemove', moveSlideSwitchSaturation);
}

slideSwitchSaturation.addEventListener('mousedown', slideSwitchSaturationOnMouseDown);

function setSwitchLightnessAngle(cursorPosition, currentX) {
    currentLightnessValue = Math.floor(angleLightnessSwichValue - minAngle);
    if(cursorPosition < currentX && angleLightnessSwichValue > minAngle) {
        angleLightnessSwichValue -= 1;
    } else if(cursorPosition > currentX && angleLightnessSwichValue < maxAngle) {
        angleLightnessSwichValue += 1;
    }
    rootStyles.setProperty('--angle-lightness-switch', `${Math.floor(angleLightnessSwichValue)}deg`);
    setCssVariableValue('--lightness', currentLightnessValue);

    hslValueBox.textContent = `hsl(${hue}, ${currentSaturationValue}%, ${currentLightnessValue})`;
}

function moveSlideSwitchSLightness(event) {
    event.stopPropagation();
    const currentX = event.clientX;
    setSwitchLightnessAngle(cursorPositionX, currentX)
}

function slideSwitchLightnessOnMouseDown(event) {
    event.stopPropagation();
    cursorPositionX = event.clientX;
    setCssVariableValue('--coursor-slide-swich', 'grabbing');
    slider.addEventListener('mousemove', moveSlideSwitchSLightness);
}

slideSwitchLightness.addEventListener('mousedown', slideSwitchLightnessOnMouseDown);

slidersBox.addEventListener('mousedown', (event) => {
    event.stopPropagation();
});

function removeHandler() {
    slider.removeEventListener('mousemove', moveSlideSwitch);
    slider.removeEventListener('mousemove', moveSlideSwitchSaturation);
    slider.removeEventListener('mousemove', moveSlideSwitchSLightness);
    setCssVariableValue('--coursor-slide-swich', 'grab');
}

window.addEventListener('mouseup', removeHandler);

hslValueBox.textContent = `hsl(${hue}, ${saturation}%, ${lightness})`;

function convertFromHslToRgb(params) {

}
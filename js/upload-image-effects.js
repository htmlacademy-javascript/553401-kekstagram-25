const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderFieldset = document.querySelector('.effect-level');
const effectSlider = sliderFieldset.querySelector('.effect-level__slider');
const effectValue = sliderFieldset.querySelector('.effect-level__value');
let effectClass = 'effects__preview--none';
let effectName = 'none';

const onScaleSmallerClick = () => {
  const NumberOfScaleValue = parseInt(scaleValue.value, 10);
  if (NumberOfScaleValue > MIN_SCALE) {
    scaleValue.value =  `${NumberOfScaleValue - SCALE_STEP}%`;
    const scaleTransformValue = (NumberOfScaleValue - SCALE_STEP) / 100;
    imagePreview.style.transform = `scale(${scaleTransformValue})`;
  }
};

const onScaleBiggerClick = () => {
  const NumberOfScaleValue = parseInt(scaleValue.value, 10);
  if (NumberOfScaleValue < MAX_SCALE) {
    scaleValue.value =  `${NumberOfScaleValue + SCALE_STEP}%`;
    const scaleTransformValue = (NumberOfScaleValue + SCALE_STEP) / 100;
    imagePreview.style.transform = `scale(${scaleTransformValue})`;
  }
};

effectValue.value = 100;

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const getStyleEffect = (effect) => {
  switch (effect) {
    case 'chrome':
      return 'grayscale';
    case 'sepia':
      return 'sepia';
    case 'marvin':
      return 'invert';
    case 'phobos':
      return 'blur';
    case 'heat':
      return 'brightness';
  }
};

effectSlider.noUiSlider.on('update', () => {
  effectValue.value = effectSlider.noUiSlider.get();
  const styleEffect = getStyleEffect(effectName);

  if (styleEffect === 'invert') {
    imagePreview.style.filter = `${styleEffect}(${effectValue.value}%)`;
  } else if (styleEffect === 'blur') {
    imagePreview.style.filter = `${styleEffect}(${effectValue.value}px)`;
  } else {
    imagePreview.style.filter = `${styleEffect}(${effectValue.value})`;
  }
});

function onEffectChange (evt) {
  effectName = evt.target.value;
  imagePreview.classList.remove(effectClass);

  effectClass = `effects__preview--${  evt.target.value}`;
  imagePreview.classList.add(effectClass);

  if (effectName === 'none') {
    imagePreview.style.removeProperty('filter');
    sliderFieldset.classList.add('hidden');
  } else {
    sliderFieldset.classList.remove('hidden');
  }

  if (effectName === 'chrome' || effectName === 'sepia') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 100,
      step: 0.1,
    });
  }

  if (effectName === 'marvin') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }

  if (effectName === 'phobos') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }

  if (effectName === 'heat') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
}

export {onScaleSmallerClick, onScaleBiggerClick, onEffectChange};

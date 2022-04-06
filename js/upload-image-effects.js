const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_EFFECT_VALUE = 100;
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderFieldset = document.querySelector('.effect-level');
const effectSlider = sliderFieldset.querySelector('.effect-level__slider');
const effectValue = sliderFieldset.querySelector('.effect-level__value');
let effectClass = 'effects__preview--none';
let currentEffect = 'none';

const styleEffectObj = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness'
};

const filtersObj = {
  'none': {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      }
    },
  },

  'chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      }
    },
  },

  'sepia': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      }
    },
  },

  'marvin': {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    format: {
      to: function (value) {
        return `${value  }%`;
      },
      from: function (value) {
        return parseFloat(value);
      }
    },
  },

  'phobos': {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    format: {
      to: function (value) {
        return `${value  }px`;
      },
      from: function (value) {
        return parseFloat(value);
      }
    },
  },

  'heat': {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      }
    },
  },
};

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

effectValue.value = DEFAULT_EFFECT_VALUE;

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

effectSlider.noUiSlider.on('update', () => {
  effectValue.value = effectSlider.noUiSlider.get();
  const filterName = styleEffectObj[currentEffect];
  imagePreview.style.filter = `${filterName}(${effectValue.value})`;
});

function onEffectChange (evt) {
  currentEffect = evt.target.value;
  imagePreview.classList.remove(effectClass);

  effectClass = `effects__preview--${evt.target.value}`;
  imagePreview.classList.add(effectClass);

  if (currentEffect === 'none') {
    imagePreview.style.removeProperty('filter');
    sliderFieldset.classList.add('hidden');
  } else {
    sliderFieldset.classList.remove('hidden');
  }

  effectSlider.noUiSlider.updateOptions(filtersObj[currentEffect]);
}

export {onScaleSmallerClick, onScaleBiggerClick, onEffectChange};

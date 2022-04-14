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

const filtersObj = {
  'chrome': {
    filterName: 'grayscale',
    filterParams: {
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
  },

  'sepia': {
    filterName: 'sepia',
    filterParams: {
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
  },

  'marvin': {
    filterName: 'invert',
    filterParams: {
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
  },

  'phobos': {
    filterName: 'blur',
    filterParams: {
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
  },

  'heat': {
    filterName: 'brightness',
    filterParams: {
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
  if (currentEffect !== 'none') {
    const styleFilterValue = effectSlider.noUiSlider.get();
    effectValue.value = parseFloat(styleFilterValue);
    const currentFilter = filtersObj[currentEffect]['filterName'];
    imagePreview.style.filter = `${currentFilter}(${styleFilterValue})`;
  }
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
    effectSlider.noUiSlider.updateOptions(filtersObj[currentEffect]['filterParams']);
  }
}

const resetEffect = () => {
  imagePreview.classList.remove(effectClass);
  imagePreview.classList.add('effects__preview--none');
  imagePreview.style.removeProperty('filter');
  imagePreview.style.removeProperty('transform');
  sliderFieldset.classList.add('hidden');
};

export {onScaleSmallerClick, onScaleBiggerClick, onEffectChange, resetEffect};

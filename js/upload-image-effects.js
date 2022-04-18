const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_EFFECT_VALUE = 100;
const TYPES_OF_FILE = ['gif', 'jpg', 'jpeg', 'png'];
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderFieldset = document.querySelector('.effect-level');
const effectSlider = sliderFieldset.querySelector('.effect-level__slider');
const effectValue = sliderFieldset.querySelector('.effect-level__value');
let effectClass = 'effects__preview--none';
let currentEffect = 'none';

const showPreviewImage = (input) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const matches = TYPES_OF_FILE.some((it) => fileName.endsWith(it));

  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
};

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
        to: (value) => value,
        from: (value) => parseFloat(value)
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
        to: (value) => value,
        from: (value) => parseFloat(value)
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
        to: (value) => `${value  }%`,
        from: (value) => parseFloat(value)
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
        to: (value) => `${value  }px`,
        from: (value) => parseFloat(value)
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
        to: (value) => value,
        from: (value) => parseFloat(value)
      },
    },
  },
};

const onClickScaleSmaller = () => {
  const numberOfScaleValue = parseInt(scaleValue.value, 10);
  if (numberOfScaleValue > MIN_SCALE) {
    scaleValue.value =  `${numberOfScaleValue - SCALE_STEP}%`;
    const scaleTransformValue = (numberOfScaleValue - SCALE_STEP) / 100;
    imagePreview.style.transform = `scale(${scaleTransformValue})`;
  }
};

const onClickScaleBigger = () => {
  const numberOfScaleValue = parseInt(scaleValue.value, 10);
  if (numberOfScaleValue < MAX_SCALE) {
    scaleValue.value =  `${numberOfScaleValue + SCALE_STEP}%`;
    const scaleTransformValue = (numberOfScaleValue + SCALE_STEP) / 100;
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

const onEffectChange = (evt) => {
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
};

const resetEffect = () => {
  imagePreview.classList.remove(effectClass);
  imagePreview.classList.add('effects__preview--none');
  imagePreview.style.removeProperty('filter');
  imagePreview.style.removeProperty('transform');
  sliderFieldset.classList.add('hidden');
};

export {onClickScaleSmaller, onClickScaleBigger, onEffectChange, resetEffect, showPreviewImage};

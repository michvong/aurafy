import chroma from 'chroma-js';

const getDanceabilityColour = (danceability, valence, acousticness) => {
  // Tertiary colors
  const colourScale = chroma
    .scale(['deeppink', 'darkviolet', 'royalblue', 'mediumspringgreen', 'greenyellow', 'orangered'])
    .mode('hsl');
  const colour = colourScale(danceability).brighten(acousticness).desaturate(valence);
  return colour.hex();
};

// Secondary colors
const getEnergyColour = (energy, valence, acousticness) => {
  const colourScale = chroma.scale(['magenta', 'cyan', 'yellow', 'magenta']).mode('hsl');
  const colour = colourScale(energy).brighten(acousticness).desaturate(valence);
  return colour.hex();
};

// Primary colors
const getValenceColour = (valence, energy, acousticness) => {
  const colourScale = chroma.scale(['red', 'blue', 'green', 'red']).mode('hsl');
  const colour = colourScale(valence).brighten(acousticness).desaturate(energy);
  return colour.hex();
};

const getAverageColour = (danceabilityColour, energyColour, valenceColour) => {
  const colour = chroma.average([danceabilityColour, energyColour, valenceColour]);
  return colour.hex();
};

const getMixedColour = (danceabilityColour, valenceColour) => {
  const colour = chroma.mix(danceabilityColour, valenceColour);
  return colour.hex();
};

const generateColourPalette = (danceability, energy, valence, tempo, acousticness) => {
  const danceabilityColour = getDanceabilityColour(danceability, valence, acousticness);
  // console.log('dance colour: ', danceabilityColour);

  const energyColour = getEnergyColour(energy, valence, acousticness);
  // console.log('energy colour: ', energyColour);

  const valenceColour = getValenceColour(valence, energy, acousticness);
  // console.log('valence colour: ', valenceColour);

  const averageColour = getAverageColour(danceabilityColour, energyColour, valenceColour);
  // console.log('average colour: ', averageColour);

  const mixedDanceValenceColour = getMixedColour(danceabilityColour, valenceColour);
  // console.log('mixed colour: ', mixedDanceValenceColour);

  const colourPalette = [
    danceabilityColour,
    energyColour,
    valenceColour,
    averageColour,
    mixedDanceValenceColour,
  ];
  return colourPalette;
};

export default generateColourPalette;

import chroma from 'chroma-js';

const getDanceabilityColour = (danceability, valence, acousticness) => {
  const colourScale = chroma.scale(['red', 'orange', 'yellow', 'green', 'blue', 'purple']);
  const colour = colourScale(danceability).saturate(valence).brighten(acousticness);
  return colour.hex();
};

const getEnergyColour = (energy, valence, acousticness) => {
  const colourScale = chroma.scale(['red', 'orange', 'yellow', 'green', 'blue', 'purple']);
  const colour = colourScale(energy).saturate(valence).brighten(acousticness);
  return colour.hex();
};

const getValenceColour = (valence, energy, acousticness) => {
  const colourScale = chroma.scale(['red', 'orange', 'yellow', 'green', 'blue', 'purple']);
  const colour = colourScale(valence).saturate(valence).luminance(acousticness).brighten(energy);
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

import chroma from 'chroma-js';

const generateColourPalette = (danceability, energy, valence, tempo, acousticness) => {
  // console.log('Input values:', danceability, energy, valence, tempo, acousticness);
  const baseColour = '#4285f4';

  const colourPalette = chroma
    .scale([chroma(baseColour).darken(2), baseColour, chroma(baseColour).brighten(2)])
    .colors(5);

  const modifiedPalette = colourPalette.map((colour) => {
    const modifiedColour = chroma(colour)
      .saturate(danceability * 5)
      .brighten(energy * 2)
      .set('hsl.h', valence * 360)
      .luminance(tempo / 200)
      .alpha(acousticness);
    return modifiedColour;
  });

  return modifiedPalette;
};

export default generateColourPalette;

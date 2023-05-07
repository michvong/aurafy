import React from 'react';
import Shuffle from './Shuffle';
import Previous from './Previous';
import PlayToggle from './PlayToggle';
import Next from './Next';
import Repeat from './Repeat';

export default function Controller() {
  return (
    <>
      <div class="flex items-center drop-shadow-lg">
        <Shuffle />
        <Previous />
        <PlayToggle />
        <Next />
        <Repeat />
      </div>
    </>
  );
}

import React from 'react';
import Shuffle from './Shuffle';
import Previous from './Previous';
import PlayToggle from './PlayToggle';
import Next from './Next';
import Repeat from './Repeat';
import Duration from './Duration';

export default function Controller() {
  return (
    <>
      <div class="flex flex-col items-center">
        <div class="flex items-center -mb-3">
          <Shuffle />
          <Previous />
          <PlayToggle />
          <Next />
          <Repeat />
        </div>

        <Duration />
      </div>
    </>
  );
}

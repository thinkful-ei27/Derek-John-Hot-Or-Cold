import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js';

const ctx = 'chart';

const chart = new Chart(ctx, {
    type: 'line',
    data: [1, 2, 3],
    // options: options
})

function Line(props) {
  return (
    <div className='chart'>
      <canvas id='chart'></canvas>
    </div>
  )
}

// chart.propTypes = {

// }

export default chart


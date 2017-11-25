import React from 'react';
import { line, curveCatmullRom } from 'd3-shape';
import _ from 'lodash';
import Axis from './axis';
import Scale from './scale';

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.paths = [];
    const rows = _.values(props.data.rows);

    const [scaleX, scaleY] = Scale(this.props.data);
    
    this.props.data.axis.y.forEach((columName, idx) => {
      const lineFunction = line()
        .x(d => scaleX(d[this.props.data.axis.x]))
        .y(d => scaleY(d[columName]))
        .curve(curveCatmullRom.alpha(0.5));
      
      const path = (<path d={lineFunction(rows)} className="line" key={columName} transform="translate(20, 0)" className={`color-stroke-${idx}`} />);
      this.paths.push(path);
    });

    this.yAxis = <Axis scale={scaleY} axis='y' />
    this.xAxis = <Axis scale={scaleX} axis='x' />
  }

  render() {
    return (
      <svg width="530" height="220" className="chart">
        {this.yAxis}
        {this.xAxis}
        { this.paths.map(path => path) }
      </svg>
    );
  }
}
export default LineChart;

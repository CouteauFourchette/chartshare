import React from 'react';
import { axisLeft, axisBottom } from 'd3-axis';
import { select } from 'd3-selection';

class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const { scale } = this.props;
    let axis = undefined;
    if (this.props.axis === 'y') {
      axis = axisLeft(scale).ticks(5, 's');
    } else {
      axis = axisBottom(scale).ticks(10);
    }

    select(this.node).call(axis);
  }

  render() {
    const { width, height } = this.props;
    const translate = (this.props.axis === 'y') ? 'translate(50, 0)' : `translate(30, ${height})`;
    return <g className="axis" ref={node => this.node = node } height={height} width={width} transform={translate} />;
  }
}

export default Axis;

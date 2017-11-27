import React from 'react';
import ChartFactory from './chart/chart_factory';

class Chart extends React.Component {
  componentDidMount() {
    if (!this.props.chart) {
      this.props.fetchChart(this.props.chartId);
    }
  }

  render() {
    const { chart, width, height } = this.props;
    if (chart) {
      return (
        <div>
          {ChartFactory.build(chart, width, height)}

          {chart.data.axis.y.length > 1 ?
            <ul className="labels" style={{ width: (width + 42) }}>
              {
                chart.data.axis.y.map((label, idx) => (
                  <li key={label}>
                    <i className={`fa fa-square color-${idx}`} aria-hidden="true" />{label}
                  </li>
                ))
              }
            </ul>
            : ''}
        </div>
      );
    }
    return (<div>loading</div>);
  }
}

export default Chart;


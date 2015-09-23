var React = require('react');
var Badge = require('./badge');

// Thumbnail component
var Thumbnail = React.createClass({
  render: function () {
    return <div className="col-sm-5">
        <div className="thumbnail">
          <img src={this.props.imgUrl} alt="image text" />
          <div className="caption">
            <h3>{this.props.label}</h3>
            <p>{this.props.text}</p>
            <Badge title={this.props.title} number={this.props.number} />
        </div>
      </div>
    </div>
  }
});

module.exports = Thumbnail;
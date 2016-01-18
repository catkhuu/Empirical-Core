'use strict'
EC.ActivityDetails = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  objectiveTitle: function () {
    return [this.props.data.activity.classification.alias, "Objective"].join(' ');
  },

  getClassName: function () {
    return (this.props.data.concept_results.length ? 'activity-details' : 'activity-details no-concept-results')
  },

  render: function () {
    var dateTitle, dateBody;
    if (this.props.data.state == 'finished') {
      dateTitle = 'Completed:';
      dateBody = this.props.data.completed_at;
    } else {
      dateTitle = 'Due:';
      dateBody = this.props.data.due_date;
    }

    return (
      <div className={this.getClassName()}>
        <div className='activity-detail'>
          <div className='activity-detail-title objective-title'>
            <div className='grammar-icon-tooltip' />
            {this.objectiveTitle()}
          </div>
          <div className='activity-detail-body'>
            {this.props.data.activity.description}
          </div>
        </div>
        <div className='activity-detail'>
          <span className='activity-detail-title'>
            Activity:
          </span>
          <span className='activity-detail-body'>
            {this.props.data.activity.name}
          </span>
        </div>
        <div className='activity-detail'>
          <span className='activity-detail-title'>
            {dateTitle}
          </span>
          <span className='activity-detail-body'>
            {dateBody}
          </span>
        </div>
      </div>
    );
  }
});
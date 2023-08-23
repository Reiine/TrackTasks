import React from 'react';

function Activities({ activity, onDelete,key }) {
  const transClass = activity.trans === 'urgent' ? 'urgent' : 'non-urgent';

  return (
    <div className={`activity-cover ${transClass}`}>
      <div className="amount">
        <p>{key}</p>
      </div>
      <div className="activity-name">
        <p>{activity.activity}</p>
      </div>
      <div className="trans-activity">
        <p>{activity.trans}</p>
      </div>
      <button onClick={onDelete} id='delete'>Delete</button>
    </div>
  );
}

export default Activities;

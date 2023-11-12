/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';

const AchievementsTab = ({ achievements }) => {
  return (
    <div>
      <div className="mt-3">
        <p id="profile-text" className="text-center">
          Be sure to keep track of your achievements! <br />
          Be careful! While some are simple milestones, <br />
          There are competitive achievements you can snag from other quizzers
          such as Top Category!
        </p>
      </div>
      <div className="bg-info bg-gradient mt-3 p-3 rounded w-50 mx-auto">
        <h4 className="text-center">Achievements</h4>
        <table className="mx-auto">
          <tbody className="pb-3">
            {achievements.map((achievement) => {
              return (
                <tr key={achievement.id} className="bg-success bg-gradient">
                  <td className="mx-auto px-5 text-white rounded-4 my-1">
                    {achievement.name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AchievementsTab;

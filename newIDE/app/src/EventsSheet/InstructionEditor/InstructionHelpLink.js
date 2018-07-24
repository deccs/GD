// @flow strict-local
import * as React from 'react';
import HelpButton from '../../UI/HelpButton';

type Props = {|
  isCondition: boolean,
  instructionType: string,
|};

const conditionHelpLinks = {
  CollisionNP: '/all-features/collisions',
  Collision: '/all-features/collisions',
};

const actionHelpLinks = {
  SeparateFromObjects: '/all-features/collisions',
};

const getHelpLinkFor = (
  isCondition: boolean,
  instructionType: string
): ?string => {
  if (isCondition) {
    console.log(conditionHelpLinks);
    for (const partialName in conditionHelpLinks) {
      console.log(partialName);
      if (instructionType.search(partialName) !== -1)
        return conditionHelpLinks[partialName];
    }
  } else {
    for (const partialName in actionHelpLinks) {
      if (instructionType.search(partialName) !== -1)
        return actionHelpLinks[partialName];
    }
  }

  return null;
};

class InstructionHelpLink extends React.Component<Props> {
  render() {
    const helpPagePath = getHelpLinkFor(
      this.props.isCondition,
      this.props.instructionType
    );

    return helpPagePath ? (
      <HelpButton
        helpPagePath={helpPagePath}
        label={
          this.props.isCondition
            ? 'Help for this condition'
            : 'Help for this action'
        }
      />
    ) : null;
  }
}

export default InstructionHelpLink;

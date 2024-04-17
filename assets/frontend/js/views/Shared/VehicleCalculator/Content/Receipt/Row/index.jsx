import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RowLegacy from './RowLegacy';
import Row from './Row';

function RowComponent(props) {
  const theme = useTheme();

  if (theme.isLegacyView) {
    return <RowLegacy {...props} />;
  }

  return <Row {...props} />;
}

export default RowComponent;

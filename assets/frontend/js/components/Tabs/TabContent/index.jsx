import { useContext } from 'react';
import PropTypes from 'prop-types';
import TabsContext from '../Context';

function TabContent({ children, id }) {
  const { tab } = useContext(TabsContext);

  if (id !== tab) {
    return null;
  }

  return children;
}

TabContent.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  children: PropTypes.node.isRequired,
};

export default TabContent;

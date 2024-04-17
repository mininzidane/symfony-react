import get from 'lodash/get';

function useEmployee(employee = window.employee || {}) {
  function hasPermission(permissionName) {
    return Boolean(get(window, `pagePermissions.${permissionName}`));
  }

  return {
    ...employee,
    hasPermission,
  };
}

export default useEmployee;

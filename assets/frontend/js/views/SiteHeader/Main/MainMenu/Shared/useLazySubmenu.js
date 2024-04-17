import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import CatalogService from 'frontend/js/api/CatalogService';

function useLazySubmenu(menuItemsInit, options) {
  const { data, refetch } = useQuery('vehicle-finder-inventory', () => CatalogService.getVehicleFinderInventory(), {
    enabled: false,
  });
  const [menuItems, setMenuItems] = useState(menuItemsInit);

  function getMenuLinks() {
    if (options.id === 'findVehicles' && !data) {
      refetch();
    }
  }

  function formattedLinks(links) {
    return links ? links.map((item) => ({ label: item.label, cnt: item.cnt, href: item.link })) : [];
  }

  useEffect(() => {
    if (options.id === 'findVehicles' && data) {
      const items = menuItems.map((item) => {
        item.links = formattedLinks(data[item.id]);
        return item;
      });

      setMenuItems(items);
    }
  }, [data]);

  return { getMenuLinks, menuItems };
}

export default useLazySubmenu;

import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

export default function useAbkw() {
  const { isAuthenticated, membershipType, isB2BBroker, lotsWonCount } = useCustomerHelper();

  if (!isAuthenticated) {
    return 'NOT_LOGGED_IN';
  }

  const accountType = isB2BBroker ? 'BUSINESS' : 'REGULAR';
  const membershipName = membershipType?.name?.toUpperCase();

  let purchases;

  if (lotsWonCount === 0) {
    purchases = 'NONE';
  }

  if (lotsWonCount > 0 && lotsWonCount <= 5) {
    purchases = 'FEW';
  }

  if (lotsWonCount > 5 && lotsWonCount <= 10) {
    purchases = 'MANY';
  }

  if (lotsWonCount > 10) {
    purchases = 'PLENTY';
  }

  const abkw = `${accountType}_${membershipName}_${purchases}`;

  return window.abkw || abkw;
}

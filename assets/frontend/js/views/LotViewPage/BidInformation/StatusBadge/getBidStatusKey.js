export default function getBidStatusKey(status) {
  return status.replace(/\s/g, '_').replace(/\W/g, '').toLowerCase();
}

const ArrayService = {
  appendEl(arr, itemsBefore, cb) {
    const arrWithAd = [];

    arr.forEach((item, idx) => {
      if (idx !== 0 && idx % itemsBefore === 0) {
        arrWithAd.push(cb(idx));
      }

      arrWithAd.push(item);
    });

    return arrWithAd;
  },
};

export default ArrayService;

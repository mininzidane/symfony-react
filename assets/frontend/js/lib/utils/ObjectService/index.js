const ObjectService = {
  parseValues: (obj) => {
    Object.keys(obj).forEach((x) => {
      if (obj[x] === 'false' || obj[x] === 'true') {
        obj[x] = obj[x] === 'true';
      } else if (obj[x] === 'null') {
        obj[x] = null;
      } else if (obj[x] === 'undefined') {
        obj[x] = undefined;
      } else if (obj[x] === 'NaN') {
        obj[x] = NaN;
      } else if (!Number.isNaN(Number(obj[x]))) {
        obj[x] = Number(obj[x]);
      }
    });

    return obj;
  },

  modifySelectOptions(options, valueKey, labelKey) {
    if (Array.isArray(options) && (labelKey || valueKey)) {
      return options.map((option) => ({
        ...option,
        ...(labelKey && { label: option[labelKey] }),
        ...(valueKey && { value: option[valueKey] }),
      }));
    }

    return options;
  },
};

export default ObjectService;

const MathUtils = {
  formatBytes: (bytes, decimals = 2) => {
    if (bytes === 0) {
      return '0 Bytes';
    }

    const conversionFactor = 1024;
    const sizeLabels = ['Bytes', 'KB', 'MB', 'GB'];
    const converted = Math.floor(Math.log(bytes) / Math.log(conversionFactor));

    return `${parseFloat((bytes / conversionFactor ** converted).toFixed(decimals))} ${sizeLabels[converted]}`;
  },
};

export default MathUtils;

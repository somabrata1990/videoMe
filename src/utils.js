export function assert(requiredKeys, config) {
  requiredKeys.map(function(key) {
    if (!config[key]) {
      throw new Error("Required key '" + key + "' is missing");
    }
  });
}

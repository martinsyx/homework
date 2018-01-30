//扩展JSON对象
JSON.tryparse = function (text) {
  try {
    if (text) {
      return JSON.parse(text);
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
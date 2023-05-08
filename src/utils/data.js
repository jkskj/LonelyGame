//对象转formdata格式
export function jsToFormData(config) {
  const formData = new FormData();
  //循环传入的值转换formData
  Object.keys(config).forEach((key) => {
    formData.append(key, config[key]);
  });
  return formData;
}

//formdata转对象格式
export function jsonData(formData) {
  var jsonData = {};
  formData.forEach((value, key) => (jsonData[key] = value));
  return jsonData;
}

import { message } from "antd";
export function msgLoading(text) {
  return message.loading(text);
}
export function msgSuccess(text) {
  return message.success(text);
}
export function msgWarning(text) {
  return message.warning(text);
}
export function msgError(text) {
  return message.error(text);
}

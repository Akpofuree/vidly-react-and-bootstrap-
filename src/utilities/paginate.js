import _ from "lodash";

export function paginate(items, pageCounter, pageNumber) {
  const firstIndex = (pageCounter - 1) * pageNumber;
  return _(items).slice(firstIndex).take(pageNumber).value();
}

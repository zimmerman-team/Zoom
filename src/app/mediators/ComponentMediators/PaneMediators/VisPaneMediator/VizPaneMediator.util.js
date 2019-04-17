// so this  basically formats the indicator selections
// for the graph structure panes according to the selected indicators
// and ofcourse makes them unique cause to indicators
// with the same value can be selected
export function formatUniqueSelections(selectedInd) {
  const uniqueList = [];

  selectedInd.forEach((indicator, index) => {
    let item = indicator;

    if (uniqueList.indexOf(indicator) !== -1)
      item = indicator.concat(` (${index})`);

    uniqueList.push({
      label: item,
      value: item
    });
  });

  return uniqueList;
}

import { defModelOptions } from 'mediators/DataMapperMediators/UploadMediator/UploadMediator.util';
import findIndex from 'lodash/findIndex';

export function changeDisabledVal(tableData) {
  const disabledValues = [];

  tableData.forEach(item => {
    const disableInd = findIndex(defModelOptions, ['value', item.zoomModel]);

    // so yeah basically each model type has some other model types
    // that need to be disabled, so if we find any in the currently
    // selected model types of the table, we add it to the disabledValues,
    // we ofcourse form the disabledValues everytime from fresh
    // cause removing logic would be super complex, when some zoomModels
    // can overwrite others
    if (disableInd !== -1 && defModelOptions[disableInd].disable) {
      defModelOptions[disableInd].disable.forEach(disItem => {
        if (disabledValues.indexOf(disItem) === -1) {
          disabledValues.push(disItem);
        }
      });
    }
  });

  return disabledValues;
}

import PlusFormInstance, { QueryForm } from './PlusForm';
import FormItemInputText from './FormItemInputText';
import FormItemDateRange from './FormItemDateRange';
import FormItemSelect from './FormItemDateRange';

type PlusFormType = typeof PlusFormInstance;

interface PlusFormInterface extends PlusFormType {
  FormItemInputText: typeof FormItemInputText;
  FormItemDateRange: typeof FormItemDateRange;
  FormItemSelect: typeof FormItemSelect;
  QueryForm: typeof QueryForm;
}

const PlusForm = PlusFormInstance as PlusFormInterface;

PlusForm.FormItemInputText = FormItemInputText;
PlusForm.FormItemDateRange = FormItemDateRange;
PlusForm.FormItemSelect = FormItemSelect;
PlusForm.QueryForm = QueryForm;

export default PlusForm;

import {
  AutoComplete,
  AutoCompleteChangeEvent,
} from '@progress/kendo-react-dropdowns';
import './dropdown.scss';
import { Label } from '@progress/kendo-react-labels';

interface IDropdownProps {
  name: string;
  optionsList: string[];
  value: string;
  required: boolean;
  onChange: (e: AutoCompleteChangeEvent) => void;
  placeholder: string;
  maxLength?: number;
  numeric?: boolean;
  alphabetic?: boolean;
}

export const Dropdown = ({
  name,
  optionsList,
  value,
  onChange,
  required,
  placeholder,
  maxLength,
  numeric,
  alphabetic,
}: IDropdownProps) => {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (numeric) {
      if (!/[\d\b]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }
    if (alphabetic) {
      if (!/^[a-zA-Z]$/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }
  };
  return (
    <div className="dropdown-container">
      <Label editorId={'field-label'} optional={!required}>
        {name}
        <span className="required">{required ? `*` : ''}</span>
      </Label>
      <AutoComplete
        name={name}
        data={optionsList}
        defaultValue={optionsList[0]}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        inputAttributes={{
          maxLength,
          onKeyDown: onInputKeyDown,
          inputMode: numeric ? 'numeric' : undefined,
        }}
      />
    </div>
  );
};

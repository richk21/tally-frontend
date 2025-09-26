import { Input, InputChangeEvent } from '@progress/kendo-react-inputs';
import './inputField.scss';
import { Label } from '@progress/kendo-react-labels';

interface IInputFieldProps {
  inputFieldLabel?: string;
  placeholder: string;
  type?: 'number' | 'input' | 'email';
  value: number | string;
  onChange: (e: InputChangeEvent) => void;
  required?: boolean;
  disabled?: boolean;
  maxValue?: number;
}

export const InputField = ({
  inputFieldLabel = '',
  placeholder,
  type,
  value,
  onChange,
  required = true,
  disabled,
  maxValue,
}: IInputFieldProps) => {
  const handleChange = (e: InputChangeEvent) => {
    const newValue = e.value;
    if (type === 'number' && newValue.includes('-')) {
      return;
    }
    const numValue = Number(newValue);

    if (
      type === 'number' &&
      newValue !== '' &&
      (numValue < 0 || (maxValue !== undefined && numValue > maxValue))
    ) {
      return;
    }

    onChange(e);
  };

  return (
    <div className="input-field-container">
      <Label editorId={'field-label'} optional={!required}>
        {inputFieldLabel}
        <span className="required">{required ? `*` : ''}</span>
      </Label>
      <Input
        className="kendo-input-field"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

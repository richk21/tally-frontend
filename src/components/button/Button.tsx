import { Button } from '@progress/kendo-react-buttons';
import './button.scss';

interface IButtonProps {
  isDisabled: boolean;
  text: string;
}
export const ButtonComponent = ({ isDisabled, text }: IButtonProps) => {
  return (
    <div className="button-container">
      <Button type="submit" color="primary" disabled={isDisabled}>
        {text}
      </Button>
    </div>
  );
};

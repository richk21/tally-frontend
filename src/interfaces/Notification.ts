export interface INotification {
  message: string;
  type:
    | 'none'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'base'
    | 'secondary'
    | 'light'
    | 'inverse'
    | 'primary'
    | 'tertiary'
    | 'dark'
    | undefined;
}
